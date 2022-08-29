import 'dotenv/config'
import express from 'express'

// create an express app using json middleware
const app = new express()
app.use(express.json())

// start the server
app.listen(8085)
