/* main.js – Shared utilities: FAQ accordion, scroll animations, smooth scroll */

document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
    initScrollAnimations();
    initHeroSearch();
    initNewsletter();
    initHeroSlider();
});

/* ── FAQ Accordion ───────────────────────────────────────── */
function initFAQ() {
    document.querySelectorAll('.faq-item__trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // Close all open items
            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
            });

            // Open clicked item if it was closed
            if (!isOpen) {
                item.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* ── Scroll Animations ────────────────────────────────────── */
function initScrollAnimations() {
    const targets = document.querySelectorAll('.animate-in, .reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.01, rootMargin: '100px' }
    );

    targets.forEach(el => observer.observe(el));

    // Fallback: Reveal everything if for some reason observer fails after 2s
    setTimeout(() => {
        targets.forEach(el => el.classList.add('visible'));
    }, 2000);
}

/* ── Hero Search Suggestions ────────────────────────────── */
function initHeroSearch() {
    const searchInput = document.getElementById('hero-search');
    const suggestions = document.querySelectorAll('.hero__suggestion');

    if (searchInput && suggestions.length) {
        suggestions.forEach(btn => {
            btn.addEventListener('click', () => {
                searchInput.value = btn.textContent.trim();
                const encoded = encodeURIComponent(btn.textContent.trim());
                window.location.href = `foerderungen.html?q=${encoded}`;
            });
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = searchInput.value.trim();
                if (val) {
                    window.location.href = `foerderungen.html?q=${encodeURIComponent(val)}`;
                }
            }
        });
    }

    const heroBtn = document.getElementById('hero-search-btn');
    if (heroBtn && searchInput) {
        heroBtn.addEventListener('click', () => {
            const val = searchInput.value.trim();
            if (val) {
                window.location.href = `foerderungen.html?q=${encodeURIComponent(val)}`;
            } else {
                window.location.href = 'foerderungen.html';
            }
        });
    }
}

/* ── Newsletter System ────────────────────────────── */
function initNewsletter() {
    const isSubscribed = localStorage.getItem('foerdercheck_subscribed');
    if (isSubscribed) return;

    // Handle footer form
    const footerForm = document.getElementById('footer-newsletter');
    if (footerForm) {
        footerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = footerForm.querySelector('input').value;
            await subscribeEmail(email, footerForm);
        });
    }

    /* Popup timer disabled as per user request
    setInterval(() => {
        if (!localStorage.getItem('foerdercheck_subscribed') && !document.getElementById('newsletter-popup')) {
            showNewsletterPopup();
        }
    }, 180000);

    setTimeout(() => {
        if (!localStorage.getItem('foerdercheck_subscribed') && !document.getElementById('newsletter-popup')) {
            showNewsletterPopup();
        }
    }, 30000);
    */
}

async function subscribeEmail(email, formElement) {
    try {
        // More robust dev detection: if on any common Live Server port, point to :3000
        const isDev = ['5500', '5501', '5502', '3001'].includes(window.location.port);
        const baseUrl = isDev ? `${window.location.protocol}//${window.location.hostname}:3000` : '';
        const res = await fetch(`${baseUrl}/api/newsletter/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        
        if (res.ok) {
            localStorage.setItem('foerdercheck_subscribed', 'true');
            if (formElement.id === 'newsletter-popup-form') {
                closeNewsletterPopup();
            }
            alert('Vielen Dank! Sie wurden erfolgreich angemeldet.');
            if (formElement.tagName === 'FORM') formElement.reset();
        } else {
            const errorText = data.error || 'Fehler bei der Anmeldung.';
            alert(`Hinweis: ${errorText}`);
        }
    } catch (err) {
        console.error('Newsletter Signup Error:', err);
        alert('Serverfehler: Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es später erneut.');
    }
}

function showNewsletterPopup() {
    const popup = document.createElement('div');
    popup.id = 'newsletter-popup';
    popup.innerHTML = `
        <div class="newsletter-popup__backdrop" onclick="closeNewsletterPopup()"></div>
        <div class="newsletter-popup__content">
            <button class="newsletter-popup__close" onclick="closeNewsletterPopup()">×</button>
            <div class="newsletter-popup__icon">📩</div>
            <h2>Nichts verpassen!</h2>
            <p>Erhalten Sie die neuesten Förderprogramme und Updates direkt in Ihr Postfach.</p>
            <form id="newsletter-popup-form">
                <input type="email" placeholder="Ihre E-Mail Adresse" required>
                <button type="submit">Jetzt anmelden</button>
            </form>
            <p class="newsletter-popup__hint">Kein Spam. Abmeldung jederzeit möglich.</p>
        </div>
    `;
    document.body.appendChild(popup);

    const form = popup.querySelector('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        await subscribeEmail(email, form);
    });
}

function closeNewsletterPopup() {
    const popup = document.getElementById('newsletter-popup');
    if (popup) {
        popup.remove();
    }
}
window.closeNewsletterPopup = closeNewsletterPopup;

/* ── Hero Slider ────────────────────────────────────────── */
function initHeroSlider() {
    const slider = document.getElementById('hero-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slide');
    const dots = slider.querySelectorAll('.slider-dot');
    let currentIdx = 0;
    let autoPlayInterval;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIdx = index;
    }

    function nextSlide() {
        let nextIdx = (currentIdx + 1) % slides.length;
        showSlide(nextIdx);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 7000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            startAutoPlay(); // Reset timer on manual click
        });
    });

    // Start
    startAutoPlay();

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
}
