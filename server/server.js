const express = require('express')
const app = express()
const stockDataRouter = require('./routes/stockdata')
const registerRouter = require('./routes/register')
const signinRouter = require('./routes/signin')
const indexRouter = require('./routes/index')
const connectToDB = require('./model/db')
const fs = require('fs')
const axios = require('axios')

app.use(express.json()); //Used to parse JSON bodies

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({result: "Error Occurred"})
})

//connect to Database
connectToDB();

//routes
app.use(indexRouter)
app.use(stockDataRouter)
app.use(registerRouter)
app.use(signinRouter)


//create and start web server
const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Server has started and is listening...');
});

//getListing()

async function getListing() {
    const functionType = 'LISTING_STATUS'
    const url = `https://www.alphavantage.co/query?function=${functionType}&apikey=${process.env.API_KEY}`
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'blob'
        })
        fs.writeFile('listing_status.csv', response.data, (err) => {
            if (err) throw err;
            console.log('Saved!');
        });
    } catch (err) {
        console.log(err)
        return null
    }
}