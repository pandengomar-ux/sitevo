// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add('show');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
