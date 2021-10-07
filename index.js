/* jshint esversion:8 */

import minimist from "minimist";
import rabbit from "./lib/rabbit";
import slack from "./lib/slack";

const processRabbit = data => data.map(d => {
    return {
        data: {
            vhost: d.vhost,
            name: d.name,
            messages: d.messages,
            consumers: d.consumers,
            idle_since: d.idle_since
        },
        title: d.vhost,
        url: `${rabbit.getUrl()}/#/queues/${(d.vhost === '/') ? '%2F' : d.vhost}/${d.name}`
    }
});

const processSlack = data => {
    data.forEach(element => {
        slack.send(slack.getPayload(element));
    });
};

const toSlack = (data) => {
    let payload = slack.getPayload();

    let fields = data
        .sort((a, b) => (a.messages < b.messages) ? 1 : ((b.messages < a.messages) ? -1 : 0))
        .map(d => ({
            title: `${d.vhost}`,
            short: false,
            value: `${slack.getEmoji(d.messages)} <${rabbit.getUrl()}/#/queues/${(d.vhost === '/') ? '%2F' : d.vhost}/${d.name}|${d.vhost} ${d.name}> 
\`\`\`
idle since: ${d.idle_since}
messages  : ${d.messages}
\`\`\`
`}));

    payload.fields = fields;

    return payload;
};

const help = () => {
    console.log(`
Use: yarn start <options>

     Options:

     --url           : RabbitMQ Url
     --user          : RabbitMQ User
     --pass          : RabbitMQ Pass
     --slack_url     : Slack Webhook Notification
     --slack_channel : Slack Notification Channel
     --slack_emoji   : Slack Notification Emoji
    `);
};

const main = (args) => {
    args = minimist(args);

    if (args["help"]) {
        help();
        return;
    }

    rabbit.setUrl(args["url"]);
    rabbit.setUser(args["user"]);
    rabbit.setPass(args["pass"]);

    slack.setUrl(args["slack_url"]);
    slack.setEmoji(args["slack_emoji"]);
    slack.setChannel(args["slack_channel"]);

    try {
        rabbit
            .get()
            .then(toSlack)
            //.then(console.log)
            .then(slack.send);
    } catch (e) {
        console.error(e);
        help();
    }
}

main(process.argv.slice(2));