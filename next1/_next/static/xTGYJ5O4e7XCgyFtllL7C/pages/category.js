(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{248:function(e,t,a){__NEXT_REGISTER_PAGE("/category",function(){return e.exports=a(249),{page:e.exports.default}})},249:function(e,t,a){"use strict";a.r(t);var n=a(23),r=a.n(n),l=a(0),c=a.n(l),s=a(22),i=a.n(s),o=a(14),u=a.n(o),d=a(9),m=a.n(d),p=a(118),b=a(35),h=a(44),x=a.n(h),E=a(45),f=a.n(E),g=function(e){if(!Array.isArray(e))return[];var t=e.slice();return t.sort(function(e,t){var a=(e||{}).datePublished,n=(t||{}).datePublished;return a>n?-1:a<n?1:0}),t}(x.a),j=function(e){var t="";e.datePublished&&e.datePublished.substr&&(t="".concat(e.datePublished.substr(0,4),".").concat(("00"+e.datePublished.substr(5,2)).slice(-2),".").concat(("00"+e.datePublished.substr(8,2)).slice(-2)));var a="";e.datePublished&&(a=e.datePublished);var n="".concat(e.publicUrl,"/entry/").concat(e.id);return c.a.createElement("article",{className:"jsx-3572168553 post-card p1 flex"},c.a.createElement("div",{className:"jsx-3572168553 p1 flex-none"},c.a.createElement(u.a,{href:"/post?id=".concat(e.id),as:n},c.a.createElement("img",{width:"128",height:"128",src:"https://placehold.jp/128x128.png",className:"jsx-3572168553 thumb"}))),c.a.createElement("div",{className:"jsx-3572168553 flex-auto"},c.a.createElement("h2",{className:"jsx-3572168553"},c.a.createElement(u.a,{href:"/post?id=".concat(e.id),as:n},c.a.createElement("a",{className:"jsx-3572168553 post-link-text h3"},e.title))),c.a.createElement("time",{dateTime:a,className:"jsx-3572168553 h5"},t)),c.a.createElement(r.a,{styleId:"3572168553",css:[".post-card.jsx-3572168553{border:1px solid black;border-radius:.25rem;}",".thumb.jsx-3572168553{width:96px;height:96px;cursor:pointer;}",".post-link-text.jsx-3572168553{color:#333;-webkit-text-decoration:none;text-decoration:none;}"]}))};t.default=Object(p.withRouter)(function(e){console.log("pages::Category",e);var t=m()().publicRuntimeConfig,a=e.router.query.slug,n=function(e,t){if(e){var a=t.filter(function(t){return t.slug===e});if(a.length>0)return a[0]}return{}}("/"===(a||"").substr(0,1)?a.substr(1):a||"",f.a);console.log(n);var r=t.siteName,l=t.siteDescription,s="".concat(r).concat(l?" | ".concat(l):"");return c.a.createElement(b.a,null,c.a.createElement(i.a,null,c.a.createElement("title",null,s)),c.a.createElement("div",{className:"p2 md-px3"},c.a.createElement("ul",{className:"mt0 list-reset"},g.map(function(e){return c.a.createElement("li",{key:e.id,className:"mb2"},c.a.createElement(j,{id:e.id,title:e.title,datePublished:e.datePublished,publicUrl:t.publicUrl}))})),c.a.createElement("p",null,"NodeEnv は ","production"),c.a.createElement(u.a,{href:"/about",as:"".concat(t.publicUrl,"/about")},c.a.createElement("a",null,"About"))),c.a.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:'\n          {\n            "@context": "http://schema.org/",\n            "@type": "Article"\n          }'}}))})},45:function(e,t){e.exports=[{name:"雑記",slug:"no-category",order:10}]}},[[248,1,0]]]);