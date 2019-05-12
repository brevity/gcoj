const yargs = require('./args')
const { rc, save } = require('./rc.js')

if(yargs.argv.save) {
  save(yargs.argv)
  process.exit()
}

const nconf = require('nconf').argv(yargs).defaults(rc)
module.exports = [
  'user',
  'token',
  'url',
  'project',
  'status',
  'save',
  'hack',
].reduce((acc, opt) => ({ ...acc, [opt]: nconf.get(opt) }), {})
