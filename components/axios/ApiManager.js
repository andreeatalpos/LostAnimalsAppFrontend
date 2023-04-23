import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://localhost:8080',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;