const express = require('express')
const router = express.Router()

const recentBlocksProvider = require('./providers/recentBlocksProvider')

router.get('/', (req, res) => {
  recentBlocksProvider.get().then(resp => {
    // console.log('got back from recentBlocksProvider:')
    // console.log(resp)
    res.status(200).send(resp)
  })
})

module.exports = router
