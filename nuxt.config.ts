// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  typescript: {
    typeCheck: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
  modules: ["@vite-pwa/nuxt"],
  // modules: ["@nuxtjs/pwa"],
  pwa: {
    manifest: {
      name: "PIZZA-HUM",
      short_name: "PIZZA-HUM",
      description: "PWA ENABLED",
      display: "standalone",
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["*/*.*", "*.*"],
    },
    devOptions: {
      enabled: true,
    },
  },
});
