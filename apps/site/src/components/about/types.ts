import type { HOME_QUERY_RESULT } from "@jav/content";

type About = NonNullable<NonNullable<HOME_QUERY_RESULT>["about"]>;

export type AboutProps = { heading: string; body: string; image: About["image"] | null };
