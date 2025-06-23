// 🚀 CAMBIA SOLO QUESTA RIGA PER AGGIORNARE IL MESSAGGIO! 👇
const currentMessage = "Ciao bella! 💕 Spero tu stia bene oggi. Questo è il nostro piccolo angolo segreto dove possiamo scambiarci messaggi tramite QR code! Come ti senti? 😊";

// 📧 CONFIGURA EMAILJS - INSERISCI LE TUE CHIAVI QUI! 👇
const EMAILJS_PUBLIC_KEY = "TUA_PUBLIC_KEY_QUI";     // Dal dashboard EmailJS Integration > Browser
const EMAILJS_SERVICE_ID = "TUO_SERVICE_ID_QUI";     // Il tuo Service ID (es: gmail_service)
const EMAILJS_TEMPLATE_ID = "TUO_TEMPLATE_ID_QUI";   // Il tuo Template ID (es: template_abc123)

// ⚠️ NON MODIFICARE NULLA SOTTO QUESTA RIGA! ⚠️
// ================================================================

// Variabili globali
let isEmailJSReady = false;
let particles = [];

// Inizializzazione principale quando la pagina è caricata
document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Inizializzazione sistema QR...");
    
    // Aspetta che EmailJS sia caricato
    initializeEmailJS();
    
    // Configura il messaggio principale
    displayCurrentMessage();
    
    // Aggiorna timestamp
    updateTimestamp();
    
    // Configura il form di risposta
    setupEmailForm();
    
    // Crea le particelle animate
    createFloatingParticles();
    
    // Aggiungi tutti gli effetti visivi
    setupVisualEffects();
    
    // Configura effetto parallax (solo desktop)
    if (window.innerWidth > 768) {
        setupParallaxEffect();
    }
    
    // Log di completamento
    console.log("✅ Sistema QR inizializzato completamente!");
});

// Inizializza EmailJS con retry automatico
function initializeEmailJS() {
    let attempts = 0;
    const maxAttempts = 10;
    
    function tryInit() {
        attempts++;
        
        if (typeof emailjs !== 'undefined') {
            try {
                emailjs.init(EMAILJS_PUBLIC_KEY);
                isEmailJSReady = true;
                console.log("📧 EmailJS inizializzato correttamente!");
                
                // Verifica configurazione
                validateEmailJSConfig();
                
            } catch (error) {
                console.error("❌ Errore inizializzazione EmailJS:", error);
                isEmailJSReady = false;
            }
        } else {
            console.log(`⏳ Tentativo ${attempts}/${maxAttempts} - EmailJS non ancora disponibile...`);
            
            if (attempts < maxAttempts) {
                setTimeout(tryInit, 500);
            } else {
                console.error("❌ EmailJS non disponibile dopo 10 tentativi!");
                showEmailJSError();
            }
        }
    }
    
    tryInit();
}

// Valida la configurazione EmailJS
function validateEmailJSConfig() {
    console.log("🔧 Validazione configurazione EmailJS...");
    
    if (EMAILJS_PUBLIC_KEY.includes('TUA_') || 
        EMAILJS_SERVICE_ID.includes('TUO_') || 
        EMAILJS_TEMPLATE_ID.includes('TUO_')) {
        console.warn("⚠️ ATTENZIONE: Devi sostituire le chiavi placeholder con quelle reali!");
        console.log("📋 Configurazione attuale:");
        console.log("   Public Key:", uj_lChx63t_SOIJ5Y);
        console.log("   Service ID:", gmail_service);
        console.log("   Template ID:", gmail_service);
        return false;
    }
    
    console.log("✅ Configurazione EmailJS valida!");
    return true;
}

// Mostra il messaggio corrente nell'interfaccia
function displayCurrentMessage() {
    const messageContent = document.getElementById("messageContent");
    if (messageContent) {
        messageContent.innerHTML = `<p>${currentMessage}</p>`;
        console.log("💬 Messaggio visualizzato:", currentMessage.substring(0, 50) + "...");
    } else {
        console.error("❌ Elemento messageContent non trovato!");
    }
}

// Aggiorna il timestamp
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

