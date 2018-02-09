const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')

app.use(cors())
app.use(bodyParser.json())

const mongoUrl = 'mongodb://fullstack:secret@ds229448.mlab.com:29448/blogpost-fullstack'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

app.use('/api/blogs', blogRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})