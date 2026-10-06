// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react'; // import React integration

// https://astro.build/config
export default defineConfig({
  integrations: [react()], // enable React support
  vite: {
    server: {
      fs: {
        allow: [".."], // optional, helps Vite resolve files outside root
      },
    },
  },
});