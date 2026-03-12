// header.js – FoerdercheckPlus (shared navbar for all detail pages)
(function () {
  document.write(`
<script>(function(){const t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.setAttribute("data-theme","dark");}})();</script>

<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Poppins',system-ui,sans-serif}
  a,button{-webkit-tap-highlight-color:transparent;outline:none}
  a:focus-visible,button:focus-visible{outline:2px solid #89CFF0;outline-offset:2px}
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

  .site-nav{
    position:sticky;top:0;z-index:200;height:68px;
    background:rgba(255,255,255,.93);backdrop-filter:blur(16px);
    border-bottom:1px solid #EAECF0;display:flex;align-items:center;
    transition: background 0.2s, border-color 0.2s;
  }
  [data-theme="dark"] .site-nav {
    background: rgba(22, 22, 22, 0.95); /* Requested Dark Header */
    border-bottom: 1px solid #333;
  }
  [data-theme="dark"] .site-nav__logo, [data-theme="dark"] .site-nav__link {
    color: #F8FAFC;
  }
  [data-theme="dark"] .site-nav__link:hover {
    background: #333;
  }
  [data-theme="dark"] .site-nav__link.active {
    color: #38BDF8;
    background: rgba(56, 189, 248, 0.15);
  }
  [data-theme="dark"] .site-nav__burger span {
    background: #F8FAFC;
  }
  [data-theme="dark"] .site-nav__mobile {
    background: #161616;
    border-color: #333;
  }
  [data-theme="dark"] .site-nav__mobile a {
    color: #CBD5E1;
  }
  [data-theme="dark"] .site-nav__mobile a:hover {
    background: #333;
    color: #F8FAFC;
  }
  .site-nav__wrap{
    max-width:1200px;margin:0 auto;padding:0 2rem;
    width:100%;display:flex;align-items:center
  }
  .site-nav__logo{
    display:flex;align-items:center;gap:10px;
    font-family:'Poppins',system-ui,sans-serif;
    font-size:1rem;font-weight:800;color:#101828;
    letter-spacing:-.025em;text-decoration:none;
    flex-shrink:0;margin-right:1.75rem
  }
  .site-nav__links{display:flex;align-items:center;gap:2px;flex:1}
  .site-nav__link{
    padding:6px 13px;border-radius:8px;
    font-family:'Poppins',system-ui,sans-serif;
    font-size:.83rem;font-weight:500;color:#667085;
    text-decoration:none;transition:background .14s,color .14s;white-space:nowrap
  }
  .site-nav__link:hover{background:#F2F4F7;color:#101828}
  .site-nav__link.active{color:#89CFF0;background:#EDEFFD}
  .site-nav__right{margin-left:auto}
  .site-nav__cta{
    display:inline-flex;align-items:center;gap:6px;
    background:#89CFF0;color:#0F172A;
    padding:9px 20px;border-radius:10px;
    font-family:'Poppins',system-ui,sans-serif;
    font-size:.83rem;font-weight:700;text-decoration:none;white-space:nowrap;
    box-shadow:0 1px 3px rgba(137,207,240,.3),0 4px 12px rgba(137,207,240,.18);
    transition:background .14s,transform .14s
  }
  .site-nav__cta:hover{background:#7ABDE0;transform:translateY(-1px)}
  
  .theme-toggle {
    background: none; border: none; cursor: pointer; padding: 6px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: #667085; transition: background 0.15s, color 0.15s; margin-right: 12px;
  }
  .theme-toggle:hover { background: #F2F4F7; color: #101828; }
  [data-theme="dark"] .theme-toggle { color: #CBD5E1; }
  [data-theme="dark"] .theme-toggle:hover { background: #333; color: #F8FAFC; }

  .theme-toggle svg { width: 20px; height: 20px; flex-shrink: 0; }
  .theme-toggle .moon-icon { display: none; }
  [data-theme="dark"] .theme-toggle .moon-icon { display: block; }
  [data-theme="dark"] .theme-toggle .sun-icon { display: none; }
  .site-nav__burger{
    display:none;background:none;border:none;cursor:pointer;
    padding:8px;margin-left:auto
  }
  .site-nav__burger span{
    display:block;width:22px;height:2px;background:#344054;
    border-radius:2px;margin:5px 0;transition:.3s
  }
  .site-nav__mobile{
    display:none;position:fixed;top:68px;left:0;right:0;
    background:#fff;border-bottom:1px solid #EAECF0;
    box-shadow:0 8px 24px rgba(0,0,0,.08);
    padding:.75rem 1.25rem;z-index:199;flex-direction:column;gap:4px
  }
  .site-nav__mobile.open{display:flex}
  .site-nav__mobile a{
    padding:11px 14px;border-radius:8px;font-size:.9rem;
    font-weight:500;color:#667085;text-decoration:none;
    font-family:'Poppins',system-ui,sans-serif;
    transition:background .14s,color .14s
  }
  .site-nav__mobile a:hover{background:#F2F4F7;color:#101828}
  @media(max-width:768px){
    .site-nav__links,.site-nav__right{display:none}
    .site-nav__burger{display:block}
  }
</style>

<nav class="site-nav">
  <div class="site-nav__wrap">
    <a href="index.html" class="site-nav__logo">
      FoerdercheckPlus
    </a>
    <div class="site-nav__links">
      <a href="index.html" class="site-nav__link" data-page="index.html">Startseite</a>
      <a href="foerderungen.html" class="site-nav__link" data-page="foerderungen.html">Alle Programme</a>
      <a href="foerderungen.html?kat=energie" class="site-nav__link">Energie</a>
      <a href="foerderungen.html?kat=business" class="site-nav__link">Gründen</a>
      <a href="foerderungen.html?kat=familie" class="site-nav__link">Familie</a>
    </div>
    <div class="site-nav__right" style="display:flex;align-items:center;">
      <button class="theme-toggle" id="theme-toggle" aria-label="Dark Mode Toggle">
        <!-- Sun Icon for Light Mode (switches to moon in dark mode via CSS) -->
        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      </button>
      <a href="foerderungen.html" class="site-nav__cta">
        Förderung finden
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
      </a>
    </div>
    <button class="site-nav__burger" id="sn-burger" aria-label="Menü">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="site-nav__mobile" id="sn-mobile">
    <a href="index.html">🏠 Startseite</a>
    <a href="foerderungen.html">📋 Alle Programme</a>
    <a href="foerderungen.html?kat=energie">⚡ Energie &amp; Haus</a>
    <a href="foerderungen.html?kat=business">💼 Gründen</a>
    <a href="foerderungen.html?kat=mobil">🚗 Mobilität</a>
    <a href="foerderungen.html?kat=familie">👨‍👩‍👧 Familie</a>
  </div>
</nav>`);

  document.addEventListener('DOMContentLoaded', () => {
    // Active link highlight
    const page = location.pathname.split('/').pop() || 'index.html';
    const params = new URLSearchParams(window.location.search);
    const kat = params.get('kat');

    if (page === 'foerderungen.html' && kat) {
      document.querySelectorAll('.site-nav__link').forEach(a => {
        if (a.getAttribute('href') === 'foerderungen.html?kat=' + kat) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
      document.querySelectorAll('.site-nav__mobile a').forEach(a => {
        if (a.getAttribute('href') === 'foerderungen.html?kat=' + kat) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    } else {
      document.querySelectorAll('.site-nav__link[data-page]').forEach(a => {
        if (a.dataset.page === page) a.classList.add('active');
      });
      document.querySelectorAll('.site-nav__mobile a').forEach(a => {
        if (a.getAttribute('href') === page) a.classList.add('active');
      });
    }

    // Burger toggle
    document.getElementById('sn-burger')?.addEventListener('click', () => {
      document.getElementById('sn-mobile')?.classList.toggle('open');
    });

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.setAttribute('data-theme', 'dark');
    }

    themeBtn?.addEventListener('click', () => {
      if (root.getAttribute('data-theme') === 'dark') {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  });
})();


