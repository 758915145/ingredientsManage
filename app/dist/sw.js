var __wpo = {"assets":{"main":["./static/media/element-icons.b02bdc1b.ttf","./static/media/element-icons.d2f69a92.woff","./vendor.7f7140e3.js","./client.3299dd5b.js","./manifest.0c8b15bb.js","./styles.0e0c8b10.css","./styles.ac364207.css","./","./static/data/history.json","./static/data/Ingredients.json","./static/data/today.json","./static/favicon.ico"],"additional":[],"optional":[]},"externals":[],"hashesMap":{"b56f18e001f5505e10ff5dc49162f8f87a0e3734":"./static/media/element-icons.b02bdc1b.ttf","4dfc8ae8d658e62a2e3ee713112ae56e174303f9":"./static/media/element-icons.d2f69a92.woff","4409c16aaaea275dc019de570c753969203cf3fd":"./vendor.7f7140e3.js","1e2c5928cd6b26c2499628e70c0058283b2c0a3a":"./client.3299dd5b.js","9a050435930e7910da666d33f08b26e6a8b8ef35":"./manifest.0c8b15bb.js","1d8cf4a3d66e864091355263abb4e5774743ed82":"./styles.0e0c8b10.css","0b5620eb5659ef2780a42fc6eca1f808f31bee6b":"./styles.ac364207.css","ed1c1c17968e6b5d3d3b5b6f3423b30744418bcc":"./","5f36b2ea290645ee34d943220a14b54ee5ea5be5":"./static/data/history.json","9b7f6ffde78370abd2f55efaf35e142b406c3666":"./static/data/Ingredients.json","6eebbac80ad3834b0030622560b707c8d4dd3d3c":"./static/data/today.json","1f88f14d959244697a68f619f52e622cbea8492b":"./static/favicon.ico"},"strategy":"changed","responseStrategy":"cache-first","version":"2017-08-01 21:08:22","name":"webpack-offline","pluginVersion":"4.8.3","relativePaths":false};

