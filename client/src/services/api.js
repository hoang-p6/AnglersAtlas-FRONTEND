import Axios from 'axios'

export const BASE_URL = 'https://anglers-atlas-backend.herokuapp.com/cors'

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
export default Client
