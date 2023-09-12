function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day= date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = "";
  forecast.forEach(function(forecastDay, index) {  
   if (index < 6){
     forecastHTML += 
        `
         <img
         src= "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
         alt=""
         width=""
       />
      <span class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>
        <span class="weather-forecast-date">${formatDay(forecastDay.time)}</span>
        <div class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</div>
      
    </span>
    `;
   }
   });
  forecastElement.innerHTML = forecastHTML;
  }


function getForecast(coordinates) {
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let url = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${apiKey}&units=imperial`;
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

  getForecast(response.data.coord);
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