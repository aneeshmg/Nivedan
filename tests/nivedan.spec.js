const nivedan = require("../")({})
const {
    assert,
    expect
} = require("chai")
const sinon = require("sinon")
const nock = require("nock")

const SUCCESS_CODE = 200
const CLIENT_ERROR_CODE = 400
const SERVER_ERROR_CODE = 500
const sampleJSONResponse = '{ "stuff": "is", "awesome": "in here" }'
const baseUrl = "https://localhost:8000"

describe("'GET' request tests", () => {

    it("should respond with callback successfully", done => {

        nock(baseUrl).get("/_status").reply(SUCCESS_CODE, function () {
            return sampleJSONResponse
        })
        let callback = (err, response) => {
            expect(callbackSpy.called).to.be.true
            expect(callbackSpy.calledOnce).to.be.true
            expect(response).to.not.be.null
            expect(response).to.haveOwnProperty("body").to.equal(sampleJSONResponse)
            expect(response).to.haveOwnProperty("timetaken").to.include("ms")
            expect(response).to.haveOwnProperty("statusCode").to.equal(SUCCESS_CODE)
            expect(err).to.be.null
            done()
        }

        let callbackSpy = sinon.spy(callback)

        nivedan.get(`${baseUrl}/_status`, {}, {}, callbackSpy)      

    })

    it.only("should respond with promise successfully", done => {

        nock(baseUrl).get("/_status").reply(SUCCESS_CODE, function () {
            return sampleJSONResponse
        })
          
        nivedan.get(`${baseUrl}/_status`, {}, {}).then(response => {
            expect(response).to.not.be.null
            expect(response).to.haveOwnProperty("body").to.equal(sampleJSONResponse)
            expect(response).to.haveOwnProperty("timetaken").to.include("ms")
            expect(response).to.haveOwnProperty("statusCode").to.equal(SUCCESS_CODE)
            done()
        }).catch(err => {
            expect(err).to.be.null
        })
    })
})

describe("'POST' request tests", () => {

    it("should respond with callback successfully", done => {
        nock(baseUrl).get("/_status").reply(SUCCESS_CODE, function () {
            return sampleJSONResponse
        })

        // TODO: you know what todo
    })
})