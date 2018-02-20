import React from 'react';


class App extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.store.dispatch({ type: 'NEW_ANECDOTE', data: event.target.new_anecdote.value})
    event.target.new_anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState().sort(function(a, b) {
      return b.votes - a.votes
    })
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={e => this.props.store.dispatch({ type: 'VOTE', id: anecdote.id })}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name="new_anecdote"/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App