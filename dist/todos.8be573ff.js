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
})({"js/todos.js":[function(require,module,exports) {
var board = document.querySelector(".todo");
var todoForm = document.getElementById("todo-form");
var todoInput = document.querySelector("#todo-form input");
var submitBtn = todoForm.querySelector("button");
var todoList = document.querySelector(".todo-list");
var color = document.getElementById("select-colorBtn"); //색깔고르기
var TODOS_KEY = "todos";
var toDos = [];
var submitRed = todoForm.querySelector(".btn-red");
var submitBlue = todoForm.querySelector(".btn-blue");
var submitGreen = todoForm.querySelector(".btn-green");
var postitColor = "red";
var icon = document.createElement("i");
icon.setAttribute("class", "fa-solid fa-check fa-2xl");
submitRed.addEventListener("click", function () {
  postitColor = "red";
  submitRed.appendChild(icon);
});
submitBlue.addEventListener("click", function () {
  postitColor = "blue";
  submitBlue.appendChild(icon);
});
submitGreen.addEventListener("click", function () {
  postitColor = "green";
  submitGreen.appendChild(icon);
});
// 저장
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // localstorage 에 toDos를 문자열형태로 저장(stringify)
}

// 삭제
function deleteTodo(event) {
  var delItem = event.target.parentElement;
  delItem.remove();
  toDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(delItem.id);
  });
  saveToDos();
}

// 좌표 저장용
var initX = 0;
var initY = 10;

// 포스트잇 제작
function makePostit(newTodoObj, ifNew) {
  var postContainer = document.createElement("div");
  var postit = document.createElement("div");
  var dot = document.createElement("span");
  var textLine = document.createElement("div");
  var button = document.createElement("button");
  button.innerText = " X";
  button.addEventListener("click", deleteTodo);
  postit.id = newTodoObj.id;
  textLine.id = newTodoObj.id;
  textLine.innerText = newTodoObj.text;
  textLine.style.wordBreak = "break-all";
  postit.style.backgroundColor = newTodoObj.color;
  postit.classList.add("postit");
  textLine.classList.add("content");
  postit.appendChild(dot);
  postit.appendChild(textLine);
  postit.appendChild(button);
  postContainer.style.zIndex = newTodoObj.id / 10000;
  postContainer.appendChild(postit);
  postContainer.classList.add("postContainer");
  postContainer.style.position = "absolute";
  if (ifNew) {
    console.log(initX, initY);
    postContainer.style.top = "200px";
    postContainer.style.left = "10px";
  } else {
    postContainer.style.top = "".concat(newTodoObj.yPos, "px");
    postContainer.style.left = "".concat(newTodoObj.xPos, "px");
  }
  todoList.appendChild(postContainer);
  var active = false;
  var currentX;
  var currentY;
  var initialX;
  var initialY;
  var xOffset = 0;
  var yOffset = 0;
  postContainer.addEventListener("touchstart", dragStart, false);
  postContainer.addEventListener("touchend", dragEnd, false);
  postContainer.addEventListener("touchmove", drag, false);
  postContainer.addEventListener("mousedown", dragStart, false);
  postContainer.addEventListener("mouseup", dragEnd, false);
  postContainer.addEventListener("mousemove", drag, false);
  function dragStart(e) {
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }
    if (e.target === postit || e.target === textLine) {
      active = true;
    }
  }
  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    console.log(e.target.parentElement);
    console.log(e.target.parentElement.getBoundingClientRect());
    // content 부분 클릭시 오차 생김
    if (e.target === textLine) {
      initY = e.target.parentElement.getBoundingClientRect().top; // + 25;
      initX = e.target.parentElement.getBoundingClientRect().left; // + 47.46875;
    } else {
      initY = e.target.parentElement.getBoundingClientRect().top;
      initX = e.target.parentElement.getBoundingClientRect().left;
    }
    var tmpData = JSON.parse(localStorage.getItem(TODOS_KEY));
    console.log(tmpData);
    for (var i = 0; i < tmpData.length; i++) {
      if (tmpData[i].id == e.target.id) {
        console.log("treu");
        console.log(initX);
        console.log(initY);
        tmpData[i].xPos = initX;
        tmpData[i].yPos = initY;
      }
    }
    localStorage.setItem(TODOS_KEY, JSON.stringify(tmpData));
    console.log(JSON.parse(localStorage.getItem(TODOS_KEY)));
    active = false;
  }
  function drag(e) {
    if (active) {
      e.preventDefault();
      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }
      xOffset = currentX;
      yOffset = currentY;
      setTranslate(currentX, currentY, postContainer);
    }
  }
  function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }
}

// submit 관리
function handleToDoSubmit(event) {
  event.preventDefault();
  var newTodo = todoInput.value;
  todoInput.value = "";
  var newTodoObj = {
    text: newTodo,
    id: Date.now(),
    color: postitColor,
    xPos: initX,
    yPos: initY
  };
  toDos.push(newTodoObj);
  makePostit(newTodoObj, true);
  saveToDos();
}
var savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  var parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(function (el) {
    makePostit(el, false);
  });
}
submitBtn.addEventListener("click", handleToDoSubmit);
function onColorChange(event) {
  postitColor = event.target.value;
  console.log(event.target.value);
}
color.addEventListener("change", onColorChange);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65384" + '/');
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/todos.js"], null)
//# sourceMappingURL=/todos.8be573ff.js.map