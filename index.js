// Test bai 1
let carousel = document.querySelector(".carousel");
let carouselContent = document.querySelector(".carousel-content");
let slides = document.querySelectorAll(".slide");
let dotCarousel = document.querySelector("#dot-carousel");
let arrayOfSlides = Array.prototype.slice.call(slides);
let carouselDisplaying;
let screenSize;
let lengthOfSlide;
let slidePerScreen = 6;
// create a clone of the last slide and insert it before the first slide
const addClone = () => {
  let lastSlide = carouselContent.lastElementChild.cloneNode(true);
  lastSlide.style.left = -lengthOfSlide + "px";
  carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
};
// removes the first slide from the carousel
const removeClone = () => {
  let firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
};
// moves all slides to the right
const moveSlidesRight = () => {
  let slides = document.querySelectorAll(".slide");
  let slidesArray = Array.prototype.slice.call(slides);
  let width = 0;

  slidesArray.forEach(function (el, i) {
    el.style.left = width + "px";
    width += lengthOfSlide;
  });
  addClone();
};
moveSlidesRight();
// moves all slides to the left
const moveSlidesLeft = () => {
  let slides = document.querySelectorAll(".slide");
  let slidesArray = Array.prototype.slice.call(slides);
  slidesArray = slidesArray.reverse();
  let maxWidth = (slidesArray.length - 1) * lengthOfSlide;

  slidesArray.forEach(function (el, i) {
    maxWidth -= lengthOfSlide;
    el.style.left = maxWidth + "px";
  });
};
// gets the current screen size and sets the width of the slides
const getScreenSize = () => {
  let slides = document.querySelectorAll(".slide");
  let slidesArray = Array.prototype.slice.call(slides);
  lengthOfSlide = carousel.offsetWidth / carouselDisplaying;
  let initialWidth = -lengthOfSlide;
  slidesArray.forEach(function (el) {
    el.style.width = "186px";
    el.style.left = initialWidth + "px";
    initialWidth += lengthOfSlide;
  });
};
// sets the number of slides to be displayed on the screen
const setScreenSize = () => {
  if (window.innerWidth >= 500) {
    carouselDisplaying = slidePerScreen;
  }
  getScreenSize();
};
setScreenSize();
window.addEventListener("resize", setScreenSize);
let moving = true;

// moves the carousel one slide to the left
const moveLeft = (firstElement) => {
  if (moving) {
    moving = false;
    removeClone();
    let firstSlide = carouselContent.firstElementChild;
    moveSlidesLeft();
    setActiveDot(
      (arrayOfSlides.indexOf(firstSlide) + 1) % paginationDots.length
    );
    firstSlide.addEventListener("transitionend", replaceToEnd);
    firstSlide.addEventListener("transitionend", activateAgain);
  }
};

// moves the carousel one slide to the right
const moveRight = () => {
  if (moving) {
    moving = false;
    let lastSlide = carouselContent.lastElementChild;
    lastSlide.parentNode.removeChild(lastSlide);
    carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
    removeClone();
    let firstSlide = carouselContent.firstElementChild;
    moveSlidesRight();
    setActiveDot(arrayOfSlides.indexOf(lastSlide) % paginationDots.length);
    firstSlide.addEventListener("transitionend", activateAgain);
  }
};
// detect mouse movement on the carousel
const seeMovement = (e) => {
  if (e) {
    initialX = e.clientX;
    getInitialPos();
    carouselContent.addEventListener("mousemove", slightMove);
    document.addEventListener("mouseup", moveBasedOnMouse);
  }
};
// activa the moving flag when moving
const activateAgain = () => {
  let firstSlide = carouselContent.firstElementChild;
  moving = true;
  firstSlide.removeEventListener("transitionend", activateAgain);
};

// replaces the first slide to the end of the carousel when moving to the right
const replaceToEnd = () => {
  let firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
  carouselContent.appendChild(firstSlide);
  firstSlide.style.left = (arrayOfSlides.length - 1) * lengthOfSlide + "px";
  addClone();
  moving = true;
  firstSlide.removeEventListener("transitionend", replaceToEnd);
};

carouselContent.addEventListener("mousedown", seeMovement);

let initialX;
let initialPos;

const slightMove = (e) => {
  if (moving) {
    let movingX = e.clientX;
    let difference = initialX - movingX;
    if (Math.abs(difference) < lengthOfSlide / 5) {
      slightMoveSlides(difference);
    }
  }
};

