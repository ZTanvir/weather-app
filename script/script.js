// Select html elements
const formEl = document.querySelector("#user-input");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form");
});
