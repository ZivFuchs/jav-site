import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./env";

export default defineCliConfig({
	api: { projectId, dataset },
	server: { port: 3334 },
	typegen: {
		path: "../../packages/content/src/**/*.ts",
		generates: "../../packages/content/src/generated/sanity.types.ts",
		overloadClientMethods: true,
	},
	deployment: {
		autoUpdates: true,
	},
});
