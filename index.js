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
        let custom = !input
          ? ''
          : input
              .toLowerCase()
              .replace(/ /g, '_')
              .replace(/[^a-z0-9_-]/g, '')
              .replace(/(.*)(re)(-\d{2,4}.*)/, "$1RE$3")

        const standardBranches = ['master', 'develop'];
        const choices = !input
          ? issues.concat(standardBranches)
          : [custom].concat(issues, standardBranches)

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
