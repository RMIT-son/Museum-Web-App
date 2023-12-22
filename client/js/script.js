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

const anchor = document.querySelector(".page-transition");

function circleTransition(e) {
  e.preventDefault();
  var loader = document.getElementById("loader");
  var page1 = document.getElementById("page1");
  var targetHref = this.getAttribute("href");

  loader.style.animation = "circleIn 1.5s";
  setTimeout(function () {
    page1.style.display = "none";
    window.location.href = targetHref;
  }, 1300);
}

if (anchor) {
  anchor.addEventListener("click", circleTransition);
}
