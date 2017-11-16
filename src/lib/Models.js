function Response(body, statusCode, timetaken) {
    this.body = body
    this.statusCode = statusCode
    this.timetaken = timetaken
}

module.exports = Response