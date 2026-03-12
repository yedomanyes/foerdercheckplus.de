/* main.js – Shared utilities: FAQ accordion, scroll animations, smooth scroll */

document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
    initScrollAnimations();
    initHeroSearch();
    initNewsletter();
    initDarkMode();
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
    const targets = document.querySelectorAll('.animate-in');
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
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(el => observer.observe(el));
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

/* ── Global Dark Mode Toggle ───────────────────────── */
function initDarkMode() {
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    if (!toggleBtns.length) return;
    toggleBtns.forEach(btn => {
        const handleToggle = () => {
            const root = document.documentElement;
            if (root.getAttribute('data-theme') === 'dark') {
                root.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        };
        // Remove old listeners to avoid duplicates
        btn.removeEventListener('click', handleToggle);
        btn.addEventListener('click', handleToggle);
    });
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

    // Popup timer (every 3 minutes)
    // 3 minutes = 180,000 ms
    setInterval(() => {
        if (!localStorage.getItem('foerdercheck_subscribed') && !document.getElementById('newsletter-popup')) {
            showNewsletterPopup();
        }
    }, 180000);

    // Initial check after 30 seconds
    setTimeout(() => {
        if (!localStorage.getItem('foerdercheck_subscribed') && !document.getElementById('newsletter-popup')) {
            showNewsletterPopup();
        }
    }, 30000);
}

async function subscribeEmail(email, formElement) {
    try {
        const res = await fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
            alert(data.error || 'Fehler bei der Anmeldung.');
        }
    } catch (err) {
        alert('Serverfehler. Bitte später erneut versuchen.');
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
