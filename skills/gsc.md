---
name: gsc
description: Query Google Search Console (GSC) data for wordl.ryxwaer.com using a service-account credential. Use when the user asks about GSC, Search Console, organic clicks/impressions/CTR/position, top queries, indexed pages, or wants to verify SEO report claims against real data.
---

# Google Search Console access

## Site & credentials

- **Property:** `https://wordl.ryxwaer.com/` (URL-prefix property)
- **Auth:** service-account key at `skills/secret.json` (gitignored)
- **Required scope:** `https://www.googleapis.com/auth/webmasters.readonly`

The service-account email (`client_email` in `secret.json`) must be added as a **user with at least "Restricted" access** in Search Console → Settings → Users and permissions. Without that, every API call returns 403 even with valid credentials.

## Quick start (Python)

Install once:

```bash
pip install google-api-python-client google-auth
```

Minimal Search Analytics query — top queries for the last 7 days:

```python
from google.oauth2 import service_account
from googleapiclient.discovery import build
from datetime import date, timedelta

SITE = "https://wordl.ryxwaer.com/"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

creds = service_account.Credentials.from_service_account_file(
    "skills/secret.json", scopes=SCOPES
)
sc = build("searchconsole", "v1", credentials=creds)

end = date.today() - timedelta(days=1)   # GSC data lags ~2 days
start = end - timedelta(days=6)

resp = sc.searchanalytics().query(
    siteUrl=SITE,
    body={
        "startDate": start.isoformat(),
        "endDate": end.isoformat(),
        "dimensions": ["query"],
        "rowLimit": 25,
    },
).execute()

for row in resp.get("rows", []):
    q = row["keys"][0]
    print(f"{q:30s}  {row['clicks']:>3}c  {row['impressions']:>4}i  "
          f"{row['ctr']*100:>5.1f}%  pos {row['position']:>4.1f}")
```

## Common queries

Swap the `dimensions` field on the request body:

| Goal | `dimensions` | Notes |
|---|---|---|
| Top search queries | `["query"]` | matches the "Top Queries" tables in our weekly reports |
| Per-page performance | `["page"]` | URL-level CTR / position |
| Geographic split | `["country"]` | ISO 3-letter codes |
| Device split | `["device"]` | `MOBILE` / `DESKTOP` / `TABLET` |
| Query × page combo | `["query", "page"]` | which page ranks for which term |

Optional body fields:

- `searchType`: `"web"` (default), `"image"`, `"video"`, `"news"`
- `rowLimit`: max 25,000 per call
- `startRow`: pagination
- `dimensionFilterGroups`: filter by query/page/country (see [reference](https://developers.google.com/webmaster-tools/v1/searchanalytics/query))

## Other useful endpoints

| Endpoint | Purpose |
|---|---|
| `sc.sites().list()` | Sanity-check that the service account can see the property |
| `sc.urlInspection().index().inspect(...)` | Per-URL index status, last crawl, canonical, mobile usability |
| `sc.sitemaps().list(siteUrl=SITE)` | Sitemaps + last download time + warnings/errors |

## Limits & gotchas

- **Data freshness:** GSC lags ~2 days. Always set `endDate = today − 2`.
- **Daily quota:** 1,200 queries/day per property — easily enough for weekly audits.
- **Aggregation:** sums in the API match the "by property" view in the UI, not the "by page" view. Numbers may differ slightly from screenshots.
- **Anonymized queries:** GSC hides low-volume queries; impressions in the totals row may exceed the sum of visible rows.
- **403 on first run:** almost always missing user permission in GSC, not a credentials problem. Re-check Settings → Users and permissions.

## Verifying weekly SEO reports

When a report makes a claim about clicks/impressions/CTR/position, verify it directly with `searchanalytics().query()` for the same date range and dimension before acting on the recommendation. Past reports have hallucinated missing schema, missing meta descriptions, and missing OG tags that were actually present — GSC is the source of truth, not the report's prose.
