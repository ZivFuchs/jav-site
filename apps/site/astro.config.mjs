// @ts-check
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://example.com",
	server: { port: 4323 },
	adapter: cloudflare(),
	integrations: [
		sitemap(),
		// The Cloudflare adapter clears the SSR dep cache on build/sync, which breaks a running dev server.
		{
			name: "separate-vite-cache",
			hooks: {
				"astro:config:setup": ({ command, updateConfig }) => {
					if (command !== "dev") updateConfig({ vite: { cacheDir: "node_modules/.vite-build" } });
				},
			},
		},
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: { "@": new URL("./src", import.meta.url).pathname },
		},
	},
});
