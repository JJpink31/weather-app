function displayForecast(){
  let forecastElement=document.querySelector("#forecast");
  
  let forecastHTML= "";
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function(day) {
  forecastHTML = forecastHTML +`
    <span class="col-6">
      <img
        src="http://openweathermap.org/img/wn/50d@2x.png"
        alt=""
        width="42"
      />
      <span class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">18</span>
        <span class="weather-forecast-temperature-min">12</span>
      <span class="weather-forecast-date">${day}</span>
    </span>
    `;
   });
  forecastElement.innerHTML = forecastHTML;
  }
function getForecast(coords){
  let apiKey="2d30ea25b634d374a2711446360cd6b2";
  let url=`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayForecast);
}

function currentTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function getWeatherData(city) {
  let apiKey = "2d30ea25b634d374a2711446360cd6b2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(`${url}`).then(showWeather);
}

function showWeather(response) {
  document.querySelector("#searchedCity").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;

  fahrenheitTemp=response.data.main.temp

  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = currentTime(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

  axios.get(apiUrl).then(showWeather);
}

let fahrenheit = document.querySelector("#f-temp");
fahrenheit.addEventListener("click", function () {
  let city = searchedCity.innerHTML;
  getWeatherData(city);
});

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchArea);
}

let fahrenheitTemp = null;
let button = document.querySelector("#location");
button.addEventListener("click", getCurrentLocation);