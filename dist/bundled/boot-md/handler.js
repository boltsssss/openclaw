import { n as listAgentIds, s as resolveAgentWorkspaceDir } from "../../agent-scope-D1xpYq3C.js";
import "../../paths-C9do7WCN.js";
import { pt as isGatewayStartupEvent, r as defaultRuntime, t as createSubsystemLogger } from "../../subsystem-CrwwXlyy.js";
import { l as resolveAgentIdFromSessionKey } from "../../session-key-YGVrIVO5.js";
import "../../workspace-BM04KBG8.js";
import "../../model-selection-Bws5GHMD.js";
import "../../github-copilot-token-BkwQAVvU.js";
import "../../env-MQSDvtCV.js";
import "../../boolean-mcn6kL0s.js";
import { n as SILENT_REPLY_TOKEN } from "../../tokens-PO9rYcUN.js";
import { a as createDefaultDeps, i as agentCommand } from "../../pi-embedded-BNfc4Bqw.js";
import "../../plugins-Bqy3g0L-.js";
import "../../accounts-CkUEOvi2.js";
import "../../bindings-Dyro_1_l.js";
import "../../send-BSSNP1k7.js";
import "../../send-D6vKi9f9.js";
import "../../deliver-BnbEsfpm.js";
import "../../diagnostic-Dyc4Feqz.js";
import "../../diagnostic-session-state-C0Sxjfox.js";
import "../../accounts-CV66zmB5.js";
import "../../send-BIC5wbGC.js";
import "../../image-ops-CKXPj7Vf.js";
import "../../pi-model-discovery-C-yOXpma.js";
import "../../message-channel-MLAYmyD4.js";
import "../../pi-embedded-helpers-RWn-rrPv.js";
import "../../config-Bi0kYY78.js";
import "../../manifest-registry-C7hmdFqM.js";
import "../../dock-DgaJFnia.js";
import "../../chrome-DYZuAy1o.js";
import "../../ssrf-BnuIFCPj.js";
import "../../frontmatter-CYyVkHva.js";
import "../../skills-O9pUKXC8.js";
import "../../redact-Z59zUpkM.js";
import "../../errors-CHzQ0NP_.js";
import "../../fs-safe-BFmsMcLL.js";
import "../../store-bxzQO4uA.js";
import { B as resolveAgentMainSessionKey, H as resolveMainSessionKey, d as updateSessionStore, s as loadSessionStore } from "../../sessions-CL_qzDAQ.js";
import "../../accounts-E0LZU-Ov.js";
import { l as resolveStorePath } from "../../paths-PSh4fBQD.js";
import "../../tool-images-BOtF6qA2.js";
import "../../thinking-6RspTgk5.js";
import "../../image-BI4zdGuN.js";
import "../../reply-prefix-BoJ5YbzC.js";
import "../../manager-CeYKl3PH.js";
import "../../gemini-auth-4WKMNu0S.js";
import "../../fetch-guard-ClYdSzd0.js";
import "../../query-expansion-DoOaNYnc.js";
import "../../retry-D5UVbL92.js";
import "../../target-errors-B1xsCHXm.js";
import "../../chunk-Bmwb5Pwx.js";
import "../../markdown-tables-BbVMLoa6.js";
import "../../local-roots-CLPTZAPZ.js";
import "../../ir-DuCU8R5A.js";
import "../../render-D7ZNn_WS.js";
import "../../commands-registry-0-Ot0o5d.js";
import "../../skill-commands-De8XbTl-.js";
import "../../runner-DifEDaMd.js";
import "../../fetch-DTTG_w9o.js";
import "../../channel-activity-U2b8NSFL.js";
import "../../tables-CecxxPsH.js";
import "../../send-C9NmPxPR.js";
import "../../outbound-attachment-CeaFevJB.js";
import "../../send-BvUNwY17.js";
import "../../resolve-route-5gKBjoOc.js";
import "../../proxy-BMa4czGu.js";
import "../../replies-D3N6CGZR.js";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

