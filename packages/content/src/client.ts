import { createClient, type SanityClient } from "@sanity/client";
import { clientConfig, type SanityConfig } from "@zivfuchs/sanity";

/** Pinned once; the Studio's own uploads and queries use it too. */
export const SANITY_API_VERSION = "2026-09-01";

/** Build-time client: no CDN (a publish webhook builds seconds after publishing), published content only. */
export const makeClient = (config: Omit<SanityConfig, "apiVersion">): SanityClient =>
	createClient(clientConfig({ apiVersion: SANITY_API_VERSION, ...config }));
