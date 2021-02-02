import axios from "axios";

const documents = axios.create({
  baseURL: "https://wvs.foxit.co.jp/api/documents",
});

documents.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(config.headers);

    config.headers = Object.assign(
      {
        Authorization: `Bearer ${token}`,
      },
      config.headers
    );

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
