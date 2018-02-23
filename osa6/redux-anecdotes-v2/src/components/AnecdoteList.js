import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import Filter from './filter'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    this.props.addVote(anecdote)
    this.props.setNotification(`you voted ${anecdote.content}`)
    setTimeout(() => {
      this.props.setNotification('')
    }, 5000)
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handleVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return filter === '' ? anecdotes : anecdotes.filter(a => a.content.includes(filter))
}
const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { addVote, setNotification }
)(AnecdoteList)
