import axios, { AxiosRequestConfig } from "axios";

const TOKEN_KEY = "auth_token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: false,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token =
      localStorage.getItem(TOKEN_KEY) ??
      sessionStorage.getItem(TOKEN_KEY);

    if (token) {
      if (!config.headers) {
        config.headers = {};
      }

      (config.headers as any)["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
