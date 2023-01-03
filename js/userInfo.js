const KEY = ["name", "git", "mail"];

const userGitB = document.querySelector(".gitName a");
const userMailB = document.querySelector(".mailName a");

function setUserInfo(event) {
  let git = localStorage.getItem(KEY[1]);
  let mail = localStorage.getItem(KEY[2]);
  if (git)
    if (userGitB === null) {
      alert("GitHub 주소를 입력해주세요");
    } else {
      userGitB.href = `${git}`;
      console.log(userGitB.href);
    }
  if (userMailB === null) {
    alert("Mail 주소를 입력해주세요");
  } else {
    userMailB.href = `${mail}`;
    console.log(userMailB.href);
  }
}

setUserInfo();

// 정보있을시 로그인 페이지 안뜨게
// www 올시 처리
// 프로필 화면 구성
// 사용자화 메뉴 버튼 구성

//firebase?
