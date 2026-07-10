let books = [
    { id: 1, title: "X book", author: "ABCD" },
    { id: 2, title: "Y book", author: "EFGH" },
    { id: 3, title: "Z book", author: "IJKL" }
]

export function getAllBooks(req, res) {
    res.json({ message: "These are the following books", books })
}

export function getBookById(req, res) {
    const book = books.find((book) => book.id == req.params.id)
    if (!book) {
        return res.status(404).json({ message: "Book not found" })
    }
    res.status(200).json(book)
}

export function createBook(req, res) {
    const newBook = req.body
    if (!req.body.title) {
        return res.status(400).json({ message: "Enter title pls" })
    }
    books.push(newBook)
    res.status(201).json({ message: "book added successfully" })
}

export function updateBook(req, res) {
    const book = books.find((book) => book.id == req.params.id)
    if (!book) {
        return res.status(404).send("Book not found")
    }
    book.title = req.body.title
    book.author = req.body.author
    res.json({ message: "Book updated successfully" })
}

export function deleteBook(req, res) {
    const book = books.find((book) => book.id == req.params.id)
    if (!book) {
        return res.status(404).json({ message: "Book not found" })
    } else {
        books = books.filter((book) => book.id != req.params.id)
    }
    res.json({ message: "Book deleted successfully" })
}