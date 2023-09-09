// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: {enabled: true},
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      baseURL:
        "https://cf6f-2401-4900-1f34-5f89-ea66-3cab-9b00-1b1b.ngrok-free.app/",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt", "@vueuse/motion/nuxt"],
  tailwindcss: {
    config: {
      content: [
        "components/**/*.{vue,js,ts}",
        "layouts/**/*.vue",
        "pages/**/*.vue",
        "composables/**/*.{js,ts}",
        "plugins/**/*.{js,ts}",
        "App.{js,ts,vue}",
        "app.{js,ts,vue}",
        "Error.{js,ts,vue}",
        "error.{js,ts,vue}",
        "content/**/*.md",
      ],
      theme: {
        fontFamily: {
          sans: "Roboto Mono, monospace",
        },

        extend: {
          fontSize: {
            huge: ["80rem", {lineHeight: "1"}],
          },
          height: {
            screen: "100dvh",
          },
        },
      },
    },
  },
  pwa: {
    manifest: {
      name: "PIZZA-HUM",
      short_name: "PIZZA-HUM PWA",
      description: "PWA APPLICATION",
      icons: [
        {
          src: "logo.jpg",
          type: "image/png",
          sizes: "192x192",
        },
        {
          src: "logo.jpg",
          type: "image/png",
          sizes: "512x512",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      cleanupOutdatedCaches: true,
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
