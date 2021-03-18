"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var templates = _axios["default"].create({
  baseURL: 'https://wvs.foxit.co.jp/api/templates'
});

templates.interceptors.request.use(function (config) {
  var token = localStorage.getItem("token");
  config.headers = Object.assign({
    Authorization: "Bearer ".concat(token)
  }, config.headers);
  return config;
}, function (err) {
  console.log(err);
});
var _default = templates;
exports["default"] = _default;