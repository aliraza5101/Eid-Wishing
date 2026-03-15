// Fireworks Logic
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.velocity.y += 0.05; // gravity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

function createFirework(x, y) {
    const colors = ['#d4af37', '#ffffff', '#ff0000', '#00ff00', '#0000ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        if (p.alpha > 0) {
            p.update();
            p.draw();
        } else {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

// User Actions
function generateWish() {
    const name = document.getElementById('userName').value;
    const modal = document.getElementById('wishModal');
    const greeting = document.getElementById('personalGreeting');
    
    if(name) {
        greeting.innerHTML = `Eid Mubarak from ${name}!`;
    } else {
        greeting.innerHTML = `Eid Mubarak!`;
    }
    
    modal.style.display = "block";
    createFirework(window.innerWidth/2, window.innerHeight/2);
}

function closeModal() {
    document.getElementById('wishModal').style.display = "none";
}

function toggleMusic() {
    const music = document.getElementById('eidMusic');
    const btn = document.getElementById('musicBtn');
    if (music.paused) {
        music.play();
        btn.innerHTML = "⏸ Pause Music";
    } else {
        music.pause();
        btn.innerHTML = "🎵 Play Soft Nasheed";
    }
}

// Global click for fireworks
window.addEventListener('mousedown', (e) => {
    createFirework(e.clientX, e.clientY);
});

// Auto-start fireworks on load
window.onload = () => {
    animate();
    setTimeout(() => {
        createFirework(window.innerWidth/4, window.innerHeight/3);
        createFirework(window.innerWidth/1.5, window.innerHeight/4);
    }, 1000);
};