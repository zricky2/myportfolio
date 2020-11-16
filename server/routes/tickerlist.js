const router = require('express').Router()
const csv = require('csvtojson')
const axios = require('axios')
const fs = require('fs')

router.get('/tickerlist', async (req, res) => {
    try {
        const jsonArray = await csv().fromFile('./listing_status.csv');
        let newList = []
        jsonArray.forEach(stock => {
            newList.push({symbol: stock.symbol, name: stock.name})
        })
        const data = JSON.stringify(newList)
        /* fs.writeFile('./tickers.json', data, (err) => {
            if (err) throw err;
            console.log('Saved!');
         })  */
         res.send(data)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;