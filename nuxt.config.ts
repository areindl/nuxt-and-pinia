import { defineNuxtConfig } from "nuxt3"

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  dir: {
    pages: "views",
  },

  // Build Modules
  buildModules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],

  // TAILWIND
  css: ["@/assets/css/tailwind.css"],
})
