// Inisialisasi AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: false,
    offset: 100
});

// Audio Controls
const audio = document.getElementById('backgroundMusic');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const muteBtn = document.getElementById('muteBtn');

playBtn.addEventListener('click', () => {
    audio.play();
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
});

let isMuted = false;
muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
});

// Parallax effect yang lebih smooth untuk background section
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const bg = section.querySelector('.section-bg');
        if (bg) {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.pageYOffset;
            const sectionHeight = rect.height;
            
            // Hitung posisi scroll relatif terhadap section
            const scrollPosition = scrolled - sectionTop;
            const scrollPercent = scrollPosition / sectionHeight;
            
            // Terapkan parallax effect
            const yPos = -(scrollPercent * 100);
            bg.style.transform = `translateY(${yPos}px)`;
            
            // Tambah efek blur berdasarkan posisi scroll
            const blurAmount = Math.min(5, Math.abs(scrollPercent) * 10);
            bg.style.filter = `blur(${blurAmount}px)`;
            
            // Update opacity berdasarkan posisi scroll
            const opacity = 1 - Math.min(0.3, Math.abs(scrollPercent) * 0.5);
            bg.style.opacity = opacity;
        }
    });
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Auto-play audio dengan interaksi pengguna pertama
document.body.addEventListener('click', function initAudio() {
    audio.play().then(() => {
        console.log('Audio started successfully');
    }).catch(error => {
        console.log('Audio play failed:', error);
    });
    document.body.removeEventListener('click', initAudio);
});

// Efek smooth transition antara section
function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.pageYOffset;
        const sectionHeight = rect.height;
        
        // Jika section berada di tengah viewport
        if (scrollPosition >= sectionTop - windowHeight/2 && 
            scrollPosition < sectionTop + sectionHeight - windowHeight/2) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveSection);

// Inisialisasi saat halaman dimuat
window.addEventListener('load', () => {
    updateParallax();
    updateActiveSection();
});