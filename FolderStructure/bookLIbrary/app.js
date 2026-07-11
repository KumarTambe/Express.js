import express from 'express'
import cors from 'cors'
import bookRoutes from './routes/bookRoutes.js'
import { logger } from './middleware/middleware.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger)
app.use('/books', bookRoutes)

export default app