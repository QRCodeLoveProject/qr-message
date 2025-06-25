// 🚀 CAMBIA SOLO QUESTA RIGA PER AGGIORNARE IL MESSAGGIO! 👇
const currentMessage = "beh, a me ancora non mi conosci quindi potrei dimostrarti che ti sbagli! Io arrivato a casa ora, ed in una giornata come questa, cosa fai? sport? palestra? hobby?";

// Inizializzazione quando la pagina è caricata
document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Inizializzazione sistema QR...");
    

    // Mostra il messaggio
    displayCurrentMessage();
    
    // Aggiorna timestamp
    updateTimestamp();
    
    // Crea particelle
    createFloatingParticles();
    
    // Effetti visivi
    setupVisualEffects();
    
    // Parallax desktop
    if (window.innerWidth > 768) {
        setupParallaxEffect();
    }
    
    console.log("✅ Sistema QR caricato!");
});

// Mostra il messaggio corrente
function displayCurrentMessage() {
    const messageContent = document.getElementById("messageContent");
    if (messageContent) {
        messageContent.innerHTML = `<p>${currentMessage}</p>`;
        console.log("💬 Messaggio caricato");
    }
}

// Aggiorna timestamp
function updateTimestamp() {
    const timestamp = document.getElementById("timestamp");
    if (timestamp) {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const formattedDate = now.toLocaleDateString('it-IT', options);
        timestamp.textContent = `Ultimo aggiornamento: ${formattedDate}`;
    }
}

// Crea particelle
function createFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    particlesContainer.innerHTML = '';

    const particleCount = window.innerWidth > 768 ? 20 : 10;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Effetti visivi
function setupVisualEffects() {
    const textarea = document.querySelector('textarea');
    const buttons = document.querySelectorAll('button');

    // Effetti textarea
    if (textarea) {
        textarea.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });

        textarea.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Effetti pulsanti
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.disabled) return;
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Parallax
function setupParallaxEffect() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    document.addEventListener('mousemove', function(e) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-5px)`;
    });

    document.addEventListener('mouseleave', function() {
        container.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0)';
    });
}

console.log("💕 Sistema QR con Formspree caricato!");
