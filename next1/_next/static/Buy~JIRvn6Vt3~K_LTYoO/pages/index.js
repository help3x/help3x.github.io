(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{239:function(e,t,a){__NEXT_REGISTER_PAGE("/",function(){return e.exports=a(240),{page:e.exports.default}})},240:function(e,t,a){"use strict";a.r(t);var n=a(23),s=a.n(n),r=a(0),o=a.n(r),c=a(22),i=a.n(c),l=a(14),u=a.n(l),d=a(9),p=a.n(d),m=(a(45),a(35)),h=a(248),b=a.n(h),f=function(e){var t="";e.datePublished&&e.datePublished.substr&&(t="".concat(e.datePublished.substr(0,4),".").concat(("00"+e.datePublished.substr(5,2)).slice(-2),".").concat(("00"+e.datePublished.substr(8,2)).slice(-2)));var a="";e.datePublished&&(a=e.datePublished);var n="".concat(e.publicUrl,"/entry/").concat(e.id);return o.a.createElement("article",{className:"jsx-3572168553 post-card p1 flex"},o.a.createElement("div",{className:"jsx-3572168553 p1"},o.a.createElement(u.a,{href:"/post?id=".concat(e.id),as:n},o.a.createElement("img",{width:"128",height:"128",src:"https://placehold.jp/128x128.png",className:"jsx-3572168553 thumb"}))),o.a.createElement("div",{className:"jsx-3572168553 flex-auto"},o.a.createElement("h2",{className:"jsx-3572168553"},o.a.createElement(u.a,{href:"/post?id=".concat(e.id),as:n},o.a.createElement("a",{className:"jsx-3572168553 post-link-text h3"},e.title))),o.a.createElement("time",{dateTime:a,className:"jsx-3572168553 h5"},t)),o.a.createElement(s.a,{styleId:"3572168553",css:[".post-card.jsx-3572168553{border:1px solid black;border-radius:.25rem;}",".thumb.jsx-3572168553{width:96px;height:96px;cursor:pointer;}",".post-link-text.jsx-3572168553{color:#333;-webkit-text-decoration:none;text-decoration:none;}"]}))};t.default=function(e){var t=p()().publicRuntimeConfig,a=t.siteName,n=t.siteDescription,s="".concat(a).concat(n?" | ".concat(n):"");return o.a.createElement(m.a,{isTopPage:!0},o.a.createElement(i.a,null,o.a.createElement("title",null,s)),o.a.createElement("div",{className:"p2 md-px3"},o.a.createElement("ul",{className:"mt0 list-reset"},b.a.map(function(e){return console.log("map",e),o.a.createElement("li",{key:e.id,className:"mb2"},o.a.createElement(f,{id:e.id,title:e.title,datePublished:e.datePublished,publicUrl:t.publicUrl}))})),o.a.createElement("p",null,"NodeEnv は ","production"),o.a.createElement(u.a,{href:"/about",as:"".concat(t.publicUrl,"/about")},o.a.createElement("a",null,"About"))),o.a.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:'\n          {\n            "@context": "http://schema.org/",\n            "@type": "Article"\n          }'}}))}},248:function(e,t){e.exports=[{title:"[CSS3] ボックスに影をつける box-shadow プロパティ",datePublished:"2018-01-21T23:00+09:00",id:"css3-box-shadow",category:"雑記"},{title:"String (JavaScript)",datePublished:"2018-01-23T09:08+09:00",id:"javascript-string-prototype",category:"雑記"},{title:"React 事始め",datePublished:"2018-01-25T11:59+09:00",dateModified:"2018-03-16T11:10+09:00",id:"study-react",category:"雑記"}]},44:function(e,t,a){"use strict";a.r(t),t.default=function(e,t){return t=t||{},new Promise(function(a,n){var s=new XMLHttpRequest;for(var r in s.open(t.method||"get",e,!0),t.headers)s.setRequestHeader(r,t.headers[r]);function o(){var e,t=[],a=[],n={};return s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(s,r,o){t.push(r=r.toLowerCase()),a.push([r,o]),n[r]=(e=n[r])?e+","+o:o}),{ok:2==(s.status/100|0),status:s.status,statusText:s.statusText,url:s.responseURL,clone:o,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},headers:{keys:function(){return t},entries:function(){return a},get:function(e){return n[e.toLowerCase()]},has:function(e){return e.toLowerCase()in n}}}}s.withCredentials="include"==t.credentials,s.onload=function(){a(o())},s.onerror=n,s.send(t.body||null)})}},45:function(e,t,a){e.exports=window.fetch||(window.fetch=a(44).default||a(44))}},[[239,1,0]]]);