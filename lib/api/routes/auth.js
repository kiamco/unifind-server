"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _AuthController = require("../controllers/AuthController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var Router = _express["default"].Router(); // login
// Router.get('/login', async (req, res) => {
// });


Router.post('/register', _AuthController.register);
Router["delete"]('/deleteAll', _AuthController.deleteAll);
Router.post('/login', _AuthController.login);
var _default = Router;
exports["default"] = _default;