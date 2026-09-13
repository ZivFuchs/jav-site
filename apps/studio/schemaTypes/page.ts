import { defineField, defineType } from "sanity";

/** Content-managed page, routed by the site at `/[slug]`. */
export const page = defineType({
	name: "page",
	title: "Page",
	type: "document",
	fields: [
		defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
		defineField({
			name: "slug",
			type: "slug",
			options: { source: "title", maxLength: 96 },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "summary",
			type: "text",
			rows: 3,
			description: "Lead paragraph and meta description",
			validation: (rule) => rule.max(200),
		}),
		defineField({
			name: "coverImage",
			type: "image",
			options: { hotspot: true },
			fields: [defineField({ name: "alt", type: "string", title: "Alternative text" })],
		}),
		defineField({ name: "body", type: "blockContent" }),
		defineField({ name: "publishedAt", type: "datetime" }),
		defineField({
			name: "order",
			type: "number",
			description: "Lower numbers appear first. Unset pages sort last, alphabetically.",
			validation: (rule) => rule.min(0),
		}),
	],
	preview: { select: { title: "title", subtitle: "slug.current" } },
});
