"use strict";

var _server = _interopRequireDefault(require("./api/server"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var port = process.env.PORT || 3000; // listen to server 

_server["default"].listen(port, function () {
  _newArrowCheck(this, _this);

  return console.log("\n** Running on port ".concat(port, " **\n"));
}.bind(void 0));