const getInitialPos = () => {
  let slides = document.querySelectorAll(".slide");
  let slidesArray = Array.prototype.slice.call(slides);
  initialPos = [];
  slidesArray.forEach(function (el) {
    let left = Math.floor(parseInt(el.style.left.slice(0, -2)));
    initialPos.push(left);
  });
};

const slightMoveSlides = (newX) => {
  let slides = document.querySelectorAll(".slide");
  let slidesArray = Array.prototype.slice.call(slides);
  slidesArray.forEach(function (el, i) {
    let oldLeft = initialPos[i];
    el.style.left = oldLeft + newX + "px";
  });
};

const moveBasedOnMouse = (e) => {
  let finalX = e.clientX;
  if (initialX - finalX > 0) {
    moveLeft();
  } else if (initialX - finalX < 0) {
    moveRight();
  }
  document.removeEventListener("mouseup", moveBasedOnMouse);
  carouselContent.removeEventListener("mousemove", slightMove);
};

const createPaginationDots = () => {
  let dotsContainer = document.querySelector(".pagination-dots");
  for (let i = 0; i < slides.length; i++) {
    let dot = document.createElement("div");
    dot.classList.add("pagination-dot");
    dotsContainer.appendChild(dot);
  }
};
createPaginationDots();
const setActiveDot = (index) => {
  paginationDots.forEach((dot) => dot.classList.remove("active"));
  if (paginationDots[index]) {
    paginationDots[index].classList.add("active");
  }
};
const paginationDots = document.querySelectorAll(".pagination-dot");
paginationDots.forEach(function (dot, index) {
  dot.addEventListener("click", function () {
    let slides = document.querySelectorAll(".slide");
    let targetSlide = slides[index];
    carouselContent.style.left = -lengthOfSlide * index + "px";
  });
  setActiveDot(index);
});

setActiveDot(0);
// Test bai2
let data = [
  {
    id: 0,
    name: "Adam Me",
    address: "11-03,3233 California St",
    category: "Maketing",
  },
  {
    id: 1,
    name: "John Lee",
    address: "11-03,3233 Texas St",
    category: "Maketing",
  },
  {
    id: 2,
    name: "Chung Lee",
    address: "11-03,3233 Bac Kinh St",
    category: "Head of Department",
  },
  {
    id: 3,
    name: "Chung Lee Chang",
    address: "11-03,3288 Bac Kinh St",
    category: "Head of Department",
  },
  {
    id: 4,
    name: "Rick",
    address: "Seattle St",
    category: "Boss",
  },
  {
    id: 5,
    name: "EoRick",
    address: "A Ave 200 St",
    category: "Head of Department",
  },
  {
    id: 6,
    name: "EoRick",
    address: "A Ave 200 St",
    category: "Boss",
  },
  {
    id: 7,
    name: "Rick Chi",
    address: "A Ave 200 St",
    category: "Employee",
  },
  {
    id: 8,
    name: "BitOffice",
    address: "200 Texas, California",
    category: "Employee",
  },
  {
    id: 9,
    name: "Yee Ling",
    address: "200 Thuong Hai",
    category: "Employee",
  },
  {
    id: 10,
    name: "BitOffice",
    address: "200 Texas, California",
    category: "Employee",
  },
];
let cloneData = [...data];

