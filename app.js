const express = require("express")
const bodyParser = require("body-parser")
const logger = require("morgan")

const PORT = 8000;
const app = express()




app.listen(PORT, () => {
    console.log(`Server running successfully at https://localhost:${PORT}/`)
})