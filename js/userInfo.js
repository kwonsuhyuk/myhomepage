// const mainUrl = "https://graceful-palmier-363c5a.netlify.app/";
const KEY = ["name", "git", "mail"];

const userGitB = document.querySelector(".gitName a");
const userMailB = document.querySelector(".mailName a");
const backToLogin = document.querySelector(".back");
const alertProfile = document.querySelector(".profile button span");

// 정보유무에 따라 프로필 버튼에 알림 표시
function onProfile() {
  const lengthData = localStorage.length;
  if (lengthData < 3) {
    alertProfile.classList.remove("hidden");
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      let tmp = localStorage.getItem(KEY[i]);
      console.log(tmp);
      if (tmp === null || tmp === undefined || tmp === "") {
        alertProfile.classList.remove("hidden");
        break;
      }
      alertProfile.classList.add("hidden");
    }
  }

  if (alertProfile.classList.contains("hidden")) {
    alertProfile.style.display = "none";
  }
}

// 유저 정보 링크에 할당
function setUserInfo() {
  const git = localStorage.getItem(KEY[1]);
  const mail = localStorage.getItem(KEY[2]);
  userGitB.href = `https://github.com/${git}`;
  userMailB.href = mail;
}

setUserInfo();
onProfile();

// 프로필 화면 구성
// 사용자화 메뉴 버튼 구성

//firebase? ==> 게시판 구성시 180 도 뒤집어서 게시판 보여주는 식으로 ㄴ
