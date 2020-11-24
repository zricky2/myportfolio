const router = require('express').Router()
const userModel = require('../model/usermodel')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

router.post('/signin', async (req, res) => {
    const jwtKey = process.env.jwtKey
    const jwtExpirySeconds = 300
    try {
        const client = await userModel.findOne({ email: req.body.email });
        if (!client) {
            console.log("Email does not exist")
            return res.status(400).json({ result: "Email does not exist" })
        }
        if (await bcrypt.compare(req.body.password,client.password)) {
            // Create a new token with the username in the payload
            // and which expires 300 seconds after issue
            const token = jwt.sign({ client }, jwtKey, {
                algorithm: "HS256",
                expiresIn: "1hr",
            })
            //console.log("token:", token)
            // res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })

            res.status(200).json({result: "success",
                                  token: token})
        } else {
            res.status(400).json({ result: "Email and/or Password is incorrect" })
            console.log("Email and/or Password is incorrect")
        }
    } catch (err) {
        res.status(500).json({ result: err });
        console.log("User not found: " + err)
    }
});

module.exports = router
