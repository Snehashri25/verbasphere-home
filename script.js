// Main initialization
document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to VerbaSphere ✨");
    
    // Initialize all features
    initializeTheme();
    initializeFooterFeatures();
    initializeChat();
    initializeMobileMenu();
    initializeAOS();
    
    // Smooth scroll for all anchor links
    initializeSmoothScroll();
    
    // Initialize header scroll effects
    initializeHeaderScroll();
});

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

// Theme functionality
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle button icon
    updateThemeToggleIcon(savedTheme);
    
    // Add click event to toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Apply new theme with transition
        document.documentElement.classList.add('theme-transition');
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Remove transition class
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
        
        // Save theme preference
        localStorage.setItem('theme', newTheme);
        
        // Update theme toggle button icon
        updateThemeToggleIcon(newTheme);
    });
}

function updateThemeToggleIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const header = document.getElementById('header');

    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        header.classList.toggle('menu-open');

        // Animate hamburger menu
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mainNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            header.classList.remove('menu-open');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
}

// Header Scroll Effect
function initializeHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
            header.classList.add('scrolled');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
            header.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Chat Widget Functionality
function initializeChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    let isTyping = false;
    let typingTimeout;

    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', handleChatInput);
    chatInput.addEventListener('input', handleTyping);

    function toggleChat() {
        const isVisible = chatWidget.style.display === 'block';
        chatWidget.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            chatInput.focus();
            if (chatMessages.children.length === 0) {
                addBotMessage("👋 Welcome to VerbaSphere! How can I help you today?");
            }
        }
    }

    function handleChatInput(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    function handleTyping() {
        if (!isTyping) {
            isTyping = true;
            addTypingIndicator();
        }
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            isTyping = false;
            removeTypingIndicator();
        }, 1000);
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatInput.value = '';
            simulateBotResponse();
        }
    }

    function addUserMessage(text) {
        const messageDiv = createMessageElement('user-message', text);
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const messageDiv = createMessageElement('bot-message', text);
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function createMessageElement(className, text) {
        const div = document.createElement('div');
        div.className = `message ${className}`;
        div.textContent = text;
        return div;
    }

    function addTypingIndicator() {
        const existing = document.querySelector('.typing-indicator');
        if (!existing) {
            const indicator = document.createElement('div');
            indicator.className = 'message bot-message typing-indicator';
            indicator.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(indicator);
            scrollToBottom();
        }
    }

    function removeTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function simulateBotResponse() {
        addTypingIndicator();
        
        setTimeout(() => {
            removeTypingIndicator();
            const responses = [
                "I understand your query. Let me help you with that!",
                "Thanks for reaching out! I'm here to assist you.",
                "Great question! Here's what you need to know...",
                "I'll be happy to help you with that.",
                "Let me check that for you..."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addBotMessage(randomResponse);
        }, 1500);
    }
}

// Smooth Scroll Functionality
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const mainNav = document.getElementById('mainNav');
                if (mainNav.classList.contains('active')) {
                    document.getElementById('mobileMenuBtn').click();
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Footer Features
function initializeFooterFeatures() {
    initializeNewsletter();
    initializeLastUpdate();
    initializeSocialLinks();
    updateCopyrightYear();
}

function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            
            newsletterMessage.textContent = 'Subscribing...';
            newsletterMessage.className = 'newsletter-message';
            
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
}

function initializeLastUpdate() {
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
        
        updateTimestamp();
        setInterval(updateTimestamp, 60000);
    }
}

function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.animation = 'none';
            void link.offsetWidth;
            link.style.animation = 'fadeIn 0.3s ease-out';
        });
    });
}

function updateCopyrightYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Back to Top Button Functionality
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize everything on load
initializeBackToTop();