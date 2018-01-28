import React from 'react'

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

  export default Person