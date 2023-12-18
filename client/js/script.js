const toggleBtn = document.querySelector(".toggle_btn");
const dropDownMenu = document.querySelector(".dropdown-menu");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle("open");
};

let menutoggle = document.querySelector(".toggle");
menutoggle.onclick = function () {
  menutoggle.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", function () {
  const titleElement = document.querySelector(".title");
  const icon = document.querySelector(".arrow-icon");
  titleElement.classList.add("fade-in");
  setTimeout(() => {
    icon.classList.add("fade-in");
  }, 1000);
});
