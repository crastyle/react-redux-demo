const shareConfig = require('../../share/config');
import R from 'ramda';
const ENV_DEV = 'dev';
const ENV_PRD = 'prd';
const ENV_QA = 'qa';
const ENV_CI = 'ci';

export default R.merge({
    ENV_DEV, ENV_PRD, ENV_QA, ENV_CI
},shareConfig)