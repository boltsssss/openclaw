import "./agent-scope-CpuaD-NT.js";
import "./paths-BY8fKpqm.js";
import { $ as shouldLogVerbose, X as logVerbose } from "./subsystem-CtFhasYm.js";
import "./model-selection-Bv3mBCgt.js";
import "./github-copilot-token-D8k4aAom.js";
import "./env-DJfFMKsc.js";
import "./plugins-BMD5WAoM.js";
import "./accounts-tQqF-uRe.js";
import "./bindings-okDLDWJF.js";
import "./accounts-CPQZsuj5.js";
import "./image-ops-A6CwyuOb.js";
import "./pi-model-discovery-DaNAekda.js";
import "./message-channel-CKfH9qNY.js";
import "./pi-embedded-helpers-DC0uGchH.js";
import "./config-BZiY63-i.js";
import "./manifest-registry-WlndEfN0.js";
import "./dock-C7nFAAaA.js";
import "./chrome-DjysP1au.js";
import "./ssrf-B7akL5oa.js";
import "./skills-JylHWoG1.js";
import "./redact-B-yLPWQI.js";
import "./errors-BHB7ejqQ.js";
import "./fs-safe-BETzZuqK.js";
import "./store-ccwKyrcv.js";
import "./sessions-Cdgl70YA.js";
import "./accounts-Cg7StjKC.js";
import "./paths-D0iyPA23.js";
import "./tool-images-C-7MSLOm.js";
import "./thinking-D7pOfoaj.js";
import "./image-BF-Rzb1x.js";
import "./gemini-auth-DAeV-Rxk.js";
import "./fetch-guard-BtTwInIo.js";
import "./local-roots-DyB7YZ37.js";
import { a as resolveMediaAttachmentLocalRoots, n as createMediaAttachmentCache, o as runCapability, r as normalizeMediaAttachments, t as buildProviderRegistry, u as isAudioAttachment } from "./runner-C5RGwjuY.js";

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