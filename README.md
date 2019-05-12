## Install

`npm i -g @brevity/gcoj`


## Usage with arguments

```
$ gcoj \
  --user <email address> \
  --token <jira_token> \
  --url <jira_url> \
  --project <project> \
  --project <project> \
  --status <status> \
  --status <status> \
  --status <status> \
```

## Usage with an rc file

Settings are saved in `$HOME/.brevityrc`

```
# file: ~/.brevityrc

gcoj:
  user: example@email.ca
  token: <jira_token> # should be in keychain, i know...
  jiraUrl: 'https://whatevs.atlassian.net'
  projects:
    - 'RE'
    - 'MB'
  statuses:
    - '"To Do"'
    - '"In Progress"'
    - '"Reopened"'
```

Then just run
```
$ gcoj
```
