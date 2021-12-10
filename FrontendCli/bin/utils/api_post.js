const axios = require('axios')
const { BASE_URL } = require('./constants')

const postNewIncome = async (incomeLoad) => (await axios.post(BASE_URL + 'income/', incomeLoad)).status

module.exports = { postNewIncome }
