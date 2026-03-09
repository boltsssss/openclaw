import "./paths-BJV7vkaX.js";
import { k as theme } from "./subsystem-4K-e3L3i.js";
import "./utils-BhZbo8Nw.js";
import "./agent-scope-CZF6h_5g.js";
import "./openclaw-root-DrFjwUcG.js";
import "./logger-BDhFOulu.js";
import "./exec-WYU5B_af.js";
import "./model-selection-BoktjT0J.js";
import "./github-copilot-token-D37fjdwy.js";
import "./boolean-CJxfhBkG.js";
import "./env-BL7t1mkY.js";
import "./host-env-security-3AOqVC6Z.js";
import "./registry-D5r9Pc2H.js";
import "./manifest-registry-BeIjHOSg.js";
import "./message-channel-DOl5pebL.js";
import "./tailnet-CcCnORw0.js";
import "./ws-CQTdazYG.js";
import "./credentials-Dgqa2Zkk.js";
import "./resolve-configured-secret-input-string-BQY6HjIR.js";
import "./call-B0bfj395.js";
import "./pairing-token-CYfrO-Yo.js";
import "./runtime-config-collectors-CMqbedaj.js";
import "./command-secret-targets-A0mDXQMJ.js";
import { t as formatDocsLink } from "./links-BQUKbxMp.js";
import { n as registerQrCli } from "./qr-cli-CxjHUOnr.js";
//#region src/cli/clawbot-cli.ts
function registerClawbotCli(program) {
	registerQrCli(program.command("clawbot").description("Legacy clawbot command aliases").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/clawbot", "docs.openclaw.ai/cli/clawbot")}\n`));
}
//#endregion
export { registerClawbotCli };
