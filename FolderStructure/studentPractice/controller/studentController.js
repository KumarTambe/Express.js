

let students = [
    { id: 1, name: "Kumar", age: 69 },
    { id: 2, name: "Rohan", age: 61 },
    { id: 3, name: "Anish", age: 66 },
]

export function getAllStudents(req, res) {
    res.status(200).json({ message: "List of students :", students })
}

export function getStudentById(req, res) {
    const student = students.find((student) => student.id == req.params.id)
    if (!student) {
        return res.status(404).json({ message: "Student not found" })
    } else {
        res.status(200).json({ message: "Student found !", student })
    }
}

export function createStudent(req, res) {
    const newStudent = req.body
    if (!req.body.name) {
        return res.status(400).json({ message: "Name is required" })
    }
    students.push(newStudent)
    res.status(201).json({ message: "Student added successfully" })
}

export function updateStudent(req, res) {
    const student = students.find((student) => student.id == req.params.id)
    if (!student) {
        return res.status(404).json({ message: "Student not found" })
    }
    student.name = req.body.name
    student.age = req.body.age
    res.status(200).json({ message: "Student updated successfully" })
}

export function deleteStudent(req, res) {
    const student = students.find((student) => student.id == req.params.id)
    if (!student) {
        return res.status(404).json({ message: "Student not found" })
    } else {
        students = students.filter((student) => student.id != req.params.id)
    }
    res.status(200).json({ message: "Student deleted successfully" })
}