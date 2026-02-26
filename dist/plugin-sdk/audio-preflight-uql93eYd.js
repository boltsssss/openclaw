import "./accounts-DbgpjRFm.js";
import "./paths-DVWx7USN.js";
import "./github-copilot-token-Cg0YPPSu.js";
import "./plugins-BYXdsyXi.js";
import { $ as logVerbose, nt as shouldLogVerbose } from "./subsystem-DdjWqwPO.js";
import "./config-NpUWC3do.js";
import "./command-format-BICxZg3K.js";
import "./model-selection-BfyNi1_U.js";
import "./agent-scope-COgksURj.js";
import "./manifest-registry-CqIXNjIN.js";
import "./dock-2MUyl8WY.js";
import "./redact-DumGx_zQ.js";
import "./errors-15XFOczm.js";
import "./fs-safe-DWkf5_46.js";
import "./image-ops-CiqvKBRu.js";
import "./ssrf-BOBWpv2b.js";
import "./fetch-guard-DIQalZ6O.js";
import "./local-roots-DYXtSTUY.js";
import "./message-channel-DyNtDRsF.js";
import "./bindings-DBVjSJK0.js";
import "./tool-images-B-AjdiIx.js";
import { a as resolveMediaAttachmentLocalRoots, n as createMediaAttachmentCache, o as runCapability, r as normalizeMediaAttachments, t as buildProviderRegistry, u as isAudioAttachment } from "./runner-Byag6nhr.js";
import "./skills-BKquzTmm.js";
import "./chrome-BLsJbDXX.js";
import "./accounts-_Evbrbve.js";
import "./accounts-Dwi3PqTK.js";
import "./sessions-Bj9-ZDNW.js";
import "./paths-DcQhfTk4.js";
import "./store-BAipUu9z.js";
import "./pi-embedded-helpers-JtGfWpQs.js";
import "./thinking-C9dOVGlX.js";
import "./image-CCK5B9Ic.js";
import "./pi-model-discovery-CFapGP7O.js";
import "./api-key-rotation-Dwkozf2t.js";

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