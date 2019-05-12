const homedir = require('os').homedir()
const { existsSync, readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')
const yaml = require('js-yaml')

const rcGlobalPath = resolve(homedir, '.brevityrc')
const rcLocalPath = './.brevityrc'

const rc = [rcGlobalPath, rcLocalPath].reduce((rc, path) => ({
  ...rc,
  ...existsSync(path) && (yaml.load(readFileSync(path)).gcoj)
}), {})

const save = args => {
  const rcArgs = Object.keys(args)
    .reduce((rcArgs, key) => ({
      ...rcArgs,
      ...(key.length > 2) && { [key]: obj[key] },
    }), {})
  delete rcArgs.save
  const rcNewYaml = yaml.dump({ gcoj: { ...rc, ...rcArgs } })
  writeFileSync('./.brevityrc', rcNewYaml)
  console.log('Configs saved to .brevityrc')
}

module.exports = { rc, save }
