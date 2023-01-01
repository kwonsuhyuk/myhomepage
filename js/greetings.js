// const loginForm = document.getElementById("login-form");
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
// const link = document.querySelector("a");

function onLoginSubmit(event) {
  event.preventDefault(); // 브라우저의 기본행동을 (새로고침 등) 막는 함수
  loginForm.classList.add("hidden");
  const userName = loginInput.value;
  localStorage.setItem(USERNAME_KEY, userName);
  //   greeting.innerText = "hello " + userName;
  paintGreetings(userName);
}

function paintGreetings(userName) {
  let hello = "";
  const date = new Date();
  const hour = Number(date.getHours());
  if (hour < 7 || hour >= 20) {
    hello = "Good Night!";
  }
  if (hour >= 18 && hour < 20) {
    hello = "Good Evening!";
  }
  if (hour >= 7 && hour < 12) {
    hello = "Good Morning!";
  }
  if (hour >= 12 && hour < 18) {
    hello = "Good Afternoon!";
  }
  greeting.innerText = `${hello} ${userName}`; // 작은 따옴표가아닌 백틱사용
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

// function handleLinkClick(event) {
//   event.preventDefault();
//   console.dir(event);
// }

// link.addEventListener("click", handleLinkClick);

//handleLinkClick({information about the event that just happened})
const savedUsername = localStorage.getItem(USERNAME_KEY);

// if (savedUsername === null) {
//   // show the form
//   loginForm.classList.remove(HIDDEN_CLASSNAME);
//   loginForm.addEventListener("submit", onLoginSubmit);
// } else {
//   // show the message
//   paintGreetings(savedUsername);
// }
