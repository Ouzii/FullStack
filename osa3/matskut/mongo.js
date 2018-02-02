const mongoose = require('mongoose')

const url = 'mongodb://fullstack:secret@ds121088.mlab.com:21088/fullstack_matskut'

mongoose.connect(url)
mongoose.Promise = global.Promise

const Note = mongoose.model('Note', {
    content: String,
    date: Date,
    important: Boolean
})

const note = new Note({
    content: 'Node node node, mikä v*tun code',
    date: new Date(),
    important: true
})

// note
//     .save()
//     .then(response => {
//         console.log('note saved!')
//         mongoose.connection.close()
//     })


Note
    .find({})
    .then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })