import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Testaus on tärkeää',
      author: 'Sir Pönde',
      url: 'huntforglory.herokuapp.com',
      likes: 3
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.likes)
  })

  it('clicking the like button twice calls event handler twice', () => {
    const blog = {
        title: 'Testaus on tärkeää',
        author: 'Sir Pönde',
        url: 'huntforglory.herokuapp.com',
        likes: 3
      }
  
    const mockHandler = jest.fn()
  
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
