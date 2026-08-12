// middleware

import express from 'express'

const app = express()
app.use(express.json())

let books = [
    { id: 1, title: "Atomic Habits", author: "James Clear", year: 2018 }
]

function requestLogger(req, res, next) {
    console.log(`${req.method} used by ${req.url}`)
    next()
}

function validateBlock(req, res, next) {
    if (req.body.title && req.body.author) {
        next();
    } else if (req.body.title && !req.body.author) {
        res.status(400).json({ message: "Author value missing" })
    } else if (!req.body.title && req.body.author) {
        res.status(400).json({ message: "Title value missing" })
    } else {
        res.status(400).json({ message: "Title and Author value missing" })
    }
}

function checkApiKey(req, res, next) {
    if (req.headers['x-api-key']) {
        if (req.headers['x-api-key'] == 'secret123') {
            next();
        } else {
            res.status(403).json({ message: "Not allowed" })
        }
    } else {
        res.status(401).json({ message: "Not found" })
    }
}

function attachUser(req, res, next) {
    req.user = { name: "Kumar", role: "admin" }
    next()
}

function requireAdmin(req, res, next) {
    if (req.user.role == 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Not allowed" })
    }
}

app.use(requestLogger)

app.post('/books', validateBlock, (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json({ message: "Book added" })
})


app.delete('/books/:id', checkApiKey, (req, res) => {
    const book = books.find((b) => b.id == req.params.id)
    if (!book) {
        res.status(404).json({ message: "Book not found" })
    } else {
        books = books.filter((b) => b.id != req.params.id)
        res.status(200).json({ message: "Book deleted successfully" })
    }
})

app.patch('/books/:id', attachUser, requireAdmin, (req, res) => {
    const book = books.find((b) => b.id == req.params.id)
    if (!book) {
        res.status(404).json({ message: "book not found" })
    } else {
        if (!req.body) {
            res.status(400).json({ message: "Bad request" })
        } else {
            if (req.body.title) book.title = req.body.title
            if (req.body.author) book.author = req.body.author
            if (req.body.year) book.year = req.body.year

            res.status(200).json({ message: "Book updated successfully" })
        }
    }
})