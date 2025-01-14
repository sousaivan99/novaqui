// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@formkit/auto-animate"],
  css: [join(currentDir, "./assets/css/tailwind.css")],
  imports: {
  dirs: [join(currentDir, "./assets/icons"), join(currentDir, "./assets/sounds")],
  },
});