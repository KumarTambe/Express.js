import express from 'express'
import dishRoutes from './Routes/dishRoutes.js'
import { logger } from './Middleware/middleware.js'

const app = express()
app.use(express.json())
app.use(logger)

app.use('/dishes', dishRoutes)

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" })
})

app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500).json({ message: "Something went wrong" })
})

export default app