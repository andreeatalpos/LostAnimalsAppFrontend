import axios from "axios"

const authAxios = axios.create({
    baseURL: "http://192.168.1.203:8080/auth",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json"
    }
    
});

export default authAxios;