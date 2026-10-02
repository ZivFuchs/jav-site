import { defineArrayMember, defineField, defineType } from "sanity";

/** Listed at `/projects`, each served at `/projects/[slug]`. */
export const project = defineType({
	name: "project",
	title: "Project",
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
			name: "description",
			type: "text",
			rows: 6,
			description: "The first sentence or two show on the projects page and in search results.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "gallery",
			type: "array",
			description: "The first image is the project's cover.",
			of: [
				defineArrayMember({
					type: "image",
					options: { hotspot: true },
					fields: [
						defineField({ name: "alt", type: "string", title: "Alternative text" }),
						defineField({ name: "caption", type: "string" }),
					],
				}),
			],
			options: { layout: "grid" },
		}),
		defineField({
			name: "order",
			type: "number",
			description: "Lower numbers appear first. Unset projects sort last, alphabetically.",
			validation: (rule) => rule.min(0),
		}),
	],
	preview: { select: { title: "title", subtitle: "slug.current", media: "gallery.0" } },
});
