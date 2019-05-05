module.exports = function genTmpl(chunks) {
  return `// this is a auto gen file, do not modify it
const createServer = require('./start').default
const chunks = ${JSON.stringify(chunks)}
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
`
}