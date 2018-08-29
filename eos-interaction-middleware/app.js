const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const compression = require("compression")
const helmet = require("helmet")

var app = express()

app.use(morgan("common"))
app.use(helmet())
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(compression())

app.use('/getRecentBlocks', require('./getRecentBlocks'))

module.exports = app
