import axios from 'axios'

export const httpClient = axios.create({
  baseURL: 'http://192.168.15.12:8000'
})
