import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseAxios = axios.create({
  baseURL: "http://172.20.10.2:8080",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
  },
});

baseAxios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("currentUserCredentials");
      setStoredCredentials(null);
    }
    return Promise.reject(error);
  }
);

export default baseAxios;
