const router = require('express').Router()
const userModel = require('../model/usermodel')

router.post('/signin', async (req, res) => {
      const user = users.find({ 'email': req.body.email})
      if (user === null) {
          return res.status(401).send(JSON.stringify({result: "Email does not exist"}))
      }
      try {
          if (await bcrypt.compare(req.body.password, user.password)) {
              res.status(200).send()
          } else {
            res.status(401).send(JSON.stringify({result: "Email and/or Password is incorrect"}))
          }
      } catch (err) {
      res.status(500).send(err);
      console.log("User not found: " + err)
    }
});

module.exports = router