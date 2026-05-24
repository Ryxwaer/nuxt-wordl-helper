#!/usr/bin/env python3
"""
Comprehensive GSC pull for wordl.ryxwaer.com weekly SEO report.

Pulls in a single execution everything we need for the deep-dive:
  - 7-day and 28-day query / page / country / device breakdowns
  - Query x page combinations (which page ranks for which term)
  - Sitemap status
  - URL inspection for the three indexable URLs (/, /wodl, /about)

Output is JSON to stdout so the calling shell can pretty-print or pipe.
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
    rows = []
    for r in resp.get("rows", []):
        rows.append(
            {
                "keys": r["keys"],
                "clicks": r["clicks"],
                "impressions": r["impressions"],
                "ctr": round(r["ctr"], 5),
                "position": round(r["position"], 2),
            }
        )
    return rows


def main():
    sc = make_client()

    # GSC lags ~2 days. Use "yesterday-2" as endDate to be safe.
    end = date.today() - timedelta(days=2)
    start_7 = end - timedelta(days=6)
    start_28 = end - timedelta(days=27)

    out = {
        "site": SITE,
        "windows": {
            "7d": [start_7.isoformat(), end.isoformat()],
            "28d": [start_28.isoformat(), end.isoformat()],
        },
        "queries_7d": query(sc, start=start_7, end=end, dimensions=["query"], row_limit=50),
        "pages_7d": query(sc, start=start_7, end=end, dimensions=["page"], row_limit=25),
        "countries_7d": query(sc, start=start_7, end=end, dimensions=["country"], row_limit=25),
        "devices_7d": query(sc, start=start_7, end=end, dimensions=["device"]),
        "query_x_page_7d": query(
            sc, start=start_7, end=end, dimensions=["query", "page"], row_limit=50
        ),
        "queries_28d": query(sc, start=start_28, end=end, dimensions=["query"], row_limit=50),
        "pages_28d": query(sc, start=start_28, end=end, dimensions=["page"], row_limit=25),
        "countries_28d": query(sc, start=start_28, end=end, dimensions=["country"], row_limit=25),
        "devices_28d": query(sc, start=start_28, end=end, dimensions=["device"]),
    }

    # Sitemap status
    try:
        sm = sc.sitemaps().list(siteUrl=SITE).execute()
        out["sitemaps"] = sm.get("sitemap", [])
    except HttpError as e:
        out["sitemaps"] = {"error": str(e)}

    # Per-URL index inspection (most useful for catching index issues silently)
    inspections = {}
    for url in [
        "https://wordl.ryxwaer.com/",
        "https://wordl.ryxwaer.com/wodl",
        "https://wordl.ryxwaer.com/about",
    ]:
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
