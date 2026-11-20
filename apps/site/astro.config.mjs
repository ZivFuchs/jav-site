// @ts-check
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { buildCache } from "@zivfuchs/astro/buildCache";
import { linkedKit } from "@zivfuchs/astro/linkedKit";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://example.com",
	server: { port: 4323 },
	adapter: cloudflare(),
	integrations: [sitemap(), linkedKit(), buildCache()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: { "@": new URL("./src", import.meta.url).pathname },
		},
	},
});
