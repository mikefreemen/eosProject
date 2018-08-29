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
  let headBlockNum = await fetch('https://api.eosnewyork.io/v1/chain/get_info').then(body => (body.json())).then(resp => {
    console.log(`headBlockNum: ${resp.head_block_num}`)
    if( !resp.head_block_num ) {
      throw Error({error: 'head_block_num returned as non-number'})
      //res.status(500).send({error: 'head_block_num returned as non-number'})
    }
    return resp.head_block_num
  })

  // Construct request list
  // [(headBlockNum-10...headBlockNum].forEach(el => {

  let rawRecentBlocks = await Promise.all([getBlockById(headBlockNum)])
  console.log('rawRecentBlocks:')
  console.log(rawRecentBlocks)

  // xform BlockArray by pruning all the data we don't need to send the browser
  let xformedBlockArray = rawRecentBlocks.map(el => ({
    blockId: el.block_num,
    timestamp: el.timestamp,
    transactions: el.transactions
  }))
console.log('xformedBlockArray:')
console.log(xformedBlockArray)
  return xformedBlockArray
}

module.exports = { get }
