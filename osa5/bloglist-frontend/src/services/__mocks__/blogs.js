let token = null

const setToken = (props) => {
    token = props
}
const blogs = [
    {
        title: 'Testaus on tärkeää',
        author: 'Sir Pönde',
        url: 'www.www.www',
        likes: 5,
        user: {
            name: 'Sali',
            username: 'Naattori'
        },
        _id: 1
    },
    {
        title: 'Keijon kova käsi',
        author: 'Kalevi',
        url: 'www.www.www',
        likes: 3,
        user: {
            name: 'Sali',
            username: 'Naattori'
        },
        _id: 2
    },
    {
        title: 'Tööt',
        author: 'Prööt',
        url: 'www.www.www',
        likes: 5,
        user: {
            name: 'Sali',
            username: 'Naattori'
        },
        _id: 3
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default {
    blogs, getAll, setToken
}