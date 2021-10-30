import axios, { AxiosInstance } from 'axios'

// Create a new axios instance for Postmark API requests.
export const postmarkClient: AxiosInstance = axios.create({
  baseURL: 'https://api.postmarkapp.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Postmark-Server-Token': String(import.meta.env.VITE_APP_POSTMARK_SERVER_TOKEN),
  },
  timeout: 5000, // 5 second
})
