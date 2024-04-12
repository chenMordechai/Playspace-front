import Axios from 'axios'

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    // : ''
    : 'https://playspace.co.il/api/'


const axios = Axios.create({
    withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/json'
    // },
})

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    },
    getGames
}

async function ajax(endpoint, method = 'GET', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null,
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
        }
        throw err
    }
}

async function getGames() {
    try {
        const response = await axios.get('https://playspace.co.il/api/Admin/Games');
        return response.data; // Assuming the response contains the game data
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error; // Throw error for handling in caller function
    }
}