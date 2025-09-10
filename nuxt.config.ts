// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.CYPASS_API_URL,
      betaMode: process.env.NUXT_BETA_MODE === 'true',
      siteIdentifier: process.env.NUXT_PUBLIC_SITE_IDENTIFIER || 'cypass',
    }
  },
  
  app: {
    head: {
      title: 'CYPASS - Cybersecurity Platform',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Plateforme béninoise souveraine de cybersécurité' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  googleFonts: {
    families: {
      Inter: [400, 500, 600],
      Poppins: [500, 600, 700]
    },
    display: 'swap'
  },
    
    css: ['~/assets/css/main.css'],
})
