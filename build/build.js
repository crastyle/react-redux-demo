require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var webpackServerConfig = require('./webpack.server.conf')
var settings = require('./webpack.settings.json')
var spinnerFE = ora('building for front end production...')
var spinnerBE = ora('building for back end production...')
var fs = require('fs-extra')
var genTmpl = require('./ssrTmpl')

console.log(chalk.yellow(
  '  Task: building for Frontend'
))

spinnerFE.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinnerFE.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Frontend Build complete.\n'))

    // console.log(chalk.yellow(
    //   '  Task: building for Backend'
    // ))

    // spinnerBE.start()

    // const staticDir = path.resolve(__dirname, '../static')
    // fs.emptyDirSync(staticDir)
    // fs.copySync(
    //   path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
    //   staticDir
    // )

    // const chunks = {
    //   javascript: [],
    //   style: []
    // }
    // stats.compilation.chunks.map(chunk => {
    //   chunk.files.map(file => {
    //     let fileName = file.split('/')[file.split('/').length - 1]
    //     if (file.endsWith('.js') && !/^\d/.test(fileName)) {
    //       if (fileName.startsWith('manifest')) {
    //         chunks.javascript = [file, ...chunks.javascript]
    //       } else {
    //         chunks.javascript.push(file)
    //       }
    //     }
    //     else if (file.endsWith('.css')) {
    //       chunks.style.push(file)
    //     }
    //   })
    // })

    // require('fs').writeFileSync(path.join(__dirname, '..', settings.server.input, 'index_ssr.js'), genTmpl(chunks))
    // webpackServerConfig.entry.server = ['./' + path.join(settings.server.input, '/index_ssr.js')]

    // webpack(webpackServerConfig, function(err, stats) {
    //   if (err) throw err
    //   spinnerBE.stop()
    //   process.stdout.write(stats.toString({
    //     colors: true,
    //     modules: false,
    //     children: false,
    //     chunks: false,
    //     chunkModules: false
    //   }) + '\n\n')
    //   console.log(chalk.cyan('  Backend Build complete.\n'))
    // })
    
  })
})
