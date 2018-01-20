import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Button = ({ handleClick, teksti }) => {
    return (
        <button onClick={handleClick}>
            {teksti}
        </button>
    )
}

const Statistics = (props) => {
    return (
        <div>
            <Statistic toiminto={props.state.hyva} teksti="Hyvä" />
            <Statistic toiminto={props.state.neutraali} teksti="Neutraali" />
            <Statistic toiminto={props.state.huono} teksti="Huono" />
            <Statistic toiminto={annaKeskiarvo(props)} teksti="Keskiarvo" />
            <Statistic toiminto={annaProsentit(props)} teksti="Positiivisia" />
        </div>
    )
}

const Statistic = ({ toiminto, teksti }) => (
    <p> {teksti}: {toiminto}</p>
)

const annaKeskiarvo = (props) => {
    if (props.state.aania === 0) {
        return (
            0
        )
    }
    return (
        props.state.summa / props.state.aania
    )
}

const annaProsentit = (props) => {
    if (props.state.aania === 0) {
        return (
            0 + "%"
        )
    }
    return (
        (props.state.hyva / props.state.aania) * 100 + "%"
    )
}


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
        return () => {
            this.setState({
                hyva: this.state.hyva + 1,
                summa: this.state.summa + 1,
                aania: this.state.aania + 1,
                positiivisia: this.state.positiivisia + 1
            })
        }
    }

    klikHuono = () => {
        return () => {
            this.setState({
                huono: this.state.huono + 1,
                summa: this.state.summa - 1,
                aania: this.state.aania + 1
            })
        }
    }

    klikNeutraali = () => {
        return () => {
            this.setState({
                neutraali: this.state.neutraali + 1,
                aania: this.state.aania + 1
            })
        }
    }



    render() {
        return (
            <div>
                <h1>Anna palautetta</h1>
                <div>
                    <Button handleClick={this.klikHyva()} teksti="Hyvä" />
                    <Button handleClick={this.klikNeutraali()} teksti="Neutraali" />
                    <Button handleClick={this.klikHuono()} teksti="Huono" />
                </div>
                <div>
                    <h1> Statistiikka </h1>
                    <Statistics state={this.state} klikHyva={this.klikHyva()} klikNeutraali={this.klikNeutraali()} klikHuono={this.klikHuono()} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
