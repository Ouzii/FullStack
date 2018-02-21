import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotificationVote, resetNotification } from '../reducers/notificationReducer'
import Filter from './filter'

class AnecdoteList extends React.Component {
  handleVote = (props) => {
    this.props.store.dispatch(addVote(props))
    this.props.store.dispatch(setNotificationVote(props.content))
    setTimeout(() => {
      this.props.store.dispatch(resetNotification(''))
    }, 5000)
  }
  render() {
    
    const anecdotes = this.props.store.getState().anecdotes
    const anecdotesToShow = this.props.store.getState().filter === '' ? anecdotes : anecdotes.filter(a => a.content.includes(this.props.store.getState().filter))
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store}/>
        {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

export default AnecdoteList
