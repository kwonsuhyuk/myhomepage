const KEY = ["name", "git", "mail"];
//드롭다운메뉴 자체
const account = document.getElementById("show__account");
const profile = document.querySelector(".dropmenu-form");
//드롭다운메뉴 내부
const settingName = document.querySelector("#setting__name");
const settingGit = document.querySelector("#setting__git");
const accountName = document.getElementById("account__name");
const accountGit = document.getElementById("account__git");
const fixedName = document.getElementById("fixed__name");
const fixedGit = document.getElementById("fixed__git");
const fixedProfilesName = document.getElementById("drop-profiles__name");
const fixedProfilesGit = document.getElementById("drop-profiles__Git");
const greetingName = localStorage.getItem("name");
const greetingGit = localStorage.getItem("git");
const userGitB = document.querySelector(".gitName a");
//이메일버튼
const setGoogle = document.getElementById("set-google");
const setNaver = document.getElementById("set-naver");
//드롭다운메뉴

function toggleProfile() {
  // menu` 숨기기 (visibility: hidden)
  //메뉴창이 뜨고 원래 로컬스토리지 안에있는 값 프인트먼저하기
  if (profile.style.visibility === "hidden") {
    profile.style.visibility = "visible";
    const printname = localStorage.getItem("name");
    const printgit = localStorage.getItem("git");
    accountName.innerText = printname;
    accountGit.innerText = printgit;
  }
  // menu` 보이기 (visibility: visible)
  else {
    profile.style.visibility = "hidden";
  }
}
//드롭다운메뉴 내부에서 수정하기
//이름버튼
function letFixedName() {
  if (accountName.style.display !== "none") {
    accountName.style.display = "none";
    fixedName.style.display = "block";
  } else {
    accountName.style.display = "block";
    fixedName.style.display = "none";
  }
}
//이름 수정하기
function onFixedNameSubmit(event) {
  event.preventDefault();
  const newName = fixedName.value;
  localStorage.setItem("name", newName);
  fixedName.value = "";
  const greetingName = localStorage.getItem("name");
  accountName.style.display = "block";
  fixedName.style.display = "none";
  accountName.innerText = greetingName;
}
//깃 버튼
function letFixedGit() {
  if (accountGit.style.display !== "none") {
    accountGit.style.display = "none";
    fixedGit.style.display = "block";
  } else {
    accountGit.style.display = "block";
    fixedGit.style.display = "none";
  }
}
//깃 수정하기
function onFixedGitSubmit(event) {
  event.preventDefault();
  const newGit = fixedGit.value;
  localStorage.setItem("git", newGit);
  fixedGit.value = "";
  const greetingGit = localStorage.getItem("git");
  accountGit.style.display = "block";
  fixedGit.style.display = "none";
  accountGit.innerText = greetingGit;
  //깃 url 이름 바꾸기
  userGitB.href = `https://github.com/${greetingGit}`;
}
//구글 버튼
function onClcikGoogle() {
  setGoogle.style.color = "blue";
  setNaver.style.color = "white";
  const googleMail = new URL("https://mail.google.com/");
  localStorage.setItem("mail", googleMail);
}
//네이버 버튼
function onClcikNaver() {
  setGoogle.style.color = "white";
  setNaver.style.color = "blue";
  const googleNaver = new URL("https://mail.naver.com/");
  localStorage.setItem("mail", googleNaver);
}

account.addEventListener("click", toggleProfile);
settingName.addEventListener("click", letFixedName);
settingGit.addEventListener("click", letFixedGit);
fixedProfilesName.addEventListener("submit", onFixedNameSubmit);
fixedProfilesGit.addEventListener("submit", onFixedGitSubmit);
setGoogle.addEventListener("click", onClcikGoogle);
setNaver.addEventListener("click", onClcikNaver);
