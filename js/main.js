/* ============================================
   AURA Finance - JavaScript Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initAnimations();
    initCounters();
    initWaitlistForm();
    initSmoothScroll();
    initMobileMenu();
    initParallax();
    initGenomeAnimation();
});

/* ============================================
   Navigation
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

/* ============================================
   Mobile Menu
   ============================================ */
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!toggle) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

/* ============================================
   Scroll Animations
   ============================================ */
function initAnimations() {
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll(
        '.feature-card, .problem-card, .step, .testimonial-card, .pricing-card, .trait, .section-header'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animated elements
    animatedElements.forEach(el => observer.observe(el));
}

/* ============================================
   Counter Animation
   ============================================ */
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = target / steps;
    let current = 0;
    
    const isDecimal = target % 1 !== 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepDuration);
}

/* ============================================
   Waitlist Form
   ============================================ */
function initWaitlistForm() {
    const form = document.getElementById('waitlistForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const input = form.querySelector('input[type="email"]');
        const button = form.querySelector('button');
        const email = input.value;
        
        // Validate email
        if (!isValidEmail(email)) {
            shakeElement(input);
            return;
        }
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success state
            button.innerHTML = '<i class="fas fa-check"></i> You\'re In!';
            button.style.background = 'var(--success)';
            input.value = '';
            
            // Show success message
            showNotification('Welcome to the future! 🚀', 'Check your email for next steps.');
            
            // Reset after delay
            setTimeout(() => {
                button.innerHTML = '<span>Join Waitlist</span><i class="fas fa-arrow-right"></i>';
                button.style.background = '';
                button.disabled = false;
            }, 3000);
        }, 1500);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), 500);
}

function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close
    setTimeout(() => closeNotification(notification), 5000);
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
}

/* ============================================
   Smooth Scroll
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;
            
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ============================================
   Parallax Effects
   ============================================ */
function initParallax() {
    const orbs = document.querySelectorAll('.orb');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

/* ============================================
   Genome Animation Enhancements
   ============================================ */
function initGenomeAnimation() {
    const genomeCore = document.querySelector('.genome-core');
    
    if (!genomeCore) return;
    
    // Add glow pulse effect on hover
    genomeCore.addEventListener('mouseenter', () => {
        genomeCore.style.boxShadow = '0 0 100px rgba(99, 102, 241, 0.8)';
    });
    
    genomeCore.addEventListener('mouseleave', () => {
        genomeCore.style.boxShadow = '';
    });
    
    // Add random node highlights
    const nodes = document.querySelectorAll('.genome-ring .node');
    
    setInterval(() => {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        randomNode.classList.add('highlight');
        
        setTimeout(() => {
            randomNode.classList.remove('highlight');
        }, 1000);
    }, 2000);
}

/* ============================================
   Feature Card Hover Effects
   ============================================ */
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

/* ============================================
   Typing Animation for Hero
   ============================================ */
function initTypingAnimation() {
    const words = ['Alive', 'Adaptive', 'Intelligent', 'Evolving'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.gradient-text');
    
    if (!typingElement) return;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Uncomment to enable typing animation
    // type();
}

/* ============================================
   Intersection Observer for Trait Meters
   ============================================ */
function initTraitMeters() {
    const meters = document.querySelectorAll('.meter-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const meter = entry.target;
                const width = meter.style.width;
                meter.style.width = '0';
                
                setTimeout(() => {
                    meter.style.transition = 'width 1.5s ease-out';
                    meter.style.width = width;
                }, 100);
                
                observer.unobserve(meter);
            }
        });
    }, { threshold: 0.5 });
    
    meters.forEach(meter => observer.observe(meter));
}

// Initialize trait meters
document.addEventListener('DOMContentLoaded', initTraitMeters);

/* ============================================
   Pricing Card Hover
   ============================================ */
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        document.querySelectorAll('.pricing-card').forEach(c => {
            if (c !== card && !c.classList.contains('featured')) {
                c.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        document.querySelectorAll('.pricing-card').forEach(c => {
            c.style.opacity = '';
        });
    });
});

/* ============================================
   Add Dynamic Styles
   ============================================ */
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* Notification Styles */
    .notification {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--dark-card);
        border: 1px solid var(--primary);
        border-radius: var(--border-radius);
        padding: 20px 24px;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: var(--shadow-glow);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 9999;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification h4 {
        color: var(--white);
        margin-bottom: 4px;
    }
    
    .notification p {
        color: var(--gray-400);
        font-size: 0.9rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--gray-500);
        cursor: pointer;
        padding: 4px;
    }
    
    .notification-close:hover {
        color: var(--white);
    }
    
    /* Shake Animation */
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .shake {
        animation: shake 0.5s ease;
        border-color: var(--error) !important;
    }
    
    /* Node Highlight */
    .genome-ring .node.highlight {
        background: var(--primary);
        color: var(--white);
        transform: rotate(calc(360deg / var(--total) * var(--i))) translateX(150px) rotate(calc(-360deg / var(--total) * var(--i))) translate(-50%, -50%) scale(1.2);
        transition: all 0.3s ease;
    }
    
    /* Mobile Menu Styles */
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: var(--dark);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 32px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.active {
            display: flex;
            opacity: 1;
            visibility: visible;
        }
        
        .nav-links a {
            font-size: 1.5rem;
        }
        
        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        body.menu-open {
            overflow: hidden;
        }
    }
    
    /* Feature Card Glow Effect */
    .feature-card::before {
        content: '';
        position: absolute;
        top: var(--mouse-y, 50%);
        left: var(--mouse-x, 50%);
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .feature-card:hover::before {
        opacity: 1;
    }
`;

document.head.appendChild(dynamicStyles);

/* ============================================
   Console Easter Egg
   ============================================ */
console.log(`
%c🧬 AURA Finance %c
The world's first living financial organism.

Join us: https://aurafinance.ai

%cBuilding the future of personal finance.
`, 
'color: #6366f1; font-size: 24px; font-weight: bold;',
'',
'color: #06b6d4; font-style: italic;'
);
