const router = require('express').Router()

router.get('/', async (req, res) => {
    try {
        const data = await getListing()
        console.log("Data is returned")
        res.send(data)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

async function getListing() {
    const functionType = 'LISTING_STATUS'
    const url = `https://www.alphavantage.co/query?function=${functionType}&apikey=${process.env.API_KEY}`
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

module.exports = router