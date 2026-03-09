import "./run-with-concurrency--DqJaNfK.js";
import "./plugins-BwvikR5p.js";
import "./model-auth-DMzDFWSO.js";
import { B as shouldLogVerbose, R as logVerbose } from "./logger-empOIykk.js";
import "./paths-CyBu6eBm.js";
import "./github-copilot-token-CYOZhiYW.js";
import "./thinking-C42Kbei8.js";
import "./accounts-CATPSDTO.js";
import "./ssrf-CJV99J3t.js";
import "./fetch-guard-C4dUNrJ3.js";
import "./image-ops-DgWlKl_4.js";
import "./pi-embedded-helpers-DdGjVg-1.js";
import "./accounts-RpjezY8F.js";
import "./paths-gYGRyOVw.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, p as isAudioAttachment, t as runAudioTranscription } from "./audio-transcription-runner-EBtJP_CF.js";
import "./image-BeyOfc_F.js";
import "./chrome-DX0-ldE0.js";
import "./skills-IcUkS3f6.js";
import "./path-alias-guards-DKRQ72vp.js";
import "./redact-OCQ33cqU.js";
import "./errors-CFhiDgsa.js";
import "./fs-safe-DCAxKD2E.js";
import "./store-j58OQdxE.js";
import "./tool-images-Dx0nEenR.js";
import "./api-key-rotation-DzckW2kW.js";
import "./local-roots-CzO3wcnG.js";
import "./proxy-fetch-Bkb0aJO3.js";
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
