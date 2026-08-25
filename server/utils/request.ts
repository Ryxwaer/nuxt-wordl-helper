import type { H3Event } from 'h3'

const MOBILE_UA = /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|Opera Mini|IEMobile/i

/**
 * Automated clients we never want in the visit/query stats. Deliberately
 * broad: the cost of dropping a real user is a missing row, the cost of
 * keeping a crawler is a polluted funnel (the zone sees ~1 100 HTML
 * requests/day against ~6 real visitors, so the noise floor dwarfs the signal).
 */
const BOT_UA = /bot|crawl|spider|slurp|headless|python-requests|curl|wget|scrapy|lighthouse|monitor|preview|facebookexternalhit|semrush|ahrefs|dataprovider|zgrab|masscan/i

/** Paths that are never a page view, even when requested with an HTML Accept. */
const NON_PAGE_PREFIX = /^\/(api|_nuxt|_ipx|__nuxt|__sitemap__)\//

export function isMobileUA(ua: string | undefined): boolean {
    return MOBILE_UA.test(ua || '')
}

export function isBotUA(ua: string | undefined): boolean {
    // A missing User-Agent is never a real browser.
    if (!ua) return true
    return BOT_UA.test(ua)
}

/**
 * Internal/non-public IPs we never want to log: loopback, "Unknown", and
 * private ranges (RFC 1918 / unique-local). In production the real client IP
 * comes via X-Forwarded-For, so legitimate users are public - only local dev
 * and container-to-container traffic (e.g. the demo runner hitting the solver
 * over the Docker network) lands in these ranges.
 */
export function isInternalIP(ip: string | undefined): boolean {
    if (!ip || ip === 'Unknown') return true
    if (ip === '127.0.0.1' || ip === '::1') return true
    // IPv4-mapped IPv6, e.g. ::ffff:172.18.0.3
    const v4 = ip.startsWith('::ffff:') ? ip.slice(7) : ip
    if (/^127\./.test(v4)) return true                       // loopback
    if (/^10\./.test(v4)) return true                        // 10.0.0.0/8
    if (/^192\.168\./.test(v4)) return true                  // 192.168.0.0/16
    if (/^172\.(1[6-9]|2\d|3[01])\./.test(v4)) return true   // 172.16.0.0/12
    if (/^169\.254\./.test(v4)) return true                  // link-local
    if (/^f[cd][0-9a-f]{2}:/i.test(ip)) return true          // IPv6 unique-local fc00::/7
    if (/^fe80:/i.test(ip)) return true                      // IPv6 link-local
    return false
}

export interface ClientMeta {
    ip: string
    userAgent: string | undefined
    isMobile: boolean
}

/** Request metadata, read while the event context is still valid. */
export function getClientMeta(event: H3Event): ClientMeta {
    const userAgent = getRequestHeader(event, 'user-agent')
    return {
        ip: getRequestIP(event, { xForwardedFor: true }) || 'Unknown',
        userAgent,
        isMobile: isMobileUA(userAgent),
    }
}

/** True only for top-level HTML navigations, not assets, APIs, or XHR. */
export function isPageRequest(event: H3Event): boolean {
    if (event.method !== 'GET') return false

    const path = event.path.split('?')[0] || '/'
    if (NON_PAGE_PREFIX.test(path)) return false
    // Anything with a file extension is an asset (favicon.ico, robots.txt, ...).
    if (/\.[a-z0-9]{2,5}$/i.test(path)) return false

    return (getRequestHeader(event, 'accept') || '').includes('text/html')
}

/**
 * Classifies where a visit came from. `referer` on our own API calls is
 * always our own page, so an external source is only observable on the
 * initial document request - which is why visit tracking lives in
 * middleware rather than in the solver endpoint.
 */
export function classifyReferer(
    referer: string | undefined,
    ownHost: string | undefined,
): { referer: string | null, refererHost: string | null, source: string } {
    if (!referer) return { referer: null, refererHost: null, source: 'direct' }

    let host: string | null = null
    try {
        host = new URL(referer).host
    } catch {
        return { referer, refererHost: null, source: 'unparseable' }
    }

    const source = ownHost && host === ownHost ? 'internal' : host
    return { referer, refererHost: host, source }
}
