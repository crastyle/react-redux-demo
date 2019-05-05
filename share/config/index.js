const env = process.env.ENV || 'dev';
const configForMerge = require('./' + env);
const R = require('ramda');

const config = {
  port: 5544,
  env: {
    isBrowser: process.versions ? false : true,
    ENV: env
  },
  mode: env
}

module.exports = R.merge(config, configForMerge);
