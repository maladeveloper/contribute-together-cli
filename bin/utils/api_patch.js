const axios = require('axios')
const { BASE_URL } = require('./constants')

const patchNewIntAmount = async (amount, intervalId) => {
  return (await axios.patch(BASE_URL + 'interval/' + intervalId.toString() + '/amount/', { amount })).status
}

module.exports = { patchNewIntAmount }
