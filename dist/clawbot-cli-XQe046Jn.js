import { Ot as theme } from "./entry.js";
import "./auth-profiles-VHiPC1-T.js";
import "./agent-scope-DhI_kPU3.js";
import "./exec-TIZD7ZZn.js";
import "./github-copilot-token-DKRiM6oj.js";
import "./host-env-security-DyQuUnEd.js";
import "./manifest-registry-BgY5xgMH.js";
import "./config-RlRKjsmM.js";
import "./env-vars-iFkEK4MO.js";
import "./ip-m9Sjsn1o.js";
import { t as formatDocsLink } from "./links-DfYXF6CQ.js";
import { n as registerQrCli } from "./qr-cli-D3orXS9e.js";

//#region src/cli/clawbot-cli.ts
function registerClawbotCli(program) {
	registerQrCli(program.command("clawbot").description("Legacy clawbot command aliases").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/clawbot", "docs.openclaw.ai/cli/clawbot")}\n`));
}

//#endregion
export { registerClawbotCli };