/* jshint esversion:8 */
import axios from "axios";
import https from "https";

const rabbit = {};
// private
const httpsAgent = new https.Agent({ keepAlive: true });

let config = null;

const oldestTime = (date, minutes = 10) => {
    let now = new Date();
    now = now.setMinutes(now.getMinutes() - minutes);

    if (typeof date === "string") {
        date = new Date(date);
    }
    return now > date;
};

// public
rabbit.config = cfg => {
    
    if (!(cfg.url && cfg.url.length)) throw new Error({ parameter: 'rabbit.url', error: "empty" });
    if (!(cfg.username && cfg.username.length)) throw new Error({ parameter: 'rabbit.username', error: "empty" });
    if (!(cfg.password && cfg.password.length)) throw new Error({ parameter: 'rabbit.password', error: "empty" });

    cfg.timeSince = (cfg.timeSince) ? cfg.timeSince : 10; // default value

    if (!cfg.filter) cfg.filter = {};
    cfg.filter.vhost = new RegExp((!cfg.filter.vhost) ? ".+" : cfg.filter.vhost);
    cfg.filter.queue = new RegExp((!cfg.filter.queue) ? ".+" : cfg.filter.queue);
    cfg.autorization = 'Basic ' + Buffer.from(cfg.username + ":" + cfg.password).toString("BASE64");

    config = cfg;
};

const request = () => axios.get(`${config.url}/api/queues`, {
    timeout: 1000000,
    responseType: 'json',
    headers: {
        'Authorization': config.autorization
    },
    agent: httpsAgent
})
    .then(response => (response.status === 200) ? response.data : null)
    .then(data => data.filter(e => e.vhost && config.filter.vhost.test(e.vhost)))
    .then(data => data.filter(e => e.name && config.filter.queue.test(e.name)))
    .then(data => data.filter(e => e.messages && oldestTime(e.idle_since, config.timeSince)));

class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "RabbitMQNotFoundException";
    }
}

rabbit.NotFoundException = (message) => (new NotFoundException(message));
rabbit.get = () => request();
rabbit.url = () => config.url;



export default rabbit;