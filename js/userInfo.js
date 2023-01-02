const KEY = ["name", "git", "mail"];

const userGitB = document.querySelector(".gitName a");
const userMailB = document.querySelector(".mailName a");

function setUserInfo(event) {
  if (userGitB === null) {
    alert("GitHub 주소를 입력해주세요");
  } else {
    userGitB.href = `${localStorage.getItem(KEY[1])};`;
    console.log(userGitB.href);
  }
  if (userMailB === null) {
    alert("Mail 주소를 입력해주세요");
  } else {
    userMailB.href = `${localStorage.getItem(KEY[2])}`;
    console.log(userMailB.href);
  }
}

setUserInfo();
