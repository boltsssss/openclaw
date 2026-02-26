import "./paths-B4BZAPZh.js";
import { B as theme } from "./utils-DNXtLoeA.js";
import "./thinking-EAliFiVK.js";
import "./agent-scope-s4_jffYt.js";
import { f as defaultRuntime } from "./subsystem-BI_9bRVk.js";
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
import "./commands-x815aA4b.js";
import "./commands-registry-BSxy4DgA.js";
import "./client-DFzpvqcB.js";
import "./call-Ca3DeJSo.js";
import "./pairing-token-ME6zTwDj.js";
import { t as formatDocsLink } from "./links-DAjZnzLs.js";
import { t as parseTimeoutMs } from "./parse-timeout-DDSWreYs.js";
import { t as runTui } from "./tui-BG2a7JOW.js";

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