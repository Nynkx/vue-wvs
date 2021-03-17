import axios from "axios";
import AuthHelper from "@/helpers/auth.helper";

const documents = axios.create({
  baseURL: "/api/v1/",
});

const API_KEY = "6LdMKbcZAAAAAImBVJWOopl-dOyLq0RCVhAFHkHF";

documents.interceptors.request.use(
  (config) => {
    const token = AuthHelper.getToken();

    if (token) {
      request.header["Authorization"] = `Bearer ${token}`;
    }

    config.params = {
      ...config.params,
      key: token,
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
