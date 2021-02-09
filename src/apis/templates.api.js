import axios from "axios";

const templatesAPI = axios.create({
  baseURL: "http://116.193.68.82:5000/api/v1/templates",
});

templatesAPI.interceptors.request.use(
  function(config) {
    config.params = {
      key: "6LdMKbcZAAAAAImBVJWOopl-dOyLq0RCVhAFHkHF",
    };

    return config;
  },
  function(err) {
    console.log(err);
  }
);

export default templatesAPI;
