/**
 * Nitro plugin — strip framework-fingerprint response headers.
 *
 * Background: the weekly SEO audits keep flagging `x-powered-by: Nuxt`
 * as a minor information leak. We previously tried two cheaper fixes:
 *
 *   1. A request-time middleware that called `removeHeader(...)` — ran
 *      *before* Nitro/h3 set the header, so it was a no-op.
 *   2. `nitro.routeRules: { '/**': { headers: { 'x-powered-by': '' } } }`
 *      — set the header to an empty string but did NOT delete it; the
 *      live response still contained `x-powered-by: Nuxt` because
 *      Nitro's own response handler re-set it after routeRules ran.
 *
 * The reliable fix is to hook `beforeResponse` (which runs after every
 * other handler has set its headers) and explicitly delete the header
 * from the event. This catches it regardless of which layer set it.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event) => {
    deleteResponseHeader(event, 'x-powered-by')
    deleteResponseHeader(event, 'X-Powered-By')
  })
})
