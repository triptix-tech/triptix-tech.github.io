import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://triptix.tech',
  integrations: [mdx(), sitemap(), tailwind()],
  server: {
    host: true,
    port: 8080
  },
  output: "hybrid"
});