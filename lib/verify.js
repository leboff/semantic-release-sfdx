const fs = require('fs')
const util = require('./util')

module.exports = async (pluginConfig, { logger }) => {
  const config = {}
  config.jwtkeyfile = pluginConfig.jwtkeyfile || 'assets/server.key'
  config.clientid = pluginConfig.clientid || process.env['SFDX_CLIENT_ID']
  config.username = pluginConfig.devHubUsername || process.env['SFDX_DEV_HUB_USERNAME']

  if (!fs.existsSync('sfdx-project.json')) {
    throw new Error('This is not and sfdx project. Please make sure sfdx-project.json exists')
  }

  if (!fs.existsSync(config.jwtkeyfile) && !process.env['SFDX_JWT_KEYFILE']) {
    throw new Error(
      `Server Key not found. Make sure jwtkeyfile or SFDX_JWT_KEYFILE var is set or server key is in assts/server.key file`
    )
  }
  if (!config.clientid) {
    throw new Error(`Client ID value not set in config at clientid or SFDX_CLIENT_ID env var`)
  }

  if (!config.username) {
    // check if default is set
    return util
      .getDefaultDevHub()
      .then(defaultDevHub => {
        if (!defaultDevHub) {
          throw new Error(`Default dev hub not defined`)
        } else {
          config.username = defaultDevHub.username
        }
      })
      .then(() => {
        return util.jwtAuth(config).then(res => {
          if (res && res.orgId) {
            logger.log(`Logged in to ${res.orgId} successfully.`)
          } else {
            throw new Error(
              `Could not log in. Check client id and access has been granted. (see: https://salesforce.stackexchange.com/questions/184363/salesforce-jwt-user-hasnt-approved-this-consumer-again/184635)`
            )
          }
        })
      })
  }
}
