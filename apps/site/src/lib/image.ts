import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "@/lib/env";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => builder.image(source);

export const imageUrl = (source: SanityImageSource, width: number) =>
	urlFor(source).width(width).fit("max").auto("format").url();

export const srcset = (source: SanityImageSource, widths: readonly number[]) =>
	widths.map((w) => `${imageUrl(source, w)} ${w}w`).join(", ");

export { focalPoint } from "@zivfuchs/sanity";
