const indexR = require("./index")
const songsR = require("./songs")


exports.routesInit = (app) => {
app.use("/",indexR)
app.use("/songs",songsR)
}