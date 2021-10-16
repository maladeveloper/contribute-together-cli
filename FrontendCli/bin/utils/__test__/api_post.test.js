const { postNewIncome } = require('../api_post')
const { mockPostNewIncome } = require('../mocks')
const {  restartServer } = require('../api.js')
const axios = require('axios');

describe('postNewIncome', () => {
  const incomeLoad = {
    incomesource: 11, 
    amount: 99, 
    date: '2021-10-07'
  }

  it('posts new income to the db', async () =>{ 
    mockPostNewIncome()
    const responseStatus = await postNewIncome(incomeLoad) 
    expect(responseStatus).toEqual(201)
  })
})
