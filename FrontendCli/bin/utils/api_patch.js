const axios = require('axios')
const PORT = 8000
const BASE_URL = `http://127.0.0.1:${PORT}/api/`

const patchNewIntAmount = async (amount, intervalId) => {
  return (await axios.patch(BASE_URL + 'interval/' + intervalId.toString() + '/amount/', { amount })).status
}

module.exports = { patchNewIntAmount }
