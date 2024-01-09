let isDragging,
  isInformationOpen = false,
  isAddToCollection = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;
let currentIndex = 0;
const body = document.querySelector("body");
const imageContainer = document.querySelector(".slider");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const toggleBtn = document.querySelector(".toggle_btn");
const dropDownMenu = document.querySelector(".dropdown-menu");
const overlay = document.querySelector(".overlay");
const icons = document.querySelectorAll(".icons");
const information = document.querySelector(".information");
const infoIcons = document.querySelectorAll(".info-icon");
const heartIcons = document.querySelectorAll(".heart-icon");
const bookMarkIcons = document.querySelectorAll(".bookmark-icon");
const plusIcons = document.querySelectorAll(".plus-icon");
const leftArrowIcon = document.querySelectorAll(".arrow-left-icon");
const firstArtwork = document.querySelector(".artwork:nth-child(1)");
const firstInformationBox = firstArtwork.querySelector(".information");
const collectionsDiv = document.querySelector(".collections");

document.addEventListener("DOMContentLoaded", function () {
  function addEventListeners() {
    const artworks = document.querySelectorAll(".artwork");

    artworks.forEach(function (artwork) {
      const checkboxes = artwork.querySelectorAll(
        'input[name="selectedCollections"]'
      );
      const submitButton = artwork.querySelector(".submitButton");

      checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
          const atLeastOneChecked = Array.from(checkboxes).some(function (
            checkbox
          ) {
            return checkbox.checked;
          });
          submitButton.style.pointerEvents = atLeastOneChecked
            ? "auto"
            : "none";
          submitButton.style.color = atLeastOneChecked ? "white" : "#818181";
        });
      });
    });
  }

  addEventListeners();
});

function goBack() {
  const currentlyDisplayedArtwork = document.querySelector(
    `.artwork:nth-child(${currentIndex + 1})`
  );

  const chooseCollection =
    currentlyDisplayedArtwork.querySelector(".choose-collection");
  const newCollectionForm = currentlyDisplayedArtwork.querySelector(
    ".new-collection-form"
  );

  chooseCollection.style.display = "block";
  newCollectionForm.style.display = "none";
}

function addNewCollection() {
  const currentlyDisplayedArtwork = document.querySelector(
    `.artwork:nth-child(${currentIndex + 1})`
  );

  const chooseCollection =
    currentlyDisplayedArtwork.querySelector(".choose-collection");
  const newCollectionForm = currentlyDisplayedArtwork.querySelector(
    ".new-collection-form"
  );

  chooseCollection.style.display = "none";
  newCollectionForm.style.display = "block";
}

const urlParams = new URLSearchParams(window.location.search);
const success = urlParams.get("success");

if (success === "true") {
  alert("Collection added successfully!");
}

document.addEventListener("DOMContentLoaded", function () {
  const page2 = document.getElementById("page2");

  if (page2) {
    page2.style.animation = "appearIn 1s forwards";
  }
  if (firstArtwork) {
    firstInformationBox.classList.add("fade-in");
  }
});

fetch("/api/art/get")
  .then((response) => response.json())
  .then((data) => {
    document
      .querySelector(".heart-icon")
      .addEventListener("click", function () {
        const artworkContainer = this.closest(".artwork");
        const artworkId = artworkContainer.dataset.artworkId;
        handleLike(artworkId);
      });

    document
      .querySelector(".bookmark-icon")
      .addEventListener("click", function () {
        const artworkContainer = this.closest(".artwork");
        const artworkId = artworkContainer.dataset.artworkId;
        handleBookmark(artworkId);
      });
  })
  .catch((error) => {
    console.error("Error fetching artwork data:", error);
  });

