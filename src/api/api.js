import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api'
});

// add a request interceptor for gloabl authorization

api.interceptors.request.use((config) => {
  const authString = localStorage.getItem("auth");
  const auth = JSON.parse(authString);
  console.log(auth, 'authentication')
  if (auth && auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error)
}
)

export default api;