// Configura il form di invio email
function setupEmailForm() {
    const form = document.getElementById('contact-form');
    const sendButton = document.getElementById('send-button');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const messageTextarea = document.getElementById('message');

    if (!form) {
        console.error("❌ Form contact-form non trovato!");
        return;
    }

    console.log("📝 Form EmailJS configurato");

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("📤 Tentativo di invio messaggio...");
        
        // Verifica che EmailJS sia pronto
        if (!isEmailJSReady) {
            console.error("❌ EmailJS non è stato inizializzato!");
            showErrorMessage("EmailJS non è pronto. Riprova tra qualche secondo.");
            return;
        }

        // Verifica configurazione
        if (!validateEmailJSConfig()) {
            showErrorMessage("Configurazione EmailJS non valida. Controlla le chiavi.");
            return;
        }

        // Verifica che il messaggio non sia vuoto
        const message = messageTextarea.value.trim();
        if (!message) {
            alert('Scrivi un messaggio prima di inviare! 💭');
            messageTextarea.focus();
            return;
        }

        // Inizia processo di invio
        startSending();

        // Prepara i dati per EmailJS
        const templateParams = {
            message: message,
            current_date: new Date().toLocaleString('it-IT', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            timestamp: Date.now(),
            user_agent: navigator.userAgent,
            page_url: window.location.href
        };

        console.log("📧 Invio email con parametri:", templateParams);

        // Invia email tramite EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('✅ EMAIL INVIATA CON SUCCESSO!', response.status, response.text);
                handleSuccessfulSend();
            })
            .catch(function(error) {
                console.error('❌ ERRORE INVIO EMAIL:', error);
                handleFailedSend(error);
            })
            .finally(function() {
                endSending();
            });
    });

    // Funzioni helper per gestire l'invio
    function startSending() {
        sendButton.disabled = true;
        sendButton.innerHTML = '📤 Invio in corso...';
        sendButton.style.opacity = '0.7';
        hideAllMessages();
        
        // Aggiungi classe per animazione
        sendButton.classList.add('sending');
    }

    function endSending() {
        sendButton.disabled = false;
        sendButton.innerHTML = '💌 Invia risposta anonima';
        sendButton.style.opacity = '1';
        sendButton.classList.remove('sending');
    }

    function handleSuccessfulSend() {
        showSuccessMessage();
        messageTextarea.value = '';
        
        // Effetto confetti (opzionale)
        createConfettiEffect();
    }

    function handleFailedSend(error) {
        let errorMsg = "Si è verificato un errore. Riprova tra qualche secondo.";
        
        if (error && error.text) {
            if (error.text.includes('rate limit')) {
                errorMsg = "Troppi messaggi inviati. Riprova tra qualche minuto.";
            } else if (error.text.includes('network')) {
                errorMsg = "Problema di connessione. Controlla internet e riprova.";
            }
        }
        
        showErrorMessage(errorMsg);
    }

    function showSuccessMessage() {
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.style.animation = 'slideDown 0.5s ease-out';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Nascondi automaticamente dopo 8 secondi
            setTimeout(() => {
                if (successMessage.style.display !== 'none') {
                    successMessage.style.animation = 'fadeOut 0.5s ease-out';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 500);
                }
            }, 8000);
        }
    }

    function showErrorMessage(customMessage = null) {
        if (errorMessage) {
            if (customMessage) {
                const errorText = errorMessage.querySelector('p');
                if (errorText) {
                    errorText.textContent = customMessage;
                }
            }
            
            errorMessage.style.display = 'block';
            errorMessage.style.animation = 'slideDown 0.5s ease-out';
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Nascondi automaticamente dopo 6 secondi
            setTimeout(() => {
                if (errorMessage.style.display !== 'none') {
                    errorMessage.style.animation = 'fadeOut 0.5s ease-out';
                    setTimeout(() => {
                        errorMessage.style.display = 'none';
                    }, 500);
                }
            }, 6000);
        }
    }

    function hideAllMessages() {
        if (successMessage) {
            successMessage.style.display = 'none';
            successMessage.style.animation = '';
        }
        if (errorMessage) {
            errorMessage.style.display = 'none';
            errorMessage.style.animation = '';
        }
    }
}

// Crea particelle animate fluttuanti
function createFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) {
        console.warn("⚠️ Container particelle non trovato");
        return;
    }

    // Pulisci particelle esistenti
    particlesContainer.innerHTML = '';
    particles = [];

    const particleCount = window.innerWidth > 768 ? 25 : 15;
    console.log(`✨ Creazione ${particleCount} particelle...`);

    for (let i = 0; i < particleCount; i++) {
        const particle = createSingleParticle();
        particlesContainer.appendChild(particle);
        particles.push(particle);
    }
}

// Crea una singola particella
function createSingleParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Proprietà casuali
    const size = Math.random() * 4 + 2;
    const opacity = Math.random() * 0.3 + 0.1;
    const hue = Math.random() * 60 + 200; // Blu/viola
    
    // Stili
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.background = `hsla(${hue}, 70%, 80%, ${opacity})`;
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 15 + 20) + 's';
    
    return particle;
}

// Configura tutti gli effetti visivi
function setupVisualEffects() {
    setupHoverEffects();
    setupRippleEffects();
    setupTextareaEffects();
    setupScrollEffects();
    
    console.log("✨ Effetti visivi configurati");
}