//#region src/gateway/boot.ts
function generateBootSessionId() {
	return `boot-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").replace("T", "_").replace("Z", "")}-${crypto.randomUUID().slice(0, 8)}`;
}
const log$1 = createSubsystemLogger("gateway/boot");
const BOOT_FILENAME = "BOOT.md";
function buildBootPrompt(content) {
	return [
		"You are running a boot check. Follow BOOT.md instructions exactly.",
		"",
		"BOOT.md:",
		content,
		"",
		"If BOOT.md asks you to send a message, use the message tool (action=send with channel + target).",
		"Use the `target` field (not `to`) for message tool destinations.",
		`After sending with the message tool, reply with ONLY: ${SILENT_REPLY_TOKEN}.`,
		`If nothing needs attention, reply with ONLY: ${SILENT_REPLY_TOKEN}.`
	].join("\n");
}
async function loadBootFile(workspaceDir) {
	const bootPath = path.join(workspaceDir, BOOT_FILENAME);
	try {
		const trimmed = (await fs.readFile(bootPath, "utf-8")).trim();
		if (!trimmed) return { status: "empty" };
		return {
			status: "ok",
			content: trimmed
		};
	} catch (err) {
		if (err.code === "ENOENT") return { status: "missing" };
		throw err;
	}
}
function snapshotMainSessionMapping(params) {
	const agentId = resolveAgentIdFromSessionKey(params.sessionKey);
	const storePath = resolveStorePath(params.cfg.session?.store, { agentId });
	try {
		const entry = loadSessionStore(storePath, { skipCache: true })[params.sessionKey];
		if (!entry) return {
			storePath,
			sessionKey: params.sessionKey,
			canRestore: true,
			hadEntry: false
		};
		return {
			storePath,
			sessionKey: params.sessionKey,
			canRestore: true,
			hadEntry: true,
			entry: structuredClone(entry)
		};
	} catch (err) {
		log$1.debug("boot: could not snapshot main session mapping", {
			sessionKey: params.sessionKey,
			error: String(err)
		});
		return {
			storePath,
			sessionKey: params.sessionKey,
			canRestore: false,
			hadEntry: false
		};
	}
}
async function restoreMainSessionMapping(snapshot) {
	if (!snapshot.canRestore) return;
	try {
		await updateSessionStore(snapshot.storePath, (store) => {
			if (snapshot.hadEntry && snapshot.entry) {
				store[snapshot.sessionKey] = snapshot.entry;
				return;
			}
			delete store[snapshot.sessionKey];
		}, { activeSessionKey: snapshot.sessionKey });
		return;
	} catch (err) {
		return err instanceof Error ? err.message : String(err);
	}
}
async function runBootOnce(params) {
	const bootRuntime = {
		log: () => {},
		error: (message) => log$1.error(String(message)),
		exit: defaultRuntime.exit
	};
	let result;
	try {
		result = await loadBootFile(params.workspaceDir);
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		log$1.error(`boot: failed to read ${BOOT_FILENAME}: ${message}`);
		return {
			status: "failed",
			reason: message
		};
	}
	if (result.status === "missing" || result.status === "empty") return {
		status: "skipped",
		reason: result.status
	};
	const sessionKey = params.agentId ? resolveAgentMainSessionKey({
		cfg: params.cfg,
		agentId: params.agentId
	}) : resolveMainSessionKey(params.cfg);
	const message = buildBootPrompt(result.content ?? "");
	const sessionId = generateBootSessionId();
	const mappingSnapshot = snapshotMainSessionMapping({
		cfg: params.cfg,
		sessionKey
	});
	let agentFailure;
	try {
		await agentCommand({
			message,
			sessionKey,
			sessionId,
			deliver: false
		}, bootRuntime, params.deps);
	} catch (err) {
		agentFailure = err instanceof Error ? err.message : String(err);
		log$1.error(`boot: agent run failed: ${agentFailure}`);
	}
	const mappingRestoreFailure = await restoreMainSessionMapping(mappingSnapshot);
	if (mappingRestoreFailure) log$1.error(`boot: failed to restore main session mapping: ${mappingRestoreFailure}`);
	if (!agentFailure && !mappingRestoreFailure) return { status: "ran" };
	return {
		status: "failed",
		reason: [agentFailure ? `agent run failed: ${agentFailure}` : void 0, mappingRestoreFailure ? `mapping restore failed: ${mappingRestoreFailure}` : void 0].filter((part) => Boolean(part)).join("; ")
	};
}

//#endregion
//#region src/hooks/bundled/boot-md/handler.ts
const log = createSubsystemLogger("hooks/boot-md");
const runBootChecklist = async (event) => {
	if (!isGatewayStartupEvent(event)) return;
	if (!event.context.cfg) return;
	const cfg = event.context.cfg;
	const deps = event.context.deps ?? createDefaultDeps();
	const agentIds = listAgentIds(cfg);
	for (const agentId of agentIds) {
		const workspaceDir = resolveAgentWorkspaceDir(cfg, agentId);
		const result = await runBootOnce({
			cfg,
			deps,
			workspaceDir,
			agentId
		});
		if (result.status === "failed") {
			log.warn("boot-md failed for agent startup run", {
				agentId,
				workspaceDir,
				reason: result.reason
			});
			continue;
		}
		if (result.status === "skipped") log.debug("boot-md skipped for agent startup run", {
			agentId,
			workspaceDir,
			reason: result.reason
		});
	}
};

//#endregion
export { runBootChecklist as default };