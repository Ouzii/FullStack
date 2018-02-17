import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      notification: null,
      error: false,
      blogFormVisible: null
    }
    this.reRender = this.reRender.bind(this)
  }

  reRender = (props) => {
    this.setState({
      blogs: this.state.blogs.filter(blog => blog._id !== props._id),
      notification: `${props.title} by ${props.author} deleted`
    })
    setTimeout(() => {
      this.setState({ notification: null, error: false })
    }, 3000)
  }

  async componentDidMount() {
    const blogs = await blogService.getAll()
    blogs.sort(function(a, b) {
      return b.likes - a.likes
    })

    this.setState({ blogs })

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        notification: 'Invalid username or password',
        error: true,
        password: ''
      })
      setTimeout(() => {
        this.setState({ notification: null, error: false })
      }, 3000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({
      user: null,
      notification: 'Logged out'
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 3000)
  }

  toggleBlogForm = () => {
    this.state.blogFormVisible === null ?
      this.setState({ blogFormVisible: true }) :
      this.setState({ blogFormVisible: null })
  }

  newBlog = async (props) => {
    const blogs = await blogService.getAll()
    blogs.sort(function(a, b) {
      return b.likes - a.likes
    })

    this.setState({ 
      blogs,
      notification: `A new blog '${props.title}' by ${props.author} added`
     })
    console.log(this.state.blogs)
    setTimeout(() => {
      this.setState({ notification: null })
    }, 3000)

  }

  render() {

    const loginForm = () => (
      <LoginForm
        visible={this.state.visible}
        username={this.state.username}
        password={this.state.password}
        handleChange={this.handleLoginFieldChange}
        handleSubmit={this.login}
      />
    )

    return (
      <div>
        <Notification message={this.state.notification} error={this.state.error} />
        {this.state.user === null ?
          loginForm() :
          <div>
            <h2>Blogs</h2>
            {this.state.user.name === undefined ?
              <p>{this.state.user.username} logged in <button onClick={this.logout}>Logout</button></p> :
              <p>{this.state.user.name} logged in <button onClick={this.logout}>Logout</button></p>
            }
            <Togglable buttonLabel="Create new">
              <BlogForm newBlog={this.newBlog} />
            </Togglable>
            <br></br>
            {this.state.blogs.map(blog =>
              <Blog key={blog._id} blog={blog} user={this.state.user} destroy={this.reRender}/>
            )}
          </div>
        }
      </div>
    );
  }
}

export default App;