interface StudioEnv {
	readonly SANITY_STUDIO_PROJECT_ID?: string;
	readonly SANITY_STUDIO_DATASET?: string;
}

/**
 * Studio config is read from `apps/studio/.env` (see `.env.example`), which Sanity exposes only to
 * `SANITY_STUDIO_`-prefixed vars. Two runtimes load this file and each sees one source: the Studio
 * bundle gets `import.meta.env` (`process.env` is left verbatim there), and `sanity.cli.ts` runs in
 * Node, which has only `process.env`. Read both so one module serves both entry points.
 */
const fromImportMeta = (import.meta as unknown as { env?: StudioEnv }).env;
const fromProcess: StudioEnv | undefined = typeof process === "undefined" ? undefined : process.env;

const env: StudioEnv = { ...fromProcess, ...fromImportMeta };

/** The placeholder keeps `pnpm codegen` working before a project exists — schema extraction never
 * hits the API — but `sanity dev` rejects it. */
export const projectId = env.SANITY_STUDIO_PROJECT_ID ?? "missing-project-id";
export const dataset = env.SANITY_STUDIO_DATASET ?? "production";
