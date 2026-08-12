import express from 'express'

const app = express();
app.use(express.json())

let books = [
    { id: 1, title: "Atomic Habits", author: "James Clear", year: 2018 }
]

app.post('/books', (req, res) => {
    if (!req.body.title || !req.body.author) {
        res.status(400).json({ message: "Enter all the information" })
    } else {
        const newBook = req.body;
        books.push(newBook);
        res.status(201).json({ message: "Book added" })
    }
})

app.put('/books/:id', (req, res) => {
    const book = books.find((b) => b.id == req.params.id)
    const body = req.body;
    if (!book) {
        res.status(404).json({ message: "Book doesnt exist" })
    } else {
        if (!body) {
            res.status(400).json({ message: "Bad request" })
        } else {
            book.title = req.body.title;
            book.author = req.body.author;
            book.year = req.body.year;
            res.status(200).json({ message: "Book updated successfully" })
        }
    }
})

app.patch('/books/:id', (req, res) => {
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

app.delete('/books/:id', (req, res) => {
    const book = books.find((b) => b.id == req.params.id)
    if (!book) {
        res.status(404).json({ message: "Book not found" })
    } else {
        books = books.filter((b) => b.id != req.params.id)
        res.status(200).json({ message: "Book deleted successfully" })
    }
})

app.post('/books/bulk', (req, res) => {
    let added = 0;
    let skipped = 0;
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ message: "Invalid" })
    } else {
        for (let i = 0; i < req.body.length; i++) {
            if (req.body[i].title && req.body[i].author) {
                const book = req.body[i];
                book.id = books.length + 1;
                books.push(book)
                added++;
            } else {
                skipped++;
                continue;
            }
        }
    }
    res.status(200).json({ added: added, skipped: skipped })
})

app.listen(3000, () => {
    console.log("server started at port 3000")
})