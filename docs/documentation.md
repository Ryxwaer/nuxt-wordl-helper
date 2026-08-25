# Documentation

Running log of schemas, server behaviour, and decisions that are not obvious
from the code. Analysis and metrics live in `docs/reports/`; this file is the
"why".

---

## Data collections (MongoDB, database `wordl`)

| Collection | Written by | Contents |
|---|---|---|
| `length_3` … `length_10` | scraper service (external) | Word dictionaries. `letters` array per word, plus `rank` (theme words get `rank: 1`). |
| `query_logs` | `server/api/words.ts` | One doc per solver run: `timestamp`, `query` (the clues), `cached`, `referer`, `refererHost`, `source`, `ip`, `country`, `userAgent`, `isMobile`. |

`query_logs` is the only analytics collection. **Page visits are not
recorded** - see the decision below.

`source` is `direct` (no referrer), `internal` (our own host), `unparseable`,
or the referring host verbatim.

Read it with `.venv-skills/bin/python skills/usage_report.py`.

### `query_logs` before and after 2026-08-25

All 4 544 rows predating the `cached` flag were back-filled to
`cached: false` on 2026-08-25 - correct rather than assumed, since the old
handler only ever logged misses. No row is missing the field.

What the back-fill cannot repair is that cache *hits* were never written at
all before that date, so history contains no `cached: true` rows and
undercounts real usage. Compare months spanning the change on the `uncached`
column, not `runs`, or the step change will read as growth. See the decision
below.

---

## Decisions

### Every solver request is logged, with a `cached` flag
*2026-08-25*

Previously the log write was skipped on a cache hit, which was described in
the code as avoiding "spam from repeated clicks". It was not doing that.

The `getWords` cache key is the clues alone, with no user component, so it is
shared across every visitor. A hit meant *somebody* had run that query in the
last 20 minutes, not that this visitor had. So a second person running the
same query inside the window was never recorded at all. The bias is worst
exactly where it matters most: the empty query - no clues entered, 23 % of all
recorded runs - has a single cache key, so at most one empty query per 20
minutes was ever logged, no matter how many people ran one.

Every request is now logged with `cached: true | false`, and the existing
4 544 rows were back-filled to `false`. This means the 16 months of history is
a floor on real usage, not a measurement, and the undercount is heaviest on
the most common queries. The cache itself is unchanged - hits still skip the
aggregation.

### Only solver runs are logged, never page visits
*2026-08-25*

Nothing is recorded for someone who loads a page and leaves. Logging starts
when a visitor actively runs a query. This is a deliberate line, not an
oversight: opening a page is not consent to being counted.

An earlier attempt at this used Nitro middleware writing a `visits` document
per page render, which was rejected for exactly that reason and removed. The
empty collection was dropped.

The referrer is still captured, because it answers where usage comes from,
but only on a run. That requires the client to send it: by the time the
`/api/words` POST happens, its own `Referer` header is our own page, so
`CalculateButton.vue` reads `document.referrer` and passes it in the body for
`classifyReferer` to resolve server-side.

Consequences accepted: no funnel (landed versus used) and no bounce rate,
and the referrer is client-supplied so it is advisory rather than
trustworthy. Dropping page tracking also removed the need for bot filtering
at write time - crawlers do not click Calculate - so `isBotUA` went with it.
`skills/usage_report.py` still filters bot user agents when reading.

### Two different Mongo connection strategies
*2026-08-25*

The query-log write goes through the pooled client in
`server/utils/mongo.ts`, since it now runs on every solver request rather
than only on cache misses. A failed connect clears the cached promise so the
next request retries rather than being stuck with a rejected one.

The word aggregation in `api/words.ts` still opens and closes its own client
per cache miss. It is wasteful and could move to the pool, but it is the hot
path of the app's only real feature and has run untouched for 16 months, so
it was left alone rather than bundled into an analytics change.

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

### FAQPage schema only where the Q&As are visible on-page
*pre-existing, documented 2026-08-25*

Google's structured-data policy requires FAQPage Q&As to be visible to the
user on the same page. `/wodl` and `/about` carry the schema because both
render the matching sections; `/` deliberately carries none, since its
"What is Binance WODL?" section was removed on 2025-05-24. Schema without
backing content risks rich-result loss or a manual penalty, so do not add it
back to `/` without adding the visible content too.

`/wodl` also declares `HowTo`, which Google frequently promotes into rich
results for "how to ..." queries - the one lever available against that
page's near-zero CTR.

### Footer "Last Updated" date has two sources
*pre-existing, documented 2026-08-25*

`/` and `/wodl` render the live current-week word pool, so they date from
render time. Static informational pages use the build date. Using the build
date everywhere would signal staleness on exactly the two pages whose
content is always current. The value goes through `useState` so SSR and
hydration agree.

### SERP titles: static on `/`, dynamic on `/wodl`
*pre-existing, see `docs/reports/2025-05-24.md`*

The homepage title is theme-agnostic on purpose. Slow-crawl engines (Brave,
Bing) served multi-week-stale snippets when the theme name was in the title.
`/wodl` accepts that trade-off because Google recrawls it roughly daily.
Body content on both pages stays dynamic for freshness.

The title carries both "WODL" and "WOTD": WODL is the community and search
term, WOTD is Binance's official name. Covering both also outflanks the
then-#1 competitor (miguelroquefernandes.com), whose title omits WOTD.

### The solver targets Binance WODL only, not generic Wordle
*pre-existing*

Results are biased toward the current week's theme pool, so a generic Wordle
player would get worse answers. Keywords and schema stay Binance-specific
for the same reason.