const handleLike = async (artworkId) => {
  try {
    const response = await fetch(`/like/${artworkId}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to like artwork - ${response.status} ${response.statusText}`
      );
    }

    const heartIcon = document.querySelector(".heart-icon");
    heartIcon.classList.toggle("fa-solid");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const handleBookmark = async (artworkId) => {
  try {
    const response = await fetch(`/bookmark/${artworkId}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to bookmark artwork - ${response.status} ${response.statusText}`
      );
    }

    const bookMarkIcon = document.querySelector(".bookmark-icon");
    bookMarkIcon.classList.toggle("fa-solid");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

infoIcons.forEach((icon, index) => {
  icon.onclick = function () {
    isAddToCollection = false;
    const addToCollection = document.querySelectorAll(
      ".information-header .add-to-collection"
    );
    addToCollection.forEach((tab) => {
      tab.classList.remove("open");
    });
    const currentlyDisplayedArtwork = document.querySelector(
      `.artwork:nth-child(${index + 1})`
    );
    if (!currentlyDisplayedArtwork) return;

    const informationBox =
      currentlyDisplayedArtwork.querySelector(".information");
    if (!informationBox) return;

    informationBox.classList.toggle("open");
    isInformationOpen = !isInformationOpen;
    icon.classList.toggle("fa-info");
    icon.classList.toggle("fa-times");
  };
});

plusIcons.forEach((icon, index) => {
  icon.onclick = function () {
    icon.classList.toggle("rotate");
    const currentlyDisplayedArtwork = document.querySelector(
      `.artwork:nth-child(${index + 1})`
    );
    if (!currentlyDisplayedArtwork) return;

    const informationBox =
      currentlyDisplayedArtwork.querySelector(".information");
    if (!informationBox) return;

    const addToCollection = informationBox.querySelector(
      ".information-header .add-to-collection"
    );

    addToCollection.classList.toggle("open");
    isAddToCollection = !isAddToCollection;
  };
});

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle("open");
  overlay.classList.toggle("open");
};

let menutoggle = document.querySelector(".toggle");
menutoggle.onclick = function () {
  menutoggle.classList.toggle("active");
};

let isAnimating = false;

if (firstInformationBox) {
  firstInformationBox.classList.add("fade-in");
}

$(document).ready(function () {
  function showMessage(message) {
    var messageDiv = $("#messageDisplay");

    messageDiv.text(message);
    messageDiv.css("opacity", 0);
    messageDiv.animate({ opacity: 1.2 }, 500, function () {
      $(this).animate({ opacity: 0 }, 2000);
    });
  }

  $('input[type="checkbox"]').on("change", function () {
    handleCheckboxChange(this);
  });

  function handleCheckboxChange(event) {
    const checkbox = event.target;
    if (
      checkbox &&
      checkbox.tagName === "INPUT" &&
      checkbox.type === "checkbox" &&
      checkbox.checked
    ) {
      const parentDiv = checkbox.parentElement;
      parentDiv.style.pointerEvents = "none";
      parentDiv.style.color = "#818181";
      parentDiv.innerHTML = `${
        checkbox.parentElement.querySelector("label").innerText
      } (added)`;
    }
  }

  $(".addArtworkForm").on("submit", function (e) {
    e.preventDefault();

    var form = $(this);
    var url = form.attr("action");

    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(),
      success: function (data) {
        showMessage("Artwork added successfully");
        $('input[name="selectedCollections"]:checked').each(function () {
          var checkbox = $(this);
          var parentDiv = checkbox.parent();

          parentDiv.css("pointer-events", "none");
          parentDiv.css("color", "#818181");
          parentDiv.html(parentDiv.find("label").text() + " (added)");
        });
        $(".submitButton").css({
          "pointer-events": "none",
          color: "#818181",
        });
      },
    });
  });

  $(".addNewCollectionForm").on("submit", function (e) {
    e.preventDefault();

    var form = $(this);
    var url = form.attr("action");

    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(),
      success: function (data) {
        if (data && data._id && data.name) {
          goBack();
          showMessage("Collection created successfully");
          $(".artwork").each(function (index) {
            var newCollectionDiv = `
            <div class="collection">
              <input
                type="checkbox"
                id="checkbox${data._id}-${index}"
                name="selectedCollections"
                value="${data._id}"
              />
              <label
                style="padding-left: 5px"
                for="checkbox${data._id}-${index}"
              >
                ${data.name}
              </label>
            </div>
          `;

            var collectionsDiv = $(this).find(".collections");
            collectionsDiv.append(newCollectionDiv);

            var checkbox = collectionsDiv.find(`#checkbox${data._id}-${index}`);
            checkbox.on("change", function () {
              var submitButton = $(this)
                .closest(".artwork")
                .find(".submitButton");
              var atLeastOneChecked =
                $(this)
                  .closest(".collections")
                  .find('input[name="selectedCollections"]:checked').length > 0;
              submitButton.css(
                "color",
                atLeastOneChecked ? "white" : "#818181"
              );
              submitButton.css(
                "pointerEvents",
                atLeastOneChecked ? "auto" : "none"
              );
            });
          });
        } else {
          console.error("Unexpected data format:", data);
        }
      },
    });
  });

  $(".addAllButton").click(function () {
    var form = $(this).closest("form");
    form.find('.collections input[type="checkbox"]').prop("checked", true);

    $(".submitButton").css({
      "pointer-events": "auto",
      color: "#FFFFFF",
    });
  });
});

var addAllButtons = document.getElementsByClassName("addAllButton");
for (var i = 0; i < addAllButtons.length; i++) {
  addAllButtons[i].addEventListener("click", function () {
    var formId = this.getAttribute("data-form-id");
    var form = document.getElementById(formId);
    var checkboxes = form.querySelectorAll(
      '.collections input[type="checkbox"]'
    );

    if (checkboxes.length > 0) {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = true;
      });

      var saveButton = form.querySelector(".submitButton");
      saveButton.style.pointerEvents = "auto";
      saveButton.style.color = "#FFFFFF";
    }
  });
}
