import { makeClient } from "@jav/content";
import { dataset, projectId } from "@/lib/env";

export const sanity = makeClient({
	projectId,
	dataset,
	token: import.meta.env.SANITY_API_READ_TOKEN,
});
