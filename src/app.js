function dateFormatter(time) {
  let date = new Date(time);
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
  let theDay = days[date.getDay()];
  return `${theDay} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast-ID");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (theForecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(theForecastDay.dt)}</div>
        <img
          src="https://openweathermap.org/img/wn/${
            theForecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
          <span class="weather-temp-max"> ${Math.round(
            theForecastDay.temp.max
          )}° High</span>
          <span class="weather-temp-min"> ${Math.round(
            theForecastDay.temp.min
          )}° Low</span>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  let temperatureBox = document.querySelector("#temperature");
  let cityBox = document.querySelector("#modify-city");
  let descriptionBox = document.querySelector("#weather-state");
  let humidityBox = document.querySelector("#humidity");
  let windBox = document.querySelector("#wind");
  let dateBox = document.querySelector("#day-time");
  let iconBox = document.querySelector("#icon");
  tempInFahrenheit = response.data.main.temp;
  temperatureBox.innerHTML = Math.round(tempInFahrenheit);
  cityBox.innerHTML = response.data.name;
  descriptionBox.innerHTML = response.data.weather[0].description;
  humidityBox.innerHTML = response.data.main.humidity;
  windBox.innerHTML = Math.round(response.data.wind.speed);
  dateBox.innerHTML = dateFormatter(response.data.dt * 1000);
  iconBox.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconBox.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "b6d0f48d8b8d9ccceaeb0e9770f0b375";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function submitHandler(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-selection");
  search(cityInputElement.value);
}
let tempInFahrenheit = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitHandler);

search("San Francisco");
