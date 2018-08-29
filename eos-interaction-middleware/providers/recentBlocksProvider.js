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

function getBlockById(id) {
  return eos.getBlock(id).then(block => {
    return block
  })
}

async function get () {
  const headBlockNum = await fetch(`${config.bpApiBaseUrl}/v1/chain/get_info`).then(body => (body.json())).then(resp => {
    if( !resp.head_block_num ) {
      throw Error({error: 'head_block_num returned as non-number'})
      //res.status(500).send({error: 'head_block_num returned as non-number'})
    }
    return resp.head_block_num
  })

  // Construct block request list
  const blockNumbers = []
  for( let idx=0; idx<10; idx++) {
    blockNumbers.push(headBlockNum - idx)
  }

  const requestList = blockNumbers.map( blockNum => ( getBlockById( blockNum ) ))

  let rawRecentBlocks = await Promise.all(requestList)

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
