import express from 'express'
import { getDishReviews, addReview } from '../controllers/dishController.js'

const router = express.Router()


router.get('/:dishId/reviews', getDishReviews)
router.post('/:dishId/reviews', addReview)

export default router