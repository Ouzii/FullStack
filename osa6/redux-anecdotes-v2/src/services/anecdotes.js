import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const createNew = async (anecdote) => {
    const response = await axios.post(url, { content: anecdote, votes: 0 })
    return response.data
}

const update = async (anecdote) => {
    console.log(anecdote)
    const response = await axios.put(`${url}/${anecdote.id}`, { content: anecdote.content, id: anecdote.id, votes: anecdote.votes + 1 })
    console.log(response)
    return response.data
}

export default { getAll, createNew, update }