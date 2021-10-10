const axios = require('axios');
const PORT = 8000
BASE_URL = `http://127.0.0.1:${PORT}/api/`

const getIntervals = async ()=> (await axios.get(BASE_URL + 'intervals')).data

module.exports = { getIntervals }
