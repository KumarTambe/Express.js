import express from 'express'

const app = express()

app.get('/hello', (req, res) => {
    res.send("hello there!")
})

app.get('/about', (req, res) => {
    res.send("This is the about page!")
})

app.get('/contact', (req, res) => {
    res.send("Contact us at thismail@gmail.com!")
})

app.get('/skills', (req, res) => {
    res.json(["React", "Node", "Express"])
})

app.listen(3000, () => {
    console.log("server started at port no. 3000")
})