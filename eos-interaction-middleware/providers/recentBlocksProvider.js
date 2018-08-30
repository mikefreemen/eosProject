const eosjs = require('eosjs')
const { xformBlockArray } = require('../xformers/xformBlockArray')

const eosConfig = require('../config/eosConfig')
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
