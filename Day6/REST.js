import express from 'express'

const app = express()
app.use(express.json())

let students = [
    { id: 1, name: "Kumar" },
    { id: 2, name: "Priya" }
]

function logger(req, res, next) {
    console.log(`${req.method} sent request to ${req.url}`)
    next();
}

app.use(logger)

function checkAuth(req, res, next) {
    const isLoggedIn = true;
    if (isLoggedIn) {
        next();
    } else {
        res.status(401).send("Not logged in ")
    }
}


app.post('/students', (req, res) => {
    const newStudent = req.body
    students.push(newStudent)
    res.status(201).json({ message: "Student added", student: newStudent })
})

app.put('/students/:id', (req, res) => {
    const student = students.find((student) => student.id == req.params.id)
    if (!student) {
        res.send("Student not found")
    }
    student.name = req.body.name
    res.json({ message: "Student updated", student })
})

app.get('/students', (req, res) => {
    res.json(students)
})

app.get('/students/:id', (req, res) => {
    const filteredStudent = students.find((student) => student.id == req.params.id)
    res.json(filteredStudent)
})

app.delete('/students/:id', checkAuth, (req, res) => {
    students = students.filter((student) => student.id != req.params.id)
    res.json({ message: "Student Deleted" })
})

app.listen(3000, () => {
    console.log("server started at port 3000")
})


