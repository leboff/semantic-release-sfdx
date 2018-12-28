# semantic-release-sfdx

Set of [semantic-release](https://github.com/semantic-release/semantic-release) plugins for publishing an SFDX package


```json
{
  "release": {
    "verifyConditions": "semantic-release-sfdx",
    "publish": {
      "devhubusername": "MyDevHub"
    }
  }
}
```
## Windows Support Disclaimer
Currently this plugin will only runs in *nix systems, as it uses shell scripts to log into google cloud. If you need Windows support Pull-requests are welcome.


## Configuration

You must have SFDX installed and connected to your dev hub

## Plugins

### `verifyConditions`

Verify that all needed configuration is present and login to the dev hub

### `publish`

Tag the image specified by `name` with the new version, create ne package version and update the `latest` tag.


Thanks to https://github.com/carlos-cubas/semantic-release-gcp.git for kicking off point