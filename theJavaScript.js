const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".project-box"); // Changed from .slide

let index = 0;
const slideWidth = 480; // width of each slide

document.getElementById("nextBtn").addEventListener("click", () => {
    index++;
    if (index >= slides.length) index = 0;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
});

document.getElementById("prevBtn").addEventListener("click", () => {
    index--;
    if (index < 0) index = slides.length - 1;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
});