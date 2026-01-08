// Add this at the beginning of your script
document.addEventListener('DOMContentLoaded', function() {
    // All your existing code should be wrapped inside this
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translate(5px, 5px)' 
                : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translate(7px, -7px)' 
                : 'none';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navToggle.classList.contains('active') && 
                !navToggle.contains(e.target) && 
                !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Product Filtering - FIXED VERSION
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter category
                const filterValue = button.getAttribute('data-filter');
                
                // Filter products with smooth animation
                productCards.forEach((card, index) => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    // Show all cards including custom order for 'all' filter
                    if (filterValue === 'all') {
                        setTimeout(() => {
                            card.style.display = 'flex';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 10);
                        }, index * 50);
                    } 
                    // For specific categories, hide custom order card
                    else if (cardCategory === filterValue) {
                        setTimeout(() => {
                            card.style.display = 'flex';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 10);
                        }, index * 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Smooth Scroll for Anchor Links - FIXED
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar Scroll Effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                navbar.style.background = 'white';
                navbar.style.backdropFilter = 'none';
            }
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .product-card:not(.custom-order-card), .value-card, .contact-method, .page-header');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // WhatsApp Float Button Animation
    const whatsappFloat = document.querySelector('.whatsapp-float');

    if (whatsappFloat) {
        // Pulse animation
        let pulseCount = 0;
        const maxPulses = 3;
        
        const startPulse = () => {
            if (pulseCount < maxPulses) {
                whatsappFloat.style.animation = 'pulse 1.5s ease';
                pulseCount++;
                
                whatsappFloat.addEventListener('animationend', function handler() {
                    whatsappFloat.removeEventListener('animationend', handler);
                    setTimeout(startPulse, 2000);
                });
            } else {
                whatsappFloat.style.animation = '';
            }
        };
        
        // Start pulse after page load
        setTimeout(startPulse, 3000);

        // Add hover effect
        whatsappFloat.addEventListener('mouseenter', () => {
            whatsappFloat.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        whatsappFloat.addEventListener('mouseleave', () => {
            whatsappFloat.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Add pulse animation to CSS dynamically
    if (!document.querySelector('#pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
            @keyframes pulse {
                0% {
                    transform: scale(1);
                    box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
                }
                50% {
                    transform: scale(1.1);
                    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6);
                }
                100% {
                    transform: scale(1);
                    box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
                }
            }
            
            .animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Page Load Animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Remove preloader if exists
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    });

    // Product Card Hover Effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });

    // Form Submission Handling (if you have forms)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const message = formData.get('message');
            
            // Open WhatsApp with form data
            const whatsappUrl = `https://wa.me/233540546050?text=Hello,%20my%20name%20is%20${encodeURIComponent(name)}.%20${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Dynamic Year Update for Footer
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Lazy Loading for Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Console Welcome Message
    console.log('%c🛒 Pick Mix Mini Mart', 'color: #2d7a4d; font-size: 20px; font-weight: bold;');
    console.log('%cYour trusted local retail store in Amedzofe, Ghana', 'color: #666; font-size: 14px;');
    console.log('%cWebsite developed with ❤️ for the community', 'color: #f59e0b; font-size: 12px;');
    console.log('%cNeed help? Call/WhatsApp: +233 54 054 6050', 'color: #25D366; font-size: 12px;');
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    console.error('In file:', e.filename);
    console.error('Line number:', e.lineno);
});

// Handle offline/online status
window.addEventListener('offline', () => {
    const offlineMessage = document.createElement('div');
    offlineMessage.textContent = 'You are currently offline. Some features may not work.';
    offlineMessage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ff6b6b;
        color: white;
        text-align: center;
        padding: 10px;
        z-index: 9999;
    `;
    document.body.appendChild(offlineMessage);
    
    setTimeout(() => {
        offlineMessage.remove();
    }, 5000);
});

window.addEventListener('online', () => {
    const onlineMessage = document.createElement('div');
    onlineMessage.textContent = 'You are back online!';
    onlineMessage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #25D366;
        color: white;
        text-align: center;
        padding: 10px;
        z-index: 9999;
    `;
    document.body.appendChild(onlineMessage);
    
    setTimeout(() => {
        onlineMessage.remove();
    }, 3000);
});