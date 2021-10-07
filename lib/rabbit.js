/* jshint esversion:8 */
import axios from "axios";
import https from "https";

const rabbit = {};
const httpsAgent = new https.Agent({ keepAlive: true });

let _user = null;
let _pass = null;
let _url = null;
let _Authorization = null;

rabbit.setUser = user => _user = (user) ? user : _user;
rabbit.setPass = pass => _pass = (pass) ? pass : _pass;
rabbit.setUrl = url => _url = (url) ? url : _url;
rabbit.getUrl = () => _url;

const validate = () => {
    if (!_Authorization) {
        if (!(_user && _user.length)) throw "Parameter user empty";
        if (!(_pass && _pass.length)) throw "Parameter pass empty";
        if (!(_url && _url.length)) throw "Parameter url empty";

        _Authorization = 'Basic ' + Buffer.from(_user + ":" + _pass).toString("BASE64");
    }
};

const oldestTime = (date, minutes = 10) => {
    let now = new Date();
    now = now.setMinutes(now.getMinutes() - minutes);

    if (typeof date === "string") {
        date = new Date(date);
    }
    return now > date;
};

const request = () => {

    validate();

    let url = `${_url}/api/queues`;
    return axios.get(url, {
        timeout: 1000000,
        responseType: 'json',
        headers: {
            'Authorization': _Authorization
        },
        agent: httpsAgent
    })
        .then(response => (response.status === 200) ? response.data : null)
        .then(data => data.filter(e => e.messages && oldestTime(e.idle_since)))
};

rabbit.get = () => request();

export default rabbit;