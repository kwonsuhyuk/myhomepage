const board = document.querySelector(".todo");
const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form input");
const submitBtn = todoForm.querySelector("button");
const todoList = document.querySelector(".todo-list");

const TODOS_KEY = "todos";

let toDos = [];

const submitRed = todoForm.querySelector(".btn-red");
const submitBlue = todoForm.querySelector(".btn-blue");
const submitGreen = todoForm.querySelector(".btn-green");
let postitColor;
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

// 포스트잇 제작
function makePostit(newTodoObj) {
  const postit = document.createElement("div");
  const dot = document.createElement("span");
  const textLine = document.createElement("div");
  const button = document.createElement("button");
  button.innerText = " X";
  button.addEventListener("click", deleteTodo);
  postit.id = newTodoObj.id;
  textLine.innerText = newTodoObj.text;
  textLine.style.wordBreak = "break-all";
  postit.style.backgroundColor = newTodoObj.color;
  postit.classList.add("postit");
  textLine.classList.add("content");
  postit.appendChild(dot);
  postit.appendChild(textLine);
  postit.appendChild(button);
  todoList.appendChild(postit);
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
  };
  toDos.push(newTodoObj);
  makePostit(newTodoObj);
  saveToDos();
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(makePostit);
}

submitBtn.addEventListener("click", handleToDoSubmit);
