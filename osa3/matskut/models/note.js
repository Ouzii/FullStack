const mongoose = require('mongoose')

const url = 'mongodb://fullstack:secret@ds121088.mlab.com:21088/fullstack_matskut'

mongoose.connect(url)
mongoose.Promise = global.Promise

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

module.exports = Note