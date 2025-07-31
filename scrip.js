
        // Smooth scrolling
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Advanced scroll animations
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

        // Observe all animation elements
        document.querySelectorAll('.explode-in, .slide-bounce-left, .slide-bounce-right, .zoom-rotate-in').forEach(el => {
            observer.observe(el);
        });

        // Letter reveal animation
        setTimeout(() => {
            document.querySelectorAll('.letter-reveal').forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.animationDelay = `${index * 0.05}s`;
                    letter.style.animationPlayState = 'running';
                }, index * 50);
            });
        }, 1000);

        // Mouse parallax effect
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            document.querySelectorAll('.parallax-element').forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const x = (mouseX - 0.5) * speed * 50;
                const y = (mouseY - 0.5) * speed * 50;
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
        });

        // Interactive mouse effects
        document.querySelectorAll('.mouse-interactive').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.05) rotate(1deg)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Newsletter subscription
        document.querySelector('button[class*="UNIRSE A CRISIS"]').addEventListener('click', function() {
            const email = document.querySelector('input[type="email"]').value;
            if (email) {
                // Add explosion effect
                this.style.transform = 'scale(1.2)';
                this.style.background = 'linear-gradient(45deg, #fff, #ccc)';
                
                setTimeout(() => {
                    alert('¡BIENVENIDO A LA REVOLUCIÓN CRISIS!\nTe notificaremos cuando lleguen los nuevos drops.');
                    document.querySelector('input[type="email"]').value = '';
                    this.style.transform = 'scale(1)';
                    this.style.background = 'white';
                }, 200);
            } else {
                // Shake effect for empty email
                this.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                    alert('Ingresa tu email para unirte a la revolución');
                }, 500);
            }
        });

        // Navigation smooth scroll
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

        // Dynamic particle generation
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 5 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 20 + 's';
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 20000);
        }

        // Generate particles periodically
        setInterval(createParticle, 3000);
  
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'967e320897b1e9a2',t:'MTc1Mzk3NjQzOS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
