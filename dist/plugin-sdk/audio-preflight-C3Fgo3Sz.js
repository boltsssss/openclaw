import "./run-with-concurrency-2ga3-CMk.js";
import "./accounts-B7_whyNO.js";
import "./paths-eFexkPEh.js";
import "./github-copilot-token-Cxf8QYZb.js";
import "./config-BN86BjEB.js";
import { B as shouldLogVerbose, R as logVerbose } from "./logger-U3s76KST.js";
import "./thinking-CdMwA4fJ.js";
import "./image-ops-B1ctWigy.js";
import "./pi-embedded-helpers-ojmaq4rY.js";
import "./plugins-dn_4FdQ0.js";
import "./accounts-_w44D4WM.js";
import "./paths-yc45qYMp.js";
import "./redact-z6WVaymT.js";
import "./errors-DR1SiaHP.js";
import "./path-alias-guards-DFv45kR8.js";
import "./fs-safe-BbZgytb6.js";
import "./ssrf-Dgo_Q1QR.js";
import "./fetch-guard-Bsn-kFSI.js";
import "./local-roots-XzxYjs2v.js";
import "./tool-images-XCfUuEVS.js";
import { i as normalizeMediaAttachments, m as isAudioAttachment, o as resolveMediaAttachmentLocalRoots, t as runAudioTranscription } from "./audio-transcription-runner-CandZF4w.js";
import "./image-CZrUK908.js";
import "./chrome-CzFPjo3M.js";
import "./skills-BbZ_PgWH.js";
import "./store-DdrwIR4D.js";
import "./api-key-rotation-B5j_OpaZ.js";
import "./proxy-fetch-0VcTBuoM.js";
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
