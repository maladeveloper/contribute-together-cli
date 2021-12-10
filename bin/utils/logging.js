const chalk = require('chalk')
const l = console.log

const warn = (str) => l('⚠️  ' + chalk.yellow(str))
const WARN = (str) => l('⚠️  ' + chalk.bold.yellow(str.toUpperCase()))
const info = (str) => l(chalk.white(str))
const INFO = (str) => l(chalk.bold.white(str.toUpperCase()))
const error = (str) => l('❌ ' + chalk.red(str))
const ERROR = (str) => l('❌ ' + chalk.bold.red(str.toUpperCase()))
const success = (str) => l('✅ ' + chalk.green(str))
const SUCCESS = (str) => l('✅ ' + chalk.bold.green(str.toUpperCase()))

module.exports = { warn, WARN, info, INFO, error, ERROR, success, SUCCESS }
