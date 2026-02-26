import "./agent-scope-D1xpYq3C.js";
import "./paths-C9do7WCN.js";
import { $ as shouldLogVerbose, X as logVerbose } from "./subsystem-CrwwXlyy.js";
import "./workspace-BM04KBG8.js";
import "./model-selection-Bws5GHMD.js";
import "./github-copilot-token-BkwQAVvU.js";
import "./env-MQSDvtCV.js";
import "./boolean-mcn6kL0s.js";
import "./plugins-Bqy3g0L-.js";
import "./accounts-CkUEOvi2.js";
import "./bindings-Dyro_1_l.js";
import "./accounts-CV66zmB5.js";
import "./image-ops-CKXPj7Vf.js";
import "./pi-model-discovery-C-yOXpma.js";
import "./message-channel-MLAYmyD4.js";
import "./pi-embedded-helpers-RWn-rrPv.js";
import "./config-Bi0kYY78.js";
import "./manifest-registry-C7hmdFqM.js";
import "./dock-DgaJFnia.js";
import "./chrome-DYZuAy1o.js";
import "./ssrf-BnuIFCPj.js";
import "./frontmatter-CYyVkHva.js";
import "./skills-O9pUKXC8.js";
import "./redact-Z59zUpkM.js";
import "./errors-CHzQ0NP_.js";
import "./fs-safe-BFmsMcLL.js";
import "./store-bxzQO4uA.js";
import "./sessions-CL_qzDAQ.js";
import "./accounts-E0LZU-Ov.js";
import "./paths-PSh4fBQD.js";
import "./tool-images-BOtF6qA2.js";
import "./thinking-6RspTgk5.js";
import "./image-BI4zdGuN.js";
import "./gemini-auth-4WKMNu0S.js";
import "./fetch-guard-ClYdSzd0.js";
import "./local-roots-CLPTZAPZ.js";
import { a as resolveMediaAttachmentLocalRoots, n as createMediaAttachmentCache, o as runCapability, r as normalizeMediaAttachments, t as buildProviderRegistry, u as isAudioAttachment } from "./runner-DifEDaMd.js";

//#region src/media-understanding/audio-preflight.ts
/**
* Transcribes the first audio attachment BEFORE mention checking.
* This allows voice notes to be processed in group chats with requireMention: true.
* Returns the transcript or undefined if transcription fails or no audio is found.
*/
async function transcribeFirstAudio(params) {
	const { ctx, cfg } = params;
	const audioConfig = cfg.tools?.media?.audio;
	if (!audioConfig || audioConfig.enabled === false) return;
	const attachments = normalizeMediaAttachments(ctx);
	if (!attachments || attachments.length === 0) return;
	const firstAudio = attachments.find((att) => att && isAudioAttachment(att) && !att.alreadyTranscribed);
	if (!firstAudio) return;
	if (shouldLogVerbose()) logVerbose(`audio-preflight: transcribing attachment ${firstAudio.index} for mention check`);
	const providerRegistry = buildProviderRegistry(params.providers);
	const cache = createMediaAttachmentCache(attachments, { localPathRoots: resolveMediaAttachmentLocalRoots({
		cfg,
		ctx
	}) });
	try {
		const result = await runCapability({
			capability: "audio",
			cfg,
			ctx,
			attachments: cache,
			media: attachments,
			agentDir: params.agentDir,
			providerRegistry,
			config: audioConfig,
			activeModel: params.activeModel
		});
		if (!result || result.outputs.length === 0) return;
		const audioOutput = result.outputs.find((output) => output.kind === "audio.transcription");
		if (!audioOutput || !audioOutput.text) return;
		firstAudio.alreadyTranscribed = true;
		if (shouldLogVerbose()) logVerbose(`audio-preflight: transcribed ${audioOutput.text.length} chars from attachment ${firstAudio.index}`);
		return audioOutput.text;
	} catch (err) {
		if (shouldLogVerbose()) logVerbose(`audio-preflight: transcription failed: ${String(err)}`);
		return;
	} finally {
		await cache.cleanup();
	}
}

//#endregion
export { transcribeFirstAudio };