const cardContainer = document.getElementById("card-container");
const inputForm = document.getElementById("input-form");
const sortBtn = document.getElementById("sort-button");
const addressBtn = document.getElementById("address-button");
let renderPeople = (arr = data) => {
  const temp = arr.map((x) => {
    return `<div class="card  d-flex">
      <div class="avatar">
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHUAbQMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAABQMEBgIBB//EADQQAAIBAgQCBwYGAwAAAAAAAAABAgMRBAUSITFBFSJRU2FxkQYyQlKxwRMUIzRy8GKh0f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/cQAAAAAGDF4mGGp6pbvgl2kSviq1d9ebS+WOyA6B1ILjKK82fYyUuDT8jmAnZ3i2n2oDqARsHmM6bUa7c4dr4r/AKWItSSad0+DA+gAAAAAAAAACDmVV1MXNPhDqo1TNjP3db+bMJUAAALGT1HOhKD+B7eRHKuSe7V819yKpgAAAAAAAAADncY4yxVVxd05cTCeqsdFWcXxjJo8lQAAAq5LKOmrG/WunbwJRRyWN6tSXJRS/voRVcAAAAAAAAAASc2wqh+vG/WdpL7k06PFUlXoTpvmtn4nOyi4ycZKzTsyj4AAgld25nQYPDRw1PSndvdslZbQ/GxCbXVhu/sXSKAAAAAAAAAAAc7jf3db+bLuIrwoQc5u3YubOeqSc6kpvjJtgeQAVFXJPdreaKZDyzExoVXGo7Rnz7GW078CK+gAAAAAMNfE0qCvUkk+S5sm4jNKk7qitC7XuwKdavSoRvVmo9naybiM1lK6oR0r5pcSfKTnJyk22+bPgHqc5TlqnJyk+bPIBUAAAM1DFVsO/wBOW3yvgYQBYw+Z0p2jVX4b7eRvxakk000+aOYMtDEVaDvSk14cmRXRgnYfNIS2rrQ/mXA34yU4qUWmnzTA5yrUdWpKcndtngodE1e8h6MdE1e8h6MCeCh0TV7yHoz4ssm9Vq1Pq7S8Oe4GgCgsqqPhVg/U+SyyUYSnKvTUIptyfBW4gaAKHRNXvYejDyqpFXdWCQE8G5HAKfu4mjLyd+V/puPyMbN/mqFo+89XD+3QGmDeWXNz0LEUtXHTffxPXRNXvIejAnmzhMXPDKSjuny7DP0TV7yHox0TV7yHowLAAAMiS9ncJKLh+NiUp7TtKPXW2z6vh9e0AD1H2ewkXK1Wuk01pTikr6t0rW+Jv0PM/ZzCz1J18SoyU7xi4pda7e2nxflxW9wAMtfJKOIUYzxOJWmEYpxlG9lfnpvz+j4mejltLD0atKlUqpVZSd7p6NStsmrWVtk0wANZZBhlp11q81F8G4ptaXG11FOz1Nvfds+R9n8MtNq9dONkn1G1a1vh/wAV587gAZ8HlNHCV41KdWq1C+mElDSr89op/wC+b7WUgAAAA//Z"
          alt=""
          srcset=""
          class="avatar-img"
          width="40px"
          height="40px"
        />
      </div>
      <div class="infor">
        <p class="infor-name">${x.name}</p>
        <p class="infor-address">${x.address}</p>
        <div class="categories d-flex">
          <button class="categories-tag">${x.category}</button>
        </div>
      </div>
    </div>`;
  });
  return temp.join("");
};
const initDataPeople = renderPeople();
cardContainer.innerHTML = initDataPeople;
inputForm.addEventListener("input", (e) => {
  const { value } = e.target;
  const temp = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.address.toLowerCase().includes(value.toLowerCase()) ||
      item.category.toLowerCase().includes(value.toLowerCase())
    );
  });
  cloneData = temp;
  const filterHtml = renderPeople(cloneData);
  cardContainer.innerHTML = filterHtml;
});
sortBtn.addEventListener("click", (e) => {
  const arrSort = [...cloneData];
  if (!e.target.classList.contains("active")) {
    arrSort.sort((a, b) => {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    const sortedHtml = renderPeople(arrSort);
    cardContainer.innerHTML = sortedHtml;
    e.target.classList.add("active");
  } else {
    const sortedHtml = renderPeople(arrSort);
    cardContainer.innerHTML = sortedHtml;
    e.target.classList.remove("active");
  }
});
const groupBy = (list = [], keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};
function compareTwoStrings(first, second) {
	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}
addressBtn.addEventListener("click", (e) => {
  const arrSort = [...cloneData];
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");

    arrSort.sort((a, b) => {
      let similarity = compareTwoStrings(
        a.address.replace(/[^a-zA-Z ]/g, "").toLowerCase(),
        b.address.replace(/[^a-zA-Z ]/g, "").toLowerCase()
      );
      return similarity > 0.5 ? 1 : -1;
    });
    const sortedHtml = renderPeople(arrSort);
    cardContainer.innerHTML = sortedHtml;
  } else {
    const sortedHtml = renderPeople(arrSort);
    cardContainer.innerHTML = sortedHtml;
    e.target.classList.remove("active");
  }
});
