import express from 'express'

const app = express()
app.use(express.json())

let students = [
    { id: 1, name: "Kumar" },
    { id: 2, name: "Priya" }
]

app.post('/students', (req, res) => {
    const newStudent = req.body
    students.push(newStudent)
    res.status(201).json({ message: "Student added", student: newStudent })
})

app.get('/students', (req, res) => {
    res.json(students)
})

app.get('/students/:id', (req, res) => {
    const filteredStudent = students.find((student) => student.id == req.params.id)
    res.json(filteredStudent)
})

app.delete('/students/:id', (req, res) => {
    students = students.filter((student) => student.id != req.params.id)
    res.json({ message: "Student Deleted" })
})

app.listen(3000, () => {
    console.log("server started at port 3000")
})


