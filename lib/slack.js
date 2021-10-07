/* jshint esversion:8 */
import axios from "axios";
import { channel } from "diagnostics_channel";
import https from "https";

const slack = {};
const httpsAgent = new https.Agent({ keepAlive: true });

var SLACK_URL = null;
var SLACK_EMOJI = null;
var SLACK_CHANNEL = null;

const payload = {
    channel: (SLACK_CHANNEL)?SLACK_CHANNEL:"sandbox",
    username: "RabbitMQ Watchdog",
    icon_emoji: (SLACK_EMOJI) ? SLACK_EMOJI : ":rabbit:",
    color: "#3D0C02",
    fields: [{
        title: null,
        value: null,
        short: false
    }]
};

slack.getEmoji = (qtd) => (qtd>10000)?":bomb:":(qtd>1000)?":shit:":(qtd>100)?":fire:":":expressionless:";

slack.setUrl = (url) => SLACK_URL = url?url:SLACK_URL;
slack.setEmoji = (emoji) => SLACK_EMOJI = emoji?emoji:SLACK_EMOJI;
slack.setChannel = (channel) => SLACK_CHANNEL = channel?channel:SLACK_CHANNEL;

slack.getPayload = (data) => {
    let p = Object.assign({}, payload);

    p.channel = SLACK_CHANNEL?SLACK_CHANNEL:data.channel;
    return p;
}

slack.send = payload => SLACK_URL ? axios.post(
    SLACK_URL,
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