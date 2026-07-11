import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

//create token
const token = jwt.sign({ id: 1, name: "Kumar" }, process.env.JWT_SECRET)
console.log(token)

//verifying token
const decoded = jwt.verify(token, process.env.JWT_SECRET)
console.log(decoded)