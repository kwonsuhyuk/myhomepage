const KEY = ["name", "git", "mail"];

const userGit = document.querySelector(".gitName a");
const userMail = document.querySelector(".mailName a");

function setUserInfo() {
  userGit.href = localStorage.getItem(KEY[1]);
  userMail.href = localStorage.getItem(KEY[2]);
}

setUserInfo();
