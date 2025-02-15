import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

interface ApiResponse<T> {
    code: number
    data: T
    msg: string
}

const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

request.interceptors.request.use(
    (config) => {
        let token
        if (import.meta.env.DEV) {
            token = import.meta.env.VITE_APP_TEST_TOKEN
        } else {
            token = localStorage.getItem('token')
        }
        config.headers.token = `Bearer ${token}`
        return config
    },
    (error: unknown) => Promise.reject(error)
)

// Response interceptor
request.interceptors.response.use(
    (response: AxiosResponse<ApiResponse<any>>) => {
        const { code, data, msg } = response.data

        // Adjust the success code as per your API spec
        if (code !== 200) {
            return Promise.reject(new Error(msg || 'An error occurred'))
        }

        // Return the data directly for successful responses
        return data
    },
    (error: unknown) => {
        // Optionally handle HTTP errors (non-2xx status codes) here
        return Promise.reject(error)
    }
)

export default request
