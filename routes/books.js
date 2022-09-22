const express = require("express")

const bookRoute = express.Router();

const books = [
    {
       "title": "Things fall apart",
       "author": "Chinewe Achinbe",
       "year": 1972,
       "id": 1
    }
]

bookRoute.get("/", (req, res) => {
    res.json("Welcome to the Book Route")
})

bookRoute.post("/addbook", (req, res) => {
    const newBook = req.body
    const lastBook = books[books.length - 1]
    const lastBookId = lastBook.id
    newBook.id = lastBookId + 1
    books.push(newBook);

    res.send(books)
})

bookRoute.get("/allbooks", (req, res) => {
    res.json(books)
})


module.exports = bookRoute