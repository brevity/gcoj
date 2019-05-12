const homedir = require('os').homedir()
const { readFileSync } = require('fs')
const { resolve } = require('path')
const yaml = require('js-yaml')
const yamlString = readFileSync(resolve(homedir, '.brevityrc'));
const { gcoj: rc } = yaml.load(yamlString)

module.exports = rc
