const request = require("request");

module.exports = config => {
  const { user = false, token = false, url = false } = config
  return async choice => {
    if(choice) return Promise.resolve(choice)
    const base64Token = Buffer.from(user + ':' + token).toString('base64')
    const options = {
      method: 'GET',
      url: `${url}/rest/api/3/status`,
      headers: {
        Authorization: `Basic ${base64Token}`,
        Accept: 'application/json',
      }
    };

    return new Promise((resolve, reject) => {
      request(options, function (error, response, json) {
        if(error || response.statusCode !== 200){
          console.error(response)
          if(response && response.statusCode) return reject(new Error(response.statusCode))
          if(error) return reject(new Error(error));
        }
        let body
        try{
          body = JSON.parse(json)
        } catch(e) {
          reject(e)
        }
        const statuses = body.reduce((acc, status) => ({
          ...acc,
          [status.name]: status.id,
        }), {})
        if(statuses.length === 0) return []
        return resolve(statuses)
      });
    })
  }
}
