import React from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      newNote: '',
      showAll: true,
      error: null
    }
  }

  componentWillMount() {
    noteService
      .getAll()
      .then(response => {
        this.setState({ notes: response })
      })
  }

  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      date: new Date(),
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(newNote => {
        this.setState({
          notes: this.state.notes.concat(newNote),
          newNote: ''
        })
      })
  }

  handleNoteChange = (event) => {
    this.setState({ newNote: event.target.value })
  }

  toggleVisible = () => {
    this.setState({
      showAll: !this.state.showAll
    })
  }

  toggleImportanceOf = (id) => {
    return () => {
      const url = `https://salty-fortress-24184.herokuapp.com/api/notes/${id}`
      const note = this.state.notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      noteService
        .update(id, changedNote)
        .then(changedNote => {
          const notes = this.state.notes.filter(n => n.id !== id)
          this.setState({
            notes: notes.concat(changedNote)
          })
        })
        .catch(error => {
          this.setState({
            error: `muistiinpano '${note.content}' on jo valitettavasti poistettu palvelimelta`,
            notes: this.state.notes.filter(n => n.id !== id)
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000)
        })
    }
  }

  render() {
    const notesToShow = this.state.showAll ? this.state.notes : this.state.notes.filter(note => note.important)

    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'
    return (
      <div>
        <h1>Muistiinpanot</h1>
        <Notification message={this.state.error} />
        <div>
          <button onClick={this.toggleVisible}>
            näytä {label}
          </button>
        </div>
        <ul>
          {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={this.toggleImportanceOf(note.id)} />)}
        </ul>
        <form onSubmit={this.addNote}>
          <input
            placeholder="Anna uusi muistiinpano"
            value={this.state.newNote}
            onChange={this.handleNoteChange}
          />
          <button type="submit">tallenna</button>
        </form>
      </div>
    )
  }
}

export default App