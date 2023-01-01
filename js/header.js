const headerEl = document.querySelector("header");
const startBtn = headerEl.querySelector(".menuBtn");
const headerMenu = document.querySelector(".menu-bar");

const openBtn = '<i class="fa-solid fa-forward fa-2xl"></i>';
const closeBtn = '<i class="fa-solid fa-backward fa-2xl"></i>';

let flag = true;
startBtn.innerHTML = openBtn;

startBtn.addEventListener("click", () => {
  if (flag) {
    showMenu();
    startBtn.innerHTML = closeBtn;
    flag = false;
  } else {
    hideMenu();
    startBtn.innerHTML = openBtn;
    flag = true;
  }
});

function showMenu() {
  headerMenu.style.animation = `showMenu 2s 1s ease-out both`;
}

function hideMenu() {
  headerMenu.style.animation = `hideMenu 0.5s 1s ease-in both`;
}
