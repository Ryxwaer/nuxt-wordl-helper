import type { H3Event } from 'h3'

const MOBILE_UA = /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|Opera Mini|IEMobile/i

const BOT_UA = /bot|crawl|spider|slurp|headless|python-requests|curl|wget|scrapy|lighthouse|monitor|preview|facebookexternalhit|semrush|ahrefs|dataprovider|zgrab|masscan/i

const NON_PAGE_PREFIX = /^\/(api|_nuxt|_ipx|__nuxt|__sitemap__)\//

export function isMobileUA(ua: string | undefined): boolean {
    return MOBILE_UA.test(ua || '')
}

export function isBotUA(ua: string | undefined): boolean {
    if (!ua) return true // no User-Agent is never a real browser
    return BOT_UA.test(ua)
}

/**
 * In production the real client IP arrives via X-Forwarded-For, so genuine
 * users are always public. Only local dev and container-to-container traffic
 * lands in these ranges.
 */
export function isInternalIP(ip: string | undefined): boolean {
    if (!ip || ip === 'Unknown') return true
    if (ip === '127.0.0.1' || ip === '::1') return true

    const v4 = ip.startsWith('::ffff:') ? ip.slice(7) : ip     // IPv4-mapped IPv6
    if (/^127\./.test(v4)) return true                         // loopback
    if (/^10\./.test(v4)) return true                          // 10.0.0.0/8
    if (/^192\.168\./.test(v4)) return true                    // 192.168.0.0/16
    if (/^172\.(1[6-9]|2\d|3[01])\./.test(v4)) return true     // 172.16.0.0/12
    if (/^169\.254\./.test(v4)) return true                    // 169.254.0.0/16
    if (/^f[cd][0-9a-f]{2}:/i.test(ip)) return true            // fc00::/7
    if (/^fe80:/i.test(ip)) return true                        // fe80::/10
    return false
}

export interface ClientMeta {
    ip: string
    userAgent: string | undefined
    isMobile: boolean
}

/** Must be called synchronously - the event context is gone after an await. */
export function getClientMeta(event: H3Event): ClientMeta {
    const userAgent = getRequestHeader(event, 'user-agent')
    return {
        ip: getRequestIP(event, { xForwardedFor: true }) || 'Unknown',
        userAgent,
        isMobile: isMobileUA(userAgent),
    }
}

export function isPageRequest(event: H3Event): boolean {
    if (event.method !== 'GET') return false

    const path = event.path.split('?')[0] || '/'
    if (NON_PAGE_PREFIX.test(path)) return false
    if (/\.[a-z0-9]{2,5}$/i.test(path)) return false // favicon.ico, robots.txt, ...

    return (getRequestHeader(event, 'accept') || '').includes('text/html')
}

export interface RefererInfo {
    referer: string | null
    refererHost: string | null
    source: string
}

export function classifyReferer(
    referer: string | undefined,
    ownHost: string | undefined,
): RefererInfo {
    if (!referer) return { referer: null, refererHost: null, source: 'direct' }

    let host: string
    try {
        host = new URL(referer).host
    } catch {
        return { referer, refererHost: null, source: 'unparseable' }
    }

    return {
        referer,
        refererHost: host,
        source: ownHost && host === ownHost ? 'internal' : host,
    }
}
