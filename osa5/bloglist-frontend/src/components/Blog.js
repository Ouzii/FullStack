import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    destroy: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      allVisible: false,
      blog: this.props.blog
    }
  }

  changeVisibility = () => {
    this.setState({
      allVisible: this.state.allVisible === true ? false : true
    })
  }

  handleLike = async () => {
    const blogObject = {
      title: this.state.blog.title,
      author: this.state.blog.author,
      url: this.state.blog.url,
      likes: this.state.blog.likes+1
    }
    const likedBlog = await blogService.update(this.state.blog._id, blogObject)
    this.setState({
      blog: likedBlog
    })
  }

  deleteBlog = async () => {
    if (window.confirm(`delete ${this.state.blog.title} by ${this.state.blog.author}?`)) {
      try {
        await blogService.remove(this.state.blog, this.props.user)
        this.props.destroy(this.state.blog)
      } catch(exception) {
        console.log(exception)
      }
    }
    
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const hideWhenVisible = { display: this.state.allVisible ? 'none' : '' }
    const showWhenVisible = { display: this.state.allVisible ? '' : 'none' }
    const addedBy = this.props.blog.user === null ? 'unknown' : this.props.blog.user.name === undefined ? this.props.blog.user.username : this.props.blog.user.name
    const deleteButton = this.props.blog.user.username === this.props.user.username ? <button onClick={this.deleteBlog}>delete</button> : this.props.blog.user === null ? <button onClick={this.deleteBlog}>delete</button> : <br></br>

    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible} onClick={this.changeVisibility}>
          {this.state.blog.title} {this.state.blog.author}
        </div>
        <div style={showWhenVisible}>
          <p onClick={this.changeVisibility}>{this.state.blog.title} {this.state.blog.author}</p>
          <a>{this.state.blog.url}</a>
          <p>{this.state.blog.likes} <button onClick={this.handleLike}>like</button></p>
          <p>added by {addedBy}</p>
          {deleteButton}
          </div>
      </div>
    )
  }
}

export default Blog