import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://www.omdbapi.com/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const API_KEY = process.env.VUE_APP_OMDBAPI_KEY;

export default {
    getByMovieTitle(title){
    return apiClient.get(`?t=${title}&apikey=${API_KEY}`)
  },
}