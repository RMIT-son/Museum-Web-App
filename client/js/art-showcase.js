let isDragging,
  isInformationOpen = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;
let currentIndex = 0;
const imageContainer = document.querySelector(".slider");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const toggleBtn = document.querySelector(".toggle_btn");
const dropDownMenu = document.querySelector(".dropdown-menu");
const overlay = document.querySelector(".overlay");
const icons = document.querySelector(".icons");
const information = document.querySelector(".information");
const infoIcons = document.querySelectorAll(".info-icon");
const heartIcons = document.querySelectorAll(".heart-icon");
const bookMarkIcons = document.querySelectorAll(".bookmark-icon");
const firstArtwork = document.querySelector(".artwork:nth-child(1)");
const firstInformationBox = firstArtwork.querySelector(".information");

function simulateMouseDown(event) {
  event.preventDefault();
  event.stopPropagation();
}

heartIcons.forEach((icon, index) => {
  icon.onclick = function () {
    const currentlyDisplayedArtwork = document.querySelector(
      `.artwork:nth-child(${index + 1})`
    );
    if (!currentlyDisplayedArtwork) return;

    icon.classList.toggle("fa-solid");
    icon.classList.toggle("fa-regular");

    if (isInformationOpen && !isDragging) {
      simulateMouseDown();
    }
  };
});

bookMarkIcons.forEach((icon, index) => {
  icon.onclick = function () {
    const currentlyDisplayedArtwork = document.querySelector(
      `.artwork:nth-child(${index + 1})`
    );
    if (!currentlyDisplayedArtwork) return;

    icon.classList.toggle("fa-solid");
    icon.classList.toggle("fa-regular");

    if (isInformationOpen && !isDragging) {
      simulateMouseDown();
    }
  };
});

infoIcons.forEach((icon, index) => {
  icon.onclick = function () {
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

    if (isInformationOpen && !isDragging) {
      simulateMouseDown();
    }
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
    console.log(currentIndex);
    slideLeft();
  } else if (
    event.key === "ArrowRight" &&
    currentIndex <= imageContainer.childElementCount - 2
  ) {
    console.log(currentIndex);
    slideRight();
  }
});

// Drag Start
function handleDragStart(event) {
  if (isInformationOpen) {
    simulateMouseDown(event);
    return;
  }
  isDragging = true;
  prevPageX = event.pageX;
  prevScrollLeft = imageContainer.scrollLeft;
}

// Drag
function handleDrag(event) {
  if (isInformationOpen) return;
  if (!isDragging) return;
  imageContainer.classList.add("dragging");
  event.preventDefault();
  icons.classList.add("close");
  positionDiff = event.pageX - prevPageX;
  imageContainer.scrollLeft = prevScrollLeft - positionDiff;

  const closestAnchor = event.target.closest("a");
  if (closestAnchor) {
    closestAnchor.classList.add("disabled");
  }
}

// Drag End
function handleDragEnd(event) {
  icons.classList.remove("close");
  if (isInformationOpen) return;

  isDragging = false;
  positionDiff = Math.abs(positionDiff);

  imageContainer.classList.remove("dragging");

  const anchors = document.querySelectorAll(".disabled");
  anchors.forEach((anchor) => {
    anchor.classList.remove("disabled");
  });

  const scrollThreshold = window.innerWidth / 20;

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

// Touch Start
function handleTouchStart(event) {
  if (isInformationOpen) {
    simulateTouchStart(event);
    return;
  }
  isDragging = true;
  prevPageX = event.touches[0].pageX;
  prevScrollLeft = imageContainer.scrollLeft;
}

// Touch Move
function handleTouchMove(event) {
  if (isInformationOpen) return;
  if (!isDragging) return;
  imageContainer.classList.add("dragging");
  event.preventDefault();
  icons.classList.add("close");
  positionDiff = event.touches[0].pageX - prevPageX;
  imageContainer.scrollLeft = prevScrollLeft - positionDiff;

  const closestAnchor = document
    .elementFromPoint(event.touches[0].clientX, event.touches[0].clientY)
    .closest("a");
  if (closestAnchor) {
    closestAnchor.classList.add("disabled");
  }
}

// Touch End
function handleTouchEnd(event) {
  icons.classList.remove("close");
  if (isInformationOpen) return;

  isDragging = false;
  positionDiff = Math.abs(positionDiff);

  imageContainer.classList.remove("dragging");

  const anchors = document.querySelectorAll(".disabled");
  anchors.forEach((anchor) => {
    anchor.classList.remove("disabled");
  });

  const scrollThreshold = window.innerWidth / 20;

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
      prevPageX > event.changedTouches[0].pageX &&
      currentIndex < imageContainer.childElementCount - 1
    ) {
      currentIndex++;
    }

    if (prevPageX < event.changedTouches[0].pageX && currentIndex > 0) {
      currentIndex--;
    }
  }

  const scrollTarget = currentIndex * window.innerWidth;
  imageContainer.scrollTo({
    left: scrollTarget,
    behavior: "smooth",
  });
  const displayedArtwork = document.querySelector(
    `.artwork:nth-child(${currentIndex + 1})`
  );

  const informationBox2 = displayedArtwork.querySelector(".information");
  if (informationBox2) {
    informationBox2.classList.add("fade-in");
  }

  if (currentIndex == 0) {
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

imageContainer.addEventListener("touchstart", handleTouchStart);
imageContainer.addEventListener("touchmove", handleTouchMove);
imageContainer.addEventListener("touchend", handleTouchEnd);
