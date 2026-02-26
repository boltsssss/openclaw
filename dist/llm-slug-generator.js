import { a as resolveAgentEffectiveModelPrimary, c as resolveDefaultAgentId, i as resolveAgentDir, s as resolveAgentWorkspaceDir } from "./agent-scope-D1xpYq3C.js";
import "./paths-C9do7WCN.js";
import { t as createSubsystemLogger } from "./subsystem-CrwwXlyy.js";
import "./workspace-BM04KBG8.js";
import { it as DEFAULT_PROVIDER, l as parseModelRef, rt as DEFAULT_MODEL } from "./model-selection-Bws5GHMD.js";
import "./github-copilot-token-BkwQAVvU.js";
import "./env-MQSDvtCV.js";
import "./boolean-mcn6kL0s.js";
import "./tokens-PO9rYcUN.js";
import { t as runEmbeddedPiAgent } from "./pi-embedded-BNfc4Bqw.js";
import "./plugins-Bqy3g0L-.js";
import "./accounts-CkUEOvi2.js";
import "./bindings-Dyro_1_l.js";
import "./send-BSSNP1k7.js";
import "./send-D6vKi9f9.js";
import "./deliver-BnbEsfpm.js";
import "./diagnostic-Dyc4Feqz.js";
import "./diagnostic-session-state-C0Sxjfox.js";
import "./accounts-CV66zmB5.js";
import "./send-BIC5wbGC.js";
import "./image-ops-CKXPj7Vf.js";
import "./pi-model-discovery-C-yOXpma.js";
import "./message-channel-MLAYmyD4.js";
import "./pi-embedded-helpers-RWn-rrPv.js";
import "./config-Bi0kYY78.js";
import "./manifest-registry-C7hmdFqM.js";
import "./dock-DgaJFnia.js";
import "./chrome-DYZuAy1o.js";
import "./ssrf-BnuIFCPj.js";
import "./frontmatter-CYyVkHva.js";
import "./skills-O9pUKXC8.js";
import "./redact-Z59zUpkM.js";
import "./errors-CHzQ0NP_.js";
import "./fs-safe-BFmsMcLL.js";
import "./store-bxzQO4uA.js";
import "./sessions-CL_qzDAQ.js";
import "./accounts-E0LZU-Ov.js";
import "./paths-PSh4fBQD.js";
import "./tool-images-BOtF6qA2.js";
import "./thinking-6RspTgk5.js";
import "./image-BI4zdGuN.js";
import "./reply-prefix-BoJ5YbzC.js";
import "./manager-CeYKl3PH.js";
import "./gemini-auth-4WKMNu0S.js";
import "./fetch-guard-ClYdSzd0.js";
import "./query-expansion-DoOaNYnc.js";
import "./retry-D5UVbL92.js";
import "./target-errors-B1xsCHXm.js";
import "./chunk-Bmwb5Pwx.js";
import "./markdown-tables-BbVMLoa6.js";
import "./local-roots-CLPTZAPZ.js";
import "./ir-DuCU8R5A.js";
import "./render-D7ZNn_WS.js";
import "./commands-registry-0-Ot0o5d.js";
import "./skill-commands-De8XbTl-.js";
import "./runner-DifEDaMd.js";
import "./fetch-DTTG_w9o.js";
import "./channel-activity-U2b8NSFL.js";
import "./tables-CecxxPsH.js";
import "./send-C9NmPxPR.js";
import "./outbound-attachment-CeaFevJB.js";
import "./send-BvUNwY17.js";
import "./resolve-route-5gKBjoOc.js";
import "./proxy-BMa4czGu.js";
import "./replies-D3N6CGZR.js";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

//#region src/hooks/llm-slug-generator.ts
/**
* LLM-based slug generator for session memory filenames
*/
const log = createSubsystemLogger("llm-slug-generator");
/**
* Generate a short 1-2 word filename slug from session content using LLM
*/
async function generateSlugViaLLM(params) {
	let tempSessionFile = null;
	try {
		const agentId = resolveDefaultAgentId(params.cfg);
		const workspaceDir = resolveAgentWorkspaceDir(params.cfg, agentId);
		const agentDir = resolveAgentDir(params.cfg, agentId);
		const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "openclaw-slug-"));
		tempSessionFile = path.join(tempDir, "session.jsonl");
		const prompt = `Based on this conversation, generate a short 1-2 word filename slug (lowercase, hyphen-separated, no file extension).

Conversation summary:
${params.sessionContent.slice(0, 2e3)}

Reply with ONLY the slug, nothing else. Examples: "vendor-pitch", "api-design", "bug-fix"`;
		const modelRef = resolveAgentEffectiveModelPrimary(params.cfg, agentId);
		const parsed = modelRef ? parseModelRef(modelRef, DEFAULT_PROVIDER) : null;
		const provider = parsed?.provider ?? DEFAULT_PROVIDER;
		const model = parsed?.model ?? DEFAULT_MODEL;
		const result = await runEmbeddedPiAgent({
			sessionId: `slug-generator-${Date.now()}`,
			sessionKey: "temp:slug-generator",
			agentId,
			sessionFile: tempSessionFile,
			workspaceDir,
			agentDir,
			config: params.cfg,
			prompt,
			provider,
			model,
			timeoutMs: 15e3,
			runId: `slug-gen-${Date.now()}`
		});
		if (result.payloads && result.payloads.length > 0) {
			const text = result.payloads[0]?.text;
			if (text) return text.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || null;
		}
		return null;
	} catch (err) {
		const message = err instanceof Error ? err.stack ?? err.message : String(err);
		log.error(`Failed to generate slug: ${message}`);
		return null;
	} finally {
		if (tempSessionFile) try {
			await fs.rm(path.dirname(tempSessionFile), {
				recursive: true,
				force: true
			});
		} catch {}
	}
}

//#endregion
export { generateSlugViaLLM };