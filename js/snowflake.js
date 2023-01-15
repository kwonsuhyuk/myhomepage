const body = document.querySelector("body");
const sfBtn = document.querySelector(".snowflakeBtn");
const sfAll = document.querySelectorAll(".snowflake");
const MIN_DURATION = 10;
const MIN_OPACITY = 0.3;
let flag = false;

function checkActive() {
  sfBtn.classList.toggle("active");
  if (sfBtn.classList.contains("active")) {
    flag = true;
  } else {
    flag = false;
  }
  for (let i = 0; i < 200; i++) {
    if (!flag) {
      break;
    }
    setTimeout(makeSnowFlake, 150 * i);
  }
}

function makeSnowFlake() {
  const snowflake = document.createElement("div");
  const delay = Math.random() * 10;
  const initialOpacity = Math.random() + MIN_OPACITY;
  const duration = Math.random() * 20 + MIN_DURATION;

  snowflake.classList.add("snowflake");
  snowflake.style.left = `${Math.random() * window.screen.width}px`;
  snowflake.style.animationDelay = `${delay}s`;
  snowflake.style.opacity = initialOpacity;
  snowflake.style.animation = `fall ${duration}s linear`;

  body.appendChild(snowflake);

  if (!flag) {
    return;
  }

  setTimeout(() => {
    body.removeChild(snowflake);
    makeSnowFlake();
  }, (duration + delay) * 1000);
}

sfBtn.addEventListener("click", checkActive);

// function makeRain() {
//   const delay = Math.random() * 10;
//   const duration = Math.random() * 20 + MIN_DURATION;
//   for (let i = 0; i < 400; i++) {
//     const drop = document.createElement("div");
//     drop.classList.add("raindrop");
//     body.appendChild(drop);

//     drop.style.left = `${Math.random() * window.screen.width}px`;
//     drop.style.animation - `fall ${duration}s linear infinite`;
//     drop.style.animationDelay = `${delay}s`;
//   }
//   setTimeout(() => {
//     body.removeChild(drop);
//     makeSnowFlake();
//   }, (duration + delay) * 1000);
// }
// makeRain();
