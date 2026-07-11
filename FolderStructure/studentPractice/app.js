import express from 'express'
import router from './routes/studentRoutes.js'
import { logger } from './middleware/middleware.js'

const app = express()
app.use(express.json())
app.use(logger)
app.use('/students', router)

export default app