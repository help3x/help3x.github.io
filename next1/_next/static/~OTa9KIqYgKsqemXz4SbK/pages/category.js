(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{248:function(e,t,a){__NEXT_REGISTER_PAGE("/category",function(){return e.exports=a(249),{page:e.exports.default}})},249:function(e,t,a){"use strict";a.r(t);var n=a(23),c=a.n(n),l=a(0),r=a.n(l),s=a(22),i=a.n(s),o=a(14),u=a.n(o),d=a(9),m=a.n(d),p=a(118),b=a(35),h=a(44),E=function(e){if(!Array.isArray(e))return[];var t=e.slice();return t.sort(function(e,t){var a=(e||{}).datePublished,n=(t||{}).datePublished;return a>n?-1:a<n?1:0}),t}(a.n(h).a),x=function(e){var t="";e.datePublished&&e.datePublished.substr&&(t="".concat(e.datePublished.substr(0,4),".").concat(("00"+e.datePublished.substr(5,2)).slice(-2),".").concat(("00"+e.datePublished.substr(8,2)).slice(-2)));var a="";e.datePublished&&(a=e.datePublished);var n="".concat(e.publicUrl,"/entry/").concat(e.id);return r.a.createElement("article",{className:"jsx-3572168553 post-card p1 flex"},r.a.createElement("div",{className:"jsx-3572168553 p1 flex-none"},r.a.createElement(u.a,{href:"/post?id=".concat(e.id),as:n},r.a.createElement("img",{width:"128",height:"128",src:"https://placehold.jp/128x128.png",className:"jsx-3572168553 thumb"}))),r.a.createElement("div",{className:"jsx-3572168553 flex-auto"},r.a.createElement("h2",{className:"jsx-3572168553"},r.a.createElement(u.a,{href:"/post?id=".concat(e.id),as:n},r.a.createElement("a",{className:"jsx-3572168553 post-link-text h3"},e.title))),r.a.createElement("time",{dateTime:a,className:"jsx-3572168553 h5"},t)),r.a.createElement(c.a,{styleId:"3572168553",css:[".post-card.jsx-3572168553{border:1px solid black;border-radius:.25rem;}",".thumb.jsx-3572168553{width:96px;height:96px;cursor:pointer;}",".post-link-text.jsx-3572168553{color:#333;-webkit-text-decoration:none;text-decoration:none;}"]}))};t.default=Object(p.withRouter)(function(e){console.log("pages::Category",e);var t=m()().publicRuntimeConfig,a=t.siteName,n=t.siteDescription,c="".concat(a).concat(n?" | ".concat(n):"");return r.a.createElement(b.a,null,r.a.createElement(i.a,null,r.a.createElement("title",null,c)),r.a.createElement("div",{className:"p2 md-px3"},r.a.createElement("ul",{className:"mt0 list-reset"},E.map(function(e){return r.a.createElement("li",{key:e.id,className:"mb2"},r.a.createElement(x,{id:e.id,title:e.title,datePublished:e.datePublished,publicUrl:t.publicUrl}))})),r.a.createElement("p",null,"NodeEnv は ","production"),r.a.createElement(u.a,{href:"/about",as:"".concat(t.publicUrl,"/about")},r.a.createElement("a",null,"About"))),r.a.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:'\n          {\n            "@context": "http://schema.org/",\n            "@type": "Article"\n          }'}}))})}},[[248,1,0]]]);