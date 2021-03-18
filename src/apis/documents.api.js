import axios from "axios";
import AuthHelper from "@/helpers/auth.helper";

const documents = axios.create({
  baseURL: "/api/v1/",
});

documents.interceptors.request.use(
  (config) => {
    const token = AuthHelper.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(config);
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
    console.error(err);
    const { status, data } = err.response;

    console.error(status);
    switch (status) {
      case 401:
        AuthHelper.removeToken();
        alert("Unauthorized");
        window.location = "login";
        break;
      default:
        return Promise.reject(err);
    }
  }
);

export default documents;
