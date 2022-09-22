const express = require("express")
const bodyParser = require("body-parser")

const userRoute = require("./routes/user")
const bookRoute = require("./routes/books")

const app = express()

app.use(bodyParser.json())
app.use("/users", userRoute)
app.use("/books", bookRoute)


app.get("/", (req, res) => {
    res.send("Welcome to the Home page") 
})




app.get("*", (req, res) => {
    res.status(404)
    res.json({
        error: "Page not Found"
    })
})
app.post("*", (req, res) => {
    res.status(404)
    res.json({
        error: "Page not Found"
    })
})
app.put("*", (req, res) => {
    res.status(404)
    res.json({
        error: "Page not Found"
    })
})
app.delete("*", (req, res) => {
    res.status(404)
    res.json({
        error: "Page not Found"
    })
})


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running successfully at https://localhost:${PORT}/`)
})

