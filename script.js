const images = [
  "img/massage_1.jpg",
  "img/massage_2.jpg",
  "img/massage_3.jpg",
  "img/massage_4.jpg",
  "img/massage_5.jpg"
];

const slides = document.querySelector('.slides');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 1; // start from 1 because we will clone first and last
const visibleCount = 2; // 2 images visible at a time

// --- Create clones for infinite loop ---
const firstClone = document.createElement('img');
firstClone.src = images[0];
firstClone.alt = "Massage";
firstClone.classList.add('massage-img');

const lastClone = document.createElement('img');
lastClone.src = images[images.length - 1];
lastClone.alt = "Massage";
lastClone.classList.add('massage-img');

// --- Append slides ---
slides.appendChild(lastClone); // last clone at the beginning
images.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = "Massage";
  img.classList.add('massage-img');
  slides.appendChild(img);
});
slides.appendChild(firstClone); // first clone at the end

// --- Set initial position ---
function updateSlidePosition(transition = true) {
  slides.style.transition = transition ? "transform 0.5s ease" : "none";
  slides.style.transform = `translateX(${-index * (100/visibleCount)}%)`;
}

updateSlidePosition(false);

// --- Next / Prev ---
function nextSlide() {
  index++;
  updateSlidePosition();
}

function prevSlide() {
  index--;
  updateSlidePosition();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// --- Infinite loop adjustment ---
slides.addEventListener('transitionend', () => {
  if (index === images.length + 1) { // reached cloned first
    index = 1; // jump to real first
    updateSlidePosition(false);
  }
  if (index === 0) { // reached cloned last
    index = images.length; // jump to real last
    updateSlidePosition(false);
  }
});

// --- Swipe for mobile ---
let startX = 0;
slides.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slides.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextSlide();   // swipe left
  else if (endX - startX > 50) prevSlide(); // swipe right
});
