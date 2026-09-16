document.addEventListener("DOMContentLoaded", function () {
    const fadeItems = document.querySelectorAll(".fade-in");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeItems.forEach(item => {
        revealOnScroll.observe(item);
    });
});
// FUNCIONALIDAD CARRUSEL DE PINTXOS
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
const cards = document.querySelectorAll('.tosta-card');

let currentIndex = 0;

function updateCarousel() {
    const cardWidth = cards[0].getBoundingClientRect().width + 20; // Ancho + gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

if (nextBtn && prevBtn && track) {
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - 1;
        }
        updateCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
}