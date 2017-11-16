'use strict';
const https = require("https")
const { URL } = require('url')
const responseModel = require("./Models")

const sampleData = '{ "stuff": "is", "awesome": "in here" }'

function Nivedan(logger) {
    this.logger = logger
}
Nivedan.prototype.get = function (url, headers, payload, callback) {

    url = new URL(url)

    const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: 'GET'
    }

    return new Promise((resolve, reject) => {
        let data = ""
        const startTime = new Date()
        const req = https.request(options, res => {
            res.setEncoding('utf8');

            res.on('data', chunk => {
                data += chunk
            })
            res.on('end', () => {
                const endTime = new Date()
                let response = new responseModel(
                    data, 
                    res.statusCode, 
                    `${endTime - startTime}ms`
                )
                if (callback) callback(null, response)
                resolve(response)
            })

        })

        req.on('error', e => {
            if (callback) callback(e)
            reject(e)
        })

        req.end()
    })



}

module.exports = logger => new Nivedan(logger)