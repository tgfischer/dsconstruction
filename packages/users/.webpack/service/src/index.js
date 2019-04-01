module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! exports provided: initiateAuth, resetTemporaryPassword, getUser, createUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initiateAuth", function() { return initiateAuth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetTemporaryPassword", function() { return resetTemporaryPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUser", function() { return getUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUser", function() { return createUser; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aws-sdk */ "aws-sdk");
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_1__);



const getUserPool = () => new aws_sdk__WEBPACK_IMPORTED_MODULE_1___default.a.CognitoIdentityServiceProvider({
  region: process.env.COGNITO_USER_POOL_REGION
});

const initiateAuthResponseHandler = result => {
  if (!result.ChallengeName) {
    return {
      idToken: result.AuthenticationResult.IdToken
    };
  }

  const {
    name: firstName,
    family_name: lastName,
    email
  } = JSON.parse(result.ChallengeParameters.userAttributes);
  return {
    session: result.Session,
    challengeName: result.ChallengeName,
    user: {
      firstName,
      lastName,
      email
    }
  };
};

const initiateAuth = async (email, password) => {
  const response = await getUserPool().adminInitiateAuth({
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  }).promise();
  const result = initiateAuthResponseHandler(response);

  if (result.session) {
    return result;
  }

  const user = await getUser(email);
  return { ...result,
    user
  };
};
const resetTemporaryPassword = async (email, password, firstName, lastName, session) => {
  const response = await getUserPool().adminRespondToAuthChallenge({
    ChallengeName: "NEW_PASSWORD_REQUIRED",
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    ChallengeResponses: {
      USERNAME: email,
      NEW_PASSWORD: password,
      "userAttributes.name": firstName,
      "userAttributes.family_name": lastName
    },
    Session: session
  }).promise();
  const result = initiateAuthResponseHandler(response);
  const user = await getUser(email);
  return { ...result,
    user
  };
};
const getUser = async username => {
  const result = await getUserPool().adminGetUser({
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: username
  }).promise();
  const mapping = {
    name: "firstName",
    family_name: "lastName",
    email: "email"
  };
  return result.UserAttributes.reduce((user, {
    Name,
    Value
  }) => mapping[Name] ? { ...user,
    [mapping[Name]]: Value
  } : user, {});
};
const createUser = async (firstName, lastName, email, password) => {
  const result = await getUserPool().adminCreateUser({
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: email,
    TemporaryPassword: password,
    UserAttributes: [{
      Name: "email",
      Value: email
    }, {
      Name: "name",
      Value: firstName
    }, {
      Name: "family_name",
      Value: lastName
    }]
  }).promise();
  return result.UserAttributes;
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handler", function() { return handler; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! serverless-http */ "serverless-http");
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(serverless_http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cookie-parser */ "cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _tomfischer_middleware__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tomfischer/middleware */ "@tomfischer/middleware");
/* harmony import */ var _tomfischer_middleware__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_tomfischer_middleware__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _routes_login__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/login */ "./src/routes/login.js");
/* harmony import */ var _routes_reset__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/reset */ "./src/routes/reset.js");
/* harmony import */ var _routes_create__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes/create */ "./src/routes/create.js");










const app = express__WEBPACK_IMPORTED_MODULE_1___default()();
app.use(body_parser__WEBPACK_IMPORTED_MODULE_3___default.a.urlencoded({
  extended: true
}));
app.use(body_parser__WEBPACK_IMPORTED_MODULE_3___default.a.json());
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_4___default()());
app.use(cors__WEBPACK_IMPORTED_MODULE_5___default()());
app.use("/api/login", _routes_login__WEBPACK_IMPORTED_MODULE_7__["default"]);
app.use("/api/reset", _routes_reset__WEBPACK_IMPORTED_MODULE_8__["default"]);
app.use("/api/create", _routes_create__WEBPACK_IMPORTED_MODULE_9__["default"]);
app.use(_tomfischer_middleware__WEBPACK_IMPORTED_MODULE_6___default.a.errorHandler);
const handler = serverless_http__WEBPACK_IMPORTED_MODULE_2___default()(app);

/***/ }),

/***/ "./src/routes/create.js":
/*!******************************!*\
  !*** ./src/routes/create.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http-status-codes */ "http-status-codes");
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http_status_codes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express_async_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express-async-handler */ "express-async-handler");
/* harmony import */ var express_async_handler__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express_async_handler__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../client */ "./src/client.js");





