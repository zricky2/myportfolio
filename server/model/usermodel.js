const mongoose = require('mongoose')
//Define a schema
let UserSchema = new mongoose.Schema({
  email: { type: String, minlength: 3, maxlength: 50, required: true },
  password: { type: String, minlength: 1, maxlength: 200, required: true }
});

const Users = mongoose.model("accounts", UserSchema)

module.exports = Users;
