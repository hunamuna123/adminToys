// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      title: 'PlushMarket',
      meta: [
        { name: 'description', content: 'Лучший магазин по проодаже игровых пк.' },
        { name: 'keywords', content: 'Nuxt, Vue, SEO' },
        { name: 'author', content: 'PlushMarket' },
        { hid: 'og:title', property: 'og:title', content: 'PlushMarket' },
        { hid: 'og:description', property: 'og:description', content: 'Лучший магазин по проодаже игровых пк.' },
        { hid: 'og:image', property: 'og:image', content: 'https://PlushMarket.ru/_nuxt/pcmain.qfPQJxWf.jpg' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    },

    // Настройка прокрутки для поддержки якорей
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        const element = document.querySelector(to.hash);
        if (element) {
          return {
            top: element.offsetTop,
            behavior: 'smooth',
          };
        }
      }
      return savedPosition || { top: 0 };
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },

  tailwindcss: {
    cssPath: ["@/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "@/tailwind.config.js",
    exposeConfig: {
      level: 2,
    },
    config: {},
    injectPosition: "first",
    viewer: true,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ["@/assets/css/main.css"],
  plugins: ["@/plugins/preline.client.ts"],

  compatibilityDate: "2024-10-23",
});
