import React from 'react'
import blogService from '../services/blogs'

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            url: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const blogObject = {
            title: this.state.title,
            author: this.state.author,
            url: this.state.url
        }
        this.setState({
            title: '',
            author: '',
            url: ''
        })
        
        const blog = await blogService.create(blogObject)
        this.props.newBlog(blog)
        console.log(`uusi: ${blog}`)
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        Title
                <input
                            value={this.state.title}
                            onChange={this.handleChange}
                            name="title"
                        />
                    </div>
                    <div>
                        Author
                <input
                            value={this.state.author}
                            onChange={this.handleChange}
                            name="author"
                        />
                    </div>
                    <div>
                        URL
                <input
                            value={this.state.url}
                            onChange={this.handleChange}
                            name="url"
                        />
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        )
    }
}

export default BlogForm