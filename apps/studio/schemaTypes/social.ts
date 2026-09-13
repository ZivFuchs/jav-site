import { defineField, defineType } from "sanity";

export const social = defineType({
	name: "social",
	title: "Social link",
	type: "object",
	fields: [
		defineField({
			name: "label",
			type: "string",
			description: "Platform name, used as the link's accessible name",
			validation: (rule) => rule.required(),
		}),
		defineField({ name: "url", type: "url", validation: (rule) => rule.required() }),
		defineField({
			name: "icon",
			title: "Icon (SVG)",
			type: "text",
			rows: 4,
			description:
				"Paste the SVG markup. Square viewBox, no fill or width/height attributes — the footer sizes and colours it.",
			validation: (rule) =>
				rule
					.required()
					.regex(/^\s*<svg[\s\S]*<\/svg>\s*$/, { name: "SVG markup" })
					.custom((value) =>
						value && /<script/i.test(value) ? "Remove <script> from the markup" : true,
					),
		}),
	],
	preview: { select: { title: "label", subtitle: "url" } },
});
