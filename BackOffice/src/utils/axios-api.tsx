import axios from "axios";

// Axios instance
export const instanceAxios = axios.create({
  baseURL: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : '/api'
})