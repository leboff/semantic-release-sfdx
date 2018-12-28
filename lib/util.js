const sfdx = require('sfdx-node')

module.exports = {
  getDefaultDevHub: (username) => {
    if(username) return Promise.resolve({username: username});
    return sfdx.org.list().then(orgs => {
      return orgs.nonScratchOrgs && orgs.nonScratchOrgs.find(org => org.isDefaultDevHubUsername)
    })
  },
  jwtAuth: config => {
    return sfdx.auth.jwtGrant(config)
  },
  getPackage: project => {
    return project.packageDirectories.find(dir => dir.default)
  },
}
