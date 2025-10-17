// List of image paths
const images = [
  "img/massage_1.jpg",
  "img/massage_2.jpg",
  "img/massage_3.jpg",
  "img/massage_4.jpg",
  "img/massage_5.jpg"
];

// Select main elements
const slides = document.querySelector('.slides');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0   ;

// Create and append image elements dynamically
images.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = "Massage";
  img.classList.add('masaz');
  slides.appendChild(img);
});

// Function to move slides
function showSlide() {
  slides.style.transform = `translateX(${-index * 50}%)`;
}

const maxIndex = 3;  // since we show 2 images at a time, max index is length - 2
// Next button click event
nextBtn.addEventListener('click', () => {
  if (index === maxIndex) {
    index = 0; 
  } else {
    index++;
  }
  showSlide();
});

// Previous button click event
prevBtn.addEventListener('click', () => {
  if (index === 0) {
    index = maxIndex; 
  } else {
    index--;
  }
  showSlide();
});

// Touch swipe functionality
let startX = 0;

slides.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

slides.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;

  // Swipe left
  if (startX - endX > 50) {
    index = (index + 1) % images.length;
    showSlide();
  }

  // Swipe right
  else if (endX - startX > 50) {
    index = (index - 1 + images.length) % images.length;
    showSlide();
  }
});

// Initialize slider on page load
showSlide();
