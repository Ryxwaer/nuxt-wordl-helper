# Documentation

Running log of schemas, server behaviour, and decisions that are not obvious
from the code. Analysis and metrics live in `report/`; this file is the "why".

---

## Data collections (MongoDB, database `wordl`)

| Collection | Written by | Contents |
|---|---|---|
| `length_3` … `length_10` | scraper service (external) | Word dictionaries. `letters` array per word, plus `rank` (theme words get `rank: 1`). |
| `query_logs` | `server/api/words.ts` | One doc per solver run: `timestamp`, `query` (the clues), `ip`, `country`, `userAgent`, `isMobile`. |
| `visits` | `server/middleware/track-visit.ts` | One doc per page render: `timestamp`, `path`, `queryString`, `referer`, `refererHost`, `source`, `ip`, `country`, `userAgent`, `isMobile`. |

`source` on `visits` is `direct` (no referrer), `internal` (our own host),
`unparseable`, or the referring host verbatim.

Read both with `.venv-skills/bin/python skills/usage_report.py`.

---

## Decisions

### Visit tracking lives in middleware, not in the solver endpoint
*2026-08-25*

The obvious place to record a referrer is alongside the existing
`query_logs` write in `api/words.ts`. That does not work: the `Referer`
header on the `/api/words` POST is the page the user is already on, so it
would always read `wordl.ryxwaer.com`. A browser only sends the originating
URL on the initial HTML document request, so the capture has to happen in
middleware.

Trade-off accepted: `visits` counts page renders, so a bot filter is doing
real work (the zone serves ~1 100 HTML requests/day against ~6 real
visitors). `isBotUA` is deliberately broad - a missed real user costs one
row, a kept crawler corrupts the whole funnel.

### Two different Mongo connection strategies
*2026-08-25*

`api/words.ts` opens and closes a client per write. That is fine there: it
only writes on a cache miss, a few hundred times a day. The visit middleware
runs on every page render, so it uses the pooled client in
`server/utils/mongo.ts` instead. A failed connect clears the cached promise
so the next request retries rather than being stuck with a rejected one.

### Log writes use `event.waitUntil`
*pre-existing, documented 2026-08-25*

A bare detached promise can be dropped by the runtime before it settles.
This previously caused solver logging to silently stop when the write was
moved inside the cached resolver.

### Sitemap `lastmod` is knowingly pinned to deploy time
*2026-08-25*

`sitemap.urls` in `nuxt.config.ts` is a **build-time** source in
`@nuxtjs/sitemap` v8, so `new Date()` there evaluates once per build. The
config comment claiming `cacheMaxAgeSeconds` makes it per-request is wrong -
that option caches the rendered XML.

Left as-is on purpose. Search Console reports the sitemap as Success with
all 3 pages discovered, and both `/` and `/wodl` are recrawled every 1-5
days, so nothing is blocked. Two earlier reports chased "2 warnings, 0 of 3
indexed" figures that come from `sitemaps.list` API fields Google no longer
populates.

If it ever needs to be dynamic, use a runtime `sources: ['/api/__sitemap__/urls']`
endpoint - but derive `lastmod` from the actual theme-rotation timestamp, not
`Date.now()`. A `lastmod` that always says "a second ago" is one Google
learns to discount.

### Piwik Pro and AdSense removed
*2026-08-25*

Neither was ever used - Piwik was never adopted, and the site is not
authorised for AdSense and will not be. Together they loaded ~650 KB of
decoded third-party JS per page view. Cloudflare Web Analytics is the only
remaining third party.

The privacy policy had claimed "we do not log or store these requests" and
"we do not store your game inputs" while `query_logs` recorded every
request. Those claims were removed rather than replaced with a disclosure:
the policy is now silent on server-side logging by owner decision.

### SERP titles: static on `/`, dynamic on `/wodl`
*pre-existing, see `report/2025-05-24.md`*

The homepage title is theme-agnostic on purpose. Slow-crawl engines (Brave,
Bing) served multi-week-stale snippets when the theme name was in the title.
`/wodl` accepts that trade-off because Google recrawls it roughly daily.
Body content on both pages stays dynamic for freshness.

### The solver targets Binance WODL only, not generic Wordle
*pre-existing*

Results are biased toward the current week's theme pool, so a generic Wordle
player would get worse answers. Keywords and schema stay Binance-specific
for the same reason.
