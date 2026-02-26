import "./paths-B4BZAPZh.js";
import { B as theme, R as colorize, S as shortenHomePath, z as isRich } from "./utils-DNXtLoeA.js";
import "./agent-scope-s4_jffYt.js";
import "./subsystem-BI_9bRVk.js";
import "./exec-DrVRn_Jz.js";
import "./model-selection-BplWstrh.js";
import "./github-copilot-token-nncItI8D.js";
import { t as formatCliCommand } from "./command-format-ChfKqObn.js";
import "./boolean-BgXe2hyu.js";
import "./env-C-qlQMcy.js";
import "./host-env-security-ljCLeQmh.js";
import "./message-channel-CNKATuOe.js";
import { o as readConfigFileSnapshot } from "./config-B-zigsOM.js";
import "./env-vars-CvvqezS9.js";
import "./manifest-registry-DmfPU4rc.js";
import "./dock-pv6HNE8P.js";
import "./sessions-DqsLePIP.js";
import "./plugins-BinSBKMc.js";
import "./accounts-dnbnpwVy.js";
import "./accounts-v9OZODSg.js";
import "./accounts-CRMme1-m.js";
import "./bindings-ClBJqDjo.js";
import "./logging-6RmrnEvA.js";
import "./paths-DlJnj-kN.js";
import "./chat-envelope-BndZPORx.js";
import "./exec-approvals-allowlist-C-wqAKbm.js";
import "./exec-safe-bin-runtime-policy-DphNNorC.js";
import "./plugin-auto-enable-fSLOH4tB.js";
import "./prompt-style-D3Nh-ono.js";
import { c as shouldMigrateStateFromPath } from "./argv-CN60i8bt.js";
import "./note-hhvlGJif.js";
import { t as loadAndMaybeMigrateDoctorConfig } from "./doctor-config-flow-KpuawjTv.js";

//#region src/cli/program/config-guard.ts
const ALLOWED_INVALID_COMMANDS = new Set([
	"doctor",
	"logs",
	"health",
	"help",
	"status"
]);
const ALLOWED_INVALID_GATEWAY_SUBCOMMANDS = new Set([
	"status",
	"probe",
	"health",
	"discover",
	"call",
	"install",
	"uninstall",
	"start",
	"stop",
	"restart"
]);
let didRunDoctorConfigFlow = false;
let configSnapshotPromise = null;
function formatConfigIssues(issues) {
	return issues.map((issue) => `- ${issue.path || "<root>"}: ${issue.message}`);
}
async function getConfigSnapshot() {
	if (process.env.VITEST === "true") return readConfigFileSnapshot();
	configSnapshotPromise ??= readConfigFileSnapshot();
	return configSnapshotPromise;
}
async function ensureConfigReady(params) {
	const commandPath = params.commandPath ?? [];
	if (!didRunDoctorConfigFlow && shouldMigrateStateFromPath(commandPath)) {
		didRunDoctorConfigFlow = true;
		await loadAndMaybeMigrateDoctorConfig({
			options: { nonInteractive: true },
			confirm: async () => false
		});
	}
	const snapshot = await getConfigSnapshot();
	const commandName = commandPath[0];
	const subcommandName = commandPath[1];
	const allowInvalid = commandName ? ALLOWED_INVALID_COMMANDS.has(commandName) || commandName === "gateway" && subcommandName && ALLOWED_INVALID_GATEWAY_SUBCOMMANDS.has(subcommandName) : false;
	const issues = snapshot.exists && !snapshot.valid ? formatConfigIssues(snapshot.issues) : [];
	const legacyIssues = snapshot.legacyIssues.length > 0 ? snapshot.legacyIssues.map((issue) => `- ${issue.path}: ${issue.message}`) : [];
	if (!(snapshot.exists && !snapshot.valid)) return;
	const rich = isRich();
	const muted = (value) => colorize(rich, theme.muted, value);
	const error = (value) => colorize(rich, theme.error, value);
	const heading = (value) => colorize(rich, theme.heading, value);
	const commandText = (value) => colorize(rich, theme.command, value);
	params.runtime.error(heading("Config invalid"));
	params.runtime.error(`${muted("File:")} ${muted(shortenHomePath(snapshot.path))}`);
	if (issues.length > 0) {
		params.runtime.error(muted("Problem:"));
		params.runtime.error(issues.map((issue) => `  ${error(issue)}`).join("\n"));
	}
	if (legacyIssues.length > 0) {
		params.runtime.error(muted("Legacy config keys detected:"));
		params.runtime.error(legacyIssues.map((issue) => `  ${error(issue)}`).join("\n"));
	}
	params.runtime.error("");
	params.runtime.error(`${muted("Run:")} ${commandText(formatCliCommand("openclaw doctor --fix"))}`);
	if (!allowInvalid) params.runtime.exit(1);
}

//#endregion
export { ensureConfigReady };