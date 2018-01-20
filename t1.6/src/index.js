import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            huono: 0,
            neutraali: 0,
            summa: 0,
            aania: 0,
            positiivisia: 0
        }
    }

    klikHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1,
            summa: this.state.summa + 1,
            aania: this.state.aania + 1,
            positiivisia: this.state.positiivisia + 1
        })
    }

    klikHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
            summa: this.state.summa - 1,
            aania: this.state.aania + 1
        })
    }

    klikNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
            aania: this.state.aania + 1
        })
    }



    render() {
        const annaKeskiarvoJaProsentit = () => {
            if (this.state.aania == 0) {
                return (
                    <div>
                        <p> Keskiarvo: 0</p>
                        <p> Positiivisia: 0 % </p>
                    </div>
                )
            }
            return (
                <div>
                    <p> Keskiarvo: {this.state.summa / this.state.aania}</p>
                    <p> Positiivisia: {(this.state.positiivisia / this.state.aania) * 100} % </p>
                </div>
            )
        }
        
        return (
            <div>
                <h1>Anna palautetta</h1>
                <div>
                    <button onClick={this.klikHyva}>Hyvä</button>
                    <button onClick={this.klikNeutraali}>Neutraali</button>
                    <button onClick={this.klikHuono}>Huono</button>
                </div>
                <h1>Statistiikka</h1>

                <p> Hyvä: {this.state.hyva} </p>
                <p> Neutraali: {this.state.neutraali} </p>
                <p> Huono: {this.state.huono} </p>
                {annaKeskiarvoJaProsentit()}

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
