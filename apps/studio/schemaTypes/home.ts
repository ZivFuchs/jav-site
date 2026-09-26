import { defineField, defineType } from "sanity";

/** Singleton, id `home`. Homepage copy; the hero's buttons link to routes in the site's code. */
export const home = defineType({
	name: "home",
	title: "Home",
	type: "document",
	fields: [
		defineField({
			name: "heroImage",
			title: "Hero image",
			type: "image",
			options: { hotspot: true },
			description: "Full-bleed background behind the headline. Set the hotspot on the subject.",
			fields: [defineField({ name: "alt", type: "string", title: "Alternative text" })],
		}),
		defineField({
			name: "headline",
			type: "string",
			validation: (rule) => rule.required().max(80),
		}),
		defineField({
			name: "subtext",
			type: "text",
			rows: 3,
			description: "One or two sentences under the headline",
			validation: (rule) => rule.max(200),
		}),
		defineField({
			name: "about",
			title: "About section",
			type: "object",
			description: "Short introduction under the hero, linking to the About page",
			fields: [
				defineField({ name: "heading", type: "string", validation: (rule) => rule.max(80) }),
				defineField({ name: "body", type: "text", rows: 4, validation: (rule) => rule.max(500) }),
				defineField({
					name: "image",
					type: "image",
					options: { hotspot: true },
					fields: [defineField({ name: "alt", type: "string", title: "Alternative text" })],
				}),
			],
		}),
	],
	preview: { select: { title: "headline", media: "heroImage" } },
});
