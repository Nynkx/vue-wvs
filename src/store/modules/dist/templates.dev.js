"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _templates = _interopRequireDefault(require("@/apis/templates.api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  templates: {}
};
var getters = {
  templates: function templates(state) {
    return state.templates;
  }
};
var mutations = {
  TEMPLATES_GET: function TEMPLATES_GET(state, templates) {
    state.templates = templates;
  }
};
var actions = {
  getTemplate: function getTemplate(_ref) {
    var commit = _ref.commit;
    return _templates["default"].get().then(function (res) {
      commit('TEMPLATES_GET', res.data.list);
      console.l;
    });
  }
};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;