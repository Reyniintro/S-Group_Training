const headerNav = document.querySelector('.cl-header-nav');
window.addEventListener('scroll', () => {
    headerNav.classList.toggle('cl-nav-scrolled', window.scrollY > 50);
});

document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', e.clientX - window.innerWidth / 2);
    document.documentElement.style.setProperty('--mouse-y', e.clientY - window.innerHeight / 2);
});

const typingTextElement = document.getElementById('cl-typing-text');
const words = ["Creative Minds", "Front-End Dev", "Problem Solver", "Algorithm Enthusiast"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    if (!typingTextElement) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 120;
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }
    setTimeout(typeEffect, typeSpeed);
}

const cardsContainer = document.getElementById("cl-cards-container");
if (cardsContainer) {
    cardsContainer.onmousemove = e => {
        for (const card of document.getElementsByClassName("cl-card")) {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loader = document.getElementById('cl-loader');
        if (loader) loader.classList.add('cl-slide-up');
    }, 1500);

    setTimeout(typeEffect, 1000);

    const track = document.getElementById('cl-track'),
          progressBar = document.getElementById('cl-progress'),
          prevBtn = document.querySelector('.cl-prev-btn'),
          nextBtn = document.querySelector('.cl-next-btn'),
          cards = document.querySelectorAll('.cl-work-card'),
          images = document.querySelectorAll('.cl-work-img');

    if (track && progressBar) {
        const updateScrollEffects = () => {
            const scrollPx = track.scrollLeft, 
                  scrollMax = track.scrollWidth - track.clientWidth,
                  thumbWidth = (track.clientWidth / track.scrollWidth) * 100,
                  scrollPercent = scrollMax > 0 ? (scrollPx / scrollMax) : 0;
            
            progressBar.style.width = `${thumbWidth}%`;
            progressBar.style.left = `${scrollPercent * (100 - thumbWidth)}%`;

            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const offset = ((rect.left + rect.width / 2) - window.innerWidth / 2) / (window.innerWidth / 2); 
                if (images[index]) images[index].style.objectPosition = `${50 + (offset * 75)}% 50%`;
            });
        };

        track.addEventListener('scroll', () => window.requestAnimationFrame(updateScrollEffects));
        window.addEventListener('resize', updateScrollEffects);

        const scrollTrack = (direction) => {
            const cardWidth = track.querySelector('.cl-work-card').offsetWidth;
            const gap = parseInt(window.getComputedStyle(track).gap) || 0;
            track.scrollBy({ left: direction * (cardWidth + gap), behavior: 'smooth' });
        };

        if (prevBtn) prevBtn.addEventListener('click', () => scrollTrack(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => scrollTrack(1));
        setTimeout(updateScrollEffects, 100);
    }

    const contactForm = document.getElementById('cl-contact-form'),
          messageInput = document.getElementById('message'),
          charNum = document.getElementById('cl-char-num');

    if (messageInput && charNum) {
        messageInput.addEventListener('input', () => charNum.textContent = messageInput.value.length);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            contactForm.querySelectorAll('input, textarea').forEach(input => {
                const group = input.closest('.cl-form-group');
                const errorSpan = group.querySelector('.cl-error-msg');
                if (!errorSpan) return;

                if (input.hasAttribute('required') && !input.value.trim()) {
                    group.classList.add('has-error');
                    let fieldName = input.name ? input.name.charAt(0).toUpperCase() + input.value.slice(1) : 'Field';
                    if (input.id === 'name') fieldName = 'Name';
                    if (input.id === 'email') fieldName = 'Email';
                    errorSpan.innerHTML = `🚫 ${fieldName} cannot be empty`;
                    isValid = false;
                } else if (input.type === 'email' && input.value.trim() && !/\S+@\S+\.\S+/.test(input.value)) {
                    group.classList.add('has-error');
                    errorSpan.innerHTML = '🚫 Invalid email';
                    isValid = false;
                } else {
                    group.classList.remove('has-error');
                    errorSpan.textContent = '';
                }
            });

            if (isValid) {
                alert('Cảm ơn bạn! Tin nhắn đã được gửi thành công.');
                contactForm.reset();
                if (charNum) charNum.textContent = '0';
            }
        });
    }

    const canvas = document.getElementById('cl-matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d'),
              chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()',
              fontSize = 14;
        let drops = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.getElementById('source-code').offsetHeight;

            const columns = Math.floor(canvas.width / fontSize);
            const tempDrops = [];
            for (let x = 0; x < columns; x++) {
                tempDrops[x] = drops[x] || 1;
            }
            drops = tempDrops;
        };
        
        window.addEventListener('resize', resizeCanvas);
     
        window.addEventListener('load', resizeCanvas); 
        
        resizeCanvas();

        setInterval(() => {
            ctx.fillStyle = 'rgba(16, 15, 27, 0.1)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#4c1d95'; 
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                ctx.fillText(chars.charAt(Math.floor(Math.random() * chars.length)), i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }, 50);
    }

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('cl-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.cl-scroll-reveal').forEach(element => {
        scrollObserver.observe(element);
    });
});