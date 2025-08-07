        // Enhanced loading screen with slow, progressive loading
        window.addEventListener('load', function() {
            let progress = 0;
            const percentageElement = document.getElementById('loadingPercentage');
            const loadingText = document.querySelector('.loading-text');
            
            // Slow, progressive loading phases
            const loadingPhases = [
                { text: "Iniciando experiencia", duration: 800, increment: 2 },
                { text: "Cargando contenido", duration: 600, increment: 3 },
                { text: "Preparando interfaz", duration: 500, increment: 4 },
                { text: "Optimizando recursos", duration: 400, increment: 5 },
                { text: "Finalizando carga", duration: 300, increment: 8 }
            ];
            
            let currentPhase = 0;
            let phaseProgress = 0;
            
            const progressInterval = setInterval(() => {
                const phase = loadingPhases[currentPhase];
                
                // Update loading text for current phase
                if (phaseProgress === 0) {
                    loadingText.textContent = phase.text;
                }
                
                // Slow, controlled increment
                const randomIncrement = Math.random() * phase.increment + 1;
                progress += randomIncrement;
                phaseProgress += randomIncrement;
                
                // Ensure we don't exceed 100%
                if (progress > 100) progress = 100;
                
                // Update percentage with smooth animation
                percentageElement.textContent = Math.floor(progress) + '%';
                
                // Move to next phase when current phase target is reached
                const phaseTarget = ((currentPhase + 1) / loadingPhases.length) * 85; // 85% for phases, 15% for final
                if (progress >= phaseTarget && currentPhase < loadingPhases.length - 1) {
                    currentPhase++;
                    phaseProgress = 0;
                }
                
                // Final phase - slower completion
                if (progress >= 85 && currentPhase === loadingPhases.length - 1) {
                    progress += Math.random() * 2 + 0.5; // Much slower final increment
                }
                
                // Complete loading
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    percentageElement.textContent = '100%';
                    loadingText.textContent = 'Experiencia lista';
                    
                    // Extended pause before fade out for premium feel
                    setTimeout(() => {
                        const loadingScreen = document.getElementById('loadingScreen');
                        const mainContent = document.getElementById('mainContent');
                        
                        loadingScreen.classList.add('fade-out');
                        
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                            mainContent.classList.add('visible');
                            
                            // Initialize scroll-triggered animations after loading
                            initializeScrollAnimations();
                        }, 2000); // Longer fade out duration
                    }, 1200); // Longer pause before starting fade
                }
            }, 150); // Slower interval for more controlled progression
        });

        // SISTEMA DE ANIMACIÓN CRISIS - MÁXIMA OPTIMIZACIÓN
        let crisisExited = false;
        let heroContentShown = false;
        let isAnimating = false;
        let ticking = false;
        let lastScrollY = 0;

        function initializeScrollAnimations() {
            function updateAnimations() {
                const scrollY = window.scrollY;
                
                // Solo procesar cambios significativos
                if (Math.abs(scrollY - lastScrollY) < 10) {
                    ticking = false;
                    return;
                }
                
                // SCROLL HACIA ABAJO - División instantánea
                if (scrollY > 50 && !crisisExited && !isAnimating) {
                    crisisExited = true;
                    heroContentShown = false;
                    triggerCrisisExit();
                }
                
                // SCROLL HACIA ARRIBA - Reunión instantánea
                if (scrollY <= 30 && crisisExited && !isAnimating) {
                    crisisExited = false;
                    heroContentShown = false;
                    triggerCrisisEnter();
                }
                
                // Show hero content
                if (scrollY > 150 && crisisExited && !heroContentShown) {
                    heroContentShown = true;
                    showHeroContent();
                }
                
                // Hide hero content
                if (scrollY <= 100 && heroContentShown) {
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

        // Advanced scroll animations for other sections
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add staggered animation delays for child elements
                    const children = entry.target.querySelectorAll('.stagger-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 200);
                    });
                    
                    entry.target.classList.add('visible');
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

        // Mobile menu functions
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.toggle('hidden');
        }
        
        function closeMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.add('hidden');
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuButton = event.target.closest('button');
            
            if (!mobileMenu.contains(event.target) && !menuButton) {
                mobileMenu.classList.add('hidden');
            }
        });

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

        // Enhanced Parallax Footer Effect
        let footerParallaxTicking = false;
        let mouseX = 0;
        let mouseY = 0;
        let isMouseInFooter = false;
        
        function initializeFooterParallax() {
            const footer = document.getElementById('footer');
            const parallaxElements = footer.querySelectorAll('.parallax-element');
            const parallaxStats = footer.querySelectorAll('.parallax-stat');
            const parallaxBgs = footer.querySelectorAll('[class*="parallax-bg"]');
            
            function updateParallax() {
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;
                const footerRect = footer.getBoundingClientRect();
                const footerHeight = footerRect.height;
                
                // Check if footer is in viewport
                if (footerRect.top < windowHeight && footerRect.bottom > 0) {
                    // Enhanced progress calculation with easing
                    const rawProgress = Math.max(0, Math.min(1, (windowHeight - footerRect.top) / (windowHeight + footerHeight)));
                    const progress = easeInOutCubic(rawProgress);
                    
                    // Dynamic time-based offset for continuous animation
                    const time = Date.now() * 0.001;
                    
                    // Apply enhanced parallax to elements
                    parallaxElements.forEach((element, index) => {
                        const speed = parseFloat(element.dataset.speed) || 0.5;
                        const baseYOffset = (progress - 0.5) * 120 * speed;
                        const waveOffset = Math.sin(time * 0.5 + index * 0.8) * 8 * speed;
                        const rotation = (progress - 0.5) * 8 * speed + Math.cos(time * 0.3 + index) * 2;
                        const scale = 1 + (progress * 0.08 * speed) + Math.sin(time * 0.4 + index * 0.5) * 0.02;
                        
                        // Mouse influence
                        let mouseInfluenceX = 0;
                        let mouseInfluenceY = 0;
                        if (isMouseInFooter) {
                            mouseInfluenceX = (mouseX - 0.5) * 30 * speed;
                            mouseInfluenceY = (mouseY - 0.5) * 30 * speed;
                        }
                        
                        const finalTransform = `
                            translateY(${baseYOffset + waveOffset + mouseInfluenceY}px) 
                            translateX(${mouseInfluenceX}px)
                            rotate(${rotation}deg) 
                            scale(${scale})
                            rotateX(${Math.sin(time * 0.2 + index) * 5}deg)
                            rotateY(${Math.cos(time * 0.15 + index) * 3}deg)
                        `;
                        
                        element.style.transform = finalTransform;
                    });
                    
                    // Enhanced effects for stats with 3D transforms
                    parallaxStats.forEach((stat, index) => {
                        const delay = index * 0.25;
                        const adjustedProgress = Math.max(0, progress - delay);
                        const timeOffset = time + index * 1.2;
                        
                        const yOffset = Math.sin(adjustedProgress * Math.PI * 2 + timeOffset * 0.3) * 15;
                        const xOffset = Math.cos(adjustedProgress * Math.PI * 1.5 + timeOffset * 0.2) * 8;
                        const rotation = Math.sin(timeOffset * 0.4) * 6;
                        const scale = 1 + Math.sin(adjustedProgress * Math.PI + timeOffset * 0.5) * 0.15;
                        const rotateX = Math.sin(timeOffset * 0.3) * 10;
                        const rotateY = Math.cos(timeOffset * 0.25) * 8;
                        
                        // Mouse interaction for stats
                        let mouseScaleBoost = 1;
                        if (isMouseInFooter) {
                            const distance = Math.sqrt(
                                Math.pow(mouseX - (index + 1) / 5, 2) + 
                                Math.pow(mouseY - 0.7, 2)
                            );
                            mouseScaleBoost = 1 + Math.max(0, (0.3 - distance) * 2);
                        }
                        
                        stat.style.transform = `
                            translateY(${yOffset}px) 
                            translateX(${xOffset}px)
                            rotate(${rotation}deg) 
                            scale(${scale * mouseScaleBoost})
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                        `;
                        
                        // Dynamic glow effect
                        const glowIntensity = 0.1 + Math.sin(timeOffset * 0.6) * 0.05;
                        stat.style.boxShadow = `
                            0 0 ${20 + Math.sin(timeOffset * 0.8) * 10}px rgba(255,255,255,${glowIntensity}),
                            0 ${5 + Math.sin(timeOffset * 0.5) * 3}px ${15 + Math.cos(timeOffset * 0.7) * 5}px rgba(0,0,0,0.3)
                        `;
                    });
                    
                    // Enhanced logo effect with breathing and pulsing
                    const logo = footer.querySelector('.parallax-logo');
                    if (logo) {
                        const logoScale = 1 + (progress * 0.25) + Math.sin(time * 0.4) * 0.08;
                        const logoGlow = 20 + progress * 40 + Math.sin(time * 0.6) * 15;
                        const logoRotation = Math.sin(time * 0.2) * 3;
                        
                        logo.style.transform = `scale(${logoScale}) rotate(${logoRotation}deg)`;
                        logo.style.textShadow = `
                            0 0 ${logoGlow}px rgba(255,255,255,${0.6 + Math.sin(time * 0.5) * 0.2}),
                            3px 3px 0px rgba(0,0,0,1),
                            6px 6px 0px rgba(128,128,128,0.8),
                            0 0 ${logoGlow * 1.5}px rgba(255,255,255,${0.3 + Math.sin(time * 0.8) * 0.1})
                        `;
                    }
                    
                    // Enhanced slogan with complex wave patterns
                    const slogan = footer.querySelector('.parallax-slogan');
                    if (slogan) {
                        const wave1 = Math.sin(progress * Math.PI * 3 + time * 0.5) * 8;
                        const wave2 = Math.cos(progress * Math.PI * 2 + time * 0.3) * 4;
                        const skew = Math.sin(time * 0.4) * 2;
                        
                        slogan.style.transform = `
                            translateY(${wave1 + wave2}px) 
                            skewX(${skew}deg)
                            scale(${1 + Math.sin(time * 0.6) * 0.03})
                        `;
                    }
                    
                    // Enhanced line with dynamic expansion and glow
                    const line = footer.querySelector('.parallax-line');
                    if (line) {
                        const baseWidth = 128 + (progress * 150);
                        const pulseWidth = Math.sin(time * 0.8) * 30;
                        const glowIntensity = 10 + Math.sin(time * 0.7) * 8;
                        
                        line.style.width = `${baseWidth + pulseWidth}px`;
                        line.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(255,255,255,0.6))`;
                        line.style.transform = `scaleY(${1 + Math.sin(time * 0.9) * 0.3})`;
                    }
                    
                    // Enhanced background layers with dynamic opacity
                    parallaxBgs.forEach((bg, index) => {
                        const baseOpacity = [0.12, 0.08, 0.18, 0.06][index] || 0.1;
                        const pulseOpacity = Math.sin(time * (0.3 + index * 0.1)) * 0.03;
                        bg.style.opacity = baseOpacity + pulseOpacity + (progress * 0.05);
                    });
                }
                
                footerParallaxTicking = false;
            }
            
            function requestParallaxTick() {
                if (!footerParallaxTicking) {
                    footerParallaxTicking = true;
                    requestAnimationFrame(updateParallax);
                }
            }
            
            // Continuous animation loop
            function continuousUpdate() {
                requestParallaxTick();
                requestAnimationFrame(continuousUpdate);
            }
            
            // Start continuous updates
            continuousUpdate();
            
            // Add scroll listener for additional effects
            window.addEventListener('scroll', requestParallaxTick, { passive: true });
        }
        
        // Enhanced mouse movement parallax
        function initializeMouseParallax() {
            const footer = document.getElementById('footer');
            
            footer.addEventListener('mouseenter', () => {
                isMouseInFooter = true;
            });
            
            footer.addEventListener('mouseleave', () => {
                isMouseInFooter = false;
                mouseX = 0.5;
                mouseY = 0.5;
            });
            
            footer.addEventListener('mousemove', (e) => {
                const rect = footer.getBoundingClientRect();
                mouseX = (e.clientX - rect.left) / rect.width;
                mouseY = (e.clientY - rect.top) / rect.height;
            });
        }
        
        // Easing function for smoother animations
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        
        // Observe elements after a delay to ensure DOM is ready
        setTimeout(() => {
            observeElements();
            initializeFooterParallax();
            initializeMouseParallax();
        }, 4000);

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'96b81dc2b1c6e7a9',t:'MTc1NDU4Mzc4My4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();