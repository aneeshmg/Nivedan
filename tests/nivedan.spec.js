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
const url = "http://localhost:8000"

describe("test get requests", () => {

    it.only("should respond with callback successfully", done => {
        
        nock(url).get("/_status").reply(SUCCESS_CODE, function () {
            return sampleJSONResponse
        })
        let callback = (err, data) => {
            expect(callbackSpy.called).to.be.true
            expect(callbackSpy.calledOnce).to.be.true
            expect(callbackSpy.calledWith(null, sampleJSONResponse)).to.be.true
            expect(data).to.not.be.null
            expect(err).to.be.null
            expect(data).to.be.equal(sampleJSONResponse)
            done()
        }

        let callbackSpy = sinon.spy(callback)

        nivedan.get(url, {}, {}, callbackSpy)      

    })

    it("should respond with promise successfully", done => {

        nock(url).get("/_status").reply(SUCCESS_CODE, function () {
            return sampleJSONResponse
        })
          
        nivedan.get(url, {}, {}).then(response => {
            expect(response).to.not.be.null
            expect(response).to.be.equal(sampleJSONResponse)
            done()
        }).catch(err => {
            expect(err).to.be.null
        })
    })
})