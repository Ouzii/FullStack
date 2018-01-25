import React from 'react';

const Person = ( {persons} ) => {
  return (
    <div>
      {persons.map(person => <p>{person.name}</p>)}
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


  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form>
          <div>
            nimi: <input />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Person persons={this.state.persons}/>
      </div>
    )
  }
}

export default App