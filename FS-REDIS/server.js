import 'dotenv/config'
import express from 'express'

// import song router
import { router as songRouter } from './routers/song-router.js'

// create an express app using json middleware
const app = new express()
app.use(express.json())

// add song router to Express app
app.use('/song', songRouter)

// start the server
app.listen(8085)
