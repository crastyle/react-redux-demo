export function wireReducersInModules() {
  if (process.env.BROWSER) {
    const reqContext = require.context('../../modules', true, /.*reducer.js/);
    return reqContext.keys().map(reqContext).reduce((acc, curr) => ({ ...acc, ...curr.default }), {})
  }
  const glob = require('glob')
  let reducers = glob.sync('../../modules/*.reducer.js')
  return reducers.map(r => require('./' + path.join(__dirname, r))).reduce((acc, curr) => ({ ...acc, ...curr.default }), {})
}

export function wireSagasInModules() {
  if (process.env.BROWSER) {
    const reqContext = require.context('../../modules', true, /.*saga.js/);
    return reqContext.keys().map(reqContext).map(m => m.default)
  }
  const glob = require('glob')
  const path = require('path')
  let reducers = glob.sync('../../modules/*.saga.js')
  return reducers.map(r => require('./' + path.join(__dirname, r))).map(m => m.default)
}

export function wireActionsInModules() {
  if (process.env.BROWSER) {
    const reqContext = require.context('../../modules', true, /.*action.js/);
    return reqContext.keys().map(reqContext).reduce((acc, curr) => ({ ...acc, ...curr.default }), {})
  }
  const glob = require('glob')
  const path = require('path')
  let reducers = glob.sync('../../modules/*.action.js')
  return reducers.map(r => require('./' + path.join(__dirname, r))).map(m => m.default)
}