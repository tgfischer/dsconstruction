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
/* harmony import */ var _routes_home__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/home */ "./src/routes/home.js");
/* harmony import */ var _routes_services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/services */ "./src/routes/services.js");









const app = express__WEBPACK_IMPORTED_MODULE_1___default()();
app.use(body_parser__WEBPACK_IMPORTED_MODULE_3___default.a.urlencoded({
  extended: true
}));
app.use(body_parser__WEBPACK_IMPORTED_MODULE_3___default.a.json());
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_4___default()());
app.use(cors__WEBPACK_IMPORTED_MODULE_5___default()());
app.use("/api/home", _routes_home__WEBPACK_IMPORTED_MODULE_7__["default"]);
app.use("/api/services", _routes_services__WEBPACK_IMPORTED_MODULE_8__["default"]);
app.use(_tomfischer_middleware__WEBPACK_IMPORTED_MODULE_6___default.a.errorHandler);
const handler = serverless_http__WEBPACK_IMPORTED_MODULE_2___default()(app);

/***/ }),

/***/ "./src/routes/home.js":
/*!****************************!*\
  !*** ./src/routes/home.js ***!
  \****************************/
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



const router = express__WEBPACK_IMPORTED_MODULE_1___default.a.Router({
  mergeParams: true
});

const home = (req, res) => {
  return res.status(http_status_codes__WEBPACK_IMPORTED_MODULE_2___default.a.OK).json({
    home: {
      masthead: {
        background: "/images/IMG_2231.JPG"
      }
    }
  });
};

router.get("/", home);
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/routes/services.js":
/*!********************************!*\
  !*** ./src/routes/services.js ***!
  \********************************/
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



const router = express__WEBPACK_IMPORTED_MODULE_1___default.a.Router({
  mergeParams: true
});

const services = (req, res) => {
  return res.status(http_status_codes__WEBPACK_IMPORTED_MODULE_2___default.a.OK).json({
    services: [{
      name: "Service 1",
      blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat tellus vel neque ullamcorper, vel faucibus metus auctor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat tellus vel neque ullamcorper, vel faucibus metus auctor. Aenean ac laoreet mauris, vitae ornare nulla. Vivamus elementum tellus at hendrerit facilisis. Pellentesque eleifend ligula ut elit tempus ultrices. Proin id libero in justo dignissim rutrum sit amet non massa. Vivamus feugiat eros id nisl laoreet, non sagittis dui condimentum. Aenean elementum lacus sed nisl condimentum sodales. Donec ullamcorper turpis nec cursus finibus. Vivamus sed varius tortor. Fusce ultricies vel ante at vehicula. Morbi sit amet commodo leo. Duis ligula ante, auctor a pharetra a, mattis sed ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean mauris erat, tempor dignissim tristique tincidunt, maximus non sapien. Fusce hendrerit tortor vel felis consectetur lobortis.",
      thumbnail: "/images/thumbnail.jpg",
      to: "/services/service"
    }, {
      name: "Service 2",
      blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat tellus vel neque ullamcorper, vel faucibus metus auctor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat tellus vel neque ullamcorper, vel faucibus metus auctor. Aenean ac laoreet mauris, vitae ornare nulla. Vivamus elementum tellus at hendrerit facilisis. Pellentesque eleifend ligula ut elit tempus ultrices. Proin id libero in justo dignissim rutrum sit amet non massa. Vivamus feugiat eros id nisl laoreet, non sagittis dui condimentum. Aenean elementum lacus sed nisl condimentum sodales. Donec ullamcorper turpis nec cursus finibus. Vivamus sed varius tortor. Fusce ultricies vel ante at vehicula. Morbi sit amet commodo leo. Duis ligula ante, auctor a pharetra a, mattis sed ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean mauris erat, tempor dignissim tristique tincidunt, maximus non sapien. Fusce hendrerit tortor vel felis consectetur lobortis.",
      thumbnail: "/images/thumbnail.jpg",
      to: "/services/service"
    }, {
      name: "Service 3",
      blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat tellus vel neque ullamcorper, vel faucibus metus auctor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat tellus vel neque ullamcorper, vel faucibus metus auctor. Aenean ac laoreet mauris, vitae ornare nulla. Vivamus elementum tellus at hendrerit facilisis. Pellentesque eleifend ligula ut elit tempus ultrices. Proin id libero in justo dignissim rutrum sit amet non massa. Vivamus feugiat eros id nisl laoreet, non sagittis dui condimentum. Aenean elementum lacus sed nisl condimentum sodales. Donec ullamcorper turpis nec cursus finibus. Vivamus sed varius tortor. Fusce ultricies vel ante at vehicula. Morbi sit amet commodo leo. Duis ligula ante, auctor a pharetra a, mattis sed ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean mauris erat, tempor dignissim tristique tincidunt, maximus non sapien. Fusce hendrerit tortor vel felis consectetur lobortis.",
      thumbnail: "/images/thumbnail.jpg",
      to: "/services/service"
    }]
  });
};

router.get("/", services);
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "@tomfischer/middleware":
/*!*****************************************!*\
  !*** external "@tomfischer/middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@tomfischer/middleware");

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

/***/ "http-status-codes":
/*!************************************!*\
  !*** external "http-status-codes" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http-status-codes");

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