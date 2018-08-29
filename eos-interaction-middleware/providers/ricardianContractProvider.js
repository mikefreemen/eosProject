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

async function get (accountName) {
  // console.log(`abi provider accountName[${accountName}]`)
  let abiResult = await eos.getAbi(accountName)
  let rc = _.get(abiResult, 'abi.actions[0].ricardian_contract', '')
  return rc
}

/*
// url_path: `/v1/chain/get_abi`
// eos.getAbi(account_name ==> getAbiResult
getAbi('everipediaiq').then(ricardianClauses => {
  console.log('Ricardian Clauses:')
  console.log(ricardianClauses)
})
*/

module.exports = { get }
