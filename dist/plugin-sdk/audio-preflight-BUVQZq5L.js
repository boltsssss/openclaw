import "./run-with-concurrency-BYcjD-0M.js";
import "./plugins-jSjFnM3N.js";
import "./accounts-Bp3jxx6R.js";
import "./model-auth-BvYANZOW.js";
import { B as shouldLogVerbose, R as logVerbose } from "./logger-empOIykk.js";
import "./paths-CyBu6eBm.js";
import "./github-copilot-token-CYOZhiYW.js";
import "./thinking-wZOGAH5W.js";
import "./image-ops-CwzGLhFo.js";
import "./pi-embedded-helpers-DN2H6v5t.js";
import "./accounts-DT0_dp1E.js";
import "./paths-BskNS7Bi.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, p as isAudioAttachment, t as runAudioTranscription } from "./audio-transcription-runner-Bz55zsea.js";
import "./image-BNZjsByj.js";
import "./chrome-aFeha8uq.js";
import "./skills-C7iUe3Vu.js";
import "./path-alias-guards-BYvvtDc5.js";
import "./proxy-env-mNaqKy65.js";
import "./redact-DPyz7K9V.js";
import "./errors-Da_66i-s.js";
import "./fs-safe-DyFQQ6Zh.js";
import "./store-QK5Ze8pF.js";
import "./tool-images-IbmBLkis.js";
import "./fetch-guard-tDRtQTgT.js";
import "./api-key-rotation-gAPjlVAK.js";
import "./local-roots-DhwA57LJ.js";
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
