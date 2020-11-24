"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _dotenv = require("dotenv");

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

(0, _dotenv.config)();
var server = (0, _express["default"])(); // parses response to json 

server.use(_express["default"].json());
server.use((0, _cors["default"])());
server.use((0, _helmet["default"])());
server.use(_auth["default"]); //establish connection to databse 
// const DB_CONNECTION = "mongodb://root:rootpassword@0.0.0.0:27017"
// const DB_CONNECTION = "mongodb://localhost:27017/unfindDev"

var DB_CONNECTION = "mongodb+srv://admin:".concat(process.env.MONGO_PASSWORD, "@cluster0.ya0of.mongodb.net/cluster0?retryWrites=true&w=majority");

_mongoose["default"].connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (error) {
  _newArrowCheck(this, _this);

  if (error) {
    console.log(error);
    console.log("Failed to connect to MongaDb");
  } else {
    console.log("conected to db");
  }
}.bind(void 0)); // send if server is up 


server.get('/', function (req, res) {
  _newArrowCheck(this, _this);

  res.send("Server is running ");
}.bind(void 0));
var _default = server;
exports["default"] = _default;