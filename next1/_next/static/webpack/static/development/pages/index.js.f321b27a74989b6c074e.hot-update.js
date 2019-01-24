webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ "./node_modules/next/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/config */ "./node_modules/next/config.js");
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_config__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _layouts_main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../layouts/main */ "./layouts/main.js");
var _jsxFileName = "C:\\Work\\first\\next-1\\pages\\index.js";







var PostLink = function PostLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
    href: "/post?id=".concat(props.id),
    as: "".concat(props.publicUrl, "/").concat(props.id),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, props.title));
};

var PostCard = function PostCard(props) {
  var datePublishedToDsiplay = "";

  if (props.datePublished) {
    if (props.datePublished.getFullYear) {
      datePublishedToDsiplay = "".concat(props.datePublished.getFullYear(), ".").concat(("00" + props.datePublished.getMonth() + 1).slice(-2), ".").concat(("00" + props.datePublished.getDate()).slice(-2));
    }
  }

  var datePublishedToValue = "";

  if (props.datePublished) {
    if (props.datePublished.getFullYear) {
      datePublishedToValue = "".concat(props.datePublished.getFullYear(), "-").concat(("00" + props.datePublished.getMonth() + 1).slice(-2), "-").concat(("00" + props.datePublished.getDate()).slice(-2), "T").concat(("00" + props.datePublished.getHours()).slice(-2), ":").concat(("00" + props.datePublished.getMinutes()).slice(-2), "+09:00");
    }
  }

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("article", {
    className: "jsx-3572168553" + " " + "post-card p1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "jsx-3572168553" + " " + "left p1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
    href: "/post?id=".concat(props.id),
    as: "".concat(props.publicUrl, "/").concat(props.id),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    width: "128",
    height: "128",
    src: "https://placehold.jp/128x128.png",
    className: "jsx-3572168553" + " " + "thumb",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "jsx-3572168553" + " " + "clearfix",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
    className: "jsx-3572168553",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
    href: "/post?id=".concat(props.id),
    as: "".concat(props.publicUrl, "/").concat(props.id),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    className: "jsx-3572168553" + " " + "post-link-text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, props.title))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("time", {
    dateTime: datePublishedToValue,
    className: "jsx-3572168553",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, datePublishedToDsiplay)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "3572168553",
    css: ".post-card.jsx-3572168553{border:1px solid black;border-radius:.25rem;}.thumb.jsx-3572168553{width:96px;height:96px;cursor:pointer;}.post-link-text.jsx-3572168553{color:#333;-webkit-text-decoration:none;text-decoration:none;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxXb3JrXFxmaXJzdFxcbmV4dC0xXFxwYWdlc1xcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOENrQixBQUdrQyxBQUlaLEFBS0EsV0FKQyxBQUtTLFlBVEEsQUFLTixlQUNqQixNQUxBLGlCQVNBIiwiZmlsZSI6IkM6XFxXb3JrXFxmaXJzdFxcbmV4dC0xXFxwYWdlc1xcaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5pbXBvcnQgZ2V0Q29uZmlnIGZyb20gJ25leHQvY29uZmlnJ1xuXG5pbXBvcnQgUGFnZSBmcm9tICcuLi9sYXlvdXRzL21haW4nXG5cblxuY29uc3QgUG9zdExpbmsgPSBwcm9wcyA9PiB7XG4gIHJldHVybiAoXG4gICAgPExpbmsgaHJlZj17YC9wb3N0P2lkPSR7IHByb3BzLmlkIH1gfSBhcz17IGAkeyBwcm9wcy5wdWJsaWNVcmwgfS8keyBwcm9wcy5pZCB9YCB9PlxuICAgICAgPGE+eyBwcm9wcy50aXRsZSB9PC9hPlxuICAgIDwvTGluaz5cbiAgKTtcbn07XG5cblxuY29uc3QgUG9zdENhcmQgPSBwcm9wcyA9PiB7XG4gIGxldCBkYXRlUHVibGlzaGVkVG9Ec2lwbGF5ID0gXCJcIjtcbiAgaWYgKHByb3BzLmRhdGVQdWJsaXNoZWQpIHtcbiAgICBpZiAocHJvcHMuZGF0ZVB1Ymxpc2hlZC5nZXRGdWxsWWVhcikge1xuICAgICAgZGF0ZVB1Ymxpc2hlZFRvRHNpcGxheSA9IGAke3Byb3BzLmRhdGVQdWJsaXNoZWQuZ2V0RnVsbFllYXIoKX0uJHsoXCIwMFwiICsgcHJvcHMuZGF0ZVB1Ymxpc2hlZC5nZXRNb250aCgpICsgMSkuc2xpY2UoLTIpfS4keyhcIjAwXCIgKyBwcm9wcy5kYXRlUHVibGlzaGVkLmdldERhdGUoKSkuc2xpY2UoLTIpfWA7XG4gICAgfVxuICB9XG5cbiAgbGV0IGRhdGVQdWJsaXNoZWRUb1ZhbHVlID0gXCJcIjtcbiAgaWYgKHByb3BzLmRhdGVQdWJsaXNoZWQpIHtcbiAgICBpZiAocHJvcHMuZGF0ZVB1Ymxpc2hlZC5nZXRGdWxsWWVhcikge1xuICAgICAgZGF0ZVB1Ymxpc2hlZFRvVmFsdWUgPSBgJHtwcm9wcy5kYXRlUHVibGlzaGVkLmdldEZ1bGxZZWFyKCl9LSR7KFwiMDBcIiArIHByb3BzLmRhdGVQdWJsaXNoZWQuZ2V0TW9udGgoKSArIDEpLnNsaWNlKC0yKX0tJHsoXCIwMFwiICsgcHJvcHMuZGF0ZVB1Ymxpc2hlZC5nZXREYXRlKCkpLnNsaWNlKC0yKX1UJHsoXCIwMFwiICsgcHJvcHMuZGF0ZVB1Ymxpc2hlZC5nZXRIb3VycygpKS5zbGljZSgtMil9OiR7KFwiMDBcIiArIHByb3BzLmRhdGVQdWJsaXNoZWQuZ2V0TWludXRlcygpKS5zbGljZSgtMil9KzA5OjAwYDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxhcnRpY2xlIGNsYXNzTmFtZT1cInBvc3QtY2FyZCBwMVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWZ0IHAxXCI+XG4gICAgICAgIDxMaW5rIGhyZWY9e2AvcG9zdD9pZD0keyBwcm9wcy5pZCB9YH0gYXM9eyBgJHsgcHJvcHMucHVibGljVXJsIH0vJHsgcHJvcHMuaWQgfWAgfT5cbiAgICAgICAgICA8aW1nIHdpZHRoPVwiMTI4XCIgaGVpZ2h0PVwiMTI4XCIgc3JjPVwiaHR0cHM6Ly9wbGFjZWhvbGQuanAvMTI4eDEyOC5wbmdcIiBjbGFzc05hbWU9XCJ0aHVtYlwiIC8+XG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuICAgICAgICA8aDI+XG4gICAgICAgICAgPExpbmsgaHJlZj17YC9wb3N0P2lkPSR7IHByb3BzLmlkIH1gfSBhcz17IGAkeyBwcm9wcy5wdWJsaWNVcmwgfS8keyBwcm9wcy5pZCB9YCB9PlxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwicG9zdC1saW5rLXRleHRcIj57IHByb3BzLnRpdGxlIH08L2E+XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L2gyPlxuICAgICAgICA8dGltZSBkYXRlVGltZT17IGRhdGVQdWJsaXNoZWRUb1ZhbHVlIH0+eyBkYXRlUHVibGlzaGVkVG9Ec2lwbGF5IH08L3RpbWU+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLnBvc3QtY2FyZCB7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogLjI1cmVtO1xuICAgICAgICB9XG4gICAgICAgIC50aHVtYiB7XG4gICAgICAgICAgd2lkdGg6IDk2cHg7XG4gICAgICAgICAgaGVpZ2h0OiA5NnB4O1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuICAgICAgICAucG9zdC1saW5rLXRleHQge1xuICAgICAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvYXJ0aWNsZT5cbiAgKTtcbn07XG5cblxuY29uc3QgSW5kZXggPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgcHVibGljUnVudGltZUNvbmZpZywgfSA9IGdldENvbmZpZygpO1xuXG4gIGNvbnN0IHsgc2l0ZU5hbWUsIHNpdGVEZXNjcmlwdGlvbiwgfSA9IHB1YmxpY1J1bnRpbWVDb25maWc7XG4gIGNvbnN0IHBhZ2VUaXRsZSA9IGAke3NpdGVOYW1lfSR7c2l0ZURlc2NyaXB0aW9uID8gYCBcXHUwMDdjICR7c2l0ZURlc2NyaXB0aW9ufWAgOiAnJ31gO1xuXG4gIHJldHVybiAoXG4gICAgPFBhZ2UgaXNUb3BQYWdlPXsgdHJ1ZSB9PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT57IHBhZ2VUaXRsZSB9PC90aXRsZT5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicDIgbWQtcHgzXCI+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJtdDAgbGlzdC1yZXNldFwiPlxuICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJtYjJcIj48UG9zdENhcmQgaWQ9JzFzdCcgdGl0bGU9J+S4gOeVquebricgZGF0ZVB1Ymxpc2hlZD17IFwiMjAxOS0wMS0yMlQxNjo0MyswOTowMFwiIH0gcHVibGljVXJsPXsgcHVibGljUnVudGltZUNvbmZpZy5wdWJsaWNVcmwgfSAvPjwvbGk+XG4gICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm1iMlwiPjxQb3N0Q2FyZCBpZD0nMm5kJyB0aXRsZT0n5LqM55Wq55uuJyBkYXRlUHVibGlzaGVkPXsgXCIyMDE5LTAxLTIwVDE0OjIxKzA5OjAwXCIgfSBwdWJsaWNVcmw9eyBwdWJsaWNSdW50aW1lQ29uZmlnLnB1YmxpY1VybCB9IC8+PC9saT5cbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibWIyXCI+PFBvc3RDYXJkIGlkPSczcmQnIHRpdGxlPSfkuInnlarnm64nIGRhdGVQdWJsaXNoZWQ9eyBcIjIwMTktMDEtMTlUMDk6MDkrMDk6MDBcIiB9IHB1YmxpY1VybD17IHB1YmxpY1J1bnRpbWVDb25maWcucHVibGljVXJsIH0gLz48L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICA8cD5Ob2RlRW52IOOBryB7IHByb2Nlc3MuZW52Lk5PREVfRU5WIH08L3A+XG4gICAgICAgIDxMaW5rIGhyZWY9Jy9hYm91dCcgYXM9eyBgJHsgcHVibGljUnVudGltZUNvbmZpZy5wdWJsaWNVcmwgfS9hYm91dGAgfT48YT5BYm91dDwvYT48L0xpbms+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzY3JpcHRcbiAgICAgICAgdHlwZT0nYXBwbGljYXRpb24vbGQranNvbidcbiAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBgXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJAY29udGV4dFwiOiBcImh0dHA6Ly9zY2hlbWEub3JnL1wiLFxuICAgICAgICAgICAgXCJAdHlwZVwiOiBcIkFydGljbGVcIlxuICAgICAgICAgIH1gXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvUGFnZT5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluZGV4OyJdfQ== */\n/*@ sourceURL=C:\\Work\\first\\next-1\\pages\\index.js */",
    __self: this
  }));
};

