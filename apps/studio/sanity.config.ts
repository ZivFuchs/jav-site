import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./env";
import { schemaTypes } from "./schemaTypes";

/** Types reached through a fixed document id, never created ad hoc. */
const singletons = new Set(["siteSettings"]);

export default defineConfig({
	name: "default",
	title: "Jav Site",

	projectId,
	dataset,

	plugins: [
		structureTool({
			structure: (S) =>
				S.list()
					.title("Content")
					.items([
						S.listItem()
							.title("Site Settings")
							.id("siteSettings")
							.child(S.document().schemaType("siteSettings").documentId("siteSettings")),
						S.divider(),
						...S.documentTypeListItems().filter((item) => !singletons.has(item.getId() ?? "")),
					]),
		}),
		visionTool(),
	],

	schema: {
		types: schemaTypes,
	},

	document: {
		newDocumentOptions: (prev) => prev.filter((item) => !singletons.has(item.templateId)),
		actions: (prev, { schemaType }) =>
			singletons.has(schemaType)
				? prev.filter(
						(action) => !["delete", "duplicate", "unpublish"].includes(action.action ?? ""),
					)
				: prev,
	},
});
