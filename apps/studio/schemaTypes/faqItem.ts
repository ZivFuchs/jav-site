import { defineField, defineType } from "sanity";

export const faqItem = defineType({
	name: "faqItem",
	title: "FAQ",
	type: "document",
	fields: [
		defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
		defineField({ name: "answer", type: "blockContent", validation: (rule) => rule.required() }),
		defineField({
			name: "order",
			type: "number",
			description: "Lower numbers appear first. Unset items sort last, alphabetically.",
			validation: (rule) => rule.min(0),
		}),
	],
	orderings: [
		{
			title: "Display order",
			name: "displayOrder",
			by: [
				{ field: "order", direction: "asc" },
				{ field: "question", direction: "asc" },
			],
		},
	],
	preview: {
		select: { title: "question", order: "order" },
		prepare: ({ title, order }) => ({
			title,
			subtitle: typeof order === "number" ? `#${order}` : "unordered",
		}),
	},
});
