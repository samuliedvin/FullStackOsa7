import axios from 'axios'
const baseUrl = 'https://samuli-backend.herokuapp.com/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default {
    getAll
}