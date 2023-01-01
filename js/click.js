let removeTimeOut;

function clickPosition(e) {
  const target = document.getElementById("clickEffect"),
    a = 40; // #clickEffect의 너비 & 높이 값 / 2

  e.button === 0 &&
    ((target.style.transform = `translate(${e.clientX - a}px, ${
      e.clientY - a
    }px)`),
    target.classList.contains("effect")
      ? (clearTimeout(removeTimeOut),
        target.classList.remove("effect"),
        void target.offsetWidth,
        target.classList.add("effect"),
        removeEffect())
      : (target.classList.add("effect"), removeEffect()));
}

function removeEffect() {
  removeTimeOut = setTimeout(function () {
    document.getElementById("clickEffect").classList.remove("effect");
  }, 500); // #clickEffect.effect::after의 시간 (.5s) * 1000
}

document.addEventListener("mousedown", clickPosition);
