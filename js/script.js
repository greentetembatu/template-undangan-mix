document.addEventListener('DOMContentLoaded', function() {
    const landingOverlay = document.getElementById('landingOverlay');
    const openWebsiteBtn = document.getElementById('openWebsiteBtn');
    const mainContent = document.getElementById('main-content');
    const backgroundMusic = document.getElementById('background-music');
    const fallingCanvas = document.getElementById('fallingCanvas');

    // Fungsi untuk memutar musik



    
    // Event listener untuk tombol "Buka Undangan"
    openWebsiteBtn.addEventListener('click', function() {
        landingOverlay.classList.add('slide-up');

        landingOverlay.addEventListener('transitionend', function() {
            landingOverlay.classList.add('hidden');
            mainContent.classList.remove('hidden');


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










function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        const messageSpan = buttonElement.nextElementSibling;
        if (messageSpan && messageSpan.classList.contains('copy-message')) {
            messageSpan.style.display = 'inline';
            setTimeout(() => {
                messageSpan.style.display = 'none';
            }, 2000); // Hide after 2 seconds
        }
        
        // Optional: Change button text temporarily
        const originalText = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Disalin!';
        setTimeout(() => {
            buttonElement.innerHTML = originalText;
        }, 2000); // Revert button text after 2 seconds

    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Gagal menyalin. Silakan salin manual.'); // Fallback alert
    });
}











const backgroundMusic = document.getElementById('background-music');

// Tambahkan event listener pada tombol "Buka Undangan"
openWebsiteBtn.addEventListener('click', () => {
    // Play the music when the button is clicked
    backgroundMusic.play().catch(error => {
        console.error("Autoplay was prevented:", error);
        // Fallback: If autoplay is blocked, you might show a play button later
    });
});

// Anda bisa menambahkan tombol mute/unmute jika diinginkan di bagian lain dari website
// Contoh (opsional, tambahkan tombol di HTML):

const muteButton = document.createElement('button');
muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
muteButton.id = 'muteToggle';
muteButton.style.position = 'fixed';
muteButton.style.bottom = '90px';
muteButton.style.left = '20px';
muteButton.style.zIndex = '1002';
muteButton.style.backgroundColor = 'rgba(0,0,0,0.5)';
muteButton.style.color = 'white';
muteButton.style.border = 'none';
muteButton.style.borderRadius = '50%';
muteButton.style.width = '50px';
muteButton.style.height = '50px';
muteButton.style.cursor = 'pointer';
document.body.appendChild(muteButton);

muteButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        backgroundMusic.pause();
        muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});
