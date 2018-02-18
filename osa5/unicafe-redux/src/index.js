import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'

const Statistics = () => {
    const feedback = store.getState()
    const amountOfFeedback = feedback.good+feedback.ok+feedback.bad
    if (amountOfFeedback === 0) {
        return (
            <div>
                <h2>statistiikka</h2>
                <div>Ei yhtään palautetta annettu</div>
            </div>
        )
    }
    const sum = feedback.good+(feedback.bad*-1)
    const avg = sum/amountOfFeedback
    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{feedback.good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{feedback.ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{feedback.bad}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{avg}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{(feedback.good/amountOfFeedback)*100}%</td>
                    </tr>
                </tbody>
            </table>

            <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
        </div >
    )
}

class App extends React.Component {
    klik = (buttonLabel) => () => {
        store.dispatch({ type: buttonLabel })
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistics />
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)