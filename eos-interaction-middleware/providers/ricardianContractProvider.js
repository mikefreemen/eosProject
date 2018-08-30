const eosjs = require('eosjs')
const _get = require('lodash.get')
const mustache = require('mustache')

const eosConfig = require('../config/eosConfig')
const eos = eosjs(eosConfig)

async function get (accountName, view) {
  let abi = await eos.getAbi(accountName)
  let ricardianContractTemplate = _get(abi, 'abi.actions[0].ricardian_contract', '')
  return mustache.render(ricardianContractTemplate, view)
}

module.exports = { get }
