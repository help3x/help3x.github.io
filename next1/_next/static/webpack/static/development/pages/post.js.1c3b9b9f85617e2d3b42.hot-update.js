webpackHotUpdate("static\\development\\pages\\post.js",{

/***/ "./pages/post.js":
/*!***********************!*\
  !*** ./pages/post.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ "./node_modules/next/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/config */ "./node_modules/next/config.js");
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_config__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _layouts_main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../layouts/main */ "./layouts/main.js");

var _jsxFileName = "C:\\Work\\first\\next-1\\pages\\post.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








var ContentBase = function ContentBase(props) {
  var datePublishedToDsiplay = "";

  if (props.pageContent.datePublished) {
    if (props.pageContent.datePublished.getFullYear) {
      datePublishedToDsiplay = "".concat(props.pageContent.datePublished.getFullYear(), ".").concat(("00" + props.pageContent.datePublished.getMonth() + 1).slice(-2), ".").concat(("00" + props.pageContent.datePublished.getDate()).slice(-2));
    }
  }

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, props.pageContent.title, " | ", props.siteName), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", {
    name: "description",
    content: props.pageContent.description,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("article", {
    className: "pt2 py0 px2 md-pt3 md-px3 bg-white",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("header", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
    className: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, props.pageContent.title), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "mt2 flex flex-wrap",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "pr1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, "\u6295\u7A3F\u65E5:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("time", {
    className: "",
    dateTime: props.pageContent.datePublished,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, datePublishedToDsiplay)))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: props.pageContent.body
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  })));
}; // 子コンポーネントでは使えないらしい ... ドキュメントに記載あり。


ContentBase.getInitialProps =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(props) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("ContentBase getInitialProps", props);
            return _context.abrupt("return", {});

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

var Content = Object(next_router__WEBPACK_IMPORTED_MODULE_5__["withRouter"])(ContentBase);

var Post = function Post(props) {
  var _getConfig = next_config__WEBPACK_IMPORTED_MODULE_4___default()(),
      publicRuntimeConfig = _getConfig.publicRuntimeConfig;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_layouts_main__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Content, _extends({
    pageContent: props.pageContent
  }, publicRuntimeConfig, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  })));
};

Post.getInitialProps =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(props) {
    var id, postId, data, pageContent;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("Post getInitialProps", props); // クエリパラメータから記事のIDを割り出す

            id = props.query.id;
            postId = (id || "").substr(0, 1) === "/" ? id.substr(1) : id || ""; // 記事の内容を取得する

            data = {
              pageContent: {}
            };
            pageContent = data.pageContent;

            if (postId === "1st") {
              pageContent.datePublished = new Date(2019, 0, 7, 15, 34);
              pageContent.title = "String.prototype.substring()";
              pageContent.body = "<p><strong><code>substring()</code></strong>メソッドは、0 インデックスやそのほか、または文字列の最後までの String オブジェクトの部分集合を返します。</p>";
            } else if (postId === "2nd") {
              pageContent.datePublished = new Date(2019, 0, 15, 16, 39);
              pageContent.title = "String.prototype.codePointAt()";
              pageContent.body = "<p><strong><code>codePointAt()</code></strong>メソッドは、Unicode ポイント値である負でない整数を返します。</p>";
            }

            return _context2.abrupt("return", data);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (Post);
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/post")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=post.js.1c3b9b9f85617e2d3b42.hot-update.js.map