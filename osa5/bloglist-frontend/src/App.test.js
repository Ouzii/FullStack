import React from 'react'
import { mount } from 'enzyme'
import App from './App'

import blogService from './services/blogs'

describe('<App />', () => {

    describe('when user is not logged', () => {
        let app
        beforeEach(() => {
            app = mount(<App />)
        })

        it('only login form is rendered', () => {
            app.update()
            const content = app.find('.content')
            expect(content.text()).toContain('Log in to application')
            expect(content.text()).not.toContain('Tööt')

        })
    })

    describe('when user is logged', () => {
        let app
        beforeEach(() => {
            const user = {
                username: 'Naattori',
                token: '0700123123',
                name: 'Sali'
            }

            localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('all notes are rendered', () => {
            app.update()
            const content = app.find('.content')
            expect(content.text()).toContain('Tööt')
            expect(content.text()).toContain('Testaus on tärkeää')
            expect(content.text()).toContain('Keijon kova käsi')
            expect(content.text()).not.toContain('Log in to application')
        })
    })
})