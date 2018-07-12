var http = require("https");
var rp = require('request-promise');

var options = {
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


rp(options)
    .then(function (parsedBody) {
      console.log(parsedBody.result.token);
    })
    .catch(function (err) {
        console.error(err)
    })