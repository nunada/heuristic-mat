/**
 * HEURISTIC-MAT - Navigasi Responsif & Menu Burger
 */
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navBackdrop = document.getElementById('navBackdrop');
    const siteHeader = document.getElementById('siteHeader');

    // Menghitung tinggi header dinamis agar posisi dropdown tepat
    function syncNavTop() {
        if (siteHeader) {
            document.documentElement.style.setProperty('--header-height', siteHeader.offsetHeight + 'px');
        }
    }

    syncNavTop();
    window.addEventListener('resize', syncNavTop);

    // Fungsi membuka / menutup menu
    function toggleMenu(show) {
        if (!mainNav || !menuToggle) return;
        const isOpen = typeof show === 'boolean' ? show : !mainNav.classList.contains('open');
        mainNav.classList.toggle('open', isOpen);
        menuToggle.classList.toggle('active', isOpen);
        if (navBackdrop) navBackdrop.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
        
        // Kunci scroll body saat menu terbuka di layar mobile
        document.body.style.overflow = (isOpen && window.innerWidth <= 768) ? 'hidden' : '';
        if (isOpen) syncNavTop();
    }

    if (menuToggle && mainNav) {
        // Klik tombol burger
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Klik backdrop luar untuk menutup
        if (navBackdrop) {
            navBackdrop.addEventListener('click', function () {
                toggleMenu(false);
            });
        }

        // Klik salah satu link navigasi otomatis menutup menu
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                toggleMenu(false);
            });
        });

        // Menutup menu dengan tombol Escape (Aksesibilitas)
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mainNav.classList.contains('open')) {
                toggleMenu(false);
                menuToggle.focus();
            }
        });

        // Reset state jika layar di-resize ke ukuran desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && mainNav.classList.contains('open')) {
                toggleMenu(false);
            }
        });
    }
});
