import "./paths-BJV7vkaX.js";
import { t as createSubsystemLogger } from "./subsystem-4K-e3L3i.js";
import "./utils-BhZbo8Nw.js";
import "./thinking-BYwvlJ3S.js";
import { S as loadOpenClawPlugins } from "./reply-BNraYLOV.js";
import { d as resolveAgentWorkspaceDir, f as resolveDefaultAgentId } from "./agent-scope-CZF6h_5g.js";
import "./openclaw-root-DrFjwUcG.js";
import "./logger-BDhFOulu.js";
import "./exec-WYU5B_af.js";
import { rn as loadConfig } from "./model-selection-BoktjT0J.js";
import "./github-copilot-token-D37fjdwy.js";
import "./boolean-CJxfhBkG.js";
import "./env-BL7t1mkY.js";
import "./host-env-security-3AOqVC6Z.js";
import "./registry-D5r9Pc2H.js";
import "./manifest-registry-BeIjHOSg.js";
import "./dock-DqLW1i1m.js";
import "./message-channel-DOl5pebL.js";
import "./send-weLlKD0i.js";
import "./plugins-B4oqCXNl.js";
import "./sessions-CDsv-Lql.js";
import "./audio-transcription-runner-Ccpl-qxW.js";
import "./image-DVt7M7j4.js";
import "./models-config-Dyo8WfaT.js";
import "./pi-embedded-helpers-ghQuBfta.js";
import "./sandbox-BFFJwscR.js";
import "./tool-catalog-Dm7UDWav.js";
import "./chrome-Cp7c2wWw.js";
import "./tailscale-C0adBA0J.js";
import "./tailnet-CcCnORw0.js";
import "./ws-CQTdazYG.js";
import "./auth-DFkGw0JK.js";
import "./credentials-Dgqa2Zkk.js";
import "./resolve-configured-secret-input-string-BQY6HjIR.js";
import "./server-context-B3vlnqdz.js";
import "./frontmatter-NDnrpxIv.js";
import "./env-overrides-lUwusxOI.js";
import "./path-alias-guards-WL7vop6P.js";
import "./skills-YP-u7cXd.js";
import "./paths-D3yvzAGG.js";
import "./proxy-env-R6aoMEPK.js";
import "./redact-D64ODmQM.js";
import "./errors-BOqrY9lx.js";
import "./fs-safe-XTpVePQ3.js";
import "./image-ops-C7PfPJb_.js";
import "./store-CF7lpR6V.js";
import "./ports-CQ-Y9tpn.js";
import "./trash-CklSLfYF.js";
import "./server-middleware-BABAsPvn.js";
import "./accounts-DCl2uuiL.js";
import "./channel-config-helpers-IZvZlvD6.js";
import "./accounts-BH8lVXqk.js";
import "./send-DJlwmjIz.js";
import "./paths-BXRmsWer.js";
import "./chat-envelope-BkySjpPY.js";
import "./tool-images-L9XyoWe9.js";
import "./tool-display-CIuMJQho.js";
import "./fetch-guard-C9aTTmhR.js";
import "./api-key-rotation-Bn0TQZYk.js";
import "./local-roots-CfU84Zin.js";
import "./model-catalog-f2oV-eF5.js";
import "./proxy-fetch-B79ly90H.js";
import "./tokens-rNiM9362.js";
import "./deliver-DY9FT0lC.js";
import "./commands-BYk9iATH.js";
import "./commands-registry-DK9sEzbg.js";
import "./call-B0bfj395.js";
import "./pairing-token-CYfrO-Yo.js";
import "./send-DUDPbAoC.js";
import "./pi-model-discovery-kQZAx6rB.js";
import "./ir-BwbFKuO4.js";
import "./render-DW1ufaCx.js";
import "./target-errors-Be40pSLb.js";
import "./with-timeout-B_hadnju.js";
import "./diagnostic-W6cK2Rhp.js";
import "./exec-approvals-allowlist-8p90ZCGS.js";
import "./exec-safe-bin-runtime-policy-BkDPd2Au.js";
import "./exec-approvals-DODENM6Z.js";
import "./nodes-screen-BN7WLAXG.js";
import "./restart-C7ane9OU.js";
import "./system-run-command-BsJFCGkm.js";
import "./runtime-lifecycle-DT-aNT8p.js";
import "./stagger-Bg3n7FlQ.js";
import "./channel-selection-BuAeucPt.js";
import "./plugin-auto-enable-By1_VpWX.js";
import "./send-CVusnGvl.js";
import "./outbound-attachment-CD94LD9V.js";
import "./fetch-CRD8Jhcq.js";
import "./delivery-queue-Bdmrf3y0.js";
import "./send-BXb1xgTY.js";
import "./pairing-store-BbLoI6gD.js";
import "./session-cost-usage-D8S-fJa3.js";
import "./read-only-account-inspect-CAZUHTl5.js";
import "./sqlite-DC98NVaK.js";
import "./channel-activity-BZsMuF3F.js";
import "./tables-jk7QRY4Q.js";
import "./proxy-CRODgiWq.js";
import "./timeouts-DeXgc5B0.js";
import "./skill-commands-BEoWtfut.js";
import "./workspace-dirs-g6Q7CsLa.js";
import "./runtime-config-collectors-CMqbedaj.js";
import "./command-secret-targets-A0mDXQMJ.js";
import "./connection-auth-CJHUONGh.js";
import "./onboard-helpers-DY47xnlF.js";
import "./prompt-style-D9KjtA09.js";
import "./pairing-labels-DCNYH3b7.js";
import "./memory-cli-BHCCB-6d.js";
import "./manager-S_ImWK1O.js";
import "./links-BQUKbxMp.js";
import "./cli-utils-B5O9_EBZ.js";
import "./help-format-BWGBPI0G.js";
import "./progress-B8wjC50f.js";
//#region src/plugins/cli.ts
const log = createSubsystemLogger("plugins");
function registerPluginCliCommands(program, cfg) {
	const config = cfg ?? loadConfig();
	const workspaceDir = resolveAgentWorkspaceDir(config, resolveDefaultAgentId(config));
	const logger = {
		info: (msg) => log.info(msg),
		warn: (msg) => log.warn(msg),
		error: (msg) => log.error(msg),
		debug: (msg) => log.debug(msg)
	};
	const registry = loadOpenClawPlugins({
		config,
		workspaceDir,
		logger
	});
	const existingCommands = new Set(program.commands.map((cmd) => cmd.name()));
	for (const entry of registry.cliRegistrars) {
		if (entry.commands.length > 0) {
			const overlaps = entry.commands.filter((command) => existingCommands.has(command));
			if (overlaps.length > 0) {
				log.debug(`plugin CLI register skipped (${entry.pluginId}): command already registered (${overlaps.join(", ")})`);
				continue;
			}
		}
		try {
			const result = entry.register({
				program,
				config,
				workspaceDir,
				logger
			});
			if (result && typeof result.then === "function") result.catch((err) => {
				log.warn(`plugin CLI register failed (${entry.pluginId}): ${String(err)}`);
			});
			for (const command of entry.commands) existingCommands.add(command);
		} catch (err) {
			log.warn(`plugin CLI register failed (${entry.pluginId}): ${String(err)}`);
		}
	}
}
//#endregion
export { registerPluginCliCommands };
