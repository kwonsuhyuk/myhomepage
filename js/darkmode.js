let mode = true;
const modeBtn = document.querySelector(".modeBtn");
let backGround = (document.body.style.backgroundImage =
  "URL('https://picsum.photos/1700/1000')");
modeBtn.textContent = " Change Dark";

modeBtn.addEventListener("click", () => {
  mode = !mode;
  changeMode();
});

// const imgForm = document.querySelector(".background");
// const imgChange = document.getElementById("image-input");

// imgChange.onchange = () => {
//   const file = imgChange.files[0];
//   console.log(file);
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   console.log(URL.createObjectURL(file));
// };

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
