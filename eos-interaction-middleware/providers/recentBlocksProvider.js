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

function get () {
  return fetch('https://api.eosnewyork.io/v1/chain/get_info').then(body => (body.json())).then(resp => {
    console.log(`headBlockNum: ${resp.head_block_num}`)
    if( !resp.head_block_num ) {
      throw Error({error: 'head_block_num returned as non-number'})
      //res.status(500).send({error: 'head_block_num returned as non-number'})
    }
    return resp.head_block_num
  }).then(headBlockNum => {
    // let requestList = []
    // [(headBlockNum-10...headBlockNum].forEach(el => {
    return eos.getBlock(headBlockNum).then(resp => {
      console.log(resp)
      return resp
      // res.status(200).send(resp)
    })
  })
}

module.exports = { get }
