const router = require('express').Router()
const userModel = require('../model/usermodel')
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const emailExist = await userModel.findOne({ email: req.body.email });
    if (emailExist) {
      console.log("Email already exist")
      return res.status(400).json({result: "Email already exist"});
    } else {
      const salt = await bcrypt.genSalt()// default round is 10
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      const user = new userModel({ email: req.body.email, password: hashedPassword });
      await user.save();
      console.log("registered")
      res.status(200).json({result: "Success"});
    }
  } catch (err) {
    res.status(500).json({result: err});
    console.log("Error creating user: " + err)
  }
});

module.exports = router