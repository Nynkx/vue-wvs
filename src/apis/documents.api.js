import axios from "axios";

const documents = axios.create({
  baseURL: "/api/v1/",
});

documents.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      key: "6LdMKbcZAAAAAImBVJWOopl-dOyLq0RCVhAFHkHF",
    };

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

documents.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const { status, data } = err.response;

    console.error(status);

    return Promise.reject(err);
  }
);

export default documents;
