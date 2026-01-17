/* ===============================
   SCROLL REVEAL
================================ */
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

/* ===============================
   STATS CHIFFRES ANIMÉS
================================ */
const stats = document.querySelectorAll('.stats .stat h2');
const statsSection = document.querySelector('.stats');

function animateStats() {
    stats.forEach(stat => {
        const target = +stat.dataset.target;
        let count = 0;
        const step = Math.ceil(target / 100);

        const interval = setInterval(() => {
            count += step;
            if(count >= target) {
                stat.textContent = '+' + target;
                clearInterval(interval);
            } else {
                stat.textContent = '+' + count;
            }
        }, 20);
    });
}

const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            animateStats();
            obs.disconnect();
        }
    });
}, {threshold: 0.5});

if(statsSection) statsObserver.observe(statsSection);

/* ===============================
   BACK TO TOP BUTTON
================================ */
const backToTop = document.createElement('button');
backToTop.textContent = '↑';
backToTop.id = 'backToTop';
document.body.appendChild(backToTop);
backToTop.style.cssText = `
    position: fixed; bottom: 30px; right: 30px;
    padding: 12px 18px; font-size: 18px;
    background: #f5c16c; color:#000;
    border-radius: 50%; border:none; display:none; cursor:pointer;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3); z-index:1000;
`;
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
window.addEventListener('scroll', () => {
    if(window.scrollY > 300) backToTop.style.display='block';
    else backToTop.style.display='none';
});

/* ===============================
   MODALS RÉSERVATION
================================ */
document.querySelectorAll('.btn-reserver').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const modal = document.createElement('div');
        modal.id = 'reservationModal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Réservation confirmée !</h2>
                <p>Merci pour votre réservation. Nous vous contacterons bientôt.</p>
                <button id="closeModal">Fermer</button>
            </div>`;
        modal.style.cssText = `
            position: fixed; top:0; left:0; width:100%; height:100%;
            background: rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:10000;
        `;
        modal.querySelector('.modal-content').style.cssText = `
            background:#111; padding:30px; border-radius:12px; text-align:center; max-width:400px; width:90%;
        `;
        document.body.appendChild(modal);
        modal.querySelector('#closeModal').addEventListener('click', () => modal.remove());
    });
});

/* ===============================
   DATE PICKER + CALCUL PRIX (location.html)
================================ */
const startDate = document.querySelector('#start-date');
const endDate = document.querySelector('#end-date');
const pricePerDayEl = document.querySelector('#price-per-day');
const totalPriceEl = document.querySelector('#total-price');

if(startDate && endDate && pricePerDayEl && totalPriceEl){
    const calculatePrice = () => {
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);
        if(start && end && end > start){
            const diffDays = Math.ceil((end - start)/(1000*60*60*24));
            const total = diffDays * (+pricePerDayEl.textContent);
            totalPriceEl.textContent = `Prix total : ${total} €`;
        }
    };
    startDate.addEventListener('change', calculatePrice);
    endDate.addEventListener('change', calculatePrice);
}

/* ===============================
   ESTIMATION INSTANTANÉE (vente.html)
================================ */
const venteForm = document.querySelector('#vente-form');
if(venteForm){
    venteForm.addEventListener('input', () => {
        const year = +venteForm.querySelector('input[name="year"]').value || 0;
        const basePrice = +venteForm.querySelector('input[name="price"]').value || 0;
        const estimated = Math.max(basePrice - (2026-year)*500, 0);
        let result = document.querySelector('#estimation-result');
        if(!result){
            result = document.createElement('p');
            result.id = 'estimation-result';
            venteForm.appendChild(result);
        }
        result.textContent = `Prix estimé : ${estimated} €`;
    });
}

/* ===============================
   BADGES ANIMÉS
================================ */
document.querySelectorAll('.badge').forEach(badge => {
    badge.style.transition = 'all 0.3s ease';
    badge.addEventListener('mouseenter', () => badge.style.transform='scale(1.1)');
    badge.addEventListener('mouseleave', () => badge.style.transform='scale(1)');
});

/* ===============================
   NAVBAR SCROLL EFFECT
================================ */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if(window.scrollY > 50) navbar.style.background = 'rgba(0,0,0,0.9)';
    else navbar.style.background = 'rgba(0,0,0,0.75)';
});