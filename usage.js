const nivedan = require("./")({})

nivedan.get("https://mazaak.herokuapp.com/v1/small", {}, {}).then(res => {
    console.log(res)
})