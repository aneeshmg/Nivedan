const nivedan = require("./")({})

nivedan.get("http://aneeshmg.github.io/Javascript/AirTennisGame/", {}, {}).then(res => {
    console.log(res)
})