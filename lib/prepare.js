const util = require('./util')
const sfdx = require('sfdx-node')
const fs = require('fs')
const _ = require('lodash')
const path = require('path')

module.exports = async (pluginConfig, { nextRelease: { version }, logger }) => {
  const packageVersion = `${version}.0`
  const config = {}
  config.jwtkeyfile = pluginConfig.jwtkeyfile || 'assets/server.key'
  config.clientid = pluginConfig.clientid || process.env['SFDX_CLIENT_ID']
  config.username = pluginConfig.devHubUsername || process.env['SFDX_DEV_HUB_USERNAME']

  const project = JSON.parse(fs.readFileSync('sfdx-project.json'))

  const pkg = util.getPackage(project)
  logger.log(`Creating new package version ${pkg.package}:${packageVersion}`)
  return sfdx.package
    .versionCreate({
      path: pkg.path,
      targetdevhubusername: config.username,
      tag: packageVersion,
      versionnumber: packageVersion,
      json: true,
      wait: pluginConfig.versionCreateWait || 15,
      installationkeybypass: true,
    })
    .then(res => {
      if (!res) {
        throw new Error('Error Creating Package Version')
      }
      return sfdx.package
        .versionList({
          targetdevhubusername: config.username,
        })
        .then(list =>
          _.find(list, {
            SubscriberPackageVersionId: res.SubscriberPackageVersionId,
          })
        )
    })
    .then(res => {
      logger.log(`Package Version Create Result: ${JSON.stringify(res)}`)
      logger.log('Generating README file')

      const tmpl = fs.readFileSync(path.join(__dirname, '..', 'templates', 'Readme.tmpl'))
      const readme = _.template(tmpl)

      fs.writeFileSync(pluginConfig.readmeFile || 'README.md', readme(res))
    })
}
