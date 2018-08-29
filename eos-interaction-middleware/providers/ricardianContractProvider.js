const eosjs = require('eosjs')
const config = require('config-yml')
const _ = require('lodash')
const mustache = require('mustache')

const eosConfig = {
  expireInSeconds: 60,
  broadcast: true,
  debug: false,
  sign: true,
  httpEndpoint: config.bpApiBaseUrl,
  chainId: config.chainId
}

const eos = eosjs(eosConfig)

async function get (accountName, view) {
  // console.log(`abi provider accountName[${accountName}]`)
  let abi = await eos.getAbi(accountName)
  let ricardianContractTemplate = _.get(abi, 'abi.actions[0].ricardian_contract', '')
  let ricardianContractView = _.get(abi, 'abi.actions[0].ricardian_contract', '')
  let output = mustache.render(ricardianContractTemplate, view)
  return output
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
