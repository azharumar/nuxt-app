// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    '@nuxt/image',
    "@sidebase/nuxt-auth",
    `@twicpics/components/nuxt3`,
    "@nuxtjs/algolia",
    "@nuxtjs/google-fonts",
    "nuxt-schema-org",
    "@nuxt/content",
    "nuxt-delay-hydration",
    "nuxt-gtag",
    "dayjs-nuxt"
  ],
  dayjs: {
    locales: ['en-in'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'en-in',
    defaultTimezone: 'Asia/Kolkata',
  },
  runtimeConfig: {
    apiSecret: process.env.ERPNEXT_API_SECRET,
    apiBase: process.env.ERPNEXT_BASE_URL,
    authSecret: process.env.AUTH_SECRET,
    origin: process.env.AUTH_ORIGIN,
  },
  twicpics: {
    domain: `https://zarnik.twic.pics`,
    step: 25,
    anticipation: 0.5,
  },
  algolia: {
    apiKey: process.env.ALGOLIA_API_KEY,
    appId: process.env.ALGOLIA_APPLICATION_ID,
  },
  auth: {
    provider: {
      type: 'authjs',
      defaultProvider: "credentials",
    }
  }

})
