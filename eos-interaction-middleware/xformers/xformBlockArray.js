const _get = require('lodash.get')

function xformBlockArray(rawRecentBlocks) {
  // xform BlockArray by isolating the data we want and isolating the raw block data
  return rawRecentBlocks.map(block => {
    return {
      blockHash: block.id,
      timestamp: block.timestamp,
      numActions: block.transactions.reduce((acc, tx) => {
        return acc + _get(tx, 'trx.transaction.actions.length', 0)
      }, 0),
      rawBlockData: block
    }
  })
}

module.exports = {
  xformBlockArray
}
