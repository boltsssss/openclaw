import "./run-with-concurrency-Cbd-bzCk.js";
import "./config-CkXQYijU.js";
import { B as shouldLogVerbose, R as logVerbose } from "./logger-Blr-bUxJ.js";
import "./paths-D6tDENa_.js";
import "./accounts-9tmpafm-.js";
import "./plugins-BIEkvWNb.js";
import "./thinking-CcRxN2xk.js";
import "./image-ops-C8XCXp_u.js";
import "./pi-embedded-helpers-YWpFJhmV.js";
import "./accounts-BHVH7XC5.js";
import "./github-copilot-token-xlpfBCoP.js";
import "./paths-BwCm3Dbc.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, p as isAudioAttachment, t as runAudioTranscription } from "./audio-transcription-runner-DasOI7zs.js";
import "./image-Dk8UycEG.js";
import "./chrome-nCJ73eWT.js";
import "./skills-hAwEKa7-.js";
import "./path-alias-guards-Camqzi75.js";
import "./proxy-env-D2XTc03V.js";
import "./redact-CxDVSKHc.js";
import "./errors-CVy9vBk-.js";
import "./fs-safe-CS-UhmTj.js";
import "./store-DlGXK7ZX.js";
import "./tool-images-_gXFGFmo.js";
import "./fetch-guard-NsqkTcAp.js";
import "./api-key-rotation-BSux75Ln.js";
import "./local-roots-By91ZM28.js";
import "./proxy-fetch-CeRC7OhU.js";
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
