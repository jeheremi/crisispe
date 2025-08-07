       // Versión extendida del loading
      window.addEventListener('load', () => {
        let progress = 0;
        const percentageElement = document.getElementById('loadingPercentage');
        const loadingText = document.querySelector('.loading-text');
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');

        const loadingPhases = [
          { text: "Cargando...", increment: 4 },
          { text: "Preparando...", increment: 6 },
          { text: "Casi listo...", increment: 8 }
        ];

        let currentPhase = 0;

        const progressInterval = setInterval(() => {
          const phase = loadingPhases[currentPhase];
          loadingText.textContent = phase.text;
          progress += Math.random() * phase.increment + 2;

          if (progress > 100) progress = 100;
          percentageElement.textContent = Math.floor(progress) + '%';

          if (progress > 30 && currentPhase === 0) currentPhase = 1;
          if (progress > 70 && currentPhase === 1) currentPhase = 2;

          if (progress >= 100) {
            clearInterval(progressInterval);
            percentageElement.textContent = '100%';
            loadingText.textContent = 'Listo';
            
            setTimeout(() => {
              loadingScreen.classList.add('fade-out');
              setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.classList.add('visible');
              }, 1500);
            }, 1000);
          }
        }, 120); // Intervalo más largo para duración extendida
      });

        // Optimized scroll animations system
        let crisisExited = false;
        let heroContentShown = false;
        let isAnimating = false;
        let ticking = false;
        let lastScrollY = 0;

        function initializeScrollAnimations() {
            // Throttled scroll handler for better performance
            function updateAnimations() {
                const scrollY = window.scrollY;
                
                // Only process significant changes
                if (Math.abs(scrollY - lastScrollY) < 15) {
                    ticking = false;
                    return;
                }
                
                // Simplified scroll triggers
                if (scrollY > 80 && !crisisExited && !isAnimating) {
                    crisisExited = true;
                    heroContentShown = false;
                    triggerCrisisExit();
                }
                
                if (scrollY <= 50 && crisisExited && !isAnimating) {
                    crisisExited = false;
                    heroContentShown = false;
                    triggerCrisisEnter();
                }
                
                if (scrollY > 200 && crisisExited && !heroContentShown) {
                    heroContentShown = true;
                    showHeroContent();
                }
                
                if (scrollY <= 150 && heroContentShown) {
                    heroContentShown = false;
                    hideHeroContent();
                }
                
                lastScrollY = scrollY;
                ticking = false;
            }
            
            function requestTick() {
                if (!ticking) {
                    ticking = true;
                    requestAnimationFrame(updateAnimations);
                }
            }
            
            // Use passive listeners for better performance
            window.addEventListener('scroll', requestTick, { passive: true });
        }

        function triggerCrisisExit() {
            isAnimating = true;
            const crisisWord = document.getElementById('crisisWord');
            
            crisisWord.classList.remove('enter');
            crisisWord.classList.add('exit');
            
            setTimeout(() => {
                isAnimating = false;
            }, 800);
        }

        function triggerCrisisEnter() {
            isAnimating = true;
            const crisisWord = document.getElementById('crisisWord');
            const heroContentSection = document.getElementById('heroContentSection');
            
            crisisWord.classList.remove('exit');
            heroContentSection.classList.remove('visible');
            crisisWord.classList.add('enter');
            
            setTimeout(() => {
                crisisWord.classList.remove('enter');
                isAnimating = false;
            }, 1200);
        }

        function showHeroContent() {
            const heroContentSection = document.getElementById('heroContentSection');
            
            // Show hero content section
            heroContentSection.classList.add('visible');
            
            // Reset y trigger letter animations
            document.querySelectorAll('.letter-reveal').forEach(letter => {
                letter.style.animation = 'none';
                letter.offsetHeight; // Trigger reflow
                letter.style.animation = null;
            });
            
            // Trigger letter animations after content is visible
            setTimeout(() => {
                document.querySelectorAll('.letter-reveal').forEach((letter, index) => {
                    setTimeout(() => {
                        letter.style.animationDelay = `${index * 0.05}s`;
                        letter.style.animationPlayState = 'running';
                    }, index * 50);
                });
            }, 800);
        }

        function hideHeroContent() {
            const heroContentSection = document.getElementById('heroContentSection');
            heroContentSection.classList.remove('visible');
        }

        // Smooth scrolling
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Optimized intersection observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Faster staggered animations
                    const children = entry.target.querySelectorAll('.stagger-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 100); // Reduced delay
                    });
                    
                    entry.target.classList.add('visible');
                    
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // This will be called after loading screen disappears
        function observeElements() {
            document.querySelectorAll('.fade-up-section, .slide-in-left, .slide-in-right, .scale-in, .explode-in, .slide-bounce-left, .slide-bounce-right, .zoom-rotate-in').forEach(el => {
                observer.observe(el);
            });
        }

        // Newsletter subscription
        document.addEventListener('DOMContentLoaded', function() {
            const newsletterBtn = document.querySelector('button[class*="UNIRSE A CRISIS"]');
            if (newsletterBtn) {
                newsletterBtn.addEventListener('click', function() {
                    const email = document.querySelector('input[type="email"]').value;
                    if (email) {
                        this.style.transform = 'scale(1.2)';
                        this.style.background = 'linear-gradient(45deg, #fff, #ccc)';
                        
                        setTimeout(() => {
                            alert('🔥 ¡AHORA ERES PARTE DE LA LEYENDA! 🔥\n\nSerás el primero en saber cuando los próximos drops estén listos para hacer historia.');
                            document.querySelector('input[type="email"]').value = '';
                            this.style.transform = 'scale(1)';
                            this.style.background = 'white';
                        }, 200);
                    } else {
                        this.style.animation = 'shake 0.5s ease-in-out';
                        setTimeout(() => {
                            this.style.animation = '';
                            alert('Ingresa tu email para unirte a la revolución');
                        }, 500);
                    }
                });
            }
        });

        // Navigation smooth scroll
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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
        });

        // Enhanced mobile menu functions
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuIcon = document.getElementById('menuIcon');
            
            mobileMenu.classList.toggle('hidden');
            
            // Animate menu icon
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.textContent = '☰';
                menuIcon.style.transform = 'rotate(0deg)';
            } else {
                menuIcon.textContent = '✕';
                menuIcon.style.transform = 'rotate(180deg)';
            }
        }
        
        function closeMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuIcon = document.getElementById('menuIcon');
            
            mobileMenu.classList.add('hidden');
            menuIcon.textContent = '☰';
            menuIcon.style.transform = 'rotate(0deg)';
        }
        
        // Enhanced mobile menu close functionality
        document.addEventListener('click', function(event) {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuButton = event.target.closest('button[onclick="toggleMobileMenu()"]');
            
            if (!mobileMenu.contains(event.target) && !menuButton && !mobileMenu.classList.contains('hidden')) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeMobileMenu();
            }
        });
        
        // Prevent scroll when mobile menu is open
        function preventScroll() {
            const mobileMenu = document.getElementById('mobileMenu');
            if (!mobileMenu.classList.contains('hidden')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
        
        // Add scroll prevention to menu toggle
        const originalToggle = toggleMobileMenu;
        toggleMobileMenu = function() {
            originalToggle();
            setTimeout(preventScroll, 10);
        };

        // Add shake animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);

        // Optimized footer initialization
        function initializeFooter() {
            observeElements();
        }
        
        // Initialize immediately after loading
        setTimeout(() => {
            initializeFooter();
        }, 1500);
        
        // Performance optimizations
        document.addEventListener('DOMContentLoaded', function() {
            // Preload critical fonts
            const fontPreload = document.createElement('link');
            fontPreload.rel = 'preload';
            fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap';
            fontPreload.as = 'style';
            document.head.appendChild(fontPreload);
            
            // Optimize images loading
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.loading = 'lazy';
            });
            
            // Reduce motion for users who prefer it
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01s');
            }
        });
    
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'96b9e1ff76df24e4',t:'MTc1NDYwMjMwNi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();