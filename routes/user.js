const express = require("express")

const userRoute = express.Router();

const users = [
    {
        "name": "Ajayi Emmanuel",
        "username": "Emman34@",
        "email": "emmanueltester2@gmail.com",
        "phonenumber": "080324435121",
        "address": "17, elepo street banada anthony",
        "password": "tester23?"
    }
]

userRoute.get("/", (req, res) => {
    res.json("Welcome to the user Route")
})

userRoute.post("/adduser", (req, res) => {
    const newUser = req.body
    users.push(newUser);
    res.send(users)
})


module.exports = userRoute