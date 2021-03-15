const util = require('./util')
const sfdx = require('sfdx-node')
const fs = require('fs')
const _ = require('lodash')
const path = require('path')

module.exports = async (pluginConfig, { nextRelease: { version }, logger }) => {
  const packageVersion = `${version}.0`
  const project = JSON.parse(fs.readFileSync('sfdx-project.json'))

  const pkg = util.getPackage(project)
  logger.log(`Creating new package version ${pkg.package}:${packageVersion}`)
  return sfdx.package
    .versionCreate({
      _rejectOnError: true,
      path: pkg.path,
      tag: version,
      versionnumber: packageVersion,
      json: true,
      wait: pluginConfig.versionCreateWait || 15,
      installationkeybypass: true,
    })
    .then(res => {
      return sfdx.package.versionList().then(list =>
        _.find(list, {
          SubscriberPackageVersionId: res.SubscriberPackageVersionId,
        })
      )
    })
    .then(res => {
      logger.log(`Package Version Create Result: ${JSON.stringify(res)}`)
      if (pluginConfig.promote) {
        logger.log('Promoting Package Version')
        return sfdx.package
          .versionPromote({
            _rejectOnError: true,
            package: res.SubscriberPackageVersionId,
            noprompt: true,
            json: true,
          })
          .then(() => {
            return res
          })
      }
      return res
    })
    .then(res => {
      logger.log('Generating README file')

      const tmpl = fs.readFileSync(path.join(__dirname, '..', 'templates', 'Readme.tmpl'))
      const readme = _.template(tmpl)

      fs.writeFileSync(pluginConfig.readmeFile || 'README.md', readme(res))
    })
}
