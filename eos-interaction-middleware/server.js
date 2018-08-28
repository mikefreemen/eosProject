const app = require("./app")

server = app.listen(3001, () => {
  console.log("My API is running...")
})

module.exports = app
