import { escapeHTML, type PortableTextHtmlComponents, toHTML } from "@portabletext/to-html";
import { urlFor } from "@/lib/image";

const components: Partial<PortableTextHtmlComponents> = {
	types: {
		image: ({ value }) => {
			const src = urlFor(value).width(1600).fit("max").auto("format").url();
			return `<img src="${escapeHTML(src)}" alt="${escapeHTML(String(value?.alt ?? ""))}" loading="lazy" decoding="async" />`;
		},
	},
	marks: {
		link: ({ children, value }) => {
			const href = String(value?.href ?? "");
			const external = href.startsWith("http");
			const attrs = external ? ' rel="noopener" target="_blank"' : "";
			return `<a href="${escapeHTML(href)}"${attrs}>${children}</a>`;
		},
	},
};

/** Portable Text → HTML at build time. Style with `.prose` in global.css. */
export const renderBlocks = (blocks: Parameters<typeof toHTML>[0]) =>
	toHTML(blocks, { components });
