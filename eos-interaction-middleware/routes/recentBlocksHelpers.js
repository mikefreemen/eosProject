const ricardianContractProvider = require('../providers/ricardianContractProvider')
const md = require('markdown-it')()
const _get = require('lodash.get')

async function addRicardianContractToBlockInfo (blockInfo) {
  console.log('blockInfo:')
  console.log(blockInfo)
  // Add Ricardian Contract to response body, where we have the data to do so
  return await Promise.all(blockInfo.map( async (blockData) => {
    const rawBlock = blockData.rawBlockData
    // for each action, see if there is an account name, pull abi, see if there is a Ricardian contract
    const actionAccount = _get(rawBlock, 'transactions[0].trx.transaction.actions[0].account')
    if( actionAccount ) {
      const ricardianContractReplacementValues = _get(rawBlock, 'transactions[0].trx.transaction.actions[0].data')
      const ricardianContractText = await ricardianContractProvider.get(actionAccount, ricardianContractReplacementValues)
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
}

module.exports = {
  addRicardianContractToBlockInfo
}
