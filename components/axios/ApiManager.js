import axios from "axios";
import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//credentials context
import { CredentialsContext } from "../CredentialsContext";

// //context
// const { storedCredentials, setStoredCredentials } =
//   useContext(CredentialsContext);

const baseAxios = axios.create({
  baseURL: "http://192.168.1.203:8080",
  // responseType: 'json',
  // withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the Authorization header with the token value
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
      // Log the user out and redirect to login screen
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("currentUserCredentials");
      // Add navigation code here to redirect to login screen
      setStoredCredentials(null);
    }

    return Promise.reject(error);
  }
);

export default baseAxios;