var Index = function Index(props) {
  var _getConfig = next_config__WEBPACK_IMPORTED_MODULE_4___default()(),
      publicRuntimeConfig = _getConfig.publicRuntimeConfig;

  var siteName = publicRuntimeConfig.siteName,
      siteDescription = publicRuntimeConfig.siteDescription;
  var pageTitle = "".concat(siteName).concat(siteDescription ? " | ".concat(siteDescription) : '');
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_layouts_main__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isTopPage: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: this
  }, pageTitle)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "p2 md-px3",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    className: "mt0 list-reset",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "mb2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(PostCard, {
    id: "1st",
    title: "\u4E00\u756A\u76EE",
    datePublished: "2019-01-22T16:43+09:00",
    publicUrl: publicRuntimeConfig.publicUrl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "mb2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(PostCard, {
    id: "2nd",
    title: "\u4E8C\u756A\u76EE",
    datePublished: "2019-01-20T14:21+09:00",
    publicUrl: publicRuntimeConfig.publicUrl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "mb2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(PostCard, {
    id: "3rd",
    title: "\u4E09\u756A\u76EE",
    datePublished: "2019-01-19T09:09+09:00",
    publicUrl: publicRuntimeConfig.publicUrl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: this
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: this
  }, "NodeEnv \u306F ", "development"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
    href: "/about",
    as: "".concat(publicRuntimeConfig.publicUrl, "/about"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: this
  }, "About"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: "\n          {\n            \"@context\": \"http://schema.org/\",\n            \"@type\": \"Article\"\n          }"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: this
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Index);
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
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=index.js.f321b27a74989b6c074e.hot-update.js.map