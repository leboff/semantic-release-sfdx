# semantic-release-sfdx

> [semantic-release](https://github.com/semantic-release/semantic-release) plugin for publishing an SFDX package

## Prerequisites

You must have SFDX installed and connected to your DevHub (see Authorization in the [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth.htm)).

## Configuration

To enable this plugin, simply add the following to your `package.json` or [release configuration file](https://semantic-release.gitbook.io/semantic-release/usage/configuration).

```json
{
  "release": {
    "plugins": ["semantic-release-sfdx"]
  }
}
```

### DevHub

By default this plugin uses the DevHub which is set in your `defaultdevhubusername` sfdx config.

To use another DevHub, set the environment variable `SFDX_DEFAULTDEVHUBUSERNAME` (see [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_env_variables.htm)).

### Advanced Configuration

**static config via `package.json`**

```json
{
  "release": {
    "plugins": [
      [
        "semantic-release-sfdx",
        {
          "promote": true,
          "installationkey": "mysecretkey"
        }
      ]
    ]
  }
}
```

**dynamic config via `release.config.js`**

```javascript
module.exports = {
  plugins: [
    [
      'semantic-release-sfdx',
      {
        promote: process.env.PROMOTE_PACKAGE_VERSION === 'true',
        installationkey: process.env.INSTALLATIONKEY,
      },
    ],
  ],
}
```

### `verifyConditions`

To disable the verification of your SFDX project, DevHub and installationkey:

```json
{
  "release": {
    "plugins": [
      "semantic-release-sfdx",
      {
        "verifyConditions": false
      }
    ]
  }
}
```

## Example

See a second generation package being released with this plugin [here](https://github.com/mdapi-issues/managed-package-2nd-gen-dummy).

- [package.json](https://github.com/mdapi-issues/managed-package-2nd-gen-dummy/blob/main/.github/workflows/default.yml)
- [GitHub Actions configuration](https://github.com/mdapi-issues/managed-package-2nd-gen-dummy/blob/main/package.json)

## Credits

Thanks to https://github.com/carlos-cubas/semantic-release-gcp.git for kicking off point