const router = express__WEBPACK_IMPORTED_MODULE_1___default.a.Router({
  mergeParams: true
});

const create = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;
  const result = await _client__WEBPACK_IMPORTED_MODULE_4__["createUser"](firstName, lastName, email, password);
  res.status(http_status_codes__WEBPACK_IMPORTED_MODULE_2___default.a.OK).json(result);
};

router.post("/", express_async_handler__WEBPACK_IMPORTED_MODULE_3___default()(create));
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/routes/login.js":
/*!*****************************!*\
  !*** ./src/routes/login.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http-status-codes */ "http-status-codes");
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http_status_codes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express_async_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express-async-handler */ "express-async-handler");
/* harmony import */ var express_async_handler__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express_async_handler__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _tomfischer_middleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tomfischer/middleware */ "@tomfischer/middleware");
/* harmony import */ var _tomfischer_middleware__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_tomfischer_middleware__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../client */ "./src/client.js");
/* harmony import */ var _schemas_login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../schemas/login */ "./src/schemas/login.js");







const router = express__WEBPACK_IMPORTED_MODULE_1___default.a.Router({
  mergeParams: true
});

const login = async (req, res) => {
  const {
    email,
    password
  } = res.locals.body;
  const result = await _client__WEBPACK_IMPORTED_MODULE_5__["initiateAuth"](email, password);
  res.status(http_status_codes__WEBPACK_IMPORTED_MODULE_2___default.a.OK).json(result);
};

router.post("/", Object(_tomfischer_middleware__WEBPACK_IMPORTED_MODULE_4__["validate"])(_schemas_login__WEBPACK_IMPORTED_MODULE_6__["loginSchema"], "body"), express_async_handler__WEBPACK_IMPORTED_MODULE_3___default()(login));
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/routes/reset.js":
/*!*****************************!*\
  !*** ./src/routes/reset.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http-status-codes */ "http-status-codes");
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http_status_codes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express_async_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express-async-handler */ "express-async-handler");
/* harmony import */ var express_async_handler__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express_async_handler__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _tomfischer_middleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tomfischer/middleware */ "@tomfischer/middleware");
/* harmony import */ var _tomfischer_middleware__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_tomfischer_middleware__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../client */ "./src/client.js");
/* harmony import */ var _schemas_login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../schemas/login */ "./src/schemas/login.js");







const router = express__WEBPACK_IMPORTED_MODULE_1___default.a.Router({
  mergeParams: true
});

const resetTemporaryPassword = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    session
  } = res.locals.body;
  const result = await _client__WEBPACK_IMPORTED_MODULE_5__["resetTemporaryPassword"](email, password, firstName, lastName, session);
  res.status(http_status_codes__WEBPACK_IMPORTED_MODULE_2___default.a.OK).json(result);
};

router.post("/temporary", Object(_tomfischer_middleware__WEBPACK_IMPORTED_MODULE_4__["validate"])(_schemas_login__WEBPACK_IMPORTED_MODULE_6__["resetTemporaryPasswordSchema"], "body"), express_async_handler__WEBPACK_IMPORTED_MODULE_3___default()(resetTemporaryPassword));
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/schemas/login.js":
/*!******************************!*\
  !*** ./src/schemas/login.js ***!
  \******************************/
/*! exports provided: loginSchema, resetTemporaryPasswordSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginSchema", function() { return loginSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetTemporaryPasswordSchema", function() { return resetTemporaryPasswordSchema; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! joi */ "joi");
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);


const loginSchema = joi__WEBPACK_IMPORTED_MODULE_1___default.a.object().keys({
  email: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().email().required(),
  password: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required()
});
const resetTemporaryPasswordSchema = joi__WEBPACK_IMPORTED_MODULE_1___default.a.object().keys({
  email: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().email().required(),
  password: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),
  firstName: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().allow(""),
  lastName: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().allow(""),
  session: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required()
});

/***/ }),

/***/ "@tomfischer/middleware":
/*!*****************************************!*\
  !*** external "@tomfischer/middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@tomfischer/middleware");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-async-handler":
/*!****************************************!*\
  !*** external "express-async-handler" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-async-handler");

/***/ }),

/***/ "http-status-codes":
/*!************************************!*\
  !*** external "http-status-codes" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http-status-codes");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),

/***/ "serverless-http":
/*!**********************************!*\
  !*** external "serverless-http" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serverless-http");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map