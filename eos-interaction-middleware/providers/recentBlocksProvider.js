const eosjs = require('eosjs')
const config = require('config-yml')
const _ = require('lodash')

const eosConfig = {
  expireInSeconds: 60,
  broadcast: true,
  debug: false,
  sign: true,
  httpEndpoint: config.bpApiBaseUrl,
  chainId: config.chainId
}

const eos = eosjs(eosConfig)

async function get () {
  const chainInfo = await eos.getInfo({})

  // Construct list of block numbers to request
  const blockNumbers = []
  for( let idx=0; idx<10; idx++) {
    blockNumbers.push(chainInfo.head_block_num - idx)
  }

  const requestList = blockNumbers.map( blockNum => ( eos.getBlock( blockNum ) ))
  const rawRecentBlocks = await Promise.all(requestList)

  // xform BlockArray by pruning all the data we don't need to send the browser
  let xformedBlockArray = rawRecentBlocks.map(block => {
    return {
      blockHash: block.id,
      timestamp: block.timestamp,
      numActions: block.transactions.reduce((acc, tx) => {
        return acc + _.get(tx, 'trx.transaction.actions.length', 0)
      }, 0),
      rawBlockData: block
    }
  })
  return xformedBlockArray
}

module.exports = { get }
