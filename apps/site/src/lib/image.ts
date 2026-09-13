import type { SanityImageCrop, SanityImageHotspot } from "@jav/content";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "@/lib/env";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => builder.image(source);

/**
 * CSS `object-position` for the hotspot, in the coordinates of the delivered (crop-rect) image.
 * Use with `object-cover` when the box aspect is unknown, so the browser crops around the hotspot
 * instead of the centre.
 */
export const focalPoint = ({
	hotspot,
	crop,
}: {
	hotspot?: SanityImageHotspot;
	crop?: SanityImageCrop;
}): string | undefined => {
	if (!hotspot) return undefined;
	const { left = 0, right = 0, top = 0, bottom = 0 } = crop ?? {};
	const pct = (v: number) => `${(Math.min(Math.max(v, 0), 1) * 100).toFixed(2)}%`;
	return `${pct((hotspot.x - left) / (1 - left - right))} ${pct((hotspot.y - top) / (1 - top - bottom))}`;
};
