import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/books', (req, res) => {
    res.json(books)
})

app.listen(3000, () => console.log("Server started at 3000"))