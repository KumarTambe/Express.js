import express from 'express'

const app = express()
app.use(express.json())

let books = [
    { id: 1, title: "X book", author: "ABCD" },
    { id: 2, title: "Y book", author: "EFGH" },
    { id: 3, title: "Z book", author: "IJKL" }
]

// logger function 

function logger(req, res, next) {
    console.log(`${req.method} has requested for ${req.url}`)
    next()
}

app.use(logger)

// check auth function

function checkAuth(req, res, next) {
    const isLoggedIn = true;
    if (!isLoggedIn) {
        return res.status(401).send("Please login")
    } else {
        next()
    }
}

app.get('/books', (req, res) => {
    res.json({ message: "These are the following books", books })
})

app.get('/books/:id', (req, res) => {
    const book = books.find((book) => book.id == req.params.id)
    if (!book) {
        return res.status(404).json({ message: "Book not found" })
    }
    res.status(200).json(book)
})

app.post('/books', (req, res) => {
    const newBook = req.body
    if (!req.body.title) {
        return res.status(400).json({ message: "Enter title pls" })
    }
    books.push(newBook)
    res.status(201).json({ message: "book added successfully" })
})

app.put('/books/:id', (req, res) => {
    const book = books.find((book) => book.id == req.params.id)
    if (!book) {
        return res.status(404).send("Book not found")
    }
    book.title = req.body.title
    book.author = req.body.author
    res.json({ message: "Book updated successfully" })
})

app.delete('/books/:id', checkAuth, (req, res) => {
    const book = books.find((book) => book.id == req.params.id)
    if (!book) {
        return res.status(404).json({ message: "Book not found" })
    } else {
        books = books.filter((book) => book.id != req.params.id)
    }
    res.json({ message: "Book deleted successfully" })
})

function errorHandler(err, req, res, next) {
    console.log(err)
    res.status(500).json({ message: "something went wrong !" })
}

app.use(errorHandler)

app.listen(3000, () => {
    console.log("server started at port 3000")
})