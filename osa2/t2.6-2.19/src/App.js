import React from 'react';
import Person from './components/Person'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      findWith: ''
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

  componentWillMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  render() {
    const personsToShow = 
       this.state.findWith.length === 0 ? this.state.persons : this.state.persons.filter(person => person.name.toUpperCase().includes(this.state.findWith.toUpperCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
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
        <Person persons={personsToShow} />
      </div>
    )
  }
}

export default App