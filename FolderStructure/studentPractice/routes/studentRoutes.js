import express from 'express'
import { checkAuth } from '../middleware/middleware.js'
import { getAllStudents, getStudentById, updateStudent, deleteStudent, createStudent } from '../controller/studentController.js'

const router = express.Router()

router.get('/', getAllStudents)
router.get('/:id', getStudentById)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.delete('/:id', checkAuth, deleteStudent)

export default router