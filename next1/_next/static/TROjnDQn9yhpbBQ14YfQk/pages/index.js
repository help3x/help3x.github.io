(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{239:function(e,t,n){__NEXT_REGISTER_PAGE("/",function(){return e.exports=n(240),{page:e.exports.default}})},240:function(e,t,n){"use strict";n.r(t);var a=n(12),r=n.n(a),s=n(23),o=n.n(s),c=n(0),i=n.n(c),l=n(22),u=n.n(l),d=n(14),p=n.n(d),m=n(9),h=n.n(m),f=(n(45),n(35));function b(e,t,n,a,r,s,o){try{var c=e[s](o),i=c.value}catch(e){return void n(e)}c.done?t(i):Promise.resolve(i).then(a,r)}var x=function(e){var t="";e.datePublished&&e.datePublished.substr&&(t="".concat(e.datePublished.substr(0,4),".").concat(("00"+e.datePublished.substr(5,2)).slice(-2),".").concat(("00"+e.datePublished.substr(8,2)).slice(-2)));var n="";e.datePublished&&(n=e.datePublished);var a="".concat(e.publicUrl,"/entry/").concat(e.id);return i.a.createElement("article",{className:"jsx-3572168553 post-card p1 flex"},i.a.createElement("div",{className:"jsx-3572168553 p1"},i.a.createElement(p.a,{href:"/post?id=".concat(e.id),as:a},i.a.createElement("img",{width:"128",height:"128",src:"https://placehold.jp/128x128.png",className:"jsx-3572168553 thumb"}))),i.a.createElement("div",{className:"jsx-3572168553 flex-auto"},i.a.createElement("h2",{className:"jsx-3572168553"},i.a.createElement(p.a,{href:"/post?id=".concat(e.id),as:a},i.a.createElement("a",{className:"jsx-3572168553 post-link-text h3"},e.title))),i.a.createElement("time",{dateTime:n,className:"jsx-3572168553 h5"},t)),i.a.createElement(o.a,{styleId:"3572168553",css:[".post-card.jsx-3572168553{border:1px solid black;border-radius:.25rem;}",".thumb.jsx-3572168553{width:96px;height:96px;cursor:pointer;}",".post-link-text.jsx-3572168553{color:#333;-webkit-text-decoration:none;text-decoration:none;}"]}))},v=function(e){var t=h()().publicRuntimeConfig,n=t.siteName,a=t.siteDescription,r="".concat(n).concat(a?" | ".concat(a):"");return i.a.createElement(f.a,{isTopPage:!0},i.a.createElement(u.a,null,i.a.createElement("title",null,r)),i.a.createElement("div",{className:"p2 md-px3"},i.a.createElement("ul",{className:"mt0 list-reset"},e.posts.map(function(e){return console.log("map",e),i.a.createElement("li",{key:e.id,className:"mb2"},i.a.createElement(x,{id:e.id,title:e.title,datePublished:e.datePublished,publicUrl:t.publicUrl}))})),i.a.createElement("p",null,"NodeEnv は ","production"),i.a.createElement(p.a,{href:"/about",as:"".concat(t.publicUrl,"/about")},i.a.createElement("a",null,"About"))),i.a.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:'\n          {\n            "@context": "http://schema.org/",\n            "@type": "Article"\n          }'}}))};v.getInitialProps=function(){var e,t=(e=r.a.mark(function e(t){var n,a,s,o,c;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=h()(),a=n.publicRuntimeConfig,s=a.recentPosts||{},o=s.posts||[],(c=o.slice?o.slice():[]).sort(function(e,t){var n=(e||{}).datePublished,a=(t||{}).datePublished;return n>a?-1:n<a?1:0}),e.abrupt("return",{posts:c});case 6:case"end":return e.stop()}},e,this)}),function(){var t=this,n=arguments;return new Promise(function(a,r){var s=e.apply(t,n);function o(e){b(s,a,r,o,c,"next",e)}function c(e){b(s,a,r,o,c,"throw",e)}o(void 0)})});return function(e){return t.apply(this,arguments)}}(),t.default=v},44:function(e,t,n){"use strict";n.r(t),t.default=function(e,t){return t=t||{},new Promise(function(n,a){var r=new XMLHttpRequest;for(var s in r.open(t.method||"get",e,!0),t.headers)r.setRequestHeader(s,t.headers[s]);function o(){var e,t=[],n=[],a={};return r.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(r,s,o){t.push(s=s.toLowerCase()),n.push([s,o]),a[s]=(e=a[s])?e+","+o:o}),{ok:2==(r.status/100|0),status:r.status,statusText:r.statusText,url:r.responseURL,clone:o,text:function(){return Promise.resolve(r.responseText)},json:function(){return Promise.resolve(r.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([r.response]))},headers:{keys:function(){return t},entries:function(){return n},get:function(e){return a[e.toLowerCase()]},has:function(e){return e.toLowerCase()in a}}}}r.withCredentials="include"==t.credentials,r.onload=function(){n(o())},r.onerror=a,r.send(t.body||null)})}},45:function(e,t,n){e.exports=window.fetch||(window.fetch=n(44).default||n(44))}},[[239,1,0]]]);