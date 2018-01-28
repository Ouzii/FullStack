import React from 'react'

const Person = ({ persons, deletePerson }) => {
    return (
      <div>
        <table>
          <tbody>
            {persons.map(person => <tr key={person.id}><td>{person.name}</td><td>{person.number}</td><td><button onClick={() => deletePerson(person.id, person.name)}>Poista</button></td></tr>)}
          </tbody>
        </table>
      </div>
    )
  }

  export default Person