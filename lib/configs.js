const assert = require('assert')
const yargs = require('./args')
const { rc, save } = require('./rc.js')

if(yargs.argv.save) {
  save(yargs.argv)
  process.exit()
}

const nconf = require('nconf').argv(yargs).defaults(rc)

const configs = [
  'user',
  'token',
  'url',
  'project',
  'status',
  'save',
  'listStatusIds',
  'hack',
].reduce((acc, opt) => ({ ...acc, [opt]: nconf.get(opt) }), {})

if(configs.status){
  configs.status = configs.status.map(status => status.toString())
}

const required = [
  'user',
  'token',
  'url',
  'project',
  'status',
].map(key => {
  assert(configs[key] !== undefined, `You must supply a ${key}`)
  return 'ok'
})

module.exports = configs
