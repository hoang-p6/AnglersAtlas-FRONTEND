import Axios from 'axios'

export const BASE_URL = 'http://localhost:3001'

const Client = Axios.create({ BASE_URL })

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    console.log(`TOKEN GOES HERE:${config.headers}`)
    console.log(config)
    return config
  },
  (error) => Promise.reject(error)
)
export default Client
