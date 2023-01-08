const btn = document.querySelector("#todo-btn");
const header = document.querySelector("header");

const todoShow = document.querySelector("#todo-show");
const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("#todo-form input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // localstorage 에 toDos를 문자열형태로 저장(stringify)
}

function deleteTodo(event) {
  const li = event.target.parentElement; // 클릭된 (event) target (버튼) 의 parentElement(부모요소 (text)) 를 li 에 저장후 삭제
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li"); // 요소 추가 하기
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text; // span의 내용 불러와서 바꾸기
  const button = document.createElement("button");
  button.innerText = " X";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span); // 요소아래에 요소 담기
  li.appendChild(button);
  todoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault(); // 새로고침시 사라지는거 막기
  const newTodo = todoInput.value; // input의 값 저장 하기
  todoInput.value = ""; // input에 엔터시 값 사라지게 하기
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj); // 실행시 마다 paintToDo 실행하기
  saveToDos();
}

todoForm.addEventListener("submit", handleToDoSubmit); // form 에 엔터로 제출 시마다 handeltodosubmit 함수 실행하기

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

function showTodo(event) {
  let tmp = todoShow.style.display;
  if (tmp === "none") {
    tmp = "block";
    btn.innerText = "Close";
  } else {
    tmp = "none";
    header.style.backgroundColor = "";
    btn.innerText = `To_do[ ${toDos.length} ]`;
  }
  todoShow.style.display = tmp;
}
// btn.addEventListener("click", showTodo);
// btn.innerText = `To_do[ ${toDos.length} ]`;
