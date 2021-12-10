const { BASE_URL } = require('./constants')
const nock = require('nock')

const mockPostNewIncome = () => {
  nock(BASE_URL, { allowUnmocked: true }).post('/income/', body =>
    Object.keys(body).sort().toString() === ['incomesource', 'amount', 'date'].sort().toString()
  ).reply(201)
}

const mockPatchNewIntAmount = (id) => {
  nock(BASE_URL, { allowUnmocked: true }).intercept('/interval/' + id.toString() + '/amount/', 'PATCH').reply(204)
}

module.exports = { mockPostNewIncome, mockPatchNewIntAmount }
