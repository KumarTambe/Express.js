import express from 'express'
import bookRoutes from './routes/bookRoutes.js'
import { logger } from './middleware/middleware.js'

const app = express()
app.use(express.json())
app.use(logger)
app.use('/books', bookRoutes)

export default app