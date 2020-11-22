const express  = require('express');
const router = express.Router();
const Stock = require('../model/stockmodel');
const auth = require('../authenticate');
router.get("/", auth, (req, res, next) => {
    Stock.find()
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
        ticker: req.body.ticker
    })
    newStock.save().then(res => console.log(res)).catch(err => console.log(err))

    res.status(200).json({
        message: 'Handling POST requests to /products',
        ticker: newStock
    });
});

router.get('/:stockId', (req, res, next) => {
    const id = req.params.stockId;
    Stock.findById(id).exec()
    .then(doc => {
        console.log(doc)
        res.status(200).json(doc)
    })
    .catch(err => res.status(500).json({error: err}))
});


router.delete("/:stockId", auth, (req, res, next) => {
    const id = req.params.stockId;
    Stock.remove({ _id: id })
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