const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const url = ''+process.env.MONGODB_URI
console.log(url)
mongoose.connect(url)
console.log(url)
mongoose.Promise = global.Promise
console.log(url)
const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

module.exports = Note