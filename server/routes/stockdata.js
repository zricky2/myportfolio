const router = require('express').Router()
const axios = require('axios')

router.post('/stock', async (req, res) => {
    try {
        const data = await getStock(req.body.stock, req.body.functionType, req.body.interval)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.json({error: err})
    }
})

async function getStock(ticker, functionType, interval='') {
    //const functionType = 'TIME_SERIES_INTRADAY'
    const symbol = ticker.toUpperCase()
    //const interval = '30min'
    const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&interval=${interval}&outputsize=full&apikey=${process.env.API_KEY}`
    try {
        const response = await axios(url)
        const keys = Object.keys(response.data); //returns the two keys on the first level
        const timeSeries = response.data[keys[1]];
        return timeSeries
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports = router;