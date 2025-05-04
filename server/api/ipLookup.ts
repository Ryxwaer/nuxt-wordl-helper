import geoip from 'geoip-country'

// Extend the Lookup type to include additional properties
interface ExtendedLookup extends geoip.Lookup {
    name?: string;
    native?: string;
    continent?: string;
    continent_name?: string;
    capital?: string;
    currency?: string[];
    languages?: string[];
}

export default cachedEventHandler(async (event) => {
    // Get IP from query parameter
    const query = getQuery(event)
    const ip = query.ip as string || ''

    try {
        if (!ip || ip === 'Unknown' || ip.startsWith('127.') || ip.startsWith('192.168.')) {
            return { country: 'Unknown' }
        }

        const geo = geoip.lookup(ip) as ExtendedLookup
        if (geo && geo.country) {
            return {
                country: geo.name || geo.country,
                code: geo.country
            }
        }

        return { country: 'Unknown' }
    } catch (error) {
        console.error('Error determining country from IP:', error)
        return { country: 'Unknown' }
    }
}, {
    maxAge: 86400, // 24 hours in seconds
    getKey: (event) => {
        const query = getQuery(event)
        return `geo:${query.ip || 'unknown'}`
    }
}) 