/**
 * Records where visitors come from. Must run here rather than in
 * api/words.ts, where the Referer is always our own page.
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

    event.waitUntil?.(write) // a detached promise can be dropped mid-flight
})
