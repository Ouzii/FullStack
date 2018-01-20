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
    return (
        props.state.summa / props.state.aania
    )
}

const annaProsentit = (props) => {
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

    klikNappia = (tila) => {
        if (tila === "hyva") {
            return () => {
                this.setState({
                    hyva: this.state.hyva + 1,
                    summa: this.state.summa + 1,
                    aania: this.state.aania + 1,
                    positiivisia: this.state.positiivisia + 1
                })
            }
        } else if (tila === "neutraali") {
            return () => {
                this.setState({
                    neutraali: this.state.neutraali + 1,
                    aania: this.state.aania + 1
                })
            }
        } else {
            return () => {
                this.setState({
                    huono: this.state.huono + 1,
                    summa: this.state.summa - 1,
                    aania: this.state.aania + 1
                })
            }
        }
    }


    render() {
        if (this.state.aania === 0) {
            return (
                <div>
                    <h1>Anna palautetta</h1>
                    <div>
                        <Button handleClick={this.klikNappia("hyva")} teksti="Hyvä" />
                        <Button handleClick={this.klikNappia("neutraali")} teksti="Neutraali" />
                        <Button handleClick={this.klikNappia("huono")} teksti="Huono" />
                    </div>
                    <div>
                        <h1> Statistiikka </h1>
                        <p> Ei yhtään palautetta annettu </p>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <h1>Anna palautetta</h1>
                <div>
                    <Button handleClick={this.klikNappia("hyva")} teksti="Hyvä" />
                    <Button handleClick={this.klikNappia("neutraali")} teksti="Neutraali" />
                    <Button handleClick={this.klikNappia("huono")} teksti="Huono" />
                </div>
                <div>
                    <h1> Statistiikka </h1>
                    <Statistics state={this.state} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
