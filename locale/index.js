const locale = require('./locale')
const language = localStorage.getItem('lang') || 'en'
module.exports = locale[language]