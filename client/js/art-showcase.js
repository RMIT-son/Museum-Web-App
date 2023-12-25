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
const firstArtwork = document.querySelector(".artwork:nth-child(1)");
const firstInformationBox = firstArtwork.querySelector(".information");

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
  const artworks = document.querySelectorAll(".artwork");

  artworks.forEach((artwork, index) => {
    const checkboxes = artwork.querySelectorAll(
      'input[name="selectedCollections"]'
    );
    const submitButton = artwork.querySelector("#submitButton");

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const atLeastOneChecked = [
          ...artwork.querySelectorAll('input[name="selectedCollections"]'),
        ].some((checkbox) => checkbox.checked);

        submitButton.style.pointerEvents = atLeastOneChecked ? "auto" : "none";
        submitButton.style.color = atLeastOneChecked ? "white" : "#818181";
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const page2 = document.getElementById("page2");

  if (page2) {
    page2.style.animation = "appearIn 1s forwards";
  }
  if (firstArtwork) {
    firstInformationBox.classList.add("fade-in");
  }
});

const handleLike = async (artworkId, index) => {
  try {
    const response = await fetch(`/like/${artworkId}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to like artwork - ${response.status} ${response.statusText}`
      );
    }

    const heartIcon = heartIcons[index];
    heartIcon.classList.toggle("fa-solid");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const handleBookmark = async (artworkId, index) => {
  try {
    const response = await fetch(`/bookmark/${artworkId}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to bookmark artwork - ${response.status} ${response.statusText}`
      );
    }

    const bookMarkIcon = bookMarkIcons[index];
    bookMarkIcon.classList.toggle("fa-solid");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

fetch("/api/art/get")
  .then((response) => response.json())
  .then((data) => {
    const artworkIds = data.map((artwork) => artwork._id);

    heartIcons.forEach((icon, index) => {
      icon.dataset.artworkId = artworkIds[index];
      icon.onclick = function () {
        const artworkId = this.dataset.artworkId;
        handleLike(artworkId, index);
      };
    });

    bookMarkIcons.forEach((icon, index) => {
      icon.dataset.artworkId = artworkIds[index];
      icon.onclick = function () {
        const artworkId = this.dataset.artworkId;
        handleBookmark(artworkId, index);
      };
    });
  })
  .catch((error) => {
    console.error("Error fetching artwork data:", error);
  });

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

if (currentIndex == 0) {
  leftArrow.style.display = "none";
}

if (firstInformationBox) {
  firstInformationBox.classList.add("fade-in");
}

// Slide Left
function slideLeft() {
  const currentlyDisplayedArtwork = document.querySelector(
    `.artwork:nth-child(${currentIndex + 1})`
  );

  const informationBox =
    currentlyDisplayedArtwork.querySelector(".information");
  if (informationBox) {
    informationBox.classList.remove("fade-in");
  }

  if (!isAnimating) {
    currentIndex--;
    isAnimating = true;
    imageContainer.scrollBy({
      left: -window.innerWidth,
      behavior: "smooth",
    });
    setTimeout(() => {
      isAnimating = false;
    }, 700);
  }

  if (currentIndex == 0) {
    leftArrow.style.display = "none";
  } else {
    leftArrow.style.display = "block";
  }

  if (currentIndex == imageContainer.childElementCount - 1) {
    rightArrow.style.display = "none";
  } else {
    rightArrow.style.display = "block";
  }

  const displayedArtwork = document.querySelector(
    `.artwork:nth-child(${currentIndex + 1})`
  );

  const informationBox2 = displayedArtwork.querySelector(".information");
  if (informationBox2) {
    informationBox2.classList.add("fade-in");
  }
}

// Slide Right
function slideRight() {
  const currentlyDisplayedArtwork = document.querySelector(
    `.artwork:nth-child(${currentIndex + 1})`
  );
  const informationBox =
    currentlyDisplayedArtwork.querySelector(".information");
  if (informationBox) {
    informationBox.classList.remove("fade-in");
  }

  if (!isAnimating) {
    currentIndex++;
    isAnimating = true;
    imageContainer.scrollBy({
      left: window.innerWidth,
      behavior: "smooth",
    });
    setTimeout(() => {
      isAnimating = false;
    }, 700);
  }

  if (currentIndex == 0) {
    leftArrow.style.display = "none";
  } else {
    leftArrow.style.display = "block";
  }

  if (currentIndex == imageContainer.childElementCount - 1) {
    rightArrow.style.display = "none";
  } else {
    rightArrow.style.display = "block";
  }

  const displayedArtwork = document.querySelector(
    `.artwork:nth-child(${currentIndex + 1})`
  );
  const informationBox2 = displayedArtwork.querySelector(".information");
  if (informationBox2) {
    informationBox2.classList.add("fade-in");
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft" && currentIndex != 0) {
    slideLeft();
  } else if (
    event.key === "ArrowRight" &&
    currentIndex <= imageContainer.childElementCount - 2
  ) {
    slideRight();
  }
});

// Drag Start
function handleDragStart(event) {
  if (isInformationOpen) {
    return;
  }
  if (isAddToCollection) {
    return;
  }
  isDragging = true;
  prevPageX = event.pageX;
  prevScrollLeft = imageContainer.scrollLeft;
}

// Drag
function handleDrag(event) {
  if (isInformationOpen) return;
  if (isAddToCollection) {
    return;
  }
  if (!isDragging) return;
  imageContainer.classList.add("dragging");
  event.preventDefault();
  icons.forEach((icon) => {
    icon.classList.add("close");
  });
  positionDiff = event.pageX - prevPageX;
  imageContainer.scrollLeft = prevScrollLeft - positionDiff;

  const closestAnchor = event.target.closest("a");
  if (closestAnchor) {
    closestAnchor.classList.add("disabled");
  }
}

// Drag End
function handleDragEnd(event) {
  icons.forEach((icon) => {
    icon.classList.remove("close");
  });
  if (isInformationOpen) return;
  if (isAddToCollection) {
    return;
  }

  isDragging = false;
  positionDiff = Math.abs(positionDiff);

  imageContainer.classList.remove("dragging");

  const anchors = document.querySelectorAll(".disabled");
  anchors.forEach((anchor) => {
    anchor.classList.remove("disabled");
  });

  const scrollThreshold = window.innerWidth / 30;

  if (positionDiff > scrollThreshold) {
    const currentlyDisplayedArtwork = document.querySelector(
      `.artwork:nth-child(${currentIndex + 1})`
    );

    const informationBox =
      currentlyDisplayedArtwork.querySelector(".information");
    if (informationBox) {
      informationBox.classList.remove("fade-in");
    }
    if (
      prevPageX > event.pageX &&
      currentIndex < imageContainer.childElementCount - 1
    ) {
      currentIndex++;
    }

    if (prevPageX < event.pageX && currentIndex > 0) {
      currentIndex--;
    }
  }

  const scrollTarget = currentIndex * window.innerWidth;
  smoothScroll(imageContainer, scrollTarget, 10);

  const displayedArtwork = document.querySelector(
    `.artwork:nth-child(${currentIndex + 1})`
  );

  const informationBox2 = displayedArtwork.querySelector(".information");
  if (informationBox2) {
    informationBox2.classList.add("fade-in");
  }

  if (currentIndex === 0) {
    leftArrow.style.display = "none";
  } else {
    leftArrow.style.display = "block";
  }

  if (currentIndex >= imageContainer.childElementCount - 1) {
    rightArrow.style.display = "none";
  } else {
    rightArrow.style.display = "block";
  }
}

function smoothScroll(element, target, duration) {
  const start = element.scrollLeft;
  const distance = target - start;
  const startTime = performance.now();

  function scroll(timestamp) {
    const timeElapsed = timestamp - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeOutQuart(progress);

    element.scrollLeft = start + distance * ease;

    if (timeElapsed < duration) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}

function easeOutQuart(t) {
  return 1 - --t * t * t * t;
}

imageContainer.addEventListener("mousedown", handleDragStart);
imageContainer.addEventListener("mousemove", handleDrag);
imageContainer.addEventListener("mouseup", handleDragEnd);