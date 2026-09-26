import { defineQuery } from "groq";

export const SITE_SETTINGS_QUERY =
	defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
	name, legalName, tagline, description, email, socials[]{label, url, icon}
}`);

export const HOME_QUERY = defineQuery(
	`*[_type == "home" && _id == "home"][0]{heroImage, headline, subtext}`,
);

export const PAGES_QUERY =
	defineQuery(`*[_type == "page" && defined(slug.current)]|order(coalesce(order, 9999) asc, title asc){
	_id, title, "slug": slug.current, summary, coverImage
}`);

export const PAGE_SLUGS_QUERY = defineQuery(
	`*[_type == "page" && defined(slug.current)].slug.current`,
);

export const PAGE_BY_SLUG_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
	_id, title, "slug": slug.current, summary, coverImage, body, publishedAt
}`);

export const FAQ_QUERY =
	defineQuery(`*[_type == "faqItem" && defined(answer)]|order(coalesce(order, 9999) asc, question asc){
	_id, question, answer
}`);
