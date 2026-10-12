document.addEventListener("DOMContentLoaded", () => {

    /* 1. NAVEGACIÓN RESPONSIVE (MÓVIL) */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cierra el menú al hacer clic en cualquier enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /* 2. CARRUSEL DE TOSTAS */
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');

    if (track && prevBtn && nextBtn) {
        const cards = track.querySelectorAll('.tosta-card');
        let currentIndex = 0;

        const getCardsPerPage = () => window.innerWidth <= 768 ? 1 : 3;

        const updateCarousel = () => {
            const cardWidth = cards[0].offsetWidth + 20; // 20px de espacio
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

            // Actualizar los puntos
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === currentIndex);
                });
            }
        };

        nextBtn.addEventListener('click', () => {
            const maxIndex = cards.length - getCardsPerPage();
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0; // Volver al inicio
            }
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            const maxIndex = cards.length - getCardsPerPage();
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex; // Ir al final
            }
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
    }

    /* 3. MODAL / LIGHTBOX PARA AMPLIAR FOTOS (Tostas, Exposiciones y Fiestas) */
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.modal-close');
    
    // Seleccionamos tanto las imágenes de la galería como las del carrusel de tostas
    const clickableImages = document.querySelectorAll('.gallery-card img, .tosta-card img');

    if (modal && modalImg) {
        clickableImages.forEach(img => {
            // Cambiamos el cursor para indicar que se puede hacer clic
            img.style.cursor = 'pointer';

            img.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImg.src = img.src;
            });
        });

        const closeModal = () => {
            modal.style.display = 'none';
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});