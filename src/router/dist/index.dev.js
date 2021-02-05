"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _templates = _interopRequireDefault(require("@/store/modules/templates"));

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../views/Home.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var Login = function Login() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/views/Login.vue"));
  });
};

var Logout = function Logout() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/views/Logout.vue"));
  });
};

var Page404 = function Page404() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/views/Page404.vue"));
  });
};

var Documents = function Documents() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/Documents/Documents.vue"));
  });
};

var Templates = function Templates() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/components/Templates/Templates.vue'));
  });
};

var DocumentsList = function DocumentsList() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/Documents/DocumentsList"));
  });
};

var PDFViewer = function PDFViewer() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/Documents/PDFViewer.vue"));
  });
};

var Dashboard = function Dashboard() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/Dashboard/Dashboard.vue"));
  });
};

var routes = [{
  path: "/",
  component: _Home["default"],
  children: [{
    path: "documents",
    //name: "Documents",
    component: Documents,
    children: [{
      path: "sign/:id",
      name: "Document",
      component: PDFViewer
    }, {
      path: "",
      name: "Documents",
      component: DocumentsList
    }]
  }, {
    path: "",
    name: "Dashboard",
    alias: ["/home", "/dashboard"],
    component: Dashboard
  }, {
    path: '/templates',
    name: 'Templates',
    component: Templates
  }]
}, {
  path: "/login",
  name: "Login",
  component: Login
}, {
  path: "/logout",
  name: "Logout",
  component: Logout
}, {
  path: "/*",
  name: "404",
  component: Page404
}];
var router = new _vueRouter["default"]({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
router.beforeEach(function (to, from, next) {
  var publicRoutes = ["/login", "/register"];
  var authRequired = !publicRoutes.includes(to.path);
  var isAuthed = localStorage.getItem("token");

  if (authRequired && !isAuthed) {
    return next("/login");
  }

  if (!authRequired && isAuthed) {
    return next("/");
  }

  next();
});
var _default = router;
exports["default"] = _default;