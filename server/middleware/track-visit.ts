/**
 * Records one `visits` document per page render.
 *
 * Why middleware and not `api/words.ts`: the solver endpoint sees a `Referer`
 * of our own page, so the external source is invisible there. It is only on
 * the initial HTML request that the browser sends the originating URL.
 *
 * This closes the gap identified in report/2026-08-25.md - the app serves
 * ~6.4 visitors/day while Google organic accounts for ~0.17 clicks/day, so
 * ~97% of traffic arrives from a channel that was never instrumented.
 *
 * Pairing `visits` with `query_logs` also makes the funnel measurable for the
 * first time: how many people land versus how many actually run the solver.
 */
export default defineEventHandler((event) => {
    if (!isPageRequest(event)) return

    const { ip, userAgent, isMobile } = getClientMeta(event)
    if (isInternalIP(ip) || isBotUA(userAgent)) return

    const { referer, refererHost, source } = classifyReferer(
        getRequestHeader(event, 'referer'),
        getRequestHost(event),
    )

    const path = event.path.split('?')[0] || '/'
    // Search engines and social apps append campaign/click params; keeping the
    // raw query string lets us spot them without storing full URLs.
    const queryString = event.path.slice(path.length).replace(/^\?/, '') || null

    const write = (async () => {
        const country = await resolveCountry(ip)
        const db = await getDb()
        await db.collection('visits').insertOne({
            timestamp: new Date(),
            path,
            queryString,
            referer,
            refererHost,
            source,
            ip,
            country,
            userAgent,
            isMobile,
        })
    })().catch(error => console.error('Visit tracking failed:', error))

    // Keep the background write alive past the response so it is never dropped.
    event.waitUntil?.(write)
})
