'use strict';
const https = require("https")
const url = require('url')

const sampleData = '{ "stuff": "is", "awesome": "in here" }'

function Nivedan(logger) {
    this.logger = logger
}
Nivedan.prototype.get = function (url, headers, payload, callback) {

    const options = {
        hostname: 'localhost',
        port: 8000,
        path: '/_status',
        method: 'GET'
    }

    return new Promise((resolve, reject) => {
        let data = ""
        const req = https.request(options, res => {
            res.setEncoding('utf8');

            res.on('data', (chunk) => {
                data += chunk
            });
            res.on('end', () => {
                if (callback) callback(null, data)
                resolve(data)
            });

        });

        req.on('error', e => {
            if (callback) callback(e)
            reject(e)
        })

        req.end()
    })



}

let mazaak = "https://mazaak.herokuapp.com/v1/small"
let a = "https://google.com/search?q=something%20else"

// const { URL } = require('url');
// const myURL = new URL(a);
// console.log(myURL);


module.exports = logger => new Nivedan(logger)