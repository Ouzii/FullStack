import React from 'react'
import { createNew } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.createNew(content)
    this.props.setNotification(`you added ${content}`)
    e.target.anecdote.value = ''
    setTimeout(() => {
      this.props.setNotification('')
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

export default connect(
  null,
  { createNew, setNotification }
)(AnecdoteForm)
