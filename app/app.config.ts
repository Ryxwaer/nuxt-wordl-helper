export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'slate',
    },
    button: {
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      }
    }
  },
  
  redPacket: {
    enableNavButton: false,
    code: "BP6OJOBZM7",
    claimLink: "https://s.binance.com/BEsVAbTg?utm_medium=web_share_copy",
    // floating component
    enableFloatingComponent: false,
    appearChance: 1/5,
  },

  buildDate: new Date().toISOString(),
})
