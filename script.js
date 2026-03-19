// Fireworks
const canvas=document.getElementById('fireworksCanvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particles=[];

class Particle{
    constructor(x,y,color){
        this.x=x; this.y=y; this.color=color;
        this.velocity={x:(Math.random()-0.5)*8,y:(Math.random()-0.5)*8};
        this.alpha=1;
    }
    draw(){ ctx.globalAlpha=this.alpha; ctx.beginPath(); ctx.arc(this.x,this.y,2,0,Math.PI*2); ctx.fillStyle=this.color; ctx.fill(); }
    update(){ this.velocity.y+=0.05; this.x+=this.velocity.x; this.y+=this.velocity.y; this.alpha-=0.01; }
}

function createFirework(x,y){ 
    const colors=['#d4af37','#ffffff','#ff0000','#00ff00','#0000ff'];
    const color=colors[Math.floor(Math.random()*colors.length)];
    for(let i=0;i<50;i++) particles.push(new Particle(x,y,color));
}

function animate(){ 
    ctx.fillStyle='rgba(0,0,0,0.1)'; ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach((p,index)=>{ if(p.alpha>0){ p.update(); p.draw(); } else particles.splice(index,1); });
    requestAnimationFrame(animate); 
}

// Login
function loginUser(){
    const name=document.getElementById('userName').value.trim();
    const md=document.getElementById('userMonthDay').value.trim();
    if(!name || !md){ alert("Please enter name & month-day"); return; }

    document.getElementById('loginDashboard').style.display="none";
    document.getElementById('musicControl').style.display="block";
    document.getElementById('celebrationDashboard').style.display="flex";

    document.getElementById('personalGreeting').innerText=`Eid Mubarak, ${name}!`;
    document.getElementById('wishMessage').innerText="May Allah bless you with happiness, health, and endless celebrations this Eid!";
}

// Music
function toggleMusic(){ 
    const music=document.getElementById('eidMusic');
    const btn=document.getElementById('musicBtn');
    if(music.paused){ music.play(); btn.innerText="⏸ Pause Music"; }
    else { music.pause(); btn.innerText="🎵 Play Soft Nasheed"; }
}

// Celebration Buttons
function triggerFireworks(){ createFirework(canvas.width/2,canvas.height/2); }
function triggerFlowers(){ for(let i=0;i<50;i++) particles.push(new Particle(Math.random()*canvas.width,Math.random()*canvas.height,'#ff69b4')); }
function triggerStars(){ for(let i=0;i<100;i++) particles.push(new Particle(Math.random()*canvas.width,Math.random()*canvas.height,'#ffff00')); }

window.addEventListener('mousedown',(e)=>{ createFirework(e.clientX,e.clientY); });
window.onload=()=>{ animate(); };
