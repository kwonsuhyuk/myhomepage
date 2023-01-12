const board = document.querySelector(".todo");
const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form input");
const submitBtn = todoForm.querySelector("button");
const todoList = document.querySelector(".todo-list");
const color = document.getElementById("select-colorBtn"); //색깔고르기
const TODOS_KEY = "todos";

let toDos = [];

const submitRed = todoForm.querySelector(".btn-red");
const submitBlue = todoForm.querySelector(".btn-blue");
const submitGreen = todoForm.querySelector(".btn-green");
let postitColor = "red";
const icon = document.createElement("i");
icon.setAttribute("class", "fa-solid fa-check fa-2xl");

submitRed.addEventListener("click", () => {
  postitColor = "red";
  submitRed.appendChild(icon);
});
submitBlue.addEventListener("click", () => {
  postitColor = "blue";
  submitBlue.appendChild(icon);
});
submitGreen.addEventListener("click", () => {
  postitColor = "green";
  submitGreen.appendChild(icon);
});
// 저장
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // localstorage 에 toDos를 문자열형태로 저장(stringify)
}

// 삭제
function deleteTodo(event) {
  const delItem = event.target.parentElement;
  delItem.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(delItem.id));
  saveToDos();
}

// 좌표 저장용
let initX = 0;
let initY = 10;

// 포스트잇 제작
function makePostit(newTodoObj, ifNew) {
  const postContainer = document.createElement("div");
  const postit = document.createElement("div");
  const dot = document.createElement("span");
  const textLine = document.createElement("div");
  const button = document.createElement("button");
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
    postContainer.style.top = `200px`;
    postContainer.style.left = `10px`;
  } else {
    postContainer.style.top = `${newTodoObj.yPos}px`;
    postContainer.style.left = `${newTodoObj.xPos}px`;
  }

  todoList.appendChild(postContainer);

  let active = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

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
    const tmpData = JSON.parse(localStorage.getItem(TODOS_KEY));
    console.log(tmpData);
    for (let i = 0; i < tmpData.length; i++) {
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

  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    color: postitColor,
    xPos: initX,
    yPos: initY,
  };
  toDos.push(newTodoObj);
  makePostit(newTodoObj, true);
  saveToDos();
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach((el) => {
    makePostit(el, false);
  });
}
submitBtn.addEventListener("click", handleToDoSubmit);


function onColorChange(event){
  postitColor = event.target.value;
  console.log(event.target.value);
}

color.addEventListener("change", onColorChange);