// Effetti hover per elementi interattivi
function setupHoverEffects() {
    const container = document.querySelector('.container');
    const buttons = document.querySelectorAll('button');
    
    // Effetto hover container
    if (container) {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Effetti hover pulsanti
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Effetti ripple sui pulsanti
function setupRippleEffects() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.disabled) return;
            createRippleEffect(this, e);
        });
    });
}

// Crea effetto ripple
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Effetti per la textarea
function setupTextareaEffects() {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;
    
    // Focus effects
    textarea.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    textarea.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        this.parentElement.style.transform = 'translateY(0)';
    });
    
    // Typing effect
    textarea.addEventListener('input', function() {
        const length = this.value.length;
        const hue = Math.min(length * 2, 120); // Da rosso a verde
        this.style.boxShadow = `inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 0 2px hsla(${hue}, 70%, 50%, 0.3)`;
    });
}

// Effetti scroll e viewport
function setupScrollEffects() {
    // Intersection Observer per animazioni on-scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Osserva elementi animabili
    const animatedElements = document.querySelectorAll('.fade-in, .container, .response-section');
    animatedElements.forEach(el => observer.observe(el));
}

// Effetto parallax per desktop
function setupParallaxEffect() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    let ticking = false;
    
    function updateParallax(e) {
        if (!ticking) {
            requestAnimationFrame(() => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
                
                container.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-5px)`;
                ticking = false;
            });
            ticking = true;
        }
    }
    
    document.addEventListener('mousemove', updateParallax);
    
    document.addEventListener('mouseleave', () => {
        container.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
}

// Effetto confetti per successo (bonus)
function createConfettiEffect() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    const confettiContainer = document.body;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                animation: confetti-fall 3s linear forwards;
                pointer-events: none;
                z-index: 10000;
            `;
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
    
    // CSS per animazione confetti
    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confetti-fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Mostra errore EmailJS non disponibile
function showEmailJSError() {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(244, 67, 54, 0.9);
        color: white;
        padding: 15px;
        border-radius: 10px;
        z-index: 10000;
        max-width: 300px;
        font-size: 14px;
    `;
    errorDiv.innerHTML = `
        <strong>⚠️ Errore EmailJS</strong><br>
        Il servizio email non è disponibile. Ricarica la pagina.
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 10000);
}

// Funzioni di debug e utility
function debugInfo() {
    console.log("🔧 DEBUG INFO:");
    console.log("- EmailJS Ready:", isEmailJSReady);
    console.log("- Public Key:", EMAILJS_PUBLIC_KEY);
    console.log("- Service ID:", EMAILJS_SERVICE_ID);
    console.log("- Template ID:", EMAILJS_TEMPLATE_ID);
    console.log("- Particles:", particles.length);
    console.log("- Current Message:", currentMessage.substring(0, 50) + "...");
    console.log("- Screen Size:", window.innerWidth + "x" + window.innerHeight);
    console.log("- User Agent:", navigator.userAgent);
}

// Test manuale EmailJS
function testEmailJS() {
    console.log("🧪 Test EmailJS...");
    
    if (!isEmailJSReady) {
        console.error("❌ EmailJS non pronto!");
        return false;
    }
    
    if (!validateEmailJSConfig()) {
        console.error("❌ Configurazione non valida!");
        return false;
    }
    
    console.log("✅ EmailJS pronto per l'uso!");
    return true;
}

// Gestione errori globali
window.addEventListener('error', function(e) {
    console.error('❌ Errore JavaScript globale:', e.error);
    console.error('File:', e.filename);
    console.error('Riga:', e.lineno);
});

// Gestione visibilità pagina
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log("👁️ Pagina di nuovo visibile");
        // Riavvia particelle se necessario
        if (particles.length === 0) {
            createFloatingParticles();
        }
    }
});

// Gestione resize finestra
window.addEventListener('resize', function() {
    // Ricrea particelle con numero appropriato
    setTimeout(createFloatingParticles, 100);
});

// Esposizione funzioni globali per debug
window.qrDebug = {
    info: debugInfo,
    test: testEmailJS,
    particles: () => particles.length,
    config: () => ({
        publicKey: EMAILJS_PUBLIC_KEY,
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID
    })
};

// Log finale di inizializzazione
console.log(`
🎉 SISTEMA QR MESSAGING CARICATO!
📧 200 messaggi gratuiti al mese con EmailJS
🔧 Usa qrDebug.info() per informazioni debug
💡 Usa qrDebug.test() per testare EmailJS
📱 Sistema ottimizzato per mobile e desktop
💕 Pronto per messaggi anonimi!
`);

// Fine del file JavaScript
