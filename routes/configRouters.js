const indexR = require("./index")
const songsR = require("./songs")
const usersR = require("./users")
const motorcycleR = require("./motorcycles")
exports.routesInit = (app) => {
app.use("/",indexR)
app.use("/songs",songsR)
app.use("/users",usersR)
app.use("/motorcycles",motorcycleR)
}