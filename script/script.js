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
weatherData("current", "dhaka")
  .then((data) => {
    if (data["error"]) {
      console.log(data["error"].message);
    } else {
      console.log(data);
      console.log(data.current.last_updated);
      updateTimeDate(data.current.last_updated);
      updateCityCountry(data.location.name, data.location.country);
      currentWeatherData(
        data.current.condition.icon,
        data.current.temp_c,
        data.current.condition.text,
        data.current.feelslike_c
      );
    }
  })
  .catch((error) => {
    console.log(error);
  });

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
  let time = twelveHourClock(dateTime[1]);
  dateEl.textContent = dateTime[0];
  timeEl.textContent = time;
}

// convert time to twelve hour formate
function twelveHourClock(hour) {
  if (hour >= 12 && hour <= 23) {
    if (hour == 12) {
      return `${hour} pm`;
    }
    return `${hour - 12} pm`;
  } else if (hour == 24) {
    return `${hour - 12} am`;
  }
  return `${hour} am`;
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
  const weatherFeelsLike = document.querySelector(
    ".additional-info__feels-like"
  );
  weatherImage.src = weatherImg;
  weatherImage.alt = condition;
  weatherImage.title = condition;

  weatherTemperature.textContent = `${temperature}°C`;
  weatherCondition.textContent = condition;

  weatherFeelsLike.textContent = `${feelsLike}°C`;
}
