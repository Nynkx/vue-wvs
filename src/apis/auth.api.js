import axios from "axios";

const auth = axios.create({ baseURL: "/api/v1" });

auth.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-type": "application/json;charset=UTF-8",
    };

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

auth.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const { status, data } = err.response;

    return Promise.reject(err);
  }
);

export default auth;
