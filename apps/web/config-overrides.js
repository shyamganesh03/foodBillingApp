const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const {
  override,
  addExternalBabelPlugin,
  addWebpackAlias,
} = require('customize-cra')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

// our packages that will now be included in the CRA build step
const appIncludes = [resolveApp('src'), resolveApp('../shared/src')]

const addConfig = (config, env) => {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => plugin.constructor.name !== 'ModuleScopePlugin',
  )

  config.module.rules[0].include = appIncludes
  config.module.rules[1].oneOf[2].include = appIncludes
  // config.module.rules[1].oneOf[2].options.plugins.push(
  //   require.resolve('babel-plugin-react-native-web'),
  // )
  config.module.rules.push({
    test: /\.ts$/, // This rule applies to files ending in ".js"
    use: 'babel-loader', // Use the "babel-loader" to process these files
  })
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' }),
  )

  return config
}

module.exports = override(
  addConfig,

  addExternalBabelPlugin('@babel/plugin-proposal-class-properties', {
    loose: true,
  }),
  addExternalBabelPlugin('@babel/plugin-transform-react-jsx'),
  addExternalBabelPlugin('@babel/plugin-transform-flow-strip-types'),
  addWebpackAlias({
    'react-native': 'react-native-web',
    'react-native-linear-gradient': 'react-native-web-linear-gradient',
    '@sentry/react-native': '@sentry/react',
  }),
)
