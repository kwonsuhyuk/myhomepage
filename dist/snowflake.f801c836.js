parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"WQfV":[function(require,module,exports) {
var e=document.querySelector("body"),t=document.querySelector(".snowflakeBtn"),a=document.querySelectorAll(".snowflake"),n=10,o=.3,c=!1;function l(){t.classList.toggle("active"),c=!!t.classList.contains("active");for(var e=0;e<200&&c;e++)setTimeout(i,150*e)}function i(){var t=document.createElement("div"),a=10*Math.random(),l=Math.random()+o,s=20*Math.random()+n;t.classList.add("snowflake"),t.style.left="".concat(Math.random()*window.screen.width,"px"),t.style.animationDelay="".concat(a,"s"),t.style.opacity=l,t.style.animation="fall ".concat(s,"s linear"),e.appendChild(t),c&&setTimeout(function(){e.removeChild(t),i()},1e3*(s+a))}t.addEventListener("click",l);
},{}]},{},["WQfV"], null)
//# sourceMappingURL=/snowflake.f801c836.js.map