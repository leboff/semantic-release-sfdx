module.exports = async (pluginConfig, { nextRelease: { version }, logger }) => {
  logger.log(`Creating new package version ${pluginConfig.name}:${version}`)
}
