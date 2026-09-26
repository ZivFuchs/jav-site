interface ExperimentDef {
	label: string;
	/** `global` experiments are listed on every page, `page` ones only where they render. */
	scope: "global" | "page";
	/** Variant id → label. The first is the default, and the only one built for production. */
	variants: Record<Lowercase<string>, string>;
}

export const experiments = {
	"home-about": {
		label: "Home: About section",
		scope: "page",
		variants: { statement: "Centered statement", split: "Text beside image", band: "Tinted band" },
	},
} as const satisfies Record<Lowercase<string>, ExperimentDef>;

export type ExperimentId = keyof typeof experiments;
export type Variant<K extends ExperimentId> = keyof (typeof experiments)[K]["variants"] & string;

export const variantsOf = <K extends ExperimentId>(id: K) =>
	Object.keys(experiments[id].variants) as [Variant<K>, ...Variant<K>[]];

export const scopeOf = (id: ExperimentId): ExperimentDef["scope"] => experiments[id].scope;

/** On in dev. Set `PUBLIC_EXPERIMENTS=true` at build time for staging. */
export const experimentsEnabled =
	import.meta.env.DEV || import.meta.env.PUBLIC_EXPERIMENTS === "true";

export const STORAGE_KEY = "experiments";
