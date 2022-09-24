const express = require("express")
const fs = require("fs")
const path = require("path")

const bookfilepath = path.join("c:/Users/USER/Documents/ALT School/BACK-END ENGINEERING/Js/Online-Library-System-Express", "db", "books.json")
const bookloanfilepath = path.join("c:/Users/USER/Documents/ALT School/BACK-END ENGINEERING/Js/Online-Library-System-Express", "db", "loan.json")

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

bookRoute.delete("/delete/:id", (req, res) => {
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
                    message: 'Internal Server Error. Could not delete book from database'
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
        if(bookdetails === undefined) return res.status(404).send("Incorrect name entered")
        
        bookLoanDb.push(bookdetails);
        fs.writeFile(bookloanfilepath, JSON.stringify(bookLoanDb), (err) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error. Could not save book to database.'
                });
            }
            res.status(200)
        });

        const bookId = bookdetails.id
        const bookIndex = booksObj.findIndex(book => book.id === bookId)
        booksObj.splice(bookIndex, 1)   

        fs.writeFile(bookfilepath, JSON.stringify(booksObj), (err) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error. Could not delete book from Master database.'
                });
            }
            res.status(200).send("Loan Successful")
        });

    })
})

bookRoute.post("/returnbook", (req, res) =>{
    const booktitle = req.body.title;

    fs.readFile(bookloanfilepath, "utf8", (err, books) => {
        if (err) {
            res.status(400).send("An error occured")
        }
        const booksObj = JSON.parse(books)
        const bookdetails = booksObj.find(book => book.title === booktitle)
        if(bookdetails === undefined) return res.status(404).send("Incorrect name entered")

        booksDb.push(bookdetails)
        fs.writeFile(bookfilepath, JSON.stringify(booksDb), (err) => {
            if (err) {
                res.status(500).send({
                    message: 'Internal Server Error. Could not return book to book database.'
                });
            }
        });

        bookId = bookdetails.id
        const bookIndex = booksObj.findIndex(book => book.id === bookId)
        booksObj.splice(bookIndex, 1)
        
        fs.writeFile(bookloanfilepath, JSON.stringify(booksObj), (err) => {
            if (err) {
                res.status(500).send({
                    message: 'Internal Server Error. Could not remove book from loaned Book database.'
                });
            }   
        });
        res.status(200).send("Book has been Returned")
    })
})

bookRoute.put("/update", (req, res) => {
    const bookupdate = req.body
    const bookupdateId = bookupdate.id

    fs.readFile(bookfilepath, "utf8", (err, books) => {
        if (err) {
            res.status(400).send("An error occured")
        }

        const booksObj = JSON.parse(books)
        const bookIndex = booksObj.findIndex(book => book.id === bookupdateId)

        if (bookIndex === -1) return res.status(404).send("Book with the specified id not found!")

        const updatedBook = { ...booksObj[bookIndex], ...bookupdate }
        booksObj[bookIndex] = updatedBook

        fs.writeFile(bookfilepath, JSON.stringify(booksObj), (err) => {
            if (err) {
                res.status(500).send({
                    message: 'Internal Server Error. Could update book.'
                });
            }
            res.status(200).send("Update successful!");
        });

    })
})


booksDb = JSON.parse(fs.readFileSync(bookfilepath, 'utf8'));
bookLoanDb = JSON.parse(fs.readFileSync(bookloanfilepath, 'utf8'));
module.exports = bookRoute