import React from 'react';

const Person = ({ persons }) => {
  return (
    <div>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({
      newName: event.target.value
    })
  }

  addName = (event) => {
    event.preventDefault()
    const person = {
      name: this.state.newName
    }

    const persons = this.state.persons.concat(person)
    this.setState({
      persons,
      newName: ''
    })
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