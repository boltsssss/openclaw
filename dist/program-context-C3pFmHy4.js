import { t as isTruthyEnvValue } from "./env-C-qlQMcy.js";
import { o as hasHelpOrVersion, r as getPrimaryCommand, t as buildParseArgv } from "./argv-CN60i8bt.js";
import { r as resolveActionArgs } from "./helpers-vF0A7y7k.js";

//#region src/cli/program/action-reparse.ts
async function reparseProgramFromActionArgs(program, actionArgs) {
	const actionCommand = actionArgs.at(-1);
	const rawArgs = (actionCommand?.parent ?? program).rawArgs;
	const actionArgsList = resolveActionArgs(actionCommand);
	const fallbackArgv = actionCommand?.name() ? [actionCommand.name(), ...actionArgsList] : actionArgsList;
	const parseArgv = buildParseArgv({
		programName: program.name(),
		rawArgs,
		fallbackArgv
	});
	await program.parseAsync(parseArgv);
}

//#endregion
//#region src/cli/program/command-tree.ts
function removeCommand(program, command) {
	const commands = program.commands;
	const index = commands.indexOf(command);
	if (index < 0) return false;
	commands.splice(index, 1);
	return true;
}
function removeCommandByName(program, name) {
	const existing = program.commands.find((command) => command.name() === name);
	if (!existing) return false;
	return removeCommand(program, existing);
}

//#endregion
//#region src/cli/program/register.subclis.ts
const shouldRegisterPrimaryOnly = (argv) => {
	if (isTruthyEnvValue(process.env.OPENCLAW_DISABLE_LAZY_SUBCOMMANDS)) return false;
	if (hasHelpOrVersion(argv)) return false;
	return true;
};
const shouldEagerRegisterSubcommands = (_argv) => {
	return isTruthyEnvValue(process.env.OPENCLAW_DISABLE_LAZY_SUBCOMMANDS);
};
const loadConfig = async () => {
	return (await import("./config-B-zigsOM.js").then((n) => n.t)).loadConfig();
};
const entries = [
	{
		name: "acp",
		description: "Agent Control Protocol tools",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./acp-cli-0zhu8-n5.js")).registerAcpCli(program);
		}
	},
	{
		name: "gateway",
		description: "Run, inspect, and query the WebSocket Gateway",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./gateway-cli-CHYSAp_p.js")).registerGatewayCli(program);
		}
	},
	{
		name: "daemon",
		description: "Gateway service (legacy alias)",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./daemon-cli-u5zyP90L.js").then((n) => n.t)).registerDaemonCli(program);
		}
	},
	{
		name: "logs",
		description: "Tail gateway file logs via RPC",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./logs-cli-BJkIk6KH.js")).registerLogsCli(program);
		}
	},
	{
		name: "system",
		description: "System events, heartbeat, and presence",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./system-cli-orfiDntH.js")).registerSystemCli(program);
		}
	},
	{
		name: "models",
		description: "Discover, scan, and configure models",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./models-cli-C6c5C6wt.js")).registerModelsCli(program);
		}
	},
	{
		name: "approvals",
		description: "Manage exec approvals (gateway or node host)",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./exec-approvals-cli-gfiAdWUm.js")).registerExecApprovalsCli(program);
		}
	},
	{
		name: "nodes",
		description: "Manage gateway-owned node pairing and node commands",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./nodes-cli-CPQBfGyf.js")).registerNodesCli(program);
		}
	},
	{
		name: "devices",
		description: "Device pairing + token management",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./devices-cli-C9YDil3-.js")).registerDevicesCli(program);
		}
	},
	{
		name: "node",
		description: "Run and manage the headless node host service",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./node-cli-DHDa8kV8.js")).registerNodeCli(program);
		}
	},
	{
		name: "sandbox",
		description: "Manage sandbox containers for agent isolation",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./sandbox-cli-C2D9aCZr.js")).registerSandboxCli(program);
		}
	},
	{
		name: "tui",
		description: "Open a terminal UI connected to the Gateway",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./tui-cli-D3mo5H1n.js")).registerTuiCli(program);
		}
	},
	{
		name: "cron",
		description: "Manage cron jobs via the Gateway scheduler",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./cron-cli-BvpAChEY.js")).registerCronCli(program);
		}
	},
	{
		name: "dns",
		description: "DNS helpers for wide-area discovery (Tailscale + CoreDNS)",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./dns-cli-DT9oW8IM.js")).registerDnsCli(program);
		}
	},
	{
		name: "docs",
		description: "Search the live OpenClaw docs",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./docs-cli-wquYMFY2.js")).registerDocsCli(program);
		}
	},
	{
		name: "hooks",
		description: "Manage internal agent hooks",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./hooks-cli-LXTsNcbG.js")).registerHooksCli(program);
		}
	},
	{
		name: "webhooks",
		description: "Webhook helpers and integrations",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./webhooks-cli-fzc2cUEA.js")).registerWebhooksCli(program);
		}
	},
	{
		name: "qr",
		description: "Generate iOS pairing QR/setup code",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./qr-cli-DmK1Q-Rc.js").then((n) => n.t)).registerQrCli(program);
		}
	},
	{
		name: "clawbot",
		description: "Legacy clawbot command aliases",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./clawbot-cli-Exk5vFlZ.js")).registerClawbotCli(program);
		}
	},
	{
		name: "pairing",
		description: "Secure DM pairing (approve inbound requests)",
		hasSubcommands: true,
		register: async (program) => {
			const { registerPluginCliCommands } = await import("./cli-B4KUcRs1.js");
			registerPluginCliCommands(program, await loadConfig());
			(await import("./pairing-cli-DYud_LnR.js")).registerPairingCli(program);
		}
	},
	{
		name: "plugins",
		description: "Manage OpenClaw plugins and extensions",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./plugins-cli-60R6yiIV.js")).registerPluginsCli(program);
			const { registerPluginCliCommands } = await import("./cli-B4KUcRs1.js");
			registerPluginCliCommands(program, await loadConfig());
		}
	},
	{
		name: "channels",
		description: "Manage connected chat channels (Telegram, Discord, etc.)",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./channels-cli-oaYpYm3C.js")).registerChannelsCli(program);
		}
	},
	{
		name: "directory",
		description: "Lookup contact and group IDs (self, peers, groups) for supported chat channels",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./directory-cli-CXyjExVf.js")).registerDirectoryCli(program);
		}
	},
	{
		name: "security",
		description: "Security tools and local config audits",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./security-cli-qhxA7-LU.js")).registerSecurityCli(program);
		}
	},
	{
		name: "skills",
		description: "List and inspect available skills",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./skills-cli-BFj5eKvR.js")).registerSkillsCli(program);
		}
	},
	{
		name: "update",
		description: "Update OpenClaw and inspect update channel status",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./update-cli-DsO5UkCC.js")).registerUpdateCli(program);
		}
	},
	{
		name: "completion",
		description: "Generate shell completion script",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./completion-cli-D7Kf01CG.js").then((n) => n.n)).registerCompletionCli(program);
		}
	}
];
function getSubCliEntries() {
	return entries;
}
function getSubCliCommandsWithSubcommands() {
	return entries.filter((entry) => entry.hasSubcommands).map((entry) => entry.name);
}
async function registerSubCliByName(program, name) {
	const entry = entries.find((candidate) => candidate.name === name);
	if (!entry) return false;
	removeCommandByName(program, entry.name);
	await entry.register(program);
	return true;
}
function registerLazyCommand(program, entry) {
	const placeholder = program.command(entry.name).description(entry.description);
	placeholder.allowUnknownOption(true);
	placeholder.allowExcessArguments(true);
	placeholder.action(async (...actionArgs) => {
		removeCommand(program, placeholder);
		await entry.register(program);
		await reparseProgramFromActionArgs(program, actionArgs);
	});
}
function registerSubCliCommands(program, argv = process.argv) {
	if (shouldEagerRegisterSubcommands(argv)) {
		for (const entry of entries) entry.register(program);
		return;
	}
	const primary = getPrimaryCommand(argv);
	if (primary && shouldRegisterPrimaryOnly(argv)) {
		const entry = entries.find((candidate) => candidate.name === primary);
		if (entry) {
			registerLazyCommand(program, entry);
			return;
		}
	}
	for (const candidate of entries) registerLazyCommand(program, candidate);
}

