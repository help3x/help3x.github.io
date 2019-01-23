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
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ "./node_modules/next/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/config */ "./node_modules/next/config.js");
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_config__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _layouts_main__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../layouts/main */ "./layouts/main.js");

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

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("title", {
    className: "jsx-3106214966",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, props.pageContent.title, " | ", props.siteName), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("meta", {
    name: "description",
    content: props.pageContent.description,
    className: "jsx-3106214966",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("article", {
    className: "jsx-3106214966" + " " + "p2 md-pt3 md-px3 bg-white",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("header", {
    className: "jsx-3106214966" + " " + "article-header pb2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h1", {
    className: "jsx-3106214966" + " " + "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, props.pageContent.title), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "jsx-3106214966" + " " + "flex flex-wrap",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "jsx-3106214966",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("time", {
    dateTime: props.pageContent.datePublished,
    className: "jsx-3106214966" + " " + "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, datePublishedToDsiplay)))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: props.pageContent.body
    },
    className: "jsx-3106214966",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
    styleId: "3106214966",
    css: "\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxXb3JrXFxmaXJzdFxcbmV4dC0xXFxwYWdlc1xccG9zdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQ2tCIiwiZmlsZSI6IkM6XFxXb3JrXFxmaXJzdFxcbmV4dC0xXFxwYWdlc1xccG9zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5pbXBvcnQgZ2V0Q29uZmlnIGZyb20gJ25leHQvY29uZmlnJ1xuaW1wb3J0IHsgd2l0aFJvdXRlciwgfSBmcm9tICduZXh0L3JvdXRlcidcblxuaW1wb3J0IFBhZ2UgZnJvbSAnLi4vbGF5b3V0cy9tYWluJ1xuXG5cbmNvbnN0IENvbnRlbnRCYXNlID0gcHJvcHMgPT4ge1xuICBsZXQgZGF0ZVB1Ymxpc2hlZFRvRHNpcGxheSA9IFwiXCI7XG4gIGlmIChwcm9wcy5wYWdlQ29udGVudC5kYXRlUHVibGlzaGVkKSB7XG4gICAgaWYgKHByb3BzLnBhZ2VDb250ZW50LmRhdGVQdWJsaXNoZWQuZ2V0RnVsbFllYXIpIHtcbiAgICAgIGRhdGVQdWJsaXNoZWRUb0RzaXBsYXkgPSBgJHtwcm9wcy5wYWdlQ29udGVudC5kYXRlUHVibGlzaGVkLmdldEZ1bGxZZWFyKCl9LiR7KFwiMDBcIiArIHByb3BzLnBhZ2VDb250ZW50LmRhdGVQdWJsaXNoZWQuZ2V0TW9udGgoKSArIDEpLnNsaWNlKC0yKX0uJHsoXCIwMFwiICsgcHJvcHMucGFnZUNvbnRlbnQuZGF0ZVB1Ymxpc2hlZC5nZXREYXRlKCkpLnNsaWNlKC0yKX1gO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT57IHByb3BzLnBhZ2VDb250ZW50LnRpdGxlIH0gJiN4MDA3YzsgeyBwcm9wcy5zaXRlTmFtZSB9PC90aXRsZT5cbiAgICAgICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD17IHByb3BzLnBhZ2VDb250ZW50LmRlc2NyaXB0aW9uIH0gLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxhcnRpY2xlIGNsYXNzTmFtZT1cInAyIG1kLXB0MyBtZC1weDMgYmctd2hpdGVcIj5cbiAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJhcnRpY2xlLWhlYWRlciBwYjJcIj5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiXCI+eyBwcm9wcy5wYWdlQ29udGVudC50aXRsZSB9PC9oMT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwXCI+XG4gICAgICAgICAgICA8ZGl2PnsvKjxzcGFuIGNsYXNzTmFtZT1cInByMVwiPuaKleeov+aXpTo8L3NwYW4+Ki99PHRpbWUgY2xhc3NOYW1lPVwiXCIgZGF0ZVRpbWU9eyBwcm9wcy5wYWdlQ29udGVudC5kYXRlUHVibGlzaGVkIH0+eyBkYXRlUHVibGlzaGVkVG9Ec2lwbGF5IH08L3RpbWU+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvaGVhZGVyPlxuICAgICAgICA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogcHJvcHMucGFnZUNvbnRlbnQuYm9keSB9fSAvPlxuICAgICAgPC9hcnRpY2xlPlxuICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICk7XG59O1xuXG5cbi8vIOWtkOOCs+ODs+ODneODvOODjeODs+ODiOOBp+OBr+S9v+OBiOOBquOBhOOCieOBl+OBhCAuLi4g44OJ44Kt44Ol44Oh44Oz44OI44Gr6KiY6LyJ44GC44KK44CCXG5Db250ZW50QmFzZS5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAocHJvcHMpID0+IHtcbiAgY29uc29sZS5sb2coXCJDb250ZW50QmFzZSBnZXRJbml0aWFsUHJvcHNcIiwgcHJvcHMpO1xuICByZXR1cm4geyB9O1xufTtcblxuXG5jb25zdCBDb250ZW50ID0gd2l0aFJvdXRlcihDb250ZW50QmFzZSk7XG5cblxuY29uc3QgUG9zdCA9IHByb3BzID0+IHtcbiAgY29uc3QgeyBwdWJsaWNSdW50aW1lQ29uZmlnLCB9ID0gZ2V0Q29uZmlnKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8UGFnZT5cbiAgICAgIDxDb250ZW50XG4gICAgICAgIHBhZ2VDb250ZW50PXsgcHJvcHMucGFnZUNvbnRlbnQgfVxuICAgICAgICB7IC4uLnB1YmxpY1J1bnRpbWVDb25maWcgfSAvPlxuICAgIDwvUGFnZT5cbiAgKTtcbn07XG5cblBvc3QuZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKHByb3BzKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiUG9zdCBnZXRJbml0aWFsUHJvcHNcIiwgcHJvcHMpO1xuICAvLyDjgq/jgqjjg6rjg5Hjg6njg6Hjg7zjgr/jgYvjgonoqJjkuovjga5JROOCkuWJsuOCiuWHuuOBmVxuICBjb25zdCB7IGlkIH0gPSBwcm9wcy5xdWVyeTtcbiAgY29uc3QgcG9zdElkID0gKGlkIHx8IFwiXCIpLnN1YnN0cigwLCAxKSA9PT0gXCIvXCIgPyBpZC5zdWJzdHIoMSkgOiAoaWQgfHwgXCJcIik7XG5cbiAgLy8g6KiY5LqL44Gu5YaF5a6544KS5Y+W5b6X44GZ44KLXG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgcGFnZUNvbnRlbnQ6IHt9LFxuICB9O1xuXG4gIGNvbnN0IHBhZ2VDb250ZW50ID0gZGF0YS5wYWdlQ29udGVudDtcbiAgaWYgKHBvc3RJZCA9PT0gXCIxc3RcIikge1xuICAgIHBhZ2VDb250ZW50LmRhdGVQdWJsaXNoZWQgPSBuZXcgRGF0ZSgyMDE5LCAwLCA3LCAxNSwgMzQpO1xuICAgIHBhZ2VDb250ZW50LnRpdGxlID0gXCJTdHJpbmcucHJvdG90eXBlLnN1YnN0cmluZygpXCI7XG4gICAgcGFnZUNvbnRlbnQuYm9keSA9IFwiPHA+PHN0cm9uZz48Y29kZT5zdWJzdHJpbmcoKTwvY29kZT48L3N0cm9uZz7jg6Hjgr3jg4Pjg4njga/jgIEwIOOCpOODs+ODh+ODg+OCr+OCueOChOOBneOBruOBu+OBi+OAgeOBvuOBn+OBr+aWh+Wtl+WIl+OBruacgOW+jOOBvuOBp+OBriBTdHJpbmcg44Kq44OW44K444Kn44Kv44OI44Gu6YOo5YiG6ZuG5ZCI44KS6L+U44GX44G+44GZ44CCPC9wPlwiO1xuICB9IGVsc2UgaWYgKHBvc3RJZCA9PT0gXCIybmRcIikge1xuICAgIHBhZ2VDb250ZW50LmRhdGVQdWJsaXNoZWQgPSBuZXcgRGF0ZSgyMDE5LCAwLCAxNSwgMTYsIDM5KTtcbiAgICBwYWdlQ29udGVudC50aXRsZSA9IFwiU3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdCgpXCI7XG4gICAgcGFnZUNvbnRlbnQuYm9keSA9IFwiPHA+PHN0cm9uZz48Y29kZT5jb2RlUG9pbnRBdCgpPC9jb2RlPjwvc3Ryb25nPuODoeOCveODg+ODieOBr+OAgVVuaWNvZGUg44Od44Kk44Oz44OI5YCk44Gn44GC44KL6LKg44Gn44Gq44GE5pW05pWw44KS6L+U44GX44G+44GZ44CCPC9wPlwiO1xuICB9IGVsc2UgaWYgKHBvc3RJZCA9PT0gXCIzcmRcIikge1xuICAgIHBhZ2VDb250ZW50LmRhdGVQdWJsaXNoZWQgPSBuZXcgRGF0ZSgyMDE5LCAwLCAyMSwgNywgNCwgNTgpO1xuICAgIHBhZ2VDb250ZW50LnRpdGxlID0gXCJbQ1NTM10g44Oc44OD44Kv44K544Gr5b2x44KS44Gk44GR44KLIGJveC1zaGFkb3cg44OX44Ot44OR44OG44KjXCI7XG4gICAgcGFnZUNvbnRlbnQuYm9keSA9IFwiPGgyPuamguimgTwvaDI+PHA+PGNvZGU+Ym94LXNoYWRvdzwvY29kZT7jg5fjg63jg5Hjg4bjgqPjga/jgIHjg5zjg4Pjgq/jgrnjgasx44Gk44G+44Gf44Gv6KSH5pWw44Gu5b2x44KS44Gk44GR44KL44Go44GN44Gr5L2/44GE44G+44GZ44CCPGNvZGU+Ym94LXNoYWRvdzwvY29kZT7jg5fjg63jg5Hjg4bjgqPjgafjga/jgIHjgZ/jgajjgYjjgbDku6XkuIvjga7jgojjgYbjgavlvbHjgpLmjIflrprjgZfjgb7jgZnjgII8L3A+PGgyPuOCs+ODvOODieOCteODs+ODl+ODqzwvaDI+PHA+PGNvZGU+Ym94LXNoYWRvdzogMTBweCAxMHB4OzwvY29kZT48L3A+PGgzPuijnOi2s+iqrOaYjjwvaDM+PHA+5b2x44Gv77yS772e77yU44Gk44Gu6ZW344GV44Gu5YCk44Gn5a6a576p44GV44KM44G+44GZ44GM44CB5Lu75oSP44Gn6Imy44CBaW5zZXTjgq3jg7zjg6/jg7zjg4njgpLmjIflrprjgZnjgovjgZPjgajjgoLjgafjgY3jgb7jgZnjgIIgaW5zZXTjgq3jg7zjg6/jg7zjg4njgpLku5jjgZHjgovjgajjgIHlvbHjgYzjg5zjg4Pjgq/jgrnjga7lpJblgbTjgafjga/jgarjgY/lhoXlgbTjgavjgaTjgY/jgojjgYbjgavjgarjgorjgb7jgZnjgIIg6ZW344GV44Gu5oyH5a6a44KS55yB55Wl44GZ44KL44GoMOOBqOOBquOCiuOAgeiJsuOBruaMh+WumuOCkuecgeeVpeOBmeOCi+OBqOODpuODvOOCtuODvOOCqOODvOOCuOOCp+ODs+ODiOOBjOmBuOOCk+OBoOiJsuOBq+OBquOCiuOBvuOBmeOAgiDopIfmlbDjga7lvbHjgpLmjIflrprjgZnjgovloLTlkIjjgavjga/jgIHjgqvjg7Pjg57vvIggLCDvvInljLrliIfjgorjgaflvbHjga7jg6rjgrnjg4jjgpLopIfmlbDmjIflrprjgZfjgb7jgZnjgII8L3A+PHA+5b2x44KS5a6a576p44GZ44KL5oyH5a6a5YaF5a6544Gv44CB5Lul5LiL44Gu44KI44GG44Gr6Kej6YeI44GV44KM44G+44GZ44CCPC9wPjx1bD48bGk+4oCi77yR55Wq55uu44Gu6ZW344GV44Gu5YCk44Gv44CB5rC05bmz5pa55ZCR44Gu5b2x44Gu44Kq44OV44K744OD44OI6Led6Zui44Gn44GZ44CC5q2j44Gu5YCk44KS5oyH5a6a44GZ44KL44Go5Y+z44G444CB6LKg44Gu5YCk44KS5oyH5a6a44GZ44KL44Go5bem44G45b2x44GM56e75YuV44GX44G+44GZ44CCPC9saT48bGk+4oCi77yS55Wq55uu44Gu6ZW344GV44Gu5YCk44Gv44CB5Z6C55u05pa55ZCR44Gu5b2x44Gu44Kq44OV44K744OD44OI6Led6Zui44Gn44GZ44CC5q2j44Gu5YCk44KS5oyH5a6a44GZ44KL44Go5LiL44G444CB6LKg44Gu5YCk44KS5oyH5a6a44GZ44KL44Go5LiK44G45b2x44GM56e75YuV44GX44G+44GZ44CCPC9saT48bGk+77yaPC9saT48L3VsPlwiO1xuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQb3N0OyJdfQ== */\n/*@ sourceURL=C:\\Work\\first\\next-1\\pages\\post.js */",
    __self: this
  }));
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

var Content = Object(next_router__WEBPACK_IMPORTED_MODULE_6__["withRouter"])(ContentBase);

var Post = function Post(props) {
  var _getConfig = next_config__WEBPACK_IMPORTED_MODULE_5___default()(),
      publicRuntimeConfig = _getConfig.publicRuntimeConfig;

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_layouts_main__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Content, _extends({
    pageContent: props.pageContent
  }, publicRuntimeConfig, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
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
            } else if (postId === "3rd") {
              pageContent.datePublished = new Date(2019, 0, 21, 7, 4, 58);
              pageContent.title = "[CSS3] ボックスに影をつける box-shadow プロパティ";
              pageContent.body = "<h2>概要</h2><p><code>box-shadow</code>プロパティは、ボックスに1つまたは複数の影をつけるときに使います。<code>box-shadow</code>プロパティでは、たとえば以下のように影を指定します。</p><h2>コードサンプル</h2><p><code>box-shadow: 10px 10px;</code></p><h3>補足説明</h3><p>影は２～４つの長さの値で定義されますが、任意で色、insetキーワードを指定することもできます。 insetキーワードを付けると、影がボックスの外側ではなく内側につくようになります。 長さの指定を省略すると0となり、色の指定を省略するとユーザーエージェントが選んだ色になります。 複数の影を指定する場合には、カンマ（ , ）区切りで影のリストを複数指定します。</p><p>影を定義する指定内容は、以下のように解釈されます。</p><ul><li>•１番目の長さの値は、水平方向の影のオフセット距離です。正の値を指定すると右へ、負の値を指定すると左へ影が移動します。</li><li>•２番目の長さの値は、垂直方向の影のオフセット距離です。正の値を指定すると下へ、負の値を指定すると上へ影が移動します。</li><li>：</li></ul>";
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
//# sourceMappingURL=post.js.383cd30276eb90c6ee02.hot-update.js.map