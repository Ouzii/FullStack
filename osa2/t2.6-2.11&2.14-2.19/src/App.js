import React from 'react';
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      findWith: '',
      notification: null,
    }
  }

  handleNameChange = (event) => {
    this.setState({
      newName: event.target.value
    })
  }

  handleNumberChange = (event) => {
    this.setState({
      newNumber: event.target.value
    })
  }

  handleFind = (event) => {
    this.setState({
      findWith: event.target.value
    })
  }

  deletePerson = (id, name) => {
    if (window.confirm(`Poistetaanko ${name} listalta`)) {
      personService
        .destroy(id)
        .then(response => {
          this.setState({
            persons: this.state.persons.filter(person => person.id !== id),
            notification: `${name} poistettu onnistuneesti`
          })
          setTimeout(() => {
            this.setState({ notification: null})
          }, 3000)
        })
    }
  }


  addName = (event) => {
    event.preventDefault()
    const person = {
      name: this.state.newName,
      number: this.state.newNumber
    }


    let isOld = function (element) {
      return element.name.toUpperCase() === person.name.toUpperCase()
    }

    if (this.state.persons.some(isOld)) {
      if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const helpArray = this.state.persons.filter(p => p.name.toUpperCase() === person.name.toUpperCase())
        const personToUpdate = helpArray[0]
        personService
          .update(personToUpdate.id, person)
          .then(updatedPerson => {
            const persons = this.state.persons.filter(p => p.id !== personToUpdate.id)
            this.setState({
              persons: persons.concat(updatedPerson),
              newName: '',
              newNumber: '',
              notification: `${person.name} päivitetty onnistuneesti`
            })
            setTimeout(() => {
              this.setState({ notification: null})
            }, 3000)
          })
          .catch(error => {
            personService
            .create(person)
            .then(response => {
              this.componentWillMount()
              this.setState({
                notification: `${person.name} päivitetty onnistuneesti`
              })
            })
            setTimeout(() => {
              this.setState({ notification: null})
            }, 3000)
          })
      }
    } else {

      personService
        .create(person)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
            notification: `${person.name} lisätty onnistuneesti`
          })
          setTimeout(() => {
            this.setState({ notification: null })
          }, 3000)
        })
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  render() {
    const personsToShow =
      this.state.findWith.length === 0 ? this.state.persons : this.state.persons.filter(person => person.name.toUpperCase().includes(this.state.findWith.toUpperCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notification} />
        Rajaa luetteloa: <input
          placeholder='Nimi'
          value={this.state.findWith}
          onChange={this.handleFind}
        />
        <form onSubmit={this.addName}>
          <div>
            nimi: <input
              value={this.state.newName}
              placeholder='Anna lisättävä nimi'
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              placeholder='Anna lisättävä numero'
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Person persons={personsToShow} deletePerson={this.deletePerson} />
      </div>
    )
  }
}

export default App