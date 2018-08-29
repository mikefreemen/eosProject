const eosjs = require('eosjs')

const config = {
  expireInSeconds: 60,
  broadcast: true,
  debug: false,
  sign: true,
  // httpEndpoint: 'https://api.eosnewyork.io',
  httpEndpoint: 'https://api.bp.fish',
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}

const eos = eosjs(config)

function getBlockById(id) {
  return eos.getBlock(id).then(block => {
    return block
  })
}

async function get () {
  const headBlockNum = await fetch('https://api.eosnewyork.io/v1/chain/get_info').then(body => (body.json())).then(resp => {
    console.log(`headBlockNum: ${resp.head_block_num}`)
    if( !resp.head_block_num ) {
      throw Error({error: 'head_block_num returned as non-number'})
      //res.status(500).send({error: 'head_block_num returned as non-number'})
    }
    return resp.head_block_num
  })

  // Construct request list
  // const blockNumbers = new Array(3).map((x, i) => ( headBlockNum - i ))
  const blockNumbers = []
  for( let idx=0; idx<10; idx++) {
    blockNumbers.push(headBlockNum - idx)
  }

  const requestList = blockNumbers.map( blockNum => ( getBlockById( blockNum ) ))

  let rawRecentBlocks = await Promise.all(requestList)

  // xform BlockArray by pruning all the data we don't need to send the browser
  let xformedBlockArray = rawRecentBlocks.map(el => ({
    blockId: el.block_num,
    timestamp: el.timestamp,
    transactions: el.transactions
  }))
  return xformedBlockArray
}

module.exports = { get }
