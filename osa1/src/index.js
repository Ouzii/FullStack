import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  render() {
    const bornYear = () => {
      const yearNow = 1900 + new Date().getYear()
      return yearNow - this.props.age
    }

    return (
      <div>
        <p>
          Hello {this.props.name}, you are {this.props.age} years old <br />
          So you were propably born {bornYear()}
        </p>
      </div>
    )
  }
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Arto" age={26 + 10} />
      <Hello name={nimi} age={ika} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))