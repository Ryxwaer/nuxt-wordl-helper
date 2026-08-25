#!/usr/bin/env python3
"""
Real-usage report from the app's own `query_logs` collection.

This is the only first-party signal of humans actually using the solver
(GSC stops at the click; Cloudflare page views are bot-polluted). Reads
DB_URI from .env so no credential is passed on the command line.
"""
from __future__ import annotations

import os
import re
from collections import Counter
from pathlib import Path

from pymongo import MongoClient

ENV_PATH = Path(__file__).resolve().parent.parent / ".env"
BOT_PATTERN = re.compile(
    r"bot|crawl|spider|slurp|headless|python-requests|curl|wget|scrapy|"
    r"lighthouse|monitor|preview|facebookexternalhit|semrush|ahrefs",
    re.I,
)


def load_db_uri() -> str:
    for line in ENV_PATH.read_text().splitlines():
        if line.startswith("DB_URI="):
            return line.split("=", 1)[1].strip()
    raise SystemExit("DB_URI not found in .env")


def is_bot(ua: str | None) -> bool:
    return bool(ua) and bool(BOT_PATTERN.search(ua))


def classify_query(q: dict) -> str:
    """An 'empty' run is a click of Calculate with no clues entered."""
    if not q:
        return "empty"
    filled = [p for p in (q.get("position") or []) if p]
    if filled or q.get("included") or q.get("excluded"):
        return "with_clues"
    return "empty"


def main() -> None:
    db = MongoClient(load_db_uri(), serverSelectionTimeoutMS=20000).get_database()

    print("=== COLLECTIONS ===")
    for name in db.list_collection_names():
        print(f"  {name}: {db[name].estimated_document_count()}")

    logs = list(db.query_logs.find({}, {"_id": 0}).sort("timestamp", 1))
    total = len(logs)
    if not total:
        raise SystemExit("no query_logs")

    print(f"\n=== query_logs: {total} solver runs ===")
    print(f"range: {logs[0]['timestamp']} -> {logs[-1]['timestamp']}")

    human = [d for d in logs if not is_bot(d.get("userAgent"))]
    print(f"non-bot runs: {len(human)}  (bot/tool UA: {total - len(human)})")

    print("\n=== MONTHLY (non-bot) ===")
    print(f"{'month':9} {'runs':>6} {'IPs':>5} {'mobile%':>8} {'with_clues%':>12} {'runs/IP':>8}")
    months: dict[str, list] = {}
    for d in human:
        months.setdefault(d["timestamp"].strftime("%Y-%m"), []).append(d)
    for m in sorted(months):
        rows = months[m]
        ips = {r.get("ip") for r in rows}
        mob = sum(1 for r in rows if r.get("isMobile"))
        clued = sum(1 for r in rows if classify_query(r.get("query")) == "with_clues")
        print(
            f"{m:9} {len(rows):>6} {len(ips):>5} {100*mob/len(rows):>7.0f}% "
            f"{100*clued/len(rows):>11.0f}% {len(rows)/len(ips):>8.1f}"
        )

    print("\n=== ENGAGEMENT DEPTH (non-bot, runs per IP-day = one 'session') ===")
    sessions: dict[tuple, int] = Counter()
    for d in human:
        sessions[(d.get("ip"), d["timestamp"].date())] += 1
    depth = Counter(sessions.values())
    print(f"total sessions: {len(sessions)}")
    for n in sorted(depth):
        label = f"{n} run" + ("s" if n > 1 else "")
        print(f"  {label:10} {depth[n]:>5} sessions {100*depth[n]/len(sessions):>5.1f}%")
    print(f"median runs/session: {sorted(sessions.values())[len(sessions)//2]}")
    one_and_done = depth.get(1, 0)
    print(f"single-run sessions (bounced after one calculate): {100*one_and_done/len(sessions):.0f}%")

    print("\n=== TOP COUNTRIES (non-bot runs) ===")
    for c, n in Counter(d.get("country") or "?" for d in human).most_common(15):
        print(f"  {c or '?':22} {n:>5}")

    print("\n=== DEVICE (non-bot) ===")
    mob = sum(1 for d in human if d.get("isMobile"))
    print(f"  mobile {mob} ({100*mob/len(human):.0f}%)   desktop {len(human)-mob}")

    print("\n=== QUERY QUALITY (non-bot) ===")
    kinds = Counter(classify_query(d.get("query")) for d in human)
    for k, n in kinds.most_common():
        print(f"  {k:12} {n:>5} ({100*n/len(human):.0f}%)")
    lengths = Counter(len(d.get("query", {}).get("position") or []) for d in human)
    print("  word-length requested:", dict(sorted(lengths.items())))

    print("\n=== REPEAT VISITORS (non-bot, IPs by distinct active days) ===")
    ip_days: dict[str, set] = {}
    for d in human:
        ip_days.setdefault(d.get("ip"), set()).add(d["timestamp"].date())
    dist = Counter(len(v) for v in ip_days.values())
    print(f"  distinct IPs: {len(ip_days)}")
    for n in sorted(dist):
        print(f"  active on {n} day(s): {dist[n]} IPs")
    returning = sum(v for k, v in dist.items() if k > 1)
    print(f"  returning IPs (>1 day): {returning} ({100*returning/len(ip_days):.0f}%)")

    print("\n=== FIELDS PRESENT (is a referrer being captured at all?) ===")
    fields = Counter(k for d in logs for k in d)
    print(" ", dict(fields))

    cutoff = logs[-1]["timestamp"] - __import__("datetime").timedelta(days=90)
    recent = [d for d in human if d["timestamp"] >= cutoff]
    print(f"\n=== LAST 90 DAYS ({len(recent)} runs) ===")
    print("  countries:")
    for c, n in Counter(d.get("country") or "?" for d in recent).most_common(15):
        ips = len({d.get("ip") for d in recent if (d.get("country") or "?") == c})
        print(f"    {c:22} {n:>5} runs  {ips:>4} IPs")
    print("  daily unique IPs (last 28 days):")
    by_day: dict = {}
    for d in recent:
        by_day.setdefault(d["timestamp"].date(), set()).add(d.get("ip"))
    days = sorted(by_day)[-28:]
    for day in days:
        n = len(by_day[day])
        print(f"    {day}  {n:>3} IPs  {'#' * min(n, 40)}")
    print(f"  avg unique IPs/day over those 28 days: "
          f"{sum(len(by_day[d]) for d in days)/len(days):.1f}")


if __name__ == "__main__":
    main()
