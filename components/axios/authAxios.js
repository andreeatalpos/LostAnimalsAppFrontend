import axios from "axios";

const authAxios = axios.create({
  baseURL: "http://172.20.10.2:8080/auth",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
  },
});

export default authAxios;
