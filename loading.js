document.addEventListener('DOMContentLoaded', function() {
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const iconItems = document.querySelectorAll('.icon-item');
    
    let progress = 0;
    
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        // Random progress increment for realistic loading effect
        const increment = Math.random() * 15 + 5;
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Add completion effect
            document.body.style.background = 'var(--gradient-secondary)';
            
            // Redirect to main page after completion
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
        
        // Update loading bar
        loadingProgress.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        // Show icons progressively
        const iconIndex = Math.floor((progress / 100) * iconItems.length);
        
        iconItems.forEach((icon, index) => {
            if (index <= iconIndex) {
                icon.style.opacity = '1';
                icon.style.transform = 'translateY(0)';
                
                // Add pulse effect to visible icons
                const iconCircle = icon.querySelector('.icon-circle');
                if (iconCircle) {
                    iconCircle.style.animation = 'pulse 2s infinite ease-in-out';
                }
            }
        });
        
        // Add glow effect to logo as loading progresses
        const logo = document.querySelector('.logo');
        if (logo && progress > 50) {
            logo.style.boxShadow = '0 0 30px rgba(255, 199, 95, 0.5)';
        }
        
        // Change loading bar color as it progresses
        if (progress > 75) {
            loadingProgress.style.background = 'var(--gradient-accent)';
        }
    }, 300);
    
    // Add some interactive hover effects during loading
    iconItems.forEach((icon, index) => {
        icon.addEventListener('mouseenter', function() {
            if (this.style.opacity === '1') {
                this.style.transform = 'translateY(-5px) scale(1.1)';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            if (this.style.opacity === '1') {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Add click effect to loading bar
    const loadingBar = document.querySelector('.loading-bar');
    if (loadingBar) {
        loadingBar.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            from {
                width: 0;
                height: 0;
                opacity: 1;
            }
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});