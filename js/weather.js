const API_KEY = "93e3b1828e8e9d26579d1dee33d08b75";

const cloudW = `<i class="fa-solid fa-cloud fa-2xl"></i>`;
const clearW = `<i class="fa-regular fa-sun fa-2xl"></i>`;
const thunderW = `<i class="fa-solid fa-bolt fa-2xl"></i>`;
const dirzzleW = `<i class="fa-solid fa-water fa-2xl"></i>`;
const rainW = `<i class="fa-solid fa-umbrella fa-2xl"></i>`;
const snowW = `<i class="fa-solid fa-snowflakes fa-2xl"></i>`;
const atmosphereW = `<i class="fa-solid fa-wind fa-2xl"></i>`;
const defaultW = ` <i class="fa-solid fa-wind fa-2xl"></i>`;

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const nowWeather = data.weather[0].main;
      const weather = document.querySelector(".weather span:first-child");
      const tmp = document.querySelector(".weather span:nth-child(2)");
      const city = document.querySelector(".weather span:last-child");
      if (nowWeather === "Clouds") {
        weather.innerHTML = cloudW;
      } else if (nowWeather === "Clear") {
        weather.innerHTML = clearW;
      } else if (nowWeather === "Thunderstorm") {
        weather.innerHTML = thunderW;
      } else if (nowWeather === "Drizzle") {
        weather.innerHTML = dirzzleW;
      } else if (nowWeather === "Rain") {
        weather.innerHTML = rainW;
      } else if (nowWeather === "Snow") {
        weather.innerHTML = snowW;
      } else if (nowWeather === "Atmosphere") {
        weather.innerHTML = atmosphereW;
      } else {
        weather.innerHTML = defaultW;
      }
      console.log(nowWeather);
      tmp.innerHTML = `${data.main.temp}°C`;
      city.innerHTML = `In ${data.name}`;
    });
}
function onGeoError() {
  alert("can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
