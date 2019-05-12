const request = require("request");
const RESOLUTION = 'Unresolved'

module.exports = config => {
  const { user, token, url, project: projects, status } = config
  return async choice => {
    const statuses = status.map(status => '"'+status.replace(/"/g, '')+'"')
    const me = true
    if(choice) return Promise.resolve(choice)
    var creds
    const base64Token = Buffer.from(user + ':' + token).toString('base64')

    // Clean this up, it's UUUUUUUgly
    const opts = []
    if(me) opts.push('assignee=currentuser() AND ')
    if(projects.length > 0) opts.push(`project in (${projects.join(', ')})    AND status in (${statuses.join(', ')})`)
    if(RESOLUTION) opts.push(`AND RESOLUTION=${RESOLUTION}`)

    const jql = opts.join(' ') + ' ORDER BY priority DESC'
    const options = {
      method: 'GET',
      url: `${url}/rest/api/2/search`,
      qs: { jql },
      headers: {
        Authorization: `Basic ${base64Token}`
      }
    };

    return new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        if(error || response.statusCode !== 200){
          console.error(response)
          if(response.statusCode) return reject(new Error(response.statusCode))
          if(error) return reject(new Error(error));
        }
        const { issues, errorMessages } = JSON.parse(body)
        if (errorMessages && errorMessages.length){
          return resolve(new Error(errorMessages[0]));
        }

        if(issues.length === 0) return []

        const clean = issues.map(i => {
          const { summary, description, status } = i.fields
          const c = {
            key: i.key,
            summary,
            description,
            status: status.name,
          }
          return c;
        })
      const prNames = issues
        .map(i => {
          const summary = i.fields.summary
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, ' ') // space || non-alphanumeric -> space
          .replace(/\s+/g,' ')         // multiple spaces -> one space
          .replace(/^\s/,'')           // strip leading space
          .replace(/ /g, '_')          // spaces -> underscores
          .substr(0, 60)               // trim to 60 characters
          .replace(/_$/,'')           // strip trailing underscore
          return `${i.key}_${summary}`
        });
        return resolve(prNames)
      });
    })
  }
}
