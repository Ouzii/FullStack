import React from 'react';

const Person = ({ persons }) => {
  return (
    <div>
      <table>
        <tbody>
          {persons.map(person => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          name: 'Arto Hellas',
          number: '040-123456'
        }
      ],
      newName: '',
      newNumber: '',
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
      alert("Nimi on jo listassa")
    } else {
      const persons = this.state.persons.concat(person)
      this.setState({
        persons,
        newName: '',
        newNumber: ''
      })
    }
  }
  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
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
        <Person persons={this.state.persons} />
      </div>
    )
  }
}

export default App