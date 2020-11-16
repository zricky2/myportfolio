const router = require('express').Router()
const userModel = require('../model/usermodel')
const jwt = require("jsonwebtoken")

router.post('/signin', async (req, res) => {
    const user = users.find({ 'email': req.body.email })
    if (user === null) {
        res.status(400).json({ result: "Email does not exist" })
        console.log("Email does not exist")
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            // Create a new token with the username in the payload
            // and which expires 300 seconds after issue
            const token = jwt.sign({ username }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })
            console.log("token:", token)
            res.status(200).cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
            res.json({ result: "Success" })
        } else {
            res.status(400).json({ result: "Email and/or Password is incorrect" })
            console.log("Email and/or Password is incorrect")
        }
    } catch (err) {
        res.status(500).json({ result : err });
        console.log("User not found: " + err)
    }
});

module.exports = router