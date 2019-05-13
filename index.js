#! /usr/bin/env node

const { execSync } = require('child_process')
const inquirer = require('inquirer')
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const config = require('./lib/configs')
const issuesRequest = require('./lib/issues')(config)

const run = async () => {
  const issues = await issuesRequest()

  return inquirer
  .prompt([
    {
      type: 'autocomplete',
      name: 'branch',
      message: ':',
      source: (answers, input) => {
        let custom = [
          s => s.toLowerCase(),
          s => s.replace(/ /g, '_'),
          s => s.replace(/[^a-z0-9_-]/g, ''),
          s => {
            let id = ''
            const [all = '', proj, num] = s.match(/^(\w{1,3})[-_](\d+)/) || []
            if(proj) id = id + proj.toUpperCase()
            if(num) id = id + '-' + num
            id = id + s.slice(all.length)
            return id
          }
        ].reduce((input, fn) => fn(input), input || '')

        const choices = !input
          ? issues
          : [custom].concat(issues)

        return new Promise(resolve => {
          resolve(choices);
        })
      },
    }
  ])
  .then(gitCheckout)
}
async function gitCheckout(choices){
  const { branch } = choices
  let branches = execSync('git branch').toString()
  branches = branches.replace(/ /g, '').replace(/\*/,'').split("\n")
  const exists = branches.includes(branch) ? '' : '-b '
  execSync(`git checkout ${exists}${branch}`)
}


run()
