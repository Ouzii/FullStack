import React from 'react'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotificationAdded, resetNotification } from '../reducers/notificationReducer';

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(createNew(content))
    this.props.store.dispatch(setNotificationAdded(content))
    e.target.anecdote.value = ''
    setTimeout(() => {
      this.props.store.dispatch(resetNotification(''))
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
