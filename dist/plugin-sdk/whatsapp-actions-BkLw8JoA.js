import { i as resolveWhatsAppAccount } from "./accounts-DbgpjRFm.js";
import "./paths-DVWx7USN.js";
import "./github-copilot-token-Cg0YPPSu.js";
import "./plugins-BYXdsyXi.js";
import "./subsystem-DdjWqwPO.js";
import "./config-NpUWC3do.js";
import "./command-format-BICxZg3K.js";
import "./model-selection-BfyNi1_U.js";
import "./agent-scope-COgksURj.js";
import "./manifest-registry-CqIXNjIN.js";
import "./fs-safe-DWkf5_46.js";
import "./image-ops-CiqvKBRu.js";
import "./ssrf-BOBWpv2b.js";
import "./fetch-guard-DIQalZ6O.js";
import "./local-roots-DYXtSTUY.js";
import "./ir-BClM9Nsh.js";
import "./chunk-C3vSxgo1.js";
import "./message-channel-DyNtDRsF.js";
import "./bindings-DBVjSJK0.js";
import "./markdown-tables-DyYnlmA0.js";
import "./render-y8eSKyWT.js";
import "./tables-BYYeP8Uc.js";
import "./tool-images-B-AjdiIx.js";
import { a as createActionGate, c as jsonResult, d as readReactionParams, i as ToolAuthorizationError, m as readStringParam } from "./target-errors-B1YcYgug.js";
import { t as resolveWhatsAppOutboundTarget } from "./resolve-outbound-target-CDrmh7I_.js";
import { r as sendReactionWhatsApp } from "./outbound-BM_SW7js.js";

//#region src/agents/tools/whatsapp-target-auth.ts
function resolveAuthorizedWhatsAppOutboundTarget(params) {
	const account = resolveWhatsAppAccount({
		cfg: params.cfg,
		accountId: params.accountId
	});
	const resolution = resolveWhatsAppOutboundTarget({
		to: params.chatJid,
		allowFrom: account.allowFrom ?? [],
		mode: "implicit"
	});
	if (!resolution.ok) throw new ToolAuthorizationError(`WhatsApp ${params.actionLabel} blocked: chatJid "${params.chatJid}" is not in the configured allowFrom list for account "${account.accountId}".`);
	return {
		to: resolution.to,
		accountId: account.accountId
	};
}

//#endregion
//#region src/agents/tools/whatsapp-actions.ts
async function handleWhatsAppAction(params, cfg) {
	const action = readStringParam(params, "action", { required: true });
	const isActionEnabled = createActionGate(cfg.channels?.whatsapp?.actions);
	if (action === "react") {
		if (!isActionEnabled("reactions")) throw new Error("WhatsApp reactions are disabled.");
		const chatJid = readStringParam(params, "chatJid", { required: true });
		const messageId = readStringParam(params, "messageId", { required: true });
		const { emoji, remove, isEmpty } = readReactionParams(params, { removeErrorMessage: "Emoji is required to remove a WhatsApp reaction." });
		const participant = readStringParam(params, "participant");
		const accountId = readStringParam(params, "accountId");
		const fromMeRaw = params.fromMe;
		const fromMe = typeof fromMeRaw === "boolean" ? fromMeRaw : void 0;
		const resolved = resolveAuthorizedWhatsAppOutboundTarget({
			cfg,
			chatJid,
			accountId,
			actionLabel: "reaction"
		});
		const resolvedEmoji = remove ? "" : emoji;
		await sendReactionWhatsApp(resolved.to, messageId, resolvedEmoji, {
			verbose: false,
			fromMe,
			participant: participant ?? void 0,
			accountId: resolved.accountId
		});
		if (!remove && !isEmpty) return jsonResult({
			ok: true,
			added: emoji
		});
		return jsonResult({
			ok: true,
			removed: true
		});
	}
	throw new Error(`Unsupported WhatsApp action: ${action}`);
}

//#endregion
export { handleWhatsAppAction };