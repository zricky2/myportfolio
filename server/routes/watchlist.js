const express  = require('express');
const router = express.Router();
const Stock = require('../model/stockmodel');
const auth = require('../authenticate');
router.get("/", auth, (req, res, next) => {
    Stock.find({email: req.headers.email})
      .exec()
      .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.post('/', auth, (req, res, next) => {
    const newStock = new Stock({
        ticker: req.body.ticker,
        email: req.body.email
    })
    newStock.save().then(res => console.log(res)).catch(err => console.log(err))

    res.status(200).json({
        message: 'Handling POST requests to /watchlist',
        ticker: newStock,
    });
});

router.delete("/", auth, (req, res, next) => {
    Stock.deleteOne({ _id: req.body.id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
module.exports = router;