!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="./",n(n.s=1)}([function(e,n){},function(e,n,t){"use strict";function r(e,n){function t(){if(!U.additional.length)return Promise.resolve();l&&console.log("[SW]:","Caching additional");var e=void 0;return e="changed"===S?c("additional"):r("additional"),e.catch(function(e){console.error("[SW]:","Cache section `additional` failed to load")})}function r(n){var t=U[n];return caches.open(j).then(function(n){return y(n,t,{bust:e.version,request:e.prefetchRequest})}).then(function(){f("Cached assets: "+n,t)}).catch(function(e){throw console.error(e),e})}function c(n){return d().then(function(t){if(!t)return r(n);var o=t[0],i=t[1],a=t[2],c=a.hashmap,u=a.version;if(!a.hashmap||u===e.version)return r(n);var s=Object.keys(c).map(function(e){return c[e]}),l=i.map(function(e){var n=new URL(e.url);return n.search="",n.hash="",n.toString()}),h=U[n],d=[],p=h.filter(function(e){return-1===l.indexOf(e)||-1===s.indexOf(e)});Object.keys(L).forEach(function(e){var n=L[e];if(-1!==h.indexOf(n)&&-1===p.indexOf(n)&&-1===d.indexOf(n)){var t=c[e];t&&-1!==l.indexOf(t)?d.push([t,n]):p.push(n)}}),f("Changed assets: "+n,p),f("Moved assets: "+n,d);var v=Promise.all(d.map(function(e){return o.match(e[0]).then(function(n){return[e[1],n]})}));return caches.open(j).then(function(n){var t=v.then(function(e){return Promise.all(e.map(function(e){return n.put(e[0],e[1])}))});return Promise.all([t,y(n,p,{bust:e.version,request:e.prefetchRequest})])})})}function h(){return caches.keys().then(function(e){var n=e.map(function(e){if(0===e.indexOf(q)&&0!==e.indexOf(j))return console.log("[SW]:","Delete cache:",e),caches.delete(e)});return Promise.all(n)})}function d(){return caches.keys().then(function(e){for(var n=e.length,t=void 0;n--&&(t=e[n],0!==t.indexOf(q)););if(t){var r=void 0;return caches.open(t).then(function(e){return r=e,e.match(new URL(_,location).toString())}).then(function(e){if(e)return Promise.all([r,r.keys(),e.json()])})}})}function p(){return caches.open(j).then(function(n){var t=new Response(JSON.stringify({version:e.version,hashmap:L}));return n.put(new URL(_,location).toString(),t)})}function v(e,n,t){return o(t,j).then(function(r){return r?(l&&console.log("[SW]:","URL ["+t+"]("+n+") from cache"),r):fetch(e.request).then(function(r){return r.ok?(l&&console.log("[SW]:","URL ["+n+"] from network"),t===n&&function(){var t=r.clone(),o=caches.open(j).then(function(e){return e.put(n,t)}).then(function(){console.log("[SW]:","Cache asset: "+n)});e.waitUntil(o)}(),r):(l&&console.log("[SW]:","URL ["+n+"] wrong response: ["+r.status+"] "+r.type),r)})})}function g(e,n,t){return fetch(e.request).then(function(e){if(e.ok)return l&&console.log("[SW]:","URL ["+n+"] from network"),e;throw new Error("Response is not ok")}).catch(function(){return l&&console.log("[SW]:","URL ["+n+"] from cache if possible"),o(t,j)})}function m(e){return e.catch(function(){}).then(function(e){var n=e&&e.ok,t=e&&"opaqueredirect"===e.type;return n||t&&!M?e:(l&&console.log("[SW]:","Loading navigation fallback ["+F+"] from cache"),o(F,j))})}function w(){Object.keys(U).forEach(function(e){U[e]=U[e].map(function(e){var n=new URL(e,location);return n.hash="",-1===P.indexOf(e)&&(n.search=""),n.toString()})}),Object.keys(W).forEach(function(e){W[e]=W[e].map(function(e){var n=new URL(e,location);return n.hash="",-1===P.indexOf(e)&&(n.search=""),n.toString()})}),L=Object.keys(L).reduce(function(e,n){var t=new URL(L[n],location);return t.search="",t.hash="",e[n]=t.toString(),e},{}),P=P.map(function(e){var n=new URL(e,location);return n.hash="",n.toString()})}function y(e,n,t){var r=!1!==t.allowLoaders,o=t&&t.bust,a=t.request||{credentials:"omit",mode:"cors"};return Promise.all(n.map(function(e){return o&&(e=i(e,o)),fetch(e,a).then(u)})).then(function(o){if(o.some(function(e){return!e.ok}))return Promise.reject(new Error("Wrong response status"));var i=[],a=o.map(function(t,o){return r&&i.push(x(n[o],t)),e.put(n[o],t)});return i.length?function(){var r=s(t);r.allowLoaders=!1;var o=a;a=Promise.all(i).then(function(t){var i=[].concat.apply([],t);return n.length&&(o=o.concat(y(e,i,r))),Promise.all(o)})}():a=Promise.all(a),a})}function x(e,n){var t=Object.keys(W).map(function(t){if(-1!==W[t].indexOf(e)&&k[t])return k[t](n.clone())}).filter(function(e){return!!e});return Promise.all(t).then(function(e){return[].concat.apply([],e)})}function O(e){var n=e.url,t=new URL(n),r=void 0;r="navigate"===e.mode?"navigate":t.origin===location.origin?"same-origin":"cross-origin";for(var o=0;o<b.length;o++){var i=b[o];if(i&&(!i.requestTypes||-1!==i.requestTypes.indexOf(r))){var a=void 0;if((a="function"==typeof i.match?i.match(t,e):n.replace(i.match,i.to))&&a!==n)return a}}}var k=n.loaders,b=n.cacheMaps,S=e.strategy,R=e.responseStrategy,U=e.assets,W=e.loaders||{},L=e.hashesMap,P=e.externals,q=e.name,E=e.version,j=q+":"+E,_="__offline_webpack__data";w();var C=[].concat(U.main,U.additional,U.optional),F=e.navigateFallbackURL,M=e.navigateFallbackForRedirects;self.addEventListener("install",function(e){console.log("[SW]:","Install event");var n=void 0;n="changed"===S?c("main"):r("main"),e.waitUntil(n)}),self.addEventListener("activate",function(e){console.log("[SW]:","Activate event");var n=t();n=n.then(p),n=n.then(h),n=n.then(function(){if(self.clients&&self.clients.claim)return self.clients.claim()}),e.waitUntil(n)}),self.addEventListener("fetch",function(e){var n=new URL(e.request.url);n.hash="";var t=n.toString();-1===P.indexOf(t)&&(n.search="",t=n.toString());var r="GET"===e.request.method,o=-1!==C.indexOf(t),i=t;if(!o){var c=O(e.request);c&&(i=c,o=!0)}if(!o&&r&&F&&a(e.request))return void e.respondWith(m(fetch(e.request)));if(!o||!r)return void(n.origin!==location.origin&&-1!==navigator.userAgent.indexOf("Firefox/44.")&&e.respondWith(fetch(e.request)));var u=void 0;u="network-first"===R?g(e,t,i):v(e,t,i),F&&a(e.request)&&(u=m(u)),e.respondWith(u)}),self.addEventListener("message",function(e){var n=e.data;if(n)switch(n.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting()}})}function o(e,n){return caches.match(e,{cacheName:n}).then(function(t){return c()?t:u(t).then(function(t){return caches.open(n).then(function(n){return n.put(e,t)}).then(function(){return t})})}).catch(function(){})}function i(e,n){return e+(-1!==e.indexOf("?")?"&":"?")+"__uncache="+encodeURIComponent(n)}function a(e){return"navigate"===e.mode||e.headers.get("Upgrade-Insecure-Requests")||-1!==(e.headers.get("Accept")||"").indexOf("text/html")}function c(e){return!e||!e.redirected||!e.ok||"opaqueredirect"===e.type}function u(e){return c(e)?Promise.resolve(e):("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status})})}function s(e){return Object.keys(e).reduce(function(n,t){return n[t]=e[t],n},{})}function f(e,n){console.groupCollapsed("[SW]:",e),n.forEach(function(e){console.log("Asset:",e)}),console.groupEnd()}if(function(){var e=ExtendableEvent.prototype.waitUntil,n=FetchEvent.prototype.respondWith,t=new WeakMap;ExtendableEvent.prototype.waitUntil=function(n){var r=this,o=t.get(r);return o?void o.push(Promise.resolve(n)):(o=[Promise.resolve(n)],t.set(r,o),e.call(r,Promise.resolve().then(function e(){var n=o.length;return Promise.all(o.map(function(e){return e.catch(function(){})})).then(function(){return o.length!=n?e():(t.delete(r),Promise.all(o))})})))},FetchEvent.prototype.respondWith=function(e){return this.waitUntil(e),n.call(this,e)}}(),void 0===l)var l=!1;r(__wpo,{loaders:{},cacheMaps:[]}),e.exports=t(0)}]);