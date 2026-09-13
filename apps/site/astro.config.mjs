// @ts-check
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://example.com",
	server: { port: 4323 },
	adapter: cloudflare(),
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: { "@": new URL("./src", import.meta.url).pathname },
		},
	},
});
