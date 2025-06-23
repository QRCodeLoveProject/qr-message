// 🚀 CAMBIA SOLO QUESTA RIGA PER AGGIORNARE IL MESSAGGIO! 👇
const currentMessage = "Ciao bella! 💕 Spero tu stia bene oggi. Questo è il nostro piccolo angolo segreto dove possiamo scambiarci messaggi tramite QR code! Come ti senti? 😊";

// 📱 INSERISCI QUI IL TUO NUMERO WHATSAPP (con prefisso internazionale, senza +)
const whatsappNumber = "393405484345"; // Esempio: 393123456789 per Italia

// ⚠️ NON MODIFICARE NULLA SOTTO QUESTA RIGA! ⚠️
// ================================================

// Funzione per inviare messaggio su WhatsApp
function sendWhatsApp() {
  const message = document.getElementById('responseText').value;
  if (message.trim() === '') {
    alert('Scrivi un messaggio prima di inviare! 💭');
    return;
  }
  
  const whatsappText = encodeURIComponent(`💕 Risposta al messaggio QR:\n\n${message}`);
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
  
  window.open(whatsappURL, '_blank');
}

// Funzione per inviare SMS
function sendSMS() {
  const message = document.getElementById('responseText').value;
  if (message.trim() === '') {
    alert('Scrivi un messaggio prima di inviare! 💭');
    return;
  }
  
  const smsText = encodeURIComponent(`💕 Risposta QR: ${message}`);
  const smsURL = `sms:${whatsappNumber}?body=${smsText}`;
  
  window.location.href = smsURL;
}

// Timestamp functionality
window.addEventListener("DOMContentLoaded", () => {
  // Mostra il messaggio corrente
  const messageContent = document.getElementById("messageContent");
  messageContent.innerHTML = `<p>${currentMessage}</p>`;
  
  // Aggiorna timestamp
  const timestamp = document.getElementById("timestamp");
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
});

// Funzione per mostrare/nascondere la sezione di risposta
// (Non più necessaria - sempre visibile ora)

// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 15; // Meno particelle per performance mobile

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random horizontal position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 20 + 's';
    
    // Random animation duration
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    
    particlesContainer.appendChild(particle);
  }
}

// Add smooth hover effects to form elements
document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('textarea');
  const buttons = document.querySelectorAll('button');

  if (textarea) {
    // Textarea focus effects
    textarea.addEventListener('focus', () => {
      textarea.style.transform = 'scale(1.02)';
    });

    textarea.addEventListener('blur', () => {
      textarea.style.transform = 'scale(1)';
    });
  }

  // Add click ripple effect to buttons
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Skip ripple for toggle button
      if (this.classList.contains('toggle-response')) return;
      
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
});

// Initialize particles when page loads
createParticles();

// Add subtle parallax effect on mouse move (solo desktop)
if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    const container = document.querySelector('.container');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
    
    container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-5px)`;
  });

  // Reset transform when mouse leaves
  document.addEventListener('mouseleave', () => {
    const container = document.querySelector('.container');
    container.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0)';
  });
}

// Auto-refresh della pagina ogni 30 secondi per controllare aggiornamenti
// (opzionale - rimuovi se non vuoi l'auto-refresh)
// setInterval(() => {
//   window.location.reload();
// }, 30000);

// Console log for debugging
console.log("💕 Sistema di messaggistica QR caricato!");
console.log("📱 Per aggiornare il messaggio, modifica solo la variabile 'currentMessage' all'inizio del file!");
// Console log for debugging
console.log("💕 Sistema di messaggistica QR caricato!");
console.log("📱 Per aggiornare il messaggio, modifica solo la variabile 'currentMessage' all'inizio del file!");
