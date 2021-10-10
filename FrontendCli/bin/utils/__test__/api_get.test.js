const { getIntervals } = require('../api_get.js')
const {  restartServer } = require('../api.js')
const axios = require('axios');


jest.setTimeout(300000)
describe('getIntervals', ()=>{
    it('should return the intervals',async ()=>{
        await restartServer()
        intervals = await getIntervals()
        expect(Array.isArray(intervals)).toBe(true);
        console.log(intervals)
        intervals.forEach((interval) =>{
            expect(Object.keys(interval).sort()).toEqual(['start_date', 'end_date','id'].sort())
            expect(typeof interval.id).toBe('number')
            expect(typeof interval.start_date).toBe('string')
            expect(typeof interval.end_date).toBe('string')
            expect(interval.start_date.length).toEqual(10)
            expect(interval.end_date.length).toEqual(10)
        })
    })
})
