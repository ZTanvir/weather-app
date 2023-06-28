// Select html elements
const formEl = document.querySelector("#user-input");
const searchLocationEl = document.querySelector("#search-location");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let weatherLocation = searchLocationEl.value;
  weatherData("current").then((data) => {
    if (data["error"]) {
      console.log(data["error"].message);
    } else {
    }
  });
  // weatherData("current", "london").then((data) => {
  //   console.log(data);
  // });
  formEl.reset();
});

searchLocationEl.addEventListener("input", (e) => {
  if (!searchLocationEl.value == "") {
    // console.log(searchLocationEl.value);
  }
});
// current weather data
async function weatherData(requestUrlType, location) {
  try {
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
// Weather forecast
async function weatherForecast(requestUrlType, location, forecastDate) {
  try {
    let response = await fetch(
      `http://api.weatherapi.com/v1/${requestUrlType}.json?key=d37749f2868143febc2151657230606&q=${location}&dt=${forecastDate}&days=3&hour=12`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
let foreCastObj = [];
let forecastDates = [];
for (let i = 1; i <= 7; i++) {
  let date = new Date();
  // increase date by 1
  // pass the date to weather forecast parameter to get that days forecast
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(date.setDate(date.getDate() + i)),
  ];
  let forecastDateFormated = `${year}-${month}-${day}`;
  forecastDates.push(forecastDateFormated);
}
console.log(forecastDates);
async function weatherForcastObj(requestUrlType, location) {
  // for (let forecastDate of forecastDates) {
  //   console.log(forecastDate);
  let response = await fetch(
    `http://api.weatherapi.com/v1/${requestUrlType}.json?key=d37749f2868143febc2151657230606&q=${location}&dt=2023-&days=3&hour=12`
  );

  let data = await response.json();
  console.log(data);

  await Promise.all(
    forecastDates.map(async (forecastDate) => {
      console.log(forecastDate);
      let response = await fetch(
        `http://api.weatherapi.com/v1/${requestUrlType}.json?key=d37749f2868143febc2151657230606&q=${location}&dt=${forecastDate}&days=3&hour=12`
      );
      let data = await response.json();
      console.log(data);
      foreCastObj.push(data);
    })
  );
}
// weatherForcastObj("forecast", "dhaka");
// console.log(foreCastObj);
// for (let i = 1; i <= 7; i++) {
//   let date = new Date();
//   // increase date by 1
//   // pass the date to weather forecast parameter to get that days forecast
//   const [year, month, day] = [
//     date.getFullYear(),
//     date.getMonth() + 1,
//     date.getDate(date.setDate(date.getDate() + i)),
//   ];
//   let forecastDate = `${year}-${month + 1}-${day}`;

//   console.log(forecastDate);
//   weatherForecast("forecast", "dhaka", forecastDate).then((data) => {
//     console.log(data);
//   });
// }

// let date = new Date();
// console.log(date.getDate());
// const [year, month, day] = [
//   date.getFullYear(),
//   date.getMonth(),
//   date.getDate(),
// ];
// let today = `${year}-${month + 1}-${day}`;
// console.log(year, month, day, today);
// weatherAstronomyData("astronomy", "dhaka", today).then((data) => {
//   if (data["error"]) {
//     console.log(data["error"].message);
//   } else {
//     console.log(data);
//     sunMoonData(
//       data.astronomy.astro.sunrise,
//       data.astronomy.astro.sunset,
//       data.astronomy.astro.moon_phase
//     );
//   }
// });
// weatherData("current", "dhaka")
//   .then((data) => {
//     if (data["error"]) {
//       console.log(data["error"].message);
//     } else {
//       console.log(data);
//       console.log(data.current.last_updated);
//       updateTimeDate(data.current.last_updated);
//       updateCityCountry(data.location.name, data.location.country);
//       currentWeatherData(
//         data.current.condition.icon,
//         data.current.temp_c,
//         data.current.condition.text,
//         data.current.feelslike_c
//       );
//       windHumidityUvData(
//         data.current.wind_dir,
//         data.current.wind_kph,
//         data.current.humidity,
//         data.current.uv
//       );
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

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
