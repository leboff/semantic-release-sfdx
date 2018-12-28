const sfdx = require('sfdx-node')
const fs = require('fs')

module.exports = async (pluginConfig, { logger }) => {
  const config = {}

  config.keyFile = pluginConfig.keyFile || 'assets/server.key'
  config.clientId = pluginConfig.clientId || process.env['SFDX_CLIENT_ID']
  config.devHubUsername = pluginConfig.devHubUsername || process.env['SFDX_DEV_HUB_USERNAME']

  if (!fs.existsSync(config.keyFile) && !process.env['SFDX_SERVER_KEY']) {
    throw new Error(
      `Server Key not found. Make sure keyFile or keyVar is set or server key is in assts/server.key file`
    )
  }
  if (!config.clientId) {
    throw new Error(`Client ID value not set in config at clientId or SFDX_CLIENT_ID env var`)
  }

  if (!config.devHubUsername) {
    // check if default is set
    const defaultDevHub = sfdx.org.list().find(org => org.isDefaultDevHubUsername)

    if (!defaultDevHub) {
      throw new Error(`Default dev hub not defined`)
    } else {
      config.devHubUsername = defaultDevHub.username
    }
  }

  // now auth
  sfdx.auth.jwtGrant(config).then(() => {
    logger.log(`Logged in to ${config.devHubUsername} successfully.`)
  })
}
