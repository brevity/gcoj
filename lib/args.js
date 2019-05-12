const yargs = require('yargs')
  .usage('Good feature branch names from JIRA')
  .options({
    u: {
      alias: 'user',
      describe: 'Your JIRA user (an email address)',
      type: 'string',
    },
    t: {
      alias: 'token',
      describe: 'A JIRA token',
      type: 'string',
    },
    U: {
      alias: 'url',
      describe: 'Your company\'s JIRA url.',
      type: 'string',
    },
    p: {
      alias: 'project',
      describe: 'Project(s) to include',
      type: 'array',
    },
    s: {
      alias: 'status',
      describe: 'Status(es) to include',
      type: 'array',
    },
    S: {
      alias: 'save',
      describe: 'Save command line arguments to rc File',
      type: 'boolean',
    },
  })
yargs.alias('h', 'help')
yargs.example(
  "\n$0",
  "\n--user beep@boop.ca --token b333Pb00Pb33PbL0RPbL3RPS \\\n"
+ "--url https://fudgebuzzle.atlassian.net \\ \n"
+ "--project RE --project ED \\\n"
+ "--status \"To Do\" \n"
+ "# Tweaking things\n"
)
yargs.example(
  '$0',
  "-u beep@boop.ca -t b333Pb00Pb33PbL0RPbL3RPS \\\n"
+ "-U https://fudgebuzzle.atlassian.net \\ \n"
+ "-p RE -p ED \\\n"
+ "-s 'To Do' -s 'In Progress' \\\n"
+ "--save\n"
+ "# After you've got it settled\n"
)
yargs.example('$0', "<-- After you've saved")
yargs.help()

if(yargs.argv.help) {
  console.log('---------------------------------------------------')
  yargs.showHelp()
  console.log('---------------------------------------------------')
  process.exit(0)
}
module.exports = yargs
