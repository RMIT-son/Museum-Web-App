const toggleBtn = document.querySelector(".toggle_btn");
const dropDownMenu = document.querySelector(".dropdown-menu");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle("open");
  overlay.classList.toggle("open");
  body.classList.toggle("close");
};

let menutoggle = document.querySelector(".toggle");
menutoggle.onclick = function () {
  menutoggle.classList.toggle("active");
};

function showGallery(evt, galleryName) {
  var i, gallery, tablinks;
  gallery = document.getElementsByClassName("gallery");
  for (i = 0; i < gallery.length; i++) {
    gallery[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(galleryName).style.display = "grid";
  evt.currentTarget.className += " active";
}

document.addEventListener("DOMContentLoaded", function () {
  const collectionNames = document.querySelectorAll(".collection-name");

  collectionNames.forEach(function (collectionName, index) {
    collectionName.addEventListener("click", function () {
      const arrowDownIcon = document.querySelectorAll(".arrow-down-icon");
      const artworks = document.querySelectorAll(".artworks");
      artworks[index].classList.toggle("open");
      arrowDownIcon[index].classList.toggle("rotate");
    });
  });

  const artwork1s = document.querySelectorAll(".artwork1");
  

  artwork1s.forEach(function(artwork1, i) {
    artwork1.addEventListener("mouseenter", function () {
      const information = document.querySelectorAll(".information");
      information[i].classList.add("open");
    });

    artwork1.addEventListener("mouseleave", function () {
      const information = document.querySelectorAll(".information");
      information[i].classList.remove("open");
    });
  })
});
