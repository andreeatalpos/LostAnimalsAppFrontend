import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseAxios = axios.create({
  baseURL: 'http://192.168.1.203:8080',
  // responseType: 'json',
  // withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json"
}
});

// Add an interceptor to include the Authorization header with the token value
baseAxios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseAxios;