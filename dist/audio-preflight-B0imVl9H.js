import { w as shouldLogVerbose, x as logVerbose } from "./subsystem-kzdGVyce.js";
import "./paths-BfR2LXbA.js";
import "./boolean-BHdNsbzF.js";
import "./auth-profiles-NErpMNir.js";
import "./agent-scope-BDXYqF89.js";
import "./utils-B4wShrgI.js";
import "./boundary-file-read-CcBHg_z-.js";
import "./logger-BWbD2ty6.js";
import "./exec-CDUUaRm4.js";
import "./github-copilot-token-CcBrBN3h.js";
import "./host-env-security-blJbxyQo.js";
import "./version-Bxx5bg6l.js";
import "./registry-Gs6xb3DK.js";
import "./manifest-registry-BVdb5-Ch.js";
import "./dock-6TSCZqEs.js";
import "./models-config-B9AkMhND.js";
import "./plugins-v0UiRqAc.js";
import "./accounts-CFByy36g.js";
import "./channel-config-helpers-Cc37-fbu.js";
import "./accounts-Dd357WkV.js";
import "./image-ops-BZX4S9OA.js";
import "./message-channel-FOsBizRL.js";
import "./pi-embedded-helpers-BGn28HAW.js";
import "./sandbox-CXOln2Tp.js";
import "./tool-catalog-DAnzECvM.js";
import "./chrome-xm9CHJig.js";
import "./tailscale-DwUR_aBY.js";
import "./tailnet-B0Tbje2W.js";
import "./ws-Crq-SBzZ.js";
import "./auth-BiSssJvb.js";
import "./credentials-CG1_itLT.js";
import "./resolve-configured-secret-input-string-DxJfVAjE.js";
import "./server-context-DiqjK5CC.js";
import "./frontmatter-B5Xx_5Cp.js";
import "./env-overrides-CghEbWu_.js";
import "./path-alias-guards-2B2VwR9Z.js";
import "./skills-Bjq6BP04.js";
import "./paths-Bv0Fd5hm.js";
import "./proxy-env-ClgEcKHf.js";
import "./redact-b9XS0Muh.js";
import "./errors-oTqWODa8.js";
import "./fs-safe-DnLkCsXk.js";
import "./store-Cpd6HHUc.js";
import "./ports-DwmubRiU.js";
import "./trash-CKkKoeyk.js";
import "./server-middleware-DXSni30D.js";
import "./sessions-DO4ls-LC.js";
import "./paths-D3cXuvcv.js";
import "./chat-envelope-Ba8wEdTK.js";
import "./tool-images-CpDLyo5v.js";
import "./thinking-CHrWXrB4.js";
import "./model-catalog-BBj8P1yA.js";
import "./fetch-BotRHV64.js";
import { i as normalizeMediaAttachments, o as resolveMediaAttachmentLocalRoots, t as runAudioTranscription, y as isAudioAttachment } from "./audio-transcription-runner-CjHzhZEE.js";
import "./fetch-guard-BArX2uTC.js";
import "./image-BmU4F15L.js";
import "./tool-display-BJIcX_xB.js";
import "./api-key-rotation-CPuuxNhd.js";
import "./proxy-fetch-BJuVlAGN.js";
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
