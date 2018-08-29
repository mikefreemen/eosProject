const express = require('express')
const router = express.Router()

const ricardianContractProvider = require('./providers/ricardianContractProvider')

router.get('/:accountName', (req, res) => {
  console.log('ricardContractProvider.get():')
  console.log(req.params)
  ricardianClausesProvider.get(req.params.accountName).then(resp => {
    console.log('got back from ricardianContractProvider:')
    console.log(resp)
    res.status(200).send(resp)
  })
})

module.exports = router
