import axios from "axios";

const documents = axios.create({
  baseURL: "http://192.168.0.115:5001/api/v1/documents",
});

documents.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.params = {
      key: "12456",
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
