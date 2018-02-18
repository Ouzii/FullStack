import React from 'react'
import NoteForm from './NoteForm'

class Wrapper extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        formInput: ''
      }
    }
    onChange = (e) => {
      this.setState({ formInput: e.target.value })
    }
    render() {
      return (
        <NoteForm
          value={this.state.formInput}
          onSubmit={this.props.onSubmit}
          handleChange={this.onChange}
        />
    )}
  }

export default Wrapper