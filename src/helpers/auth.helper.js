import StorageHelper from "./storage.helper";

export default {
  //   clear: () => {
  //     removeItem("token");
  //   },
  getToken: () => StorageHelper.getItem("token"),
  setToken: (token) => StorageHelper.setItem("token", token),
  removeToken: () => StorageHelper.removeItem("token"),
};
