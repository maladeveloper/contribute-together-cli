const axios = require('axios');
const PORT = 8000
BASE_URL = `http://127.0.0.1:${PORT}/api/`


const postNewIncome = async (incomeLoad) => (await axios.post( BASE_URL + 'income/', incomeLoad)).status 


module.exports = { postNewIncome }
