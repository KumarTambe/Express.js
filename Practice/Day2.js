// types of req.params and req.query

import express from 'express';

const app = express();
const books = [
    { id: 1, title: "Atomic Habits", author: "James Clear", year: 2018, genre: "self-help" },
    { id: 2, title: "Deep Work", author: "Cal Newport", year: 2016, genre: "self-help" },
    { id: 3, title: "Dune", author: "Frank Herbert", year: 1965, genre: "sci-fi" },
    { id: 4, title: "Neuromancer", author: "William Gibson", year: 1984, genre: "sci-fi" },
    { id: 5, title: "Sapiens", author: "Yuval Noah Harari", year: 2011, genre: "history" }
]

app.get('/books/recent', (req, res) => {
    res.json({ route: "/books/recent", message: "recent books handler fired" })
})

app.get('/books/:id', (req, res) => {
    if (req.params.id) {
        const book = books.find((b) => b.id === Number(req.params.id));
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: "Book doesnt exist" })
        }
    } else {
        res.status(404).json({ message: "Enter a valid id" })
    }
})

app.get('/books/genre/:genre', (req, res) => {
    if (req.params.genre) {
        const book = books.filter((b) => b.genre == req.params.genre)
        res.json(book);
    } else {
        res.json({ count: 0 });
    }
})

app.get('/search', (req, res) => {
    const author = req.query.author
    const year = req.query.year
    if (!author && !year) {
        res.json(books)
    } else if (author && !year) {
        const book = books.filter((b) => b.author == author)
        res.json(book);
    } else if (!author && year) {
        const book = books.filter((b) => b.year == year)
        res.json(book);
    } else {
        const book = books.filter((b) => b.author == author && b.year == year)
        res.json(book);
    }
})

app.get('/books/:id/summary', (req, res) => {
    if (req.params.id) {
        const book = books.find((b) => b.id === Number(req.params.id));
        const length = req.query.length;
        if (book) {
            if (length) {
                if (length == 'short') {
                    res.json({ summary: book.title })
                } else if (length == 'full') {
                    res.json(book)
                }
                else {
                    res.json({ summary: book.title })
                }
            } else {
                res.status(404).json({ message: "Book doesnt exist" })
            }
        } else {
            res.status(404).json({ message: "Enter a valid id" })
        }
    }
})



app.listen(3000, () => {
    console.log("Server started at port 3000")
})