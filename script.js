// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    form.reset();
});

// Star animation code
function createStars() {
    const container = document.getElementById('stars-container');
    console.log('Creating stars in container:', container);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const starCount = 200;

    // Make stars more visible
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * screenWidth;
        const y = Math.random() * screenHeight;
        const size = Math.random() * 2 + 1;
        
        star.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            opacity: ${Math.random() * 0.7 + 0.3};
            transition: transform 10s linear;
            box-shadow: 0 0 ${size * 2}px ${size}px rgba(255, 255, 255, 0.8);
        `;
        
        container.appendChild(star);
        console.log('Star created:', star);
        moveStarRandomly(star, screenWidth, screenHeight);
    }
}

function moveStarRandomly(star, maxWidth, maxHeight) {
    function move() {
        // Random movement between -100 and 100 pixels
        const xMove = (Math.random() - 0.5) * 200;
        const yMove = (Math.random() - 0.5) * 200;
        
        // Get current position
        const currentX = parseFloat(star.style.left);
        const currentY = parseFloat(star.style.top);
        
        // Calculate new position
        let newX = currentX + xMove;
        let newY = currentY + yMove;
        
        // Keep stars within bounds
        newX = Math.max(0, Math.min(maxWidth, newX));
        newY = Math.max(0, Math.min(maxHeight, newY));
        
        // Apply new position
        star.style.transform = `translate(${xMove}px, ${yMove}px)`;
        
        // Reset position after transition
        setTimeout(() => {
            star.style.transition = 'none';
            star.style.transform = 'none';
            star.style.left = `${newX}px`;
            star.style.top = `${newY}px`;
            star.style.transition = 'transform 10s linear';
            
            // Move again
            requestAnimationFrame(() => move());
        }, 10000);
    }
    
    move();
}

// Initialize stars when the page loads
window.addEventListener('load', createStars);

// Recreate stars when window is resized
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const container = document.getElementById('stars-container');
        container.innerHTML = '';
        createStars();
    }, 200);
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get our elements
    const introOverlay = document.getElementById('introOverlay');
    const mainContent = document.getElementById('mainContent');
    
    // Check if elements exist before adding listeners
    if (introOverlay && mainContent) {
        introOverlay.addEventListener('click', function() {
            console.log('Overlay clicked'); // Debug log
            
            // Fade out overlay
            introOverlay.style.opacity = '0';
            introOverlay.style.transition = 'opacity 0.5s ease';
            
            // Show main content
            setTimeout(() => {
                introOverlay.style.display = 'none';
                mainContent.classList.remove('hidden');
                mainContent.classList.add('visible');
                console.log('Main content should be visible'); // Debug log
            }, 500);
        });
    } else {
        console.error('Required elements not found!'); // Debug log
    }
}); 