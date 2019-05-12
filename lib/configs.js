const args = require('./args')
const rc = require('./rc.js')
const nconf = require('nconf').argv(args).defaults(rc)
module.exports = [
  'user',
  'token',
  'url',
  'project',
  'status',
  'save',
  'hack',
].reduce((acc, opt) => ({ ...acc, [opt]: nconf.get(opt) }), {})
