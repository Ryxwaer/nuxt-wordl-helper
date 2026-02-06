import geoip from 'geoip-country'

interface ExtendedLookup extends geoip.Lookup {
    name?: string
    native?: string
    continent?: string
    continent_name?: string
    capital?: string
    currency?: string[]
    languages?: string[]
}

/**
 * Cached country resolver using Nitro's built-in caching layer.
 * Results are stored for 24 hours and keyed by IP, so the same IP
 * is only looked up once per cache window (one user session = one lookup).
 */
export const resolveCountry = cachedFunction(
    async (ip: string): Promise<string> => {
        if (!ip || ip === 'Unknown' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip === '::1') {
            return 'Unknown'
        }

        try {
            const geo = geoip.lookup(ip) as ExtendedLookup
            if (geo && geo.country) {
                return geo.name || geo.country
            }
        } catch (error) {
            console.error('geoip lookup error for IP:', ip, error)
        }

        return 'Unknown'
    },
    {
        maxAge: 60 * 60 * 24, // 24 hours
        getKey: (ip: string) => `geo:${ip}`,
        name: 'geoip-resolve',
    }
)
