#!/usr/bin/env python3
"""
Long-range GSC pull for wordl.ryxwaer.com.

Answers "did we make progress over the last N months?" by pulling:
  - daily time series (clicks / impressions / ctr / position) over LOOKBACK_DAYS
  - period-over-period query, page, country, device comparisons
  - sitemap status and per-URL index inspection

Output is JSON to stdout.
"""
from __future__ import annotations

import json
import sys
from datetime import date, timedelta
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SITE = "https://wordl.ryxwaer.com/"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
CREDS_PATH = Path(__file__).parent / "secret.json"
LOOKBACK_DAYS = 210
COMPARE_WINDOW = 28
INSPECT_URLS = [
    "https://wordl.ryxwaer.com/",
    "https://wordl.ryxwaer.com/wodl",
    "https://wordl.ryxwaer.com/about",
    "https://wordl.ryxwaer.com/red-packet",
]


def make_client():
    creds = service_account.Credentials.from_service_account_file(
        str(CREDS_PATH), scopes=SCOPES
    )
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def query(sc, *, start: date, end: date, dimensions: list[str], row_limit: int = 25):
    body = {
        "startDate": start.isoformat(),
        "endDate": end.isoformat(),
        "dimensions": dimensions,
        "rowLimit": row_limit,
    }
    try:
        resp = sc.searchanalytics().query(siteUrl=SITE, body=body).execute()
    except HttpError as e:
        return {"error": str(e)}
    return [
        {
            "keys": r["keys"],
            "clicks": r["clicks"],
            "impressions": r["impressions"],
            "ctr": round(r["ctr"], 5),
            "position": round(r["position"], 2),
        }
        for r in resp.get("rows", [])
    ]


def totals(sc, *, start: date, end: date):
    body = {"startDate": start.isoformat(), "endDate": end.isoformat()}
    try:
        resp = sc.searchanalytics().query(siteUrl=SITE, body=body).execute()
    except HttpError as e:
        return {"error": str(e)}
    rows = resp.get("rows", [])
    if not rows:
        return {"clicks": 0, "impressions": 0, "ctr": 0, "position": None}
    r = rows[0]
    return {
        "clicks": r["clicks"],
        "impressions": r["impressions"],
        "ctr": round(r["ctr"], 5),
        "position": round(r["position"], 2),
    }


def weekly_rollup(daily_rows):
    """Group daily rows into ISO weeks so trends are readable."""
    weeks: dict[str, dict] = {}
    for row in daily_rows:
        d = date.fromisoformat(row["keys"][0])
        monday = d - timedelta(days=d.weekday())
        key = monday.isoformat()
        w = weeks.setdefault(
            key, {"week_start": key, "clicks": 0, "impressions": 0, "_pos_sum": 0.0, "days": 0}
        )
        w["clicks"] += row["clicks"]
        w["impressions"] += row["impressions"]
        w["_pos_sum"] += row["position"] * row["impressions"]
        w["days"] += 1
    out = []
    for key in sorted(weeks):
        w = weeks[key]
        imps = w["impressions"]
        out.append(
            {
                "week_start": w["week_start"],
                "days_with_data": w["days"],
                "clicks": w["clicks"],
                "impressions": imps,
                "ctr_pct": round(100 * w["clicks"] / imps, 2) if imps else 0,
                "avg_position": round(w["_pos_sum"] / imps, 2) if imps else None,
            }
        )
    return out


def main():
    sc = make_client()
    end = date.today() - timedelta(days=2)
    start = end - timedelta(days=LOOKBACK_DAYS - 1)

    cur_end, cur_start = end, end - timedelta(days=COMPARE_WINDOW - 1)
    prev_end = cur_start - timedelta(days=1)
    prev_start = prev_end - timedelta(days=COMPARE_WINDOW - 1)

    daily = query(sc, start=start, end=end, dimensions=["date"], row_limit=LOOKBACK_DAYS)

    out = {
        "site": SITE,
        "generated": date.today().isoformat(),
        "range": [start.isoformat(), end.isoformat()],
        "windows": {
            "current": [cur_start.isoformat(), cur_end.isoformat()],
            "previous": [prev_start.isoformat(), prev_end.isoformat()],
        },
        "totals_full_range": totals(sc, start=start, end=end),
        "totals_current": totals(sc, start=cur_start, end=cur_end),
        "totals_previous": totals(sc, start=prev_start, end=prev_end),
        "weekly": weekly_rollup(daily) if isinstance(daily, list) else daily,
        "queries_current": query(sc, start=cur_start, end=cur_end, dimensions=["query"], row_limit=100),
        "queries_previous": query(sc, start=prev_start, end=prev_end, dimensions=["query"], row_limit=100),
        "queries_full_range": query(sc, start=start, end=end, dimensions=["query"], row_limit=150),
        "pages_current": query(sc, start=cur_start, end=cur_end, dimensions=["page"], row_limit=25),
        "pages_full_range": query(sc, start=start, end=end, dimensions=["page"], row_limit=25),
        "countries_full_range": query(sc, start=start, end=end, dimensions=["country"], row_limit=25),
        "devices_full_range": query(sc, start=start, end=end, dimensions=["device"]),
        "query_x_page_full_range": query(
            sc, start=start, end=end, dimensions=["query", "page"], row_limit=100
        ),
    }

    try:
        out["sitemaps"] = sc.sitemaps().list(siteUrl=SITE).execute().get("sitemap", [])
    except HttpError as e:
        out["sitemaps"] = {"error": str(e)}

    inspections = {}
    for url in INSPECT_URLS:
        try:
            insp = (
                sc.urlInspection()
                .index()
                .inspect(body={"inspectionUrl": url, "siteUrl": SITE})
                .execute()
            )
            inspections[url] = insp.get("inspectionResult", {})
        except HttpError as e:
            inspections[url] = {"error": str(e)}
    out["url_inspections"] = inspections

    json.dump(out, sys.stdout, indent=2, default=str)
    print()


if __name__ == "__main__":
    main()
