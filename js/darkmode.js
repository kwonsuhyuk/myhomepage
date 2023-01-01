let mode = true;
const modeBtn = document.querySelector(".modeBtn");
let backGround = (document.body.style.backgroundImage =
  "URL('https://picsum.photos/1700/1000')");
modeBtn.textContent = " Change Dark";

modeBtn.addEventListener("click", () => {
  mode = !mode;
  changeMode();
});

function changeMode() {
  // 오리지널 상태
  if (mode) {
    modeBtn.textContent = "Change Dark";
    modeBtn.style.backgroundColor = "black";
    modeBtn.style.color = "white";
    document.body.style.backgroundImage =
      "URL('https://picsum.photos/1700/1000')";
    // dark 상태
  } else {
    modeBtn.textContent = "Change Image";
    document.body.style.backgroundImage = "";
    document.body.style.backgroundColor = "black";
    modeBtn.style.backgroundColor = "white";
    modeBtn.style.color = "black";
  }
}
