import "./message-channel-C3g3_yJV.js";
import { B as shouldLogVerbose, R as logVerbose } from "./utils-B0IyLNx9.js";
import "./paths-Dmn791zP.js";
import "./tool-images-B7RJlrOt.js";
import "./run-with-concurrency-C-4lcmuz.js";
import "./plugins-DwJCltg0.js";
import "./accounts-Bg6zQzZG.js";
import "./model-auth-DkI2tKt2.js";
import "./github-copilot-token-B_Z-mAek.js";
import "./thinking-R9aROaSN.js";
import "./ssrf-C1XxpCKD.js";
import "./fetch-guard-CKZbp9Oj.js";
import "./pi-embedded-helpers-pdgkCdWa.js";
import "./accounts-DkFokbXC.js";
import "./paths-BDzhyD2C.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, p as isAudioAttachment, t as runAudioTranscription } from "./audio-transcription-runner-CAigja-Q.js";
import "./image-BgZwI1xJ.js";
import "./chrome-Bzjgl4i8.js";
import "./skills-8pjXKSOj.js";
import "./path-alias-guards-CU27GHwO.js";
import "./redact-CzWQJedj.js";
import "./errors-BB_karnD.js";
import "./fs-safe-oJEid_SS.js";
import "./store-CAcZjV6B.js";
import "./api-key-rotation-DwD5OsIk.js";
import "./local-roots-DHzo-dXN.js";
import "./proxy-fetch-BKb1uyZt.js";
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
