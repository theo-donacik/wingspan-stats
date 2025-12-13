module.exports = function override(config, env) {
  config.devtool = 'eval-source-map'
  return config;
}