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
  const artwork1s = document.querySelectorAll(".artwork1");

  artwork1s.forEach(function (artwork1) {
    artwork1.addEventListener("mouseenter", function () {
      const information = artwork1.querySelector(".information");
      information.classList.add("open");
    });

    artwork1.addEventListener("mouseleave", function () {
      const information = artwork1.querySelector(".information");
      information.classList.remove("open");
    });
  });
});

$(".remove-collection-form").on("submit", function (e) {
  function showMessage(message) {
    var messageDiv = $("#messageDisplay");

    messageDiv.text(message);
    messageDiv.css("opacity", 0);
    messageDiv.animate({ opacity: 1.2 }, 500, function () {
      $(this).animate({ opacity: 0 }, 2000);
    });
  }
  var form = $(this);

  e.preventDefault();

  $.ajax({
    url: form.attr("action"),
    method: "POST",
    data: form.serialize(),
    success: function (response) {
      showMessage("Collection removed");
      setTimeout(function () {
        form.remove();
      }, 500);
    },
    error: function (xhr, status, error) {
      console.error("Error deleting collection:", error);
    },
  });
});

function hideCollection(event) {
  event.stopPropagation();

  var collectionDiv = $(event.target).closest("form");

  collectionDiv.animate({ opacity: 0, height: 0 }, 500, function () {
    collectionDiv.css("display", "none");
  });
}

function openArtwork(event) {
  const title = event.target.closest(".title");
  const artworks = title.nextElementSibling;
  const icon = title.querySelector(".fa-angle-down");

  artworks.classList.toggle("open");
  icon.classList.toggle("open");
}

function toggleCollection(event) {
  const collectionDiv = event.target.parentElement.parentElement;

  const artworksDiv = collectionDiv.querySelector(".artworks");
  artworksDiv.classList.toggle("open");

  const arrowIcon = collectionDiv.querySelector(".arrow-down-icon");
  arrowIcon.classList.toggle("rotate");
}
