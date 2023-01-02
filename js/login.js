const KEY = ["name", "git", "mail"];

const signForm = document.getElementById("login-form");
const nameInput = document.querySelector(".user-name input");
const gitInput = document.querySelector(".gitUrl input");
const mailInput = document.querySelector(".mailUrl input");
const subBtn = signForm.querySelector(".submit a");
// event.preventDefault();
function onLoginSubmit(event) {
  const userName = nameInput.value;
  const userGit = gitInput.value;
  const userMail = mailInput.value;

  localStorage.setItem("name", userName);
  localStorage.setItem("git", userGit);
  localStorage.setItem("mail", userMail);
}

subBtn.addEventListener("click", () => {
  onLoginSubmit();
  signForm.submit();
  console.log("hi");
});
