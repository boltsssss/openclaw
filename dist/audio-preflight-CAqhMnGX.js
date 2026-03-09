import "./run-with-concurrency-CLqOp5Ex.js";
import "./paths-DkxwiA8g.js";
import { d as logVerbose, m as shouldLogVerbose } from "./subsystem-C9Gk4AAH.js";
import "./workspace-Cn3fdLBW.js";
import "./logger-CJbXRTpA.js";
import "./model-selection-DZls6wv4.js";
import "./github-copilot-token-8N63GdbE.js";
import "./legacy-names-dyOVyQ4G.js";
import "./thinking-DoJc9ojx.js";
import "./plugins-CHUmfMi-.js";
import "./accounts-r68bhI-A.js";
import "./accounts-Dig4V7QI.js";
import "./image-ops-CCCidQn-.js";
import "./pi-embedded-helpers-BkP7tSrN.js";
import "./chrome-BIl2FH7N.js";
import "./frontmatter-DR8lvaM9.js";
import "./skills-DkjaaPcu.js";
import "./path-alias-guards-Btg2RyAC.js";
import "./proxy-env-lR64SLmk.js";
import "./redact-BHkqR4gQ.js";
import "./errors-CH6uzT9l.js";
import "./fs-safe-C6qEGKLE.js";
import "./store-qyeXF7RN.js";
import "./paths-u6SI4r8Z.js";
import "./tool-images-CbA981C3.js";
import "./image-DTY8DuB_.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, t as runAudioTranscription, v as isAudioAttachment } from "./audio-transcription-runner-D8Z6gQ7N.js";
import "./fetch-BJ0G6ETq.js";
import "./fetch-guard-5l7SPukj.js";
import "./api-key-rotation-CD65WKkJ.js";
import "./proxy-fetch-53_Tkfsi.js";
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