//#endregion
//#region src/cli/program/command-registry.ts
const shouldRegisterCorePrimaryOnly = (argv) => {
	if (hasHelpOrVersion(argv)) return false;
	return true;
};
const coreEntries = [
	{
		commands: [{
			name: "setup",
			description: "Initialize local config and agent workspace",
			hasSubcommands: false
		}],
		register: async ({ program }) => {
			(await import("./register.setup-bmCug5V2.js")).registerSetupCommand(program);
		}
	},
	{
		commands: [{
			name: "onboard",
			description: "Interactive onboarding wizard for gateway, workspace, and skills",
			hasSubcommands: false
		}],
		register: async ({ program }) => {
			(await import("./register.onboard-Ci5clnyc.js")).registerOnboardCommand(program);
		}
	},
	{
		commands: [{
			name: "configure",
			description: "Interactive setup wizard for credentials, channels, gateway, and agent defaults",
			hasSubcommands: false
		}],
		register: async ({ program }) => {
			(await import("./register.configure-DjfFDLhG.js")).registerConfigureCommand(program);
		}
	},
	{
		commands: [{
			name: "config",
			description: "Non-interactive config helpers (get/set/unset). Default: starts setup wizard.",
			hasSubcommands: true
		}],
		register: async ({ program }) => {
			(await import("./config-cli-BsXHL2Vk.js")).registerConfigCli(program);
		}
	},
	{
		commands: [
			{
				name: "doctor",
				description: "Health checks + quick fixes for the gateway and channels",
				hasSubcommands: false
			},
			{
				name: "dashboard",
				description: "Open the Control UI with your current token",
				hasSubcommands: false
			},
			{
				name: "reset",
				description: "Reset local config/state (keeps the CLI installed)",
				hasSubcommands: false
			},
			{
				name: "uninstall",
				description: "Uninstall the gateway service + local data (CLI remains)",
				hasSubcommands: false
			}
		],
		register: async ({ program }) => {
			(await import("./register.maintenance-BeF9MDBs.js")).registerMaintenanceCommands(program);
		}
	},
	{
		commands: [{
			name: "message",
			description: "Send, read, and manage messages",
			hasSubcommands: true
		}],
		register: async ({ program, ctx }) => {
			(await import("./register.message-DQCAbNjG.js")).registerMessageCommands(program, ctx);
		}
	},
	{
		commands: [{
			name: "memory",
			description: "Search and reindex memory files",
			hasSubcommands: true
		}],
		register: async ({ program }) => {
			(await import("./memory-cli-DXxJ98UL.js").then((n) => n.t)).registerMemoryCli(program);
		}
	},
	{
		commands: [{
			name: "agent",
			description: "Run one agent turn via the Gateway",
			hasSubcommands: false
		}, {
			name: "agents",
			description: "Manage isolated agents (workspaces, auth, routing)",
			hasSubcommands: true
		}],
		register: async ({ program, ctx }) => {
			(await import("./register.agent-C1J0nXb6.js")).registerAgentCommands(program, { agentChannelOptions: ctx.agentChannelOptions });
		}
	},
	{
		commands: [
			{
				name: "status",
				description: "Show channel health and recent session recipients",
				hasSubcommands: false
			},
			{
				name: "health",
				description: "Fetch health from the running gateway",
				hasSubcommands: false
			},
			{
				name: "sessions",
				description: "List stored conversation sessions",
				hasSubcommands: true
			}
		],
		register: async ({ program }) => {
			(await import("./register.status-health-sessions-DBJ9XLNq.js")).registerStatusHealthSessionsCommands(program);
		}
	},
	{
		commands: [{
			name: "browser",
			description: "Manage OpenClaw's dedicated browser (Chrome/Chromium)",
			hasSubcommands: true
		}],
		register: async ({ program }) => {
			(await import("./browser-cli-PtRNNz5V.js")).registerBrowserCli(program);
		}
	}
];
function collectCoreCliCommandNames(predicate) {
	const seen = /* @__PURE__ */ new Set();
	const names = [];
	for (const entry of coreEntries) for (const command of entry.commands) {
		if (predicate && !predicate(command)) continue;
		if (seen.has(command.name)) continue;
		seen.add(command.name);
		names.push(command.name);
	}
	return names;
}
function getCoreCliCommandNames() {
	return collectCoreCliCommandNames();
}
function getCoreCliCommandsWithSubcommands() {
	return collectCoreCliCommandNames((command) => command.hasSubcommands);
}
function removeEntryCommands(program, entry) {
	for (const cmd of entry.commands) removeCommandByName(program, cmd.name);
}
function registerLazyCoreCommand(program, ctx, entry, command) {
	const placeholder = program.command(command.name).description(command.description);
	placeholder.allowUnknownOption(true);
	placeholder.allowExcessArguments(true);
	placeholder.action(async (...actionArgs) => {
		removeEntryCommands(program, entry);
		await entry.register({
			program,
			ctx,
			argv: process.argv
		});
		await reparseProgramFromActionArgs(program, actionArgs);
	});
}
async function registerCoreCliByName(program, ctx, name, argv = process.argv) {
	const entry = coreEntries.find((candidate) => candidate.commands.some((cmd) => cmd.name === name));
	if (!entry) return false;
	removeEntryCommands(program, entry);
	await entry.register({
		program,
		ctx,
		argv
	});
	return true;
}
function registerCoreCliCommands(program, ctx, argv) {
	const primary = getPrimaryCommand(argv);
	if (primary && shouldRegisterCorePrimaryOnly(argv)) {
		const entry = coreEntries.find((candidate) => candidate.commands.some((cmd) => cmd.name === primary));
		if (entry) {
			const cmd = entry.commands.find((c) => c.name === primary);
			if (cmd) registerLazyCoreCommand(program, ctx, entry, cmd);
			return;
		}
	}
	for (const entry of coreEntries) for (const cmd of entry.commands) registerLazyCoreCommand(program, ctx, entry, cmd);
}
function registerProgramCommands(program, ctx, argv = process.argv) {
	registerCoreCliCommands(program, ctx, argv);
	registerSubCliCommands(program, argv);
}

//#endregion
//#region src/cli/program/program-context.ts
const PROGRAM_CONTEXT_SYMBOL = Symbol.for("openclaw.cli.programContext");
function setProgramContext(program, ctx) {
	program[PROGRAM_CONTEXT_SYMBOL] = ctx;
}
function getProgramContext(program) {
	return program[PROGRAM_CONTEXT_SYMBOL];
}

//#endregion
export { registerCoreCliByName as a, getSubCliEntries as c, getCoreCliCommandsWithSubcommands as i, registerSubCliByName as l, setProgramContext as n, registerProgramCommands as o, getCoreCliCommandNames as r, getSubCliCommandsWithSubcommands as s, getProgramContext as t };