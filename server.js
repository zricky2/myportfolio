const express = require('express')
const app = express()
const tickerRoute = require('./routes/tickerRoute')
const axios = require('axios')
const bodyParser = require('body-parser')


const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Listening at http://' + server.address().address + ':' 
    + server.address().port);
});


//app.use(tickerRoute)
app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json()); //allows you to use req.body

app.post("/stock", async (req, res) => {
    console.log("pop")
    const data = await getStock(req.body.stock)
    console.log(data)
    res.send(data)
})

async function getStock(ticker) {
    const symbol = ticker.toUpperCase()
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=30min&apikey=${process.env.API_KEY}`
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
