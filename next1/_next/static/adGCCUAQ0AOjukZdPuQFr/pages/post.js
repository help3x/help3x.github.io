(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{118:function(e,t,n){e.exports=n(43)},241:function(e,t,n){__NEXT_REGISTER_PAGE("/post",function(){return e.exports=n(242),{page:e.exports.default}})},242:function(e,t,n){"use strict";n.r(t);var r=n(12),a=n.n(r),o=n(23),i=n.n(o),s=n(0),c=n.n(s),u=n(22),l=n.n(u),d=(n(14),n(9)),p=n.n(d),m=n(118),f=n(45),g=n.n(f),h=n(35);function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function v(e,t,n,r,a,o,i){try{var s=e[o](i),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,a)}function w(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var o=e.apply(t,n);function i(e){v(o,r,a,i,s,"next",e)}function s(e){v(o,r,a,i,s,"throw",e)}i(void 0)})}}var x=function(e){console.log("ContentBase Props",e);var t="";e.pageContent.datePublished&&e.pageContent.datePublished.substr&&(t="".concat(e.pageContent.datePublished.substr(0,4),".").concat(("00"+e.pageContent.datePublished.substr(5,2)).slice(-2),".").concat(("00"+e.pageContent.datePublished.substr(8,2)).slice(-2)));var n="";return e.pageContent.datePublished&&(n=e.pageContent.datePublished),c.a.createElement(c.a.Fragment,null,c.a.createElement(l.a,null,c.a.createElement("title",{className:"jsx-3273275265"},e.pageContent.title," | ",e.siteName),c.a.createElement("meta",{name:"description",content:e.pageContent.description,className:"jsx-3273275265"})),c.a.createElement("article",{className:"jsx-3273275265 p2 md-pt3 md-px3 bg-white"},c.a.createElement("header",{className:"jsx-3273275265 article-header mb3"},c.a.createElement("h1",{className:"jsx-3273275265"},e.pageContent.title),c.a.createElement("div",{className:"jsx-3273275265 flex flex-wrap"},c.a.createElement("div",{className:"jsx-3273275265"},c.a.createElement("time",{dateTime:n,className:"jsx-3273275265 "},t)))),c.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.pageContent.contentHtml},className:"jsx-3273275265 article-body"})),c.a.createElement(i.a,{styleId:"3273275265",css:["body{word-wrap:break-word;}",".article-header h1{font-size:2rem;line-height:1.25;}",".article-body h2{font-size:1.5rem;line-height:1.3333333333;margin-top:3rem;padding-top:1rem;padding-bottom:1rem;border-top:solid 1px #000;border-bottom:solid 1px #000;}",".article-body h3{font-size:1.25rem;line-height:1.4;padding-top:.75rem;}",".article-body h4{font-size:1rem;line-height:1.5;padding-top:1rem;}",".article-body h5{font-size:.875rem;line-height:1.5714285714;padding-top:1.125rem;}",".article-body h6{font-size:.75rem;line-height:1.6666666667;padding-top:1.25rem;}",".article-body div.sourceCode{margin:0;margin-left:-1rem;margin-right:-1rem;margin-bottom:1rem;padding:0;}",".article-body pre.sourceCode{madgin:0;padding:1rem;overflow-x:auto;color:#333;background:#f8f8f8;border:1px solid #ddd;border-radius:.25rem;font-size:.75rem;max-width:100%;}",".article-body code.sourceCode,pre>code{background-color:transparent;padding:0;}","@media all and (min-width:50em){.article-body div.sourceCode{margin-left:-2rem;margin-right:-2rem;}.article-body pre.sourceCode{padding-left:2rem;padding-right:2rem;}}"]}))};x.getInitialProps=function(){var e=w(a.a.mark(function e(t){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("ContentBase getInitialProps",t),e.abrupt("return",{});case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}();var C=Object(m.withRouter)(x),y=function(e){var t=p()().publicRuntimeConfig;return c.a.createElement(h.a,null,c.a.createElement(C,b({pageContent:e.pageContent},t)))};y.getInitialProps=function(){var e=w(a.a.mark(function e(t){var n,r,o,i,s,c,u;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.query.id,r="/"===(n||"").substr(0,1)?n.substr(1):n||"",o={pageContent:{}},i=p()(),s=i.publicRuntimeConfig,e.next=6,g()("".concat(s.publicUrl,"/static/posts/").concat(r,".json"));case 6:return c=e.sent,e.next=9,c.json();case 9:return u=e.sent,o.pageContent=u,e.abrupt("return",o);case 12:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.default=y},44:function(e,t,n){"use strict";n.r(t),t.default=function(e,t){return t=t||{},new Promise(function(n,r){var a=new XMLHttpRequest;for(var o in a.open(t.method||"get",e,!0),t.headers)a.setRequestHeader(o,t.headers[o]);function i(){var e,t=[],n=[],r={};return a.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(a,o,i){t.push(o=o.toLowerCase()),n.push([o,i]),r[o]=(e=r[o])?e+","+i:i}),{ok:2==(a.status/100|0),status:a.status,statusText:a.statusText,url:a.responseURL,clone:i,text:function(){return Promise.resolve(a.responseText)},json:function(){return Promise.resolve(a.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([a.response]))},headers:{keys:function(){return t},entries:function(){return n},get:function(e){return r[e.toLowerCase()]},has:function(e){return e.toLowerCase()in r}}}}a.withCredentials="include"==t.credentials,a.onload=function(){n(i())},a.onerror=r,a.send(t.body||null)})}},45:function(e,t,n){e.exports=window.fetch||(window.fetch=n(44).default||n(44))}},[[241,1,0]]]);