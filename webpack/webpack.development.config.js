const path = require('path')
const webpack = require('webpack')
//const ThemePlugin = require('pubsweet-theme-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const fs = require('fs-extra')
const config = require('config')
const { pick } = require('lodash')
const rules = require('./common-rules')

const outputPath = path.resolve(__dirname, '..', '_build', 'assets')

// can't use node-config in webpack so save whitelisted client config into the build and alias it below
const clientConfig = pick(config, config.publicKeys)
fs.ensureDirSync(outputPath)
const clientConfigPath = path.join(outputPath, 'client-config.json')
fs.writeJsonSync(clientConfigPath, clientConfig, { spaces: 2 })

module.exports = [
  {
    // The configuration for the client
    name: 'app',
    target: 'web',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './app'],
    },
    output: {
      path: outputPath,
      filename: '[name].js',
      publicPath: '/assets/',
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules,
    },
    resolve: {
      modules: [
        path.resolve(__dirname, '..'),
        path.resolve(__dirname, '..', 'node_modules'),
        'node_modules',
      ],
      alias: {
        joi: 'joi-browser',
        config: clientConfigPath,
      },
      //plugins: [new ThemePlugin(config['pubsweet-client'].theme)],
      extensions: ['.js', '.jsx', '.json', '.scss'],
      enforceExtension: false,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
      }),
      // put dynamically required modules into the build
      new webpack.ContextReplacementPlugin(/./, __dirname, {
        [config.authsome.mode]: config.authsome.mode,
        [config.validations]: config.validations,
      }),
      new CopyWebpackPlugin([{ from: '../static' }]),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
      }),
    ],
    node: {
      fs: 'empty',
      __dirname: true,
    },
  },
]
