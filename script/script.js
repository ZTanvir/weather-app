// Select html elements
const formEl = document.querySelector("#user-input");
const searchLocationEl = document.querySelector("#search-location");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form");
  formEl.reset();
});

searchLocationEl.addEventListener("input", (e) => {
  if (!searchLocationEl.value == "") {
    console.log(searchLocationEl.value);
  }
});

// api call es6
function getWeatherData(requestUrlType, location) {
  fetch(
    `http://api.weatherapi.com/v1/${requestUrlType}.json?key=d37749f2868143febc2151657230606&q=${location}}`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      let fullData = weatherData;
      // console.log(fullData);
      return fullData;
    })
    .catch((err) => {
      console.log(err);
    });
}
// getWeatherData("current", "london");
async function weatherData(requestUrlType, location) {
  let response = await fetch(
    `http://api.weatherapi.com/v1/${requestUrlType}.json?key=d37749f2868143febc2151657230606&q=${location}`
  );
  return response.json();
}
