import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    it('before clicking only shows title and author', () => {
        const blog = {
            title: 'Testaus on tärkeää',
            author: 'Sir Pönde',
            url: 'huntforglory.herokuapp.com',
            likes: 3,
            user: {
                name: 'Keijo',
                username: 'KK'
            }
        }
        const user = {
            name: 'Keijo',
            username: 'KK'
        }
        const blogComponent = shallow(<Blog blog={blog} user={user}/>)
        const contentDiv = blogComponent.find('.contentBeforeClick')
        
        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).not.toContain(blog.likes)
        expect(contentDiv.text()).not.toContain(blog.url)
    })

    it('after clicking shows rest of the info', () => {
        const blog = {
            title: 'Testaus on tärkeää',
            author: 'Sir Pönde',
            url: 'huntforglory.herokuapp.com',
            likes: 3,
            user: {
                name: 'Keijo',
                username: 'KK'
            }
        }
        const user = {
            name: 'Keijo',
            username: 'KK'
        }
        const blogComponent = shallow(<Blog blog={blog} user={user}/>)
        const titleDiv = blogComponent.find('.titleBeforeClick')
        titleDiv.simulate('click')
        const contentDiv = blogComponent.find('.contentAfterClick')

        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.likes)
        expect(contentDiv.text()).toContain(blog.url)
        expect(contentDiv.text()).toContain(user.name)
    })
})
