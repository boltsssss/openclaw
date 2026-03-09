import { f as defaultRuntime, k as theme } from "./subsystem-kzdGVyce.js";
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
import "./tool-display-BJIcX_xB.js";
import "./commands-7gthnTya.js";
import "./commands-registry-CtjXyt7n.js";
import "./call-D3liAQ6s.js";
import "./pairing-token-Bu2Xt1ri.js";
import { t as parseTimeoutMs } from "./parse-timeout-BtTjGPGT.js";
import { t as formatDocsLink } from "./links-CVgNb7TN.js";
import { t as runTui } from "./tui-4qACMVo8.js";
//#region src/cli/tui-cli.ts
function registerTuiCli(program) {
	program.command("tui").description("Open a terminal UI connected to the Gateway").option("--url <url>", "Gateway WebSocket URL (defaults to gateway.remote.url when configured)").option("--token <token>", "Gateway token (if required)").option("--password <password>", "Gateway password (if required)").option("--session <key>", "Session key (default: \"main\", or \"global\" when scope is global)").option("--deliver", "Deliver assistant replies", false).option("--thinking <level>", "Thinking level override").option("--message <text>", "Send an initial message after connecting").option("--timeout-ms <ms>", "Agent timeout in ms (defaults to agents.defaults.timeoutSeconds)").option("--history-limit <n>", "History entries to load", "200").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/tui", "docs.openclaw.ai/cli/tui")}\n`).action(async (opts) => {
		try {
			const timeoutMs = parseTimeoutMs(opts.timeoutMs);
			if (opts.timeoutMs !== void 0 && timeoutMs === void 0) defaultRuntime.error(`warning: invalid --timeout-ms "${String(opts.timeoutMs)}"; ignoring`);
			const historyLimit = Number.parseInt(String(opts.historyLimit ?? "200"), 10);
			await runTui({
				url: opts.url,
				token: opts.token,
				password: opts.password,
				session: opts.session,
				deliver: Boolean(opts.deliver),
				thinking: opts.thinking,
				message: opts.message,
				timeoutMs,
				historyLimit: Number.isNaN(historyLimit) ? void 0 : historyLimit
			});
		} catch (err) {
			defaultRuntime.error(String(err));
			defaultRuntime.exit(1);
		}
	});
}
//#endregion
export { registerTuiCli };
