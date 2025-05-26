document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to VerbaSphere ✨");
    
    // Initialize footer features
    initializeFooterFeatures();
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        // Get the first section after hero
        const firstSection = document.querySelector('main .section');
        if (firstSection) {
          firstSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  
    // CTA action
    const ctaBtn = document.querySelector(".cta-button");
    ctaBtn?.addEventListener("click", () => {
      console.log("CTA button clicked!");
    });
  
    // Set current year in footer
    document.getElementById("year").textContent = new Date().getFullYear();
  
    // Back to Top Button Functionality
    const backToTopButton = document.getElementById("backToTop");
  
    window.onscroll = function () {
      scrollFunction();
    };
  
    function scrollFunction() {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        if (backToTopButton.style.display !== "block") { // Check to avoid redundant style changes
            backToTopButton.style.display = "block";
            // Trigger reflow to ensure transition plays
            void backToTopButton.offsetWidth;
            backToTopButton.style.opacity = "1";
            backToTopButton.style.transform = "scale(1) translateY(0)";
        }
      } else {
        if (backToTopButton.style.opacity === "1") { // Check to avoid redundant style changes
            backToTopButton.style.opacity = "0";
            backToTopButton.style.transform = "scale(0.9) translateY(10px)";
            // Hide the button after the transition
            setTimeout(() => {
                // Check again in case user scrolled back up quickly and then down again
                if (document.body.scrollTop < 100 && document.documentElement.scrollTop < 100) {
                    backToTopButton.style.display = "none";
                }
            }, 300); // Match the CSS transition duration
        }
      }
    }
  
    backToTopButton.onclick = function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scroll to top
      });
    };
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('header nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
  
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
  
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
  
    // Intersection Observer for reveal-on-scroll animations
    const sections = document.querySelectorAll('.section');
  
    const revealSection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Stop observing once the element is visible
        }
      });
    };
  
    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null, // relative to the viewport
      threshold: 0.15, // trigger when 15% of the section is visible
      rootMargin: '0px 0px -50px 0px' // Start animation a bit sooner (50px from bottom)
    });
  
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  });
  
  // Footer functionality
  function initializeFooterFeatures() {
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            
            // Simulate newsletter subscription
            newsletterMessage.textContent = 'Subscribing...';
            newsletterMessage.className = 'newsletter-message';
            
            // Simulate API call
            setTimeout(() => {
                if (email && email.includes('@')) {
                    newsletterMessage.textContent = 'Thank you for subscribing! 🎉';
                    newsletterMessage.className = 'newsletter-message success';
                    newsletterForm.reset();
                } else {
                    newsletterMessage.textContent = 'Please enter a valid email address';
                    newsletterMessage.className = 'newsletter-message error';
                }
            }, 1000);
        });
    }

    // Last updated timestamp
    const lastUpdateSpan = document.getElementById('last-update');
    if (lastUpdateSpan) {
        function updateTimestamp() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            lastUpdateSpan.textContent = timeString;
        }
        
        // Update immediately and then every minute
        updateTimestamp();
        setInterval(updateTimestamp, 60000);
    }

    // Social links animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.animation = 'none'; // Reset animation
            void link.offsetWidth; // Trigger reflow
            link.style.animation = 'fadeIn 0.3s ease-out';
        });
    });
}
