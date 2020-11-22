const router = require('express').Router()
const axios = require('axios')
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require("jsonwebtoken")
const userModel = require('../model/usermodel')


router.post('/stock', async (req, res) => {
    try {
        const data = await getStock(req.body.stock, req.body.interval)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.json({error: err})
    }
})

router.post('/watchlist', async (req, res) => {
    try {
        const data = await getStock(req.body.stock, req.body.interval)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.json({error: err})
    }
})

router.get('/watchlist', authenticateUser, (req, res) => {

   res.json(posts.filter(post => post.username === req.user.name));
})

function authenticateUser(req, res, next) {
    const authenticationHeader = req.headers['authorization'];
    const tome = authenticationHeader && authenticationHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.jwtKey, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

router.get('/logout', logout_get);

function logout_get(req, res) {
    res.cookie('jwt', '', {maxAge: 1});
}

async function getStock(ticker, interval='') {
    //const functionType = 'TIME_SERIES_INTRADAY'
    const symbol = ticker.toUpperCase()
    //const interval = '30min'
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=full&apikey=${process.env.API_KEY}`
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