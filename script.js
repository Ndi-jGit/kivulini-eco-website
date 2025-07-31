// Kivulini Eco Park Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced mobile menu toggle with overflow prevention
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');
            
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (!isActive) {
                body.classList.add('nav-open');
                body.style.overflow = 'hidden';
            } else {
                body.classList.remove('nav-open');
                body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link, .cta-button');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('nav-open');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('nav-open');
                body.style.overflow = '';
            }
        });

        // Close menu on window resize to prevent issues
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('nav-open');
                body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced header background on scroll with blur effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY > 50;
            if (scrolled) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(15px)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Hero scroll arrow functionality
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const nextSection = document.querySelector('.features');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

 

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .accommodation-card, .about-text, .about-image');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add to favorites functionality (localStorage)
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.dataset.itemId;
            let favorites = JSON.parse(localStorage.getItem('kivulini-favorites') || '[]');
            
            if (favorites.includes(itemId)) {
                favorites = favorites.filter(id => id !== itemId);
                this.classList.remove('active');
                this.innerHTML = '<i class="far fa-heart"></i>';
            } else {
                favorites.push(itemId);
                this.classList.add('active');
                this.innerHTML = '<i class="fas fa-heart"></i>';
            }
            
            localStorage.setItem('kivulini-favorites', JSON.stringify(favorites));
        });
    });

    // Load favorites on page load
    const favorites = JSON.parse(localStorage.getItem('kivulini-favorites') || '[]');
    favoriteButtons.forEach(btn => {
        if (favorites.includes(btn.dataset.itemId)) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        }
    });

    // Booking calendar functionality (basic implementation)
    const checkInDate = document.getElementById('check-in');
    const checkOutDate = document.getElementById('check-out');
    
    if (checkInDate && checkOutDate) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        checkInDate.min = today;
        checkOutDate.min = today;
        
        checkInDate.addEventListener('change', function() {
            checkOutDate.min = this.value;
            if (checkOutDate.value && checkOutDate.value <= this.value) {
                checkOutDate.value = '';
            }
        });
    }

    // Gallery modal functionality
    const galleryImages = document.querySelectorAll('.gallery-image');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.modal-close');

    if (modal && modalImg) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
                modalImg.alt = this.alt;
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }
            
            // Simple search implementation (in a real app, this would query a database)
            const searchableContent = [
                { title: 'Deluxe Eco Cottage', url: 'accommodations.html', type: 'Accommodation' },
                { title: 'Farm-to-Table Dining', url: 'experiences.html', type: 'Experience' },
                { title: 'Wellness Retreats', url: 'experiences.html', type: 'Experience' },
                { title: 'Wedding Events', url: 'events.html', type: 'Event' },
                { title: 'Forest Walks', url: 'experiences.html', type: 'Experience' }
            ];
            
            const results = searchableContent.filter(item => 
                item.title.toLowerCase().includes(query)
            );
            
            if (results.length > 0) {
                searchResults.innerHTML = results.map(result => 
                    `<div class="search-result-item">
                        <a href="${result.url}">
                            <span class="result-title">${result.title}</span>
                            <span class="result-type">${result.type}</span>
                        </a>
                    </div>`
                ).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div class="no-results">No results found</div>';
                searchResults.style.display = 'block';
            }
        });
        
        // Hide search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

   // Newsletter subscription
    //const newsletterForm = document.getElementById('newsletter-form');
    //if (newsletterForm) {
        //newsletterForm.addEventListener('submit', function(e) {
          //  e.preventDefault();
           // const email = this.querySelector('input[type="email"]').value;
            
           // if (email) {
             //   // In a real implementation, you'd send this to your email service
             //   alert('Thank you for subscribing to our newsletter!');
              //  this.reset();
           // }
        //});
   // }//

    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-green);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Fade-up animation for .fade-up elements (About page)
    const fadeEls = document.querySelectorAll('.fade-up');
    if (fadeEls.length > 0) {
        const fadeObserver = new window.IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        fadeEls.forEach(el => fadeObserver.observe(el));
    }

    // Testimonial two-column slider (About page)
    const testimonialSlider = document.querySelector('.testimonial-image-slider');
    const testimonialImages = document.querySelectorAll('.testimonial-image');
    const testimonialTexts = document.querySelectorAll('.testimonial-text');
    const leftArrow = document.querySelector('.testimonial-arrow.left');
    const rightArrow = document.querySelector('.testimonial-arrow.right');
    let testimonialIndex = 0;
    showTestimonial(testimonialIndex); // Show the first testimonial immediately


    function showTestimonial(idx) {
      testimonialImages.forEach((img, i) => {
        img.classList.toggle('active', i === idx);
      });
      testimonialTexts.forEach((txt, i) => {
        txt.classList.toggle('active', i === idx);
      });
    }

    if (testimonialSlider && leftArrow && rightArrow) {
      leftArrow.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex - 1 + testimonialImages.length) % testimonialImages.length;
        showTestimonial(testimonialIndex);
      });
      rightArrow.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex + 1) % testimonialImages.length;
        showTestimonial(testimonialIndex);
      });
      // Optional: Auto-scroll
      setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonialImages.length;
        showTestimonial(testimonialIndex);
      }, 7000);
    }
});

// Initialize AOS (Animate On Scroll) if library is loaded
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 50
    });
}
