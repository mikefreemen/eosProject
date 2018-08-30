const express = require('express')
const router = express.Router()
const { wrapAsync } = require('../wrapAsync')

const recentBlocksProvider = require('../providers/recentBlocksProvider')
const ricardianContractProvider = require('../providers/ricardianContractProvider')
const recentBlocksHelpers= require('./recentBlocksHelpers')

router.get('/', wrapAsync(async (req, res) => {
  const blockInfo = await recentBlocksProvider.get()

  let blockInfoWithRicardianContract = await recentBlocksHelpers.addRicardianContractToBlockInfo(blockInfo)

  res.status(200).send(blockInfoWithRicardianContract)
}))

module.exports = router
