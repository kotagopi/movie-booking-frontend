import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api'
});

let token = null;

export const setAuthToken = (newToken) => {
  token = newToken;
}


// add a request interceptor for gloabl authorization

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error)
}
)

export default api;