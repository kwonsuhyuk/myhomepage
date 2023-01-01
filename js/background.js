// const images = ["0.jpeg", "1.jpeg", "2.jpeg"];

// const chosenImage = images[Math.floor(Math.random() * images.length)];

// const bgImage = document.createElement("img"); // 이미지 요소 생성

// bgImage.src = `img/${chosenImage}`; // source 설정

// document.style.backgroundImage(bgImage); // body에 사진 추가
//append 는 맨 뒤에 추가

// document.body.prepend(bgImage);
//prepend 는 맨 앞에 추가 하는 함수

// document.body.style.backgroundImage = "URL('https://picsum.photos/1700/1000')";

// let imgData = "";
// fetch(
//   "https://api.unsplash.com/photos/random?client_id=q8VUc48HED2bpVA3o93bdaRDw4YCEc6t5Fx_dxE9hNs"
// )
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     imgData = data.urls.full;
//     const newURL = new URL(imgData);
//     document.body.style.backgroundImage = `URL(${newURL.href})`;
//   });
