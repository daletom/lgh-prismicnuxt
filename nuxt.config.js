export default {
  target: "static",

  /*
   ** Headers of the page
   */
  head: {
    title: "Prismic + Nuxt Let's Go Headless",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Prismic + Nuxt Let's Go Headless example"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["@/assets/css/resetr.css", "@/assets/css/common.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-imgix.js'],

  /*
   ** Nuxt.js modules
   */
   buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    // https://prismic-nuxt.js.org/
    "@nuxtjs/prismic"
  ],

  prismic: {
    endpoint: "https://prismic2gatsby.cdn.prismic.io/api/v2"
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
    }
  },

  generate: {
    fallback: "404.html" // Netlify reads a 404.html, Nuxt will load as an SPA
  }
};
