import "./run-with-concurrency-CF8VuJbn.js";
import "./paths-DinMprTu.js";
import { B as shouldLogVerbose, R as logVerbose } from "./logger-BMLgyw16.js";
import "./model-selection-jL6qh16r.js";
import "./github-copilot-token-BLpWpVXm.js";
import "./thinking-CIK4IYte.js";
import "./plugins-Bszg566-.js";
import "./accounts-D4RS4vtz.js";
import "./accounts-y8Y-mjxP.js";
import "./image-ops-D0UK2t_z.js";
import "./pi-embedded-helpers-OxaZ3v-w.js";
import "./chrome-BpYR7qaT.js";
import "./skills-C_RevWWl.js";
import "./path-alias-guards-MbRvgeun.js";
import "./proxy-env-BzTn7Kn-.js";
import "./redact-DNJkL7j-.js";
import "./errors-BSnJC4eK.js";
import "./fs-safe-qlAETUEc.js";
import "./store-BNSLnCh1.js";
import "./paths-DcVRZkOJ.js";
import "./tool-images-CLsBSEaw.js";
import "./image-CR2jMgKe.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, t as runAudioTranscription, v as isAudioAttachment } from "./audio-transcription-runner-DlqpG37G.js";
import "./fetch-CsxEZJ0G.js";
import "./fetch-guard-Ca0tLHn_.js";
import "./api-key-rotation-BQQRt1ho.js";
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
