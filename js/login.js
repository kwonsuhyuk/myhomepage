const KEY = ["name", "git", "mail"];

const signForm = document.getElementById("login-form");
const nameInput = document.querySelector(".user-name input");
const gitInput = document.querySelector(".gitUrl input");
const mailInput = document.querySelector(".mailUrl input");
const subBtn = signForm.querySelector(".submit a");

function onLoginSubmit(event) {
  event.preventDefault();
  const userName = nameInput.value;
  const userGit = gitInput.value;
  const userMail = mailInput.value;

  localStorage.setItem(KEY[0], userName);
  localStorage.setItem(KEY[1], userGit);
  localStorage.setItem(KEY[2], userMail);
}

subBtn.addEventListener("click", () => {
  onLoginSubmit();
  signForm.submit();
});
