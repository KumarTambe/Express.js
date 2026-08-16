// JWT authentication 

import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const users = []
const app = express()
app.use(express.json())

app.post('/register', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
        res.status(400).json({ message: "Email and password required." })
    } else {
        const newUser = { id: users.length + 1, email, password }
        users.push(newUser)
        res.status(201).json({ message: "Account created successfully" })
    }
})

app.post('/login', (req, res) => {
    const user = users.find((u) => u.email == req.body.email && u.password == req.body.password)
    if (!user) {
        res.status(401).json({ message: " Authentication failed" })
    } else {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).json({ message: "Logged in successfully", token })
    }
})

function protect(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: "Token not found" })
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        } catch (err) {
            res.status(401).json({ message: "Invalid token" })
        }
    }
}

app.get('/profile', protect, (req, res) => {
    res.status(200).json({ message: "Welcome", user: req.user })
})


