const PORT = 8000
BASE_URL = `http://127.0.0.1:${PORT}/api/`
const nock = require('nock')

const mockPostNewIncome = () => {
    nock(BASE_URL, { allowUnmocked: true }).post('/income/', body => 
      Object.keys(body).sort().toString() === ['incomesource', 'amount', 'date'].sort().toString()
    ).reply(201)
}

module.exports = { mockPostNewIncome }
