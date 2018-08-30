const eosjs = require('eosjs')
const config = require('config-yml')
const { xformBlockArray } = require('../xformers/xformBlockArray')

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

  return xformBlockArray(rawRecentBlocks) 
}

module.exports = { get }
