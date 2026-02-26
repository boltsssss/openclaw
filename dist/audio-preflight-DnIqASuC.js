import "./paths-B4BZAPZh.js";
import { F as shouldLogVerbose, M as logVerbose } from "./utils-DNXtLoeA.js";
import "./thinking-EAliFiVK.js";
import "./agent-scope-s4_jffYt.js";
import "./subsystem-BI_9bRVk.js";
import "./exec-DrVRn_Jz.js";
import "./model-selection-BplWstrh.js";
import "./github-copilot-token-nncItI8D.js";
import "./boolean-BgXe2hyu.js";
import "./env-C-qlQMcy.js";
import "./host-env-security-ljCLeQmh.js";
import "./message-channel-CNKATuOe.js";
import "./config-B-zigsOM.js";
import "./env-vars-CvvqezS9.js";
import "./manifest-registry-DmfPU4rc.js";
import "./dock-pv6HNE8P.js";
import { a as resolveMediaAttachmentLocalRoots, n as createMediaAttachmentCache, o as runCapability, r as normalizeMediaAttachments, s as isAudioAttachment, t as buildProviderRegistry } from "./runner-DlkDtGMF.js";
import "./image-BnuhI2Cj.js";
import "./models-config-Cyvd_XlY.js";
import "./pi-model-discovery-Bakt-Qrp.js";
import "./pi-embedded-helpers-CYkXMKVk.js";
import "./sandbox-Cj9__aI8.js";
import "./tool-catalog-CrsxKKLj.js";
import "./chrome-BRkMDdSw.js";
import "./tailscale-BSqgz1Js.js";
import "./ip-D0zgNmBV.js";
import "./tailnet-CEudzG0i.js";
import "./ws-BTdBA7Dw.js";
import "./auth-BD8Ix8PK.js";
import "./server-context-Cur9z9vt.js";
import "./frontmatter-DR47FZL2.js";
import "./skills-CCMjt8qH.js";
import "./redact-CsoNhWtr.js";
import "./errors-Fe4Am7dY.js";
import "./fs-safe-DwCRJYoe.js";
import "./paths-BXdAEtPH.js";
import "./ssrf-D0C-ivqd.js";
import "./image-ops-CE-faKvL.js";
import "./store-BK1dfn-n.js";
import "./ports-3dBfxsrO.js";
import "./trash-D8z5X58K.js";
import "./server-middleware-BrDs7VpV.js";
import "./sessions-DqsLePIP.js";
import "./plugins-BinSBKMc.js";
import "./accounts-dnbnpwVy.js";
import "./accounts-v9OZODSg.js";
import "./accounts-CRMme1-m.js";
import "./bindings-ClBJqDjo.js";
import "./logging-6RmrnEvA.js";
import "./paths-DlJnj-kN.js";
import "./chat-envelope-BndZPORx.js";
import "./tool-images-D5OSqXNT.js";
import "./tool-display-C9bjmvg5.js";
import "./fetch-guard-dxO4wHd_.js";
import "./api-key-rotation-9GuRsDju.js";
import "./local-roots-C60e0qcm.js";
import "./model-catalog-DZqJvaPa.js";

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