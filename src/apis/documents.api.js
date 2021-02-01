import axios from "axios";

const documents = axios.create({
  baseURL: "https://wvs.foxit.co.jp/api/documents",
});

documents.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers = {
      Authorization: `Bearer ${token}`,
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

    localStorage.clear();
    console.log(data);
    //window.location.replace("/login");

    return Promise.reject(err);
  }
);

export default documents;
