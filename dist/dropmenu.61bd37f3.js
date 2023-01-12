// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/dropmenu.js":[function(require,module,exports) {
var KEY = ["name", "git", "mail"];
//드롭다운메뉴 자체
var account = document.getElementById("show__account");
var profile = document.querySelector(".dropmenu-form");
//드롭다운메뉴 내부
var settingName = document.querySelector("#setting__name");
var settingGit = document.querySelector("#setting__git");
var accountName = document.getElementById("account__name");
var accountGit = document.getElementById("account__git");
var fixedName = document.getElementById("fixed__name");
var fixedGit = document.getElementById("fixed__git");
var fixedProfilesName = document.getElementById("drop-profiles__name");
var fixedProfilesGit = document.getElementById("drop-profiles__Git");
var greetingName = localStorage.getItem("name");
var greetingGit = localStorage.getItem("git");
var userGitB = document.querySelector(".gitName a");
//이메일버튼
var setGoogle = document.getElementById("set-google");
var setNaver = document.getElementById("set-naver");
var googleMail = new URL("https://mail.google.com/");
var naverMail = new URL("https://mail.naver.com/");
//드롭다운메뉴
function toggleProfile() {
  // menu` 숨기기 (visibility: hidden)
  //메뉴창이 뜨고 원래 로컬스토리지 안에있는 값 프인트먼저하기
  if (profile.style.visibility === 'hidden') {
    profile.style.visibility = 'visible';
    var printname = localStorage.getItem("name");
    var printgit = localStorage.getItem("git");
    accountName.innerText = printname;
    accountGit.innerText = printgit;
    //무슨 이메을 쓰고있는지 표시하기
    if (localStorage.mail !== "https://mail.google.com/") {
      setNaver.classList.add('select-icon');
      setGoogle.classList.remove('select-icon');
    } else if (localStorage.mail = "https://mail.google.com/") {
      setGoogle.classList.add('select-icon');
      setNaver.classList.remove('select-icon');
    }
  }
  // menu` 보이기 (visibility: visible)
  else {
    profile.style.visibility = 'hidden';
  }
}
//드롭다운메뉴 내부에서 수정하기
//이름버튼
function letFixedName() {
  if (accountName.style.display !== 'none') {
    accountName.style.display = 'none';
    fixedName.style.display = 'block';
  } else {
    accountName.style.display = 'block';
    fixedName.style.display = 'none';
  }
}
//이름 수정하기
function onFixedNameSubmit(event) {
  event.preventDefault();
  var newName = fixedName.value;
  localStorage.setItem("name", newName);
  var greetingName = localStorage.getItem("name");
  accountName.style.display = 'block';
  fixedName.style.display = 'none';
  accountName.innerText = greetingName;
}
//깃 버튼 
function letFixedGit() {
  if (accountGit.style.display !== 'none') {
    accountGit.style.display = 'none';
    fixedGit.style.display = 'block';
  } else {
    accountGit.style.display = 'block';
    fixedGit.style.display = 'none';
  }
}
//깃 수정하기
function onFixedGitSubmit(event) {
  event.preventDefault();
  var newGit = fixedGit.value;
  localStorage.setItem("git", newGit);
  var greetingGit = localStorage.getItem("git");
  accountGit.style.display = 'block';
  fixedGit.style.display = 'none';
  accountGit.innerText = greetingGit;
  //깃 url 이름 바꾸기
  userGitB.href = "https://github.com/".concat(greetingGit);
}
//구글 버튼
function onClcikGoogle() {
  localStorage.setItem("mail", googleMail);
  setGoogle.style.color = 'blue';
  setNaver.style.color = 'white';
}
//네이버 버튼
function onClcikNaver() {
  localStorage.setItem("mail", naverMail);
  setGoogle.style.color = 'white';
  setNaver.style.color = 'blue';
}
account.addEventListener("click", toggleProfile);
settingName.addEventListener("click", letFixedName);
settingGit.addEventListener("click", letFixedGit);
fixedProfilesName.addEventListener("submit", onFixedNameSubmit);
fixedProfilesGit.addEventListener("submit", onFixedGitSubmit);
setGoogle.addEventListener("click", onClcikGoogle);
setNaver.addEventListener("click", onClcikNaver);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61288" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/dropmenu.js"], null)
//# sourceMappingURL=/dropmenu.61bd37f3.js.map