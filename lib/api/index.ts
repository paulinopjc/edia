import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.NEXT_API_URL,
})

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})

export { instance as API }