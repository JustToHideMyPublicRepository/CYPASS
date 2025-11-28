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
    }
  },

  app: {
    head: {
      title: 'CYPASS - Cybersecurity Platform',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'AFR Bourse de Fret' },
        { name: 'keywords', content: 'transport, trasporteur, chargeur, Bénin, marchandise, camion, Véhicule, bourse, deplacé, deplacement, connexion, ensemble,facile, facilité' },
        { name: 'google-site-verification', content: 'OdKxHpVkBSxk0mj4vD4OTmZPdVi5pWzyCu4QPIMHy9A' },


        
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

  typescript: {
    strict: true,
    typeCheck: true
  },
})
