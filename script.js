
let slideIndex = 1;
let slideInterval;


document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    startSlideShow();
    initSmoothScrolling();
    initScrollAnimations();
    initMobileMenu();
});


function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    
    
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = 'block';
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}


function nextSlide() {
    slideIndex++;
    showSlides(slideIndex);
}


function prevSlide() {
    slideIndex--;
    showSlides(slideIndex);
}


function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}


function startSlideShow() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 4000); 
}


function stopSlideShow() {
    clearInterval(slideInterval);
}


function resumeSlideShow() {
    startSlideShow();
}


document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopSlideShow);
        slideshowContainer.addEventListener('mouseleave', resumeSlideShow);
    }
});


function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    
    const animateElements = document.querySelectorAll('.category-card, .product-card, .footer-section');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}


function initMobileMenu() {
    
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
    
    
    if (header && nav) {
        header.querySelector('.container').appendChild(mobileMenuBtn);
        
        
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('mobile-menu-open');
            this.classList.toggle('active');
        });
        
        
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('mobile-menu-open');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const consent = document.getElementById('newsletter-consent').checked;
            
            if (!consent) {
                alert('Please agree to receive marketing communications to subscribe.');
                return;
            }
            
            if (email) {
            
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.innerHTML = '<span class="loading"></span> Subscribing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for subscribing to our newsletter!');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
});


window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(179, 136, 235, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #B388EB 0%, #F7C1D9 100%)';
        header.style.backdropFilter = 'blur(10px)';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .app-btn, .category-card, .product-card');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});


const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #4B0082;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 5px;
        transition: all 0.3s ease;
    }
    
    .mobile-menu-btn:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .mobile-menu-btn.active {
        background: rgba(255, 255, 255, 0.2);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(179, 136, 235, 0.95);
            backdrop-filter: blur(10px);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav.mobile-menu-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-list {
            flex-direction: column;
            padding: 1rem;
        }
        
        .auth-buttons {
            flex-direction: column;
            padding: 0 1rem 1rem;
        }
    }
`;
document.head.appendChild(style);


document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});


let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            
            nextSlide();
        } else {
            
            prevSlide();
        }
    }
}