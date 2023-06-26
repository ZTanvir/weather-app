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
    return response.json();
  } catch (err) {
    console.log(err);
  }
}
// weatherData("current", "dhaka").then((data) => {
//   if (data["error"]) {
//     console.log(data["error"].message);
//   } else {
//     console.log(data);
//     getCityCountry(data.location.name, data.location.country);
//   }
// });

// get city and country dom
function getCityCountry(city, country) {
  let cityEl = document.querySelector(".city-county__city");
  let countryEl = document.querySelector(".city-county__country");
  cityEl.textContent = city;
  countryEl.textContent = country;
}
