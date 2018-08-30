const express = require('express')
const router = express.Router()
const { wrapAsync } = require('../wrapAsync')

const recentBlocksProvider = require('../providers/recentBlocksProvider')
const ricardianContractProvider = require('../providers/ricardianContractProvider')
const recentBlocksHelpers= require('./recentBlocksHelpers')

router.get('/', wrapAsync(async (req, res) => {
  console.log('1')
  const blockInfo = await recentBlocksProvider.get()

  console.log('2')
  let blockInfoWithRicardianContract
  // try {
    blockInfoWithRicardianContract = await recentBlocksHelpers.addRicardianContractToBlockInfo(blockInfo)
  /*} catch (error) {
    console.log('error:')
    console.log(error)
  }*/

  console.log('3')
  res.status(200).send(blockInfoWithRicardianContract)
}))

module.exports = router
