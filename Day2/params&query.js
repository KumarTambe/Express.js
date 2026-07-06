import express from 'express'

const app = express()

app.get('/movies/:id', (req, res) => {
    res.send(`Movie ID: ${req.params.id} , Language : ${req.query.lang}`)
})

app.listen(3000, () => {
    console.log("Server started at port 3000")
})