const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const blogs = require('../testData/initialBlogs').blogs

beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

afterAll(() => {
    server.close()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs from the database are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(blogs.length)
})

test('a spesific blogpost is withing the returned blogposts', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)
    expect(titles).toContain('First class tests')
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Blogipostin titteli on tärkeä',
        author: 'Myös kirjoittajalla on väliä!',
        url: 'www.www.www',
        likes: 4
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)

    expect(response.body.length).toBe(blogs.length + 1)
    expect(titles).toContain('Blogipostin titteli on tärkeä')
})

test('undefined likes becomes 0', async () => {
    const newBlog = {
        title: 'Testattavaa riittää',
        author: 'Kerkko',
        url: 'huntforglory.herokuapp.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const likes = response.body.map(l => l.likes)

        expect(likes[likes.length-1]).toBe(0)
})

test('blogpost without author and/or url is not added', async () => {
    const allBlogs = await api.get('/api/blogs')

    const newBlog1 = {
        title: 'Test without url',
        author: 'Harjakainen',
        likes: '9'
    }
    const newBlog2 = {
        author: 'Harjakaisen koira',
        url: 'test.without.title',
        likes: '6'
    }
    const newBlog3 = {
        author: 'Test without url or title',
        likes: '9'
    }

    await api
            .post('/api/blogs')
            .send(newBlog1)
            .expect(400)
    await api
            .post('/api/blogs')
            .send(newBlog2)
            .expect(400)
    await api
            .post('/api/blogs')
            .send(newBlog3)
            .expect(400)

    const notAdded = await api.get('/api/blogs')
    expect(allBlogs.body.length).toBe(notAdded.body.length)
})