const express = require("express")
const fs = require("fs")
const path = require("path")

const bookfilepath = path.join("c:/Users/USER/Documents/ALT School/BACK-END ENGINEERING/Js/Online-Library-System-Express", "db", "books.json")
const bookloanfilepath = path.join("c:/Users/USER/Documents/ALT School/BACK-END ENGINEERING/Js/Online-Library-System-Express", "db", "loan.json")

bookLoanDb = []

const bookRoute = express.Router();

bookRoute.get("/", (req, res) => {
    res.json("Welcome to the Book Route")
})

bookRoute.post("/addbook", (req, res) => {
    const newBook = req.body
    const lastBook = booksDb[booksDb.length - 1]
    const lastBookId = lastBook.id
    newBook.id = lastBookId + 1

    booksDb.push(newBook);
    fs.writeFile(bookfilepath, JSON.stringify(booksDb), (err) => {
        if (err){
            res.status(400).send(err)
        }
        res.status(200).send(newBook)
    })
})

bookRoute.post("/delete/:id", (req, res) => {
    const bookid = JSON.parse(req.params.id)
    fs.readFile(bookfilepath, "utf8", (err, books) => {
        if (err) {
            res.status(400).send("An error occured")
        }

        const booksObj = JSON.parse(books)
        const bookIndex = booksObj.findIndex(book => book.id === bookid)

        if (bookIndex === -1) {
            res.status(404).send("Book with the specified id not found!")
            return
        }
        booksObj.splice(bookIndex, 1)
        fs.writeFile(bookfilepath, JSON.stringify(booksObj), (err) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error. Could not save book to database.'
                });
            }
            res.status(200).send("Deletion successful!");
        });

    })
})

bookRoute.post("/loan", (req, res) => {

    const booktitle = req.body.title
    fs.readFile(bookfilepath, "utf8", (err, books) => {
        if (err) {
            res.status(400).send("An error occured")
        }

        const booksObj = JSON.parse(books)
        const bookdetails = booksObj.find(book => book.title === booktitle)
        const bookId = bookdetails.id
        const bookIndex = booksObj.findIndex(book => book.id === bookId)

        if (bookIndex === -1) {
            res.status(404).send("Book with the specified id not found!")
            return
        }
        
        bookLoanDb.push(bookdetails);
        fs.writeFile(bookloanfilepath, JSON.stringify(bookLoanDb), (err) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error. Could not save book to database.'
                });
            }
            res.status(200)
        });

        booksObj.splice(bookIndex, 1)             
        fs.writeFile(bookfilepath, JSON.stringify(booksObj), (err) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error. Could not save book to database.'
                });
            }
            res.status(200).send("Loan Successful")
        });

    })
})


// bookRoute.get("/allbooks", (req, res) => {
//     res.json(books)
// })

booksDb = JSON.parse(fs.readFileSync(bookfilepath, 'utf8'));
bookLoanDb = JSON.parse(fs.readFileSync(bookloanfilepath, 'utf8'));
module.exports = bookRoute