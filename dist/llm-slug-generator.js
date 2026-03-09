import { a as resolveAgentDir, l as resolveAgentWorkspaceDir, o as resolveAgentEffectiveModelPrimary, u as resolveDefaultAgentId } from "./run-with-concurrency-CLqOp5Ex.js";
import "./paths-DkxwiA8g.js";
import { t as createSubsystemLogger } from "./subsystem-C9Gk4AAH.js";
import "./workspace-Cn3fdLBW.js";
import "./logger-CJbXRTpA.js";
import { Ar as DEFAULT_PROVIDER, l as parseModelRef } from "./model-selection-DZls6wv4.js";
import "./github-copilot-token-8N63GdbE.js";
import "./legacy-names-dyOVyQ4G.js";
import "./thinking-DoJc9ojx.js";
import "./tokens-C27XM9Ox.js";
import { t as runEmbeddedPiAgent } from "./pi-embedded-87UexpND.js";
import "./plugins-CHUmfMi-.js";
import "./accounts-r68bhI-A.js";
import "./send-uf1Ih8B-.js";
import "./send-CrPUElmq.js";
import "./deliver-DWusz89B.js";
import "./diagnostic-C_Xbz7kJ.js";
import "./accounts-Dig4V7QI.js";
import "./image-ops-CCCidQn-.js";
import "./send-HqEubggi.js";
import "./pi-model-discovery-ClFrrA_T.js";
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
import "./audio-transcription-runner-D8Z6gQ7N.js";
import "./fetch-BJ0G6ETq.js";
import "./fetch-guard-5l7SPukj.js";
import "./api-key-rotation-CD65WKkJ.js";
import "./proxy-fetch-53_Tkfsi.js";
import "./ir-D2Pyh129.js";
import "./render-7C7EDC8_.js";
import "./target-errors-BBJioD_C.js";
import "./commands-registry-DV82JZxS.js";
import "./skill-commands-B9tDijO_.js";
import "./fetch-CONQGbzL.js";
import "./channel-activity-Y74rb8NM.js";
import "./tables-mm1wfvao.js";
import "./send-XgFhBcIG.js";
import "./outbound-attachment-Dxr_nBQU.js";
import "./send-QSkqKbG3.js";
import "./proxy-o7sro0Y0.js";
import "./manager-CZd7U4Ft.js";
import "./query-expansion-UVjZgC6t.js";
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
		const provider = parsed?.provider ?? "anthropic";
		const model = parsed?.model ?? "claude-opus-4-6";
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
