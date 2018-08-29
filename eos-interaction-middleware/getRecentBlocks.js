const express = require('express')
const router = express.Router()
const md = require('markdown-it')()
const _ = require('lodash')

const recentBlocksProvider = require('./providers/recentBlocksProvider')
const ricardianContractProvider = require('./providers/ricardianContractProvider')

router.get('/', async (req, res) => {
  const blockInfo = await recentBlocksProvider.get()
  // Add Ricardian Contract, where we have the data to do so

  const xformedBlockInfo = await Promise.all(blockInfo.map( async (blockData) => {
    const rawBlock = blockData.rawBlockData
    // for each action, see if there is an account name, pull abi, see if there is a Ricardian contract
    // there is an action with a contract
    let actionAccount = _.get(rawBlock, 'transactions[0].trx.transaction.actions[0].account')
    if( actionAccount ) {
// console.log(`\n\n-> actionAccount: ${actionAccount}`)
      let ricardianContractText = await ricardianContractProvider.get(actionAccount)
      if( ricardianContractText ) {
        return {
          ...blockData,
          ricardianContractAsHtml: md.render(ricardianContractText)
        }
      }
    }
    // otherwise, return unchanged block
    return blockData
  }))
  res.status(200).send(xformedBlockInfo)
})

module.exports = router
