import { i as saveMediaBuffer } from "./store-QK5Ze8pF.js";
import { a as loadWebMedia } from "./ir-S-Bo_Ln5.js";
import { t as buildOutboundMediaLoadOptions } from "./load-options-Bdwr4pWG.js";
//#region src/media/outbound-attachment.ts
async function resolveOutboundAttachmentFromUrl(mediaUrl, maxBytes, options) {
	const media = await loadWebMedia(mediaUrl, buildOutboundMediaLoadOptions({
		maxBytes,
		mediaLocalRoots: options?.localRoots
	}));
	const saved = await saveMediaBuffer(media.buffer, media.contentType ?? void 0, "outbound", maxBytes);
	return {
		path: saved.path,
		contentType: saved.contentType
	};
}
//#endregion
export { resolveOutboundAttachmentFromUrl as t };
