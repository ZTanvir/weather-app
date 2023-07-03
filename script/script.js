// Select html elements
const formEl = document.querySelector("#user-input");
const searchLocationEl = document.querySelector("#search-location");
const mainEl = document.querySelector("main");
const footerEl = document.querySelector("footer");
const locationMessageEl = document.querySelector(".search-location-message");
const loader = document.querySelector(".loading");

let dayZeroEl = getDailyForecastDom(
  ".day-zero > p",
  ".day-zero__condition",
  ".day-zero__temp"
);
let dayOneEl = getDailyForecastDom(
  ".day-one > p",
  ".day-one__condition",
  ".day-one__temp"
);
let dayTwoEl = getDailyForecastDom(
  ".day-two > p",
  ".day-two__condition",
  ".day-two__temp"
);
let dayThreeEl = getDailyForecastDom(
  ".day-three > p",
  ".day-three__condition",
  ".day-three__temp"
);
let dayFourEl = getDailyForecastDom(
  ".day-four > p",
  ".day-four__condition",
  ".day-four__temp"
);
let dayFiveEl = getDailyForecastDom(
  ".day-five > p",
  ".day-five__condition",
  ".day-five__temp"
);
let daySixEl = getDailyForecastDom(
  ".day-six > p",
  ".day-six__condition",
  ".day-six__temp"
);
// insert each day forecast dom into an array
let allDaysDom = [
  dayZeroEl,
  dayOneEl,
  dayTwoEl,
  dayThreeEl,
  dayFourEl,
  dayFiveEl,
  daySixEl,
];
// show loading
function showLoading() {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}
// hide loading
function hideLoading() {
  loader.classList.remove("display");
}
// current weather data
async function weatherData(requestUrlType, location) {
  try {
    showLoading();
    let response = await fetch(
      `http://api.weatherapi.com/v1/${requestUrlType}.json?key=d37749f2868143febc2151657230606&q=${location}`
    );
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
// Astronomy weather data
async function weatherAstronomyData(requestUrlType, location, todaysDate) {
  try {
    let response = await fetch(
      `http://api.weatherapi.com/v1/${requestUrlType}.json?key=d37749f2868143febc2151657230606&q=${location}&dt=${todaysDate}`
    );
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
// store weather forecast date
function getDateForForecastapi(numberOfDays) {
  // store the date that will be pass to the weather forecast api
  let forecastDates = [];
  for (let i = 1; i <= numberOfDays; i++) {
    let date = new Date();
    // increase date by one
    let newDate = new Date(date.setDate(date.getDate() + i));
    // get the year,month and day form the date
    const [year, month, day] = [
      newDate.getFullYear(),
      // increase the month by one because js start counting the month from 0
      newDate.getMonth() + 1,
      newDate.getDate(),
    ];
    let forecastDateFormated = `${year}-${month}-${day}`;
    forecastDates.push(forecastDateFormated);
  }
  return forecastDates;
}
// Weather forecast api call
async function weatherForecastObj(requestUrlType, location) {
  let forecastDates = getDateForForecastapi(7);
  let foreCastObj = [];
  await Promise.all(
    forecastDates.map(async (forecastDate) => {
      let response = await fetch(
        `http://api.weatherapi.com/v1/${requestUrlType}.json?key=d37749f2868143febc2151657230606&q=${location}&dt=${forecastDate}&days=3&hour=12`
      );
      let data = await response.json();
      // hide loading screen
      hideLoading();
      foreCastObj.push(data);
    })
  );
  return foreCastObj;
}
// get city and country dom
function updateCityCountry(city, country) {
  let cityEl = document.querySelector(".city-county__city");
  let countryEl = document.querySelector(".city-county__country");
  cityEl.textContent = city;
  countryEl.textContent = country;
}

// get date and time dom
function updateTimeDate(dateTime) {
  let dateEl = document.querySelector(".date-time__date");
  let timeEl = document.querySelector(".date-time__time");
  dateTime = dateTime.split(" ");
  let hourMin = dateTime[1].split(":");
  let [hour, min] = [Number(hourMin[0]), hourMin[1]];
  let time = twelveHourClock(hour, min);
  dateEl.textContent = dateTime[0];
  timeEl.textContent = time;
}

// convert time to twelve hour formate
function twelveHourClock(hour, min) {
  if (hour >= 12 && hour <= 23) {
    if (hour == 12) {
      return `${hour}:${min} pm`;
    }
    return `${hour - 12}:${min} pm`;
  } else if (hour == 24) {
    return `${hour - 12}:${min} am`;
  }
  return `${hour}:${min} am`;
}

// get currentweather image , temperature, condition,feels like
function currentWeatherData(weatherImg, temperature, condition, feelsLike) {
  const weatherImage = document.querySelector(".current-weather__image");
  const weatherTemperature = document.querySelector(
    ".current-weather__temperature"
  );
  const weatherCondition = document.querySelector(
    ".additional-info__condition"
  );
  const weatherFeelsLike = document.querySelector(".feels-like-temperature");
  weatherImage.src = weatherImg;
  weatherImage.alt = condition;
  weatherImage.title = condition;

  weatherTemperature.textContent = `${temperature}°C`;
  weatherCondition.textContent = condition;

  weatherFeelsLike.textContent = `${feelsLike}°C`;
}

// get wind ,humidity,uv data
function windHumidityUvData(windDirection, windSpeed, humidity, uv) {
  const windDirectionEl = document.querySelector(".wind-direction");
  const windSpeedEl = document.querySelector(".wind-speed");
  const humidityEl = document.querySelector(".humidity__data-details");
  const uvDataEl = document.querySelector(".uv__data-details");

  windDirectionEl.textContent = windDirection;
  windSpeedEl.textContent = ` ${windSpeed}Kph`;
  humidityEl.textContent = `${humidity}%`;
  uvDataEl.textContent = uv;
}

//  get sunrise,sunset,moon phase data
function sunMoonData(sunrise, sunset, moonPhase) {
  const sunriseEl = document.querySelector(".sunrise__data-details");
  const sunsetEl = document.querySelector(".sunset__data-details ");
  const moonPhaseEl = document.querySelector(".moon-phase__details");

  sunriseEl.textContent = sunrise;
  sunsetEl.textContent = sunset;
  moonPhaseEl.textContent = moonPhase;
}
// get day from date
function getDayFromDate(date) {
  const d = new Date(date);
  const weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weeks[d.getDay()];
  return day;
}
// get nodelist for daily weather forecast data
function getDailyForecastDom(domList, conditionImg, temperature) {
  let nodeList = document.querySelectorAll(domList);
  let conditionImgEl = document.querySelector(conditionImg);
  let temperatureEl = document.querySelector(temperature);

  let nodelistArray = [...nodeList];
  nodelistArray.push(temperatureEl);
  nodelistArray.push(conditionImgEl);
  // console.log(nodelistArray);
  return nodelistArray;
}
// get forecast data from api and insert into day
function updateDailyForecast(
  date,
  chanceOfRain,
  maxTemp,
  minTemp,
  temperature,
  condition,
  domList
) {
  let weatherData = [
    date,
    chanceOfRain,
    maxTemp,
    minTemp,
    temperature,
    condition,
  ];
  let forecastDomList = [...domList];

  // current day
  let day = getDayFromDate(date);
  forecastDomList[0].textContent = day;

  for (let index = 1; index < 4; index++) {
    forecastDomList[index].textContent = weatherData[index];
  }
  // current weather img
  forecastDomList[4].textContent = condition.text;
  // current weather img
  forecastDomList[5].src = condition.icon;
  forecastDomList[5].alt = condition.text;
  forecastDomList[5].title = condition.text;
}

// get astronmy data from api to front
function astronmyData(location) {
  let date = new Date();
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ];
  let today = `${year}-${month + 1}-${day}`;
  weatherAstronomyData("astronomy", location, today).then((data) => {
    if (data["error"]) {
      console.log(data["error"].message);
    } else {
      sunMoonData(
        data.astronomy.astro.sunrise,
        data.astronomy.astro.sunset,
        data.astronomy.astro.moon_phase
      );
    }
  });
}
// get current weather data from api to front
function currentData(location) {
  weatherData("current", location)
    .then((data) => {
      if (data["error"]) {
        locationMessageEl.textContent = data["error"].message;
        locationMessageEl.classList.add("location-message-style");
        mainEl.style.display = "none";
        footerEl.style.display = "none";
      } else {
        locationMessageEl.textContent = "";
        locationMessageEl.classList.remove("location-message-style");
        mainEl.style.display = "grid";
        footerEl.style.display = "block";
        updateTimeDate(data.current.last_updated);
        updateCityCountry(data.location.name, data.location.country);
        currentWeatherData(
          data.current.condition.icon,
          data.current.temp_c,
          data.current.condition.text,
          data.current.feelslike_c
        );
        windHumidityUvData(
          data.current.wind_dir,
          data.current.wind_kph,
          data.current.humidity,
          data.current.uv
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
// get forecast weather data from api to front
function forecastData(location) {
  // return promise with forecast api data
  let dataApi = weatherForecastObj("forecast", location);

  // get forecast data from api to front
  dataApi.then((data) => {
    // console.log(data);
    let index = 0;
    data.forEach((item) => {
      updateDailyForecast(
        item.forecast.forecastday[0].date,
        `${item.forecast.forecastday[0].day.daily_chance_of_rain}%`,
        `${item.forecast.forecastday[0].day.maxtemp_c}°C`,
        `${item.forecast.forecastday[0].day.mintemp_c}°C`,
        item.forecast.forecastday[0].day.condition,
        item.forecast.forecastday[0].day.condition,
        allDaysDom[index]
      );
      index++;
    });
  });
}
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let weatherLocation = searchLocationEl.value.trim();
  currentData(weatherLocation);
  astronmyData(weatherLocation);
  forecastData(weatherLocation);
});

searchLocationEl.addEventListener("input", (e) => {
  if (!searchLocationEl.value == "") {
    // console.log(searchLocationEl.value);
  }
});
