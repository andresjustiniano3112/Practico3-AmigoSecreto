import axios from 'axios'
import { getToken } from '../utils/token'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

http.interceptors.request.use((config) => {
  const t = getToken()
  if (t) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${t}`
  }
  return config
})

export default http
