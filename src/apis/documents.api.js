import axios from "axios";

const documents = axios.create({
  baseURL: "http://116.193.68.82:5001/api/v1/documents",
});

documents.interceptors.request.use(
  (config) => {
    config.params = {
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

    switch (status) {
      case 401:
        localStorage.clear();
        console.log(data);
        window.location.replace("/login");
        break;
      case 404:
        console.log(status);
        break;
      default:
        console.log(status);
        break;
    }

    return Promise.reject(err);
  }
);

export default documents;
