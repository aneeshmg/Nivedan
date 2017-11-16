function Response(body, statusCode, timetaken, headers, message) {
    this.body = body
    this.statusCode = statusCode
    this.timetaken = timetaken
    this.headers = headers ? headers : undefined
    this.message = message ? message : undefined
}

module.exports = Response