"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _sidebar = _interopRequireDefault(require("./modules/sidebar"));

var _auth = _interopRequireDefault(require("./modules/auth"));

var _documents = _interopRequireDefault(require("./modules/documents"));

var _templates = _interopRequireDefault(require("./modules/templates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  modules: {
    sidebar: _sidebar["default"],
    auth: _auth["default"],
    documents: _documents["default"],
    templates: _templates["default"]
  }
});

exports["default"] = _default;