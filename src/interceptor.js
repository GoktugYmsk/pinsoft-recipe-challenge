import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    debugger;
    const tokenLocale = sessionStorage.getItem("userTokenTry");
    if (tokenLocale) {
      config.headers["Authorization"] = `Bearer ${tokenLocale}`;
    }

    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
