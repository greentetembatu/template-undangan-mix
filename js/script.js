document.addEventListener('DOMContentLoaded', function() {
    const landingOverlay = document.getElementById('landingOverlay');
    const openWebsiteBtn = document.getElementById('openWebsiteBtn');
    const mainContent = document.getElementById('main-content');
    const backgroundMusic = document.getElementById('background-music');
    const fallingCanvas = document.getElementById('fallingCanvas');

    // Fungsi untuk memutar musik
    function playMusic() {
        if (backgroundMusic) {
            backgroundMusic.play().catch(error => {
                console.log("Autoplay prevented:", error);
            });
        }
    }

    // Event listener untuk tombol "Buka Undangan"
    openWebsiteBtn.addEventListener('click', function() {
        landingOverlay.classList.add('slide-up');

        landingOverlay.addEventListener('transitionend', function() {
            landingOverlay.classList.add('hidden');
            mainContent.classList.remove('hidden');
            playMusic();

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }

            if (fallingCanvas) {
                fallingCanvas.style.display = 'block';
                if (typeof window.initSakuraEffect === 'function') {
                    window.initSakuraEffect();
                } else {
                    console.warn("initSakuraEffect is not defined. Sakura effect may not start.");
                }
            }

            // Panggil inisialisasi parallax horizontal di sini
            if (typeof window.initHorizontalParallax === 'function') {
                window.initHorizontalParallax();
            } else {
                console.warn("initHorizontalParallax is not defined. Horizontal parallax may not start.");
            }

        }, { once: true });
    });

    // --- Bagian lain dari script.js Anda (pertahankan kode yang sudah ada) ---

    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        document.getElementById('guest-name-display').textContent = decodeURIComponent(guestName);
    }

    const showBarcodeBtn = document.getElementById('showBarcodeBtn');
    const barcodeContainer = document.getElementById('barcodeContainer');
    const guestBarcodeImage = document.getElementById('guestBarcodeImage');

    if (showBarcodeBtn && barcodeContainer && guestBarcodeImage) {
        showBarcodeBtn.addEventListener('click', function() {
            const barcodeUrl = "https://placehold.co/300x100/000/FFF?text=BARCODE_ANDA";
            guestBarcodeImage.src = barcodeUrl;
            barcodeContainer.classList.toggle('hidden');
            if (!barcodeContainer.classList.contains('hidden')) {
                showBarcodeBtn.textContent = 'Sembunyikan Barcode Anda';
            } else {
                showBarcodeBtn.textContent = 'Lihat Barcode Anda';
            }
        });
    }

    const countdownElement = document.getElementById('countdown');
    const targetDate = new Date('January 1, 2027 09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (countdownElement) {
            if (distance < 0) {
                countdownElement.innerHTML = "KAMI TELAH MENIKAH!";
                clearInterval(countdownInterval);
            } else {
                countdownElement.innerHTML = `
                    <div class="countdown-item">${days} <span>Hari</span></div>
                    <div class="countdown-item">${hours} <span>Jam</span></div>
                    <div class="countdown-item">${minutes} <span>Menit</span></div>
                    <div class="countdown-item">${seconds} <span>Detik</span></div>
                `;
            }
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    const confettiButton = document.getElementById('confettiButton');
    if (confettiButton && typeof confetti === 'function') {
        confettiButton.addEventListener('click', () => {
            confetti({
                particleCount: 200,
                spread: 90,
                origin: { y: 0.6 }
            });
        });
    }
});
/**
 * sakura.js
 * Efek bunga sakura berjatuhan pada elemen canvas.
 */

// Efek muncul saat scroll
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll('.hidden-item');

  const reveal = () => {
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        item.classList.add('show');
      }
    });
  };

  window.addEventListener('scroll', reveal);
  reveal(); // Jalankan saat awal
});
