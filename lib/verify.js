const fs = require('fs')
const util = require('./util')

module.exports = async (pluginConfig, { logger }) => {
  if (!fs.existsSync('sfdx-project.json')) {
    throw new Error('This is not and sfdx project. Please make sure sfdx-project.json exists')
  }

  // check if default is set
  return util.getDefaultDevHub().then(defaultDevHub => {
    if (!defaultDevHub) {
      throw new Error(`Default dev hub not defined`)
    }
  })
}
