const KEY = ["name", "git", "mail"];

const signForm = document.getElementById("login-form");
const nameInput = document.querySelector(".user-name input");
const gitInput = document.querySelector(".gitUrl input");
const mailInput = document.getElementsByName("mail");
const subBtn = signForm.querySelector(".submit a");

// 유저 정보 저장하기
function onLoginSubmit(event) {
  const userName = nameInput.value;
  const userGit = gitInput.value;
  mailInput.forEach((el) => {
    if (el.checked) {
      localStorage.setItem("mail", el.value);
    }
  });
  localStorage.setItem("name", userName);
  localStorage.setItem("git", userGit);
}

// // 유저 정보에 이름 있는지 판별 => 있을시 로그인창 안뜨게
function userInfoOn() {
  const name = localStorage.getItem("name");
  if (name !== null || name !== undefined || name.length !== 0) {
    location.assign("./main.html");
  }
}

userInfoOn();

subBtn.addEventListener("click", () => {
  onLoginSubmit();
  signForm.submit();
});
