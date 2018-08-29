const eosjs = require('eosjs')
const config = require('config-yml')
const _get = require('lodash.get')
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
  let abi = await eos.getAbi(accountName)
  let ricardianContractTemplate = _get(abi, 'abi.actions[0].ricardian_contract', '')
  return mustache.render(ricardianContractTemplate, view)
}

module.exports = { get }
