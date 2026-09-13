import { defineArrayMember, defineField, defineType } from "sanity";

/** Shared rich text. Deliberately narrow: no h1/h2 — body copy and answers only. */
export const blockContent = defineType({
	name: "blockContent",
	title: "Rich text",
	type: "array",
	of: [
		defineArrayMember({
			type: "block",
			styles: [
				{ title: "Normal", value: "normal" },
				{ title: "Heading", value: "h3" },
				{ title: "Quote", value: "blockquote" },
			],
			lists: [
				{ title: "Bullet", value: "bullet" },
				{ title: "Numbered", value: "number" },
			],
			marks: {
				decorators: [
					{ title: "Bold", value: "strong" },
					{ title: "Italic", value: "em" },
				],
				annotations: [
					defineArrayMember({
						name: "link",
						title: "Link",
						type: "object",
						fields: [
							defineField({
								name: "href",
								title: "URL",
								type: "url",
								validation: (rule) =>
									rule.required().uri({ scheme: ["http", "https", "mailto"], allowRelative: true }),
							}),
						],
					}),
				],
			},
		}),
		defineArrayMember({
			type: "image",
			options: { hotspot: true },
			fields: [defineField({ name: "alt", type: "string", title: "Alternative text" })],
		}),
	],
});
