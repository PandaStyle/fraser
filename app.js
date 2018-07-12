var rp = require('request-promise');
var fs = require('fs');
var converter = require('json-2-csv');

const args = require('minimist')(process.argv.slice(2));

const ID_TO_START = args.start;
const ID_TO_END = args.end;


var loginOptions = {
    "method": "POST",
    "hostname": "api.flywheelsports.com",
    "port": null,
    "uri": "https://api.flywheelsports.com/v1/auth/login",
    "headers": {
        "origin": "https://www.flywheelsports.com",
        "accept-language": "en-US,en;q=0.9",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36",
        "content-type": "application/json",
        "accept": "*/*",
        "referer": "https://www.flywheelsports.com/login",
        "authority": "api.flywheelsports.com",
        "cache-control": "no-cache",
        "postman-token": "df390505-442d-6f69-277a-f353029f1ec6"
    },
    json: true,
    body: {
        username: "asdf1234@gmail.com",
        password: "password"
    }
};
var options = {
    "method": "GET",
    "hostname": "",
    "port": null,
    "headers": {
        "origin": "https://www.flywheelsports.com",
        "accept-language": "en-US,en;q=0.9",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36",
        "accept": "*/*",
        "referer": "https://www.flywheelsports.com/dashboard",
        "connection": "keep-alive",
        "if-modified-since": "Tue, 19 Jun 2018 17:54:37 +0000",
        "cache-control": "no-cache",
    },
    json: true
};

let obj = [];

const promise = (i, jwt) => {
    options.uri = 'https://new-york.flywheelsports.com/api/v2/performance.json?class_nid=' + i + '&fws_auth=' + jwt;

    return rp(options).then(res => {
        console.log("Succeed, classNum:", i)
        res.forEach(a => obj.push(a))
    }).catch(err => {
        console.error(err.message);
    })
}

(async function run() {
    const res = await rp(loginOptions);
    const numArray = [];

// 90453343
    // 90453345
    for (let i = ID_TO_START; i < ID_TO_END; i++) {
        numArray.push(i);
    }

     Promise.all(numArray.map( k => promise(k, res.result.token))).then( res => {
         var json = JSON.stringify(obj);
         fs.writeFile('myjsonfile.json', json, 'utf8', (r) =>{
             console.log('Json created.');
         });

     })
})();







