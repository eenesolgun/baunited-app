import axios from "axios";
import * as SecureStore from "expo-secure-store";

const baseURL = "http://192.168.1.112:3000/api/v1";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Retrieve token from Expo SecureStore
    const token = await SecureStore.getItemAsync("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
