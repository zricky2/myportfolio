const mongoose = require('mongoose')
//Define a schema
let StockSchema = new mongoose.Schema({
  ticker: String,
  email: String
});


module.exports = mongoose.model("Stock", StockSchema);