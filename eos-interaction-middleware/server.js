const app = require("./app")
const config = require('config-yml')

server = app.listen(config.middlewarePortNumber, () => {
  console.log(`API is running on port ${config.middlewarePortNumber}...`)
})

module.exports = app
