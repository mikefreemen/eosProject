const express = require('express')
const router = express.Router()
const md = require('markdown-it')()
const _ = require('lodash')

const recentBlocksProvider = require('./providers/recentBlocksProvider')
const ricardianContractProvider = require('./providers/ricardianContractProvider')

router.get('/', async (req, res) => {
  recentBlocksProvider.get().then(blockInfo => {
    // console.log('got back from recentBlocksProvider:')
    // console.log(blockInfo)
    // Add Ricardian Clauses, where we have the data to do so
// NOTE: requirements describe "actions".  Actions are within transactions: block.transactions[{
//   trx.transaction.actions[{ account }] // use account to getRicardianClauses
// }]
    const xformedBlockInfo = blockInfo.map(blockData => {
      const block = blockData.rawBlockData
      // for each action, see if there is an account name (code name?), pull abi, see if there are Ricardian clauses
      // there is an action with a contract
      let actionAccount = _.get(block, 'transactions[0].trx.transaction.actions[0].account')
      if( actionAccount ) {
console.log(`\n\n-> actionAccount: ${actionAccount}`)
        ricardianContractProvider.get(actionAccount).then(ricardianContractText => {
console.log('==> ricardianContractText:')
console.log(ricardianContractText)
          if( recardianContractText ) {
            return {
              ...blockData,
              ricardianContractAsHtml: md.render(ricardianContractText)
            }
          } else {
            return block
          }
        })
      } else {
        // otherwise, return unchanged block
        return block
      }
    })
    res.status(200).send(xformedBlockInfo)
  })
})

module.exports = router
