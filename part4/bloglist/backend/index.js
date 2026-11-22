const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const express = require('express')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(config.MONGODB_URL, { family: 4 }) 
  .then( () => {
    logger.info("connected to mongodb")
  })
  .catch( error => {
    logger.error("error connecting to mongodb", error.message)
  })

app.use(express.json())
app.use('/api/blogs', blogsRouter)


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})