import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0
        }
    }

    generateNew = (state) => {
        return () => {
            this.setState({
                selected: Math.floor(Math.random() * Math.floor(6))
            })
        }
    }

    vote = (state) => {
        return () => {
            this.props.votes[state.selected] += 1
            this.setState({
                selected: this.state.selected
            })
        }
    }

    getTopVoted = () => {
        var top = 0;
        var indexOfTop = 0;
        for (var i = 0; i < this.props.votes.length; i++) {
            if (this.props.votes[i] > top ) {
                top = this.props.votes[i]
                indexOfTop = i
            }
        }
        return (
            <div>
            <p>{this.props.anecdotes[indexOfTop]}</p>
            <p>has {top} votes</p>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.anecdotes[this.state.selected]}
                <br></br>
                <p> has {this.props.votes[this.state.selected]} votes </p>
                <Button handleClick={this.vote(this.state)} text="Vote" />
                <Button handleClick={this.generateNew(this.state)} text="Next anecdote" />

                <h1>Anecdote with most votes:</h1>
                {this.getTopVoted()}
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

var votes = [
    0,
    0,
    0,
    0,
    0,
    0
]



ReactDOM.render(
    <App anecdotes={anecdotes} votes={votes} />,
    document.getElementById('root')
)