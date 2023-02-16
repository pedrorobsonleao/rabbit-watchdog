/* jshint esversion:8 */
import axios from "axios";
import { channel } from "diagnostics_channel";
import https from "https";

const slack = {};
// private
const httpsAgent = new https.Agent({ keepAlive: true });

let config = null;

// public
slack.config = cfg => {
    if (!(cfg.url && cfg.url.length)) throw new Error({ parameter: 'slack.url', error: "empty" });

    cfg.emoji = cfg.emoji ? cfg.emoji : ":rabbit";
    cfg.channel = cfg.channel ? cfg.channel : "sandbox";

    config = cfg;
};

slack.getEmoji = (qtd) => (qtd > 10000) ? ":bomb:" : (qtd > 1000) ? ":shit:" : (qtd > 100) ? ":fire:" : ":expressionless:";

slack.getPayload = (data) => {
    let p = Object.assign({}, {
        channel: config.channel,
        username: "RabbitMQ Watchdog",
        icon_emoji: config.emoji,
        color: "#3D0C02",
        fields: [{
            title: null,
            value: null,
            short: false
        }]
    });

    return p;
}

slack.send = payload => config.url ? axios.post(
    config.url,
    payload,
    {
        headers: {
            'Content-Type': 'application/json'
        },
        agent: httpsAgent,
        timeout: 1000000,
        responseType: 'json'
    }) : null;

export default slack;