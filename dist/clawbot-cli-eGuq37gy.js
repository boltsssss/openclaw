import { k as theme } from "./subsystem-kzdGVyce.js";
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
import "./message-channel-FOsBizRL.js";
import "./tailnet-B0Tbje2W.js";
import "./ws-Crq-SBzZ.js";
import "./credentials-CG1_itLT.js";
import "./resolve-configured-secret-input-string-DxJfVAjE.js";
import "./call-D3liAQ6s.js";
import "./pairing-token-Bu2Xt1ri.js";
import "./runtime-config-collectors-B4YgJqco.js";
import "./command-secret-targets-DC8aFOgw.js";
import { t as formatDocsLink } from "./links-CVgNb7TN.js";
import { n as registerQrCli } from "./qr-cli-B0sNcOqE.js";
//#region src/cli/clawbot-cli.ts
function registerClawbotCli(program) {
	registerQrCli(program.command("clawbot").description("Legacy clawbot command aliases").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/clawbot", "docs.openclaw.ai/cli/clawbot")}\n`));
}
//#endregion
export { registerClawbotCli };
