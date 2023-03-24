/* jshint esversion:8 */

import minimist from "minimist";
import rabbit from "./lib/rabbit";
import slack from "./lib/slack";

const toSlack = (data) => {
    let payload = slack.getPayload();

    if (data.length === 0) {
        throw Error("information can't fount in rabbitMQ");
    }

    let fields = data
        .sort((a, b) => (a.messages < b.messages) ? 1 : ((b.messages < a.messages) ? -1 : 0))
        .map(d => ({
            title: `${d.vhost}`,
            short: false,
            value: `${slack.getEmoji(d.messages)} <${rabbit.url()}/#/queues/${(d.vhost === '/') ? '%2F' : d.vhost}/${d.name}|${d.vhost} ${d.name}> 
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
Use: yarn --silent start <options>

     Options:

     --rabbit.url          : RabbitMQ Url 
     --rabbit.username     : RabbitMQ Username
     --rabbit.password     : RabbitMQ Password
     --rabbit.time_since   : Rabbit Message oldest minutes (default: 10)
     --rabbit.filter.vhost : Filter vhost (default: ".*")
     --rabbit.filter.queue : Filter queue (default: ".*")
     --slack.url           : Slack Webhook Notification
     --slack.channel       : Slack Notification Channel
     --slack.emoji         : Slack Notification Emoji (default: ":rabbit:")
    `);
};

const main = (args) => {
    args = minimist(args);

    if (Object.keys(args).length == 1 && args._.length == 0) args.help = true;

    if (args.help) {
        help();
        return;
    }

    slack.config(args.slack);
    rabbit.config(args.rabbit);

    try {
        rabbit
            .get()
            .then(toSlack)
            .then(slack.send)
            .catch(e => console.error(e.name, e.message));
    } catch (e) {
        console.error(e.message);
        help();
    }

}

main(process.argv.slice(2));