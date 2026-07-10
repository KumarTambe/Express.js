import express from 'express'
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookController.js'
import { checkAuth } from '../middleware/middleware.js'

const router = express.Router()

router.get('/', getAllBooks)
router.get('/:id', getBookById)
router.post('/', createBook)
router.put('/:id', updateBook)
router.delete('/:id', checkAuth, deleteBook)

export default router