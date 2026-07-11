import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const app = express()
app.use(express.json())
dotenv.config()

let users = []

app.post('/register', (req, res) => {
    const newUser = req.body
    users.push(newUser)
    res.status(201).json({ message: "User registered successfully" })
})

app.get('/profile', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        res.json(decoded)
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
    }
})

app.post('/login', (req, res) => {
    const user = users.find((user) => user.name == req.body.name && user.password == req.body.password)
    if (!user) {
        return res.status(401).json({ message: "User not found " })
    }
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET)
    res.status(200).json({ message: "Login successful", token })
})

app.listen(3000, () => {
    console.log("Server started at port 3000")
})