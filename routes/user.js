const express = require("express")
const fs = require("fs")
const path = require("path")

const userfilepath = path.join("c:/Users/USER/Documents/ALT School/BACK-END ENGINEERING/Js/Online-Library-System-Express", "db", "users.json")
const userRoute = express.Router();

userRoute.get("/", (req, res) => {
    res.json("Welcome to the user Route")
})

userRoute.post("/adduser", (req, res) => {
    const newUser = req.body
    usersDb.push(newUser);
    fs.writeFile(userfilepath, JSON.stringify(usersDb), (err) => {
        if (err) return res.status(400).send(err)
    })
    res.status(200).send("New User Added")
})

userRoute.get("/allusers", (req,res) => {
    fs.readFile(userfilepath, "utf-8", (err, users) => {
        if (err){
            res.status(400).json({
                error: "Server Error!"
            })
        }
        res.status(200).send(users)
    })
})

usersDb = JSON.parse(fs.readFileSync(userfilepath, 'utf8'));
module.exports = userRoute