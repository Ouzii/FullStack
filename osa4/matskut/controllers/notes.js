const notesRouter = require('express').Router()
const Note = require('../models/note')

const formatNote = (note) => {
    return {
        content: note.content,
        date: note.date,
        important: note.important,
        id: note._id
    }
}

notesRouter.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

notesRouter.get('/api/notes', (request, response) => {
    Note
        .find({}, { __v: 0 })
        .then(notes => {
            response.json(notes.map(formatNote))
        })
})

const generateId = () => {
    const maxId = notes.length > 0 ? notes.map(n => n.id).sort().reverse()[0] : 1
    return maxId + 1
}

notesRouter.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    note
        .save()
        .then(savedNote => {
            response.json(formatNote(savedNote))
        })
})

notesRouter.get('/api/notes/:id', (request, response) => {
    Note
        .findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(formatNote(note))
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

notesRouter.delete('/api/notes/:id', (request, response) => {
    Note
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })
})

notesRouter.put('/api/notes/:id', (request, response) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note
        .findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(formatNote(updatedNote))
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = notesRouter