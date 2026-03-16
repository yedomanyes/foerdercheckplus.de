// header-logic.js
// Only contains the event listeners for the hardcoded header (no document.write/prepend)
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('sn-burger-nav');
    const overlay = document.getElementById('mobile-menu-overlay');
    const themeBtn = document.getElementById('theme-toggle-nav');
    
    burger?.addEventListener('click', () => {
        burger.classList.toggle('open');
        overlay.classList.toggle('open');
        document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    });

    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) {
            burger.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    themeBtn?.addEventListener('click', () => {
        const root = document.documentElement;
        const isDark = root.getAttribute('data-theme') === 'dark';
        if (isDark) {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Handle Active States
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-nav__link, .mobile-menu__link').forEach(link => {
        if (link.dataset.page === currentFile) {
            link.classList.add('active');
        } else if (link.getAttribute('href') && window.location.search && link.getAttribute('href').includes(window.location.search)) {
            link.classList.add('active');
        }
    });
});
