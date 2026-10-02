import { defineField, defineType } from "sanity";

/** Singleton, id `book`. Served at `/book` and featured on the homepage. */
export const book = defineType({
	name: "book",
	title: "Book",
	type: "document",
	fields: [
		defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
		defineField({ name: "subtitle", type: "string" }),
		defineField({
			name: "cover",
			type: "image",
			options: { hotspot: true },
			description: "Front cover, portrait 2:3 (e.g. 1600×2400)",
			fields: [defineField({ name: "alt", type: "string", title: "Alternative text" })],
		}),
		defineField({
			name: "blurb",
			type: "text",
			rows: 3,
			description:
				"One or two sentences for the homepage and meta description. Say that proceeds support JAV.",
			validation: (rule) => rule.required().max(200),
		}),
		defineField({ name: "body", title: "Description", type: "blockContent" }),
		defineField({
			name: "buyUrl",
			title: "Buy link",
			type: "url",
			description:
				'books2read.com universal link, which sends each reader to their local store. Until set, the buy button shows a "Coming soon" page.',
			validation: (rule) => rule.uri({ scheme: ["https"] }),
		}),
	],
	preview: { select: { title: "title", subtitle: "subtitle", media: "cover" } },
});
