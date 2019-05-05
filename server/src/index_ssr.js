// this is a auto gen file, do not modify it
const createServer = require('./start').default
const chunks = {"javascript":["static/js/manifest.a1e97e91a2bad12f06dc.js","static/js/vendor.7d75a7bc1c19189dc9f4.js","static/js/app.857872057c19d1c31d07.js"],"style":["static/css/app.79be6fe15a6aabd10d703e56e71b0f10.css"]}
const { JSDOM } = eval("require('jsdom')");
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' })
global.window = dom.window
global.document = window.document
global.navigator = window.navigator
const parameter = {
  chunks() {
    return chunks
  }
}
createServer(parameter)
