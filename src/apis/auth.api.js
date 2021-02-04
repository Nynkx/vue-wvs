import axios from "axios";

const auth = axios.create({ baseURL: "https://wvs.foxit.co.jp/api/auth" });

auth.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
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

    switch (status) {
      case 404:
        alert("Incorrect username or password!");
        break;
      default:
        alert("Session Expired, Please Login Again!");
        localStorage.clear();
        console.log(data);
        window.location.replace("/login");
    }

    return Promise.reject(err);
  }
);

export default auth;
