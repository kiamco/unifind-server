"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.deleteAll = exports.register = void 0;

var _users = _interopRequireDefault(require("../models/users"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _secrets = _interopRequireDefault(require("../../config/secrets"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var register = /*#__PURE__*/function () {
  var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, password, email, hashedPassword, user, response, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _newArrowCheck(this, _this);

            _req$body = req.body, name = _req$body.name, password = _req$body.password, email = _req$body.email; // hash password

            hashedPassword = _bcryptjs["default"].hashSync(password, 10); // create user object

            user = new _users["default"]({
              name: name,
              email: email,
              password: hashedPassword
            }); //save new user to database

            _context.prev = 4;
            _context.next = 7;
            return user.save();

          case 7:
            response = _context.sent;
            token = genToken(req.body);
            return _context.abrupt("return", res.status(200).json({
              message: "User ".concat(name, " created"),
              response: response,
              jwt: token
            }));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              message: "failed to create user ".concat(name),
              error: _context.t0
            }));

          case 16:
            ;

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 12]]);
  }));

  function register(_x, _x2) {
    return _register.apply(this, arguments);
  }

  return register;
}().bind(void 0);

exports.register = register;

var login = /*#__PURE__*/function () {
  var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, email, password, user, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _newArrowCheck(this, _this);

            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context2.prev = 2;
            _context2.next = 5;
            return _users["default"].find({
              email: email
            });

          case 5:
            user = _context2.sent;

            if (!(user.length > 0)) {
              _context2.next = 12;
              break;
            }

            if (!(user && _bcryptjs["default"].compareSync(password, user[0].password))) {
              _context2.next = 10;
              break;
            }

            token = genToken(user);
            return _context2.abrupt("return", res.status(200).json({
              message: "".concat(email, " successfully logged in"),
              jwt: token,
              username: user[0].name
            }));

          case 10:
            _context2.next = 13;
            break;

          case 12:
            return _context2.abrupt("return", res.status(404).json({
              message: 'user/password is wrong'
            }));

          case 13:
            ;
            _context2.next = 20;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            res.status(500).json({
              message: 'failed to login',
              error: _context2.t0
            });

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[2, 16]]);
  }));

  function login(_x3, _x4) {
    return _login.apply(this, arguments);
  }

  return login;
}().bind(void 0);

exports.login = login;

var deleteAll = /*#__PURE__*/function () {
  var _deleteAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var del;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _newArrowCheck(this, _this);

            _context3.prev = 1;
            del = _users["default"].remove({});
            return _context3.abrupt("return", res.status(204).json({
              message: 'deleted all user',
              response: del
            }));

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", res.status(500).json({
              message: 'failed to delete all users',
              error: _context3.t0
            }));

          case 9:
            ;

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[1, 6]]);
  }));

  function deleteAll(_x5, _x6) {
    return _deleteAll.apply(this, arguments);
  }

  return deleteAll;
}().bind(void 0);

exports.deleteAll = deleteAll;

function genToken(user) {
  // create the payload...
  var payload = {
    userid: user.id,
    username: user.username
  };
  var options = {
    expiresIn: '1h'
  };

  var token = _jsonwebtoken["default"].sign(payload, _secrets["default"].jwtSecret, options);

  return token;
}