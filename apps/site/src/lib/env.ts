/**
 * Sanity connection details, read once. Both the client and the image URL builder need them, and
 * `@sanity/client` fails with a bare "Configuration must contain `projectId`" when they are absent.
 */
const required = (value: string | undefined, name: string): string => {
	if (value) return value;
	throw new Error(
		`Missing ${name}. Copy .env.example to apps/site/.env and set your Sanity project ID — create a project at https://www.sanity.io/manage if you have not yet. See README.md → Setup.`,
	);
};

export const projectId = required(
	import.meta.env.PUBLIC_SANITY_PROJECT_ID,
	"PUBLIC_SANITY_PROJECT_ID",
);

export const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? "production";
