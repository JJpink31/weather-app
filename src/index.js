
function currentDay(date) {
  let now = new Date();

  let day = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let days = [
    "Sun",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let dayAndTime = document.querySelector("#current-day");
  dayAndTime.innerHTML = `${days[day]} ${hours}:${minutes}`;
}

currentDay();

function getWeatherData(city) {
  let apiKey = "3dce9b1c66837262a25b3f448d354a76";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(`${url}`).then(showWeather);
}

function showWeather(response) {
  document.querySelector("#searchedCity").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}℉`;
}

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchedCity.innerHTML = `${city.value}`;
  getWeatherData(city.value);
}
let searchedCity = document.querySelector("#searchedCity");
let cityInput = document.querySelector("#showCity");
cityInput.addEventListener("submit", enterCity);

function searchArea(position) {
  let apiKey = "2d30ea25b634d374a2711446360cd6b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  function checkingTempF(response) {
    let temperature = Math.round(response.data.main.temp);
    let tempF = document.querySelector("#currentTemperature");
    tempF.innerHTML = `${temperature}℉`;
  }
  let fahrenheit = document.querySelector("#f-temp");

  fahrenheit.addEventListener("click", function () {
    let city = searchedCity.innerHTML;
    getWeatherData(city);
  });

  axios.get(apiUrl).then(checkingTempF);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchArea);
}

let button = document.querySelector("#location");
button.addEventListener("click", getCurrentLocation);