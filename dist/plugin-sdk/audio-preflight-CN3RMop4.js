import "./run-with-concurrency-CF8VuJbn.js";
import "./paths-DinMprTu.js";
import { B as shouldLogVerbose, R as logVerbose } from "./logger-BMLgyw16.js";
import "./accounts-CEGqdu3S.js";
import "./thinking-DVkFcdre.js";
import "./model-auth-ofK3pd9f.js";
import "./plugins-DTQgTz30.js";
import "./accounts-BrA4czR7.js";
import "./github-copilot-token-Cpk7my6q.js";
import "./ssrf-B--cnODK.js";
import "./fetch-guard-Cznzuuaq.js";
import "./message-channel-kWr_Hy0s.js";
import "./path-alias-guards-Chm5u0m0.js";
import "./fs-safe-Bz2jHLW3.js";
import "./store-CneBJJg0.js";
import "./local-roots-r8tcVMzS.js";
import "./pi-embedded-helpers-sbUq1-aT.js";
import "./paths-DLwa5lSY.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, p as isAudioAttachment, t as runAudioTranscription } from "./audio-transcription-runner-Bke1FvIy.js";
import "./image-B3jknm-a.js";
import "./chrome-D9jxxmoh.js";
import "./skills-hKDFwtDk.js";
import "./redact-CuadQs4H.js";
import "./errors-aHHLVEoW.js";
import "./tool-images-CAEEZk4T.js";
import "./api-key-rotation-CdiF8yWP.js";
import "./proxy-fetch-DmIpD5u2.js";
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
	try {
		const { transcript } = await runAudioTranscription({
			ctx,
			cfg,
			attachments,
			agentDir: params.agentDir,
			providers: params.providers,
			activeModel: params.activeModel,
			localPathRoots: resolveMediaAttachmentLocalRoots({
				cfg,
				ctx
			})
		});
		if (!transcript) return;
		firstAudio.alreadyTranscribed = true;
		if (shouldLogVerbose()) logVerbose(`audio-preflight: transcribed ${transcript.length} chars from attachment ${firstAudio.index}`);
		return transcript;
	} catch (err) {
		if (shouldLogVerbose()) logVerbose(`audio-preflight: transcription failed: ${String(err)}`);
		return;
	}
}
//#endregion
export { transcribeFirstAudio };
