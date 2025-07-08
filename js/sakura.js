
    const canvas = document.getElementById('fallingCanvas');
    let ctx; // Variabel ctx perlu didefinisikan di sini
    let particles = [];
    const particleCount = 50; // Jumlah kelopak sakura

    // Pastikan canvas mengisi seluruh layar
    function resizeCanvas() {
        if (canvas) { // Tambahkan pengecekan null untuk canvas
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Penting: inisialisasi ulang partikel saat ukuran canvas berubah
            initParticles();
        }
    }

    // Objek Partikel Sakura
    function SakuraParticle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = (Math.random() - 0.5) * 1.5; // Kecepatan horizontal acak
        this.speedY = (Math.random() * 1.5) + 0.5;  // Kecepatan vertikal acak (lebih lambat)
        this.rotation = Math.random() * 360; // Rotasi awal
        this.rotationSpeed = (Math.random() - 0.5) * 0.1; // Kecepatan rotasi acak
        this.opacity = Math.random() * 0.5 + 0.5; // Opasitas acak
    }

    SakuraParticle.prototype.draw = function() {
        if (ctx) { // Tambahkan pengecekan null untuk ctx
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
            ctx.beginPath();

            // Gambar bentuk kelopak sakura sederhana
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(this.radius, -this.radius, this.radius * 2, this.radius, 0, this.radius * 2);
            ctx.bezierCurveTo(-this.radius * 2, this.radius, -this.radius, -this.radius, 0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    };

    SakuraParticle.prototype.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Reset partikel jika keluar dari layar
        if (canvas && (this.y > canvas.height + this.radius || this.x < -this.radius || this.x > canvas.width + this.radius)) {
            this.y = -this.radius; // Muncul kembali di atas
            this.x = Math.random() * canvas.width; // Posisi X acak
            this.speedX = (Math.random() - 0.5) * 1.5;
            this.speedY = (Math.random() * 1.5) + 0.5;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 0.1;
            this.opacity = Math.random() * 0.5 + 0.5;
        }
    };

    // Inisialisasi partikel
    function initParticles() {
        if (!canvas) return;
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 5 + 3; // Ukuran kelopak acak (3-8px)
            const color = { r: 255, g: 192, b: 203 }; // Pink muda
            particles.push(new SakuraParticle(x, y, radius, color));
        }
    }

    // Loop animasi
    function animate() {
        if (ctx && canvas) { // Pastikan ctx dan canvas ada sebelum menggambar
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
        }
        requestAnimationFrame(animate); // Lanjutkan animasi pada frame berikutnya
    }

    // --- Fungsi Inisialisasi Utama, diekspos secara global ---
    window.initSakuraEffect = function() {
        if (canvas) {
            ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error("Could not get 2D context for fallingCanvas.");
                return;
            }
            resizeCanvas(); // Atur ukuran dan inisialisasi partikel
            animate(); // Mulai loop animasi
            window.addEventListener('resize', resizeCanvas); // Tambahkan listener resize
        } else {
            console.warn("Element with ID 'fallingCanvas' not found. Sakura effect will not run.");
        }
    };
