export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const THEME_API = config.THEME_API

  try {
    const data = await $fetch<{ theme: string }>(THEME_API)
    return { theme: data.theme }
  } catch (error) {
    console.error('Failed to fetch WODL theme:', error)
    return { theme: null }
  }
})
