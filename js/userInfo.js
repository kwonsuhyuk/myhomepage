// const mainUrl = "https://graceful-palmier-363c5a.netlify.app/";
const KEY = ["name", "git", "mail"];

const userGitB = document.querySelector(".gitName a");
const userMailB = document.querySelector(".mailName a");

// 유저 정보 링크에 할당
function setUserInfo() {
  const git = localStorage.getItem(KEY[1]);
  const mail = localStorage.getItem(KEY[2]);
  userGitB.href = `https://github.com/${git}`;
  userMailB.href = mail;

  const name = localStorage.getItem("name");

  if (name === null || name === undefined || name.length === 0) {
    history.back();
  }
}

setUserInfo();

// 프로필 화면 구성
// 사용자화 메뉴 버튼 구성

//firebase?
