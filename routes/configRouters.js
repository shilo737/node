const indexR = require("./index")
const songsR = require("./songs")
const usersR = require("./users")

exports.routesInit = (app) => {
app.use("/",indexR)
app.use("/songs",songsR)
app.use("/users",usersR)
}