import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton, id `siteSettings`. Org copy only — navigation stays in the site's routes. */
export const siteSettings = defineType({
	name: "siteSettings",
	title: "Site Settings",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Short name",
			type: "string",
			description: "Shown in the header and as the wordmark",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "legalName",
			type: "string",
			description: "Full registered name, used in the footer and copyright",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "tagline",
			type: "string",
			description: "One line, used as the homepage headline",
			validation: (rule) => rule.required().max(120),
		}),
		defineField({
			name: "description",
			type: "text",
			rows: 3,
			description: "Default meta description, used when a page sets none",
			validation: (rule) => rule.required().max(200),
		}),
		defineField({
			name: "heroImage",
			title: "Hero image",
			type: "image",
			options: { hotspot: true },
			description: "Full-bleed background behind the homepage headline",
			fields: [defineField({ name: "alt", type: "string", title: "Alternative text" })],
		}),
		defineField({
			name: "email",
			title: "Contact email",
			type: "string",
			validation: (rule) => rule.required().email(),
		}),
		defineField({
			name: "socials",
			type: "array",
			of: [defineArrayMember({ type: "social" })],
		}),
	],
	preview: { select: { title: "legalName", subtitle: "tagline" } },
});
