Good feature branch names from JIRA
## Install

`npm i -g @brevity/gcoj`


## Usage with arguments

```
$ gcoj \
  --user beep@boop.ca \
  --token b333Pb00Pb33PbL0RPbL3RPS \
  --url https://fudgebuzzle.atlassian.net \
  --project RE \
  --project HW \
  --status 'To Do' \
  --status 'In Progress' \
  --status Reopened \
```

## Usage with an rc file

Settings are saved in `$HOME/.brevityrc`

```
# file: ~/.brevityrc

gcoj:
  user: beep@boop.ca
  token: b333Pb00Pb33PbL0RPbL3RPS # should be in keychain, i know...
  jiraUrl: https://fudgebuzzle.atlassian.net
  projects:
    - RE
    - MB
  statuses:
    - 'To Do'
    - 'In Progress'
    - Reopened
```

Then just run
```
$ gcoj
```
