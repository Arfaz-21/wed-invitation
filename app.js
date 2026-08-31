/**
 * Ayishath Azmiya & Habeeb — Wedding Invitation App Code
 * Crimson & Gold Theme with Cinematic Wax Seal Entrance, 3D Parallax & Golden Thread
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    initEnvelopeEntrance();
    initSacredGeometryCanvas();
    initScrollAnimationSystem();
    initNasheedAudio();
    initCountdown();
});

/* =========================================================================
   1. Royal Envelope & Wax Seal Unveil Entrance
   ========================================================================= */
function initEnvelopeEntrance() {
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const waxSeal = document.getElementById('waxSeal');

    if (!envelopeOverlay || !waxSeal) return;

    function openEnvelope() {
        if (envelopeOverlay.classList.contains('open')) return;
        
        envelopeOverlay.classList.add('open');
        
        // Trigger cinematic opening after door slide begins
        setTimeout(() => {
            initCinematicOpening();
        }, 500);

        setTimeout(() => {
            envelopeOverlay.classList.add('gone');
        }, 1800);
    }

    waxSeal.addEventListener('click', openEnvelope);
    
    // Auto open if guest doesn't click after 4 seconds
    setTimeout(() => {
        if (!envelopeOverlay.classList.contains('open')) {
            openEnvelope();
        }
    }, 4500);
}

/* =========================================================================
   2. Interactive 3D Parallax Particles (Gold Dust & Rose Petals)
   ========================================================================= */
function initSacredGeometryCanvas() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    let rotationAngle = 0;
    let scrollY = window.scrollY;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    window.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.4) {
            particles.push(new GoldSpark(e.clientX, e.clientY, true));
        }
    });

    class GoldSpark {
        constructor(x, y, isMouseSpark = false) {
            this.x = x || Math.random() * width;
            this.y = y || (isMouseSpark ? y : Math.random() * height);
            
            // Depth layer (1 = background, 2 = midground, 3 = foreground)
            this.depth = Math.random() > 0.6 ? 3 : (Math.random() > 0.3 ? 2 : 1);
            this.size = Math.random() * (isMouseSpark ? 2.5 : (this.depth * 1.2)) + 0.6;
            
            // Petal or Gold Dust
            this.isPetal = Math.random() > 0.55 && !isMouseSpark;
            
            this.speedY = isMouseSpark ? (Math.random() * 0.8 - 0.2) : (this.isPetal ? (Math.random() * 0.4 + 0.1) * this.depth * 0.5 : -(Math.random() * 0.25 + 0.05) * this.depth * 0.6);
            this.speedX = isMouseSpark ? (Math.random() * 1.0 - 0.5) : (Math.random() * 0.3 - 0.15);
            
            this.alpha = Math.random() * 0.45 + 0.15;
            this.decay = Math.random() * 0.002 + 0.0008;
            this.angle = Math.random() * Math.PI * 2;
            this.spinSpeed = (Math.random() - 0.5) * 0.03;
            
            const palette = [
                'rgba(197, 160, 89, ', // Antique Gold
                'rgba(226, 201, 153, ', // Light Gold
                'rgba(122, 12, 27, ',   // Deep Crimson Red
                'rgba(163, 18, 39, '    // Rose Red
            ];
            this.color = palette[Math.floor(Math.random() * palette.length)];
            this.isMouseSpark = isMouseSpark;
        }

        update() {
            // Add subtle parallax offset based on scrollY
            const parallaxFactor = this.depth * 0.15;
            this.y += this.speedY + (scrollY * 0.0002 * parallaxFactor);
            this.x += this.speedX + Math.sin(this.angle) * 0.2;
            this.angle += this.spinSpeed;
            
            this.alpha -= this.decay * (this.isMouseSpark ? 3.0 : 1.0);

            if (this.y < -10 || this.y > height + 20 || this.alpha <= 0) {
                if (this.isMouseSpark) return false;
                this.reset();
            }
            return true;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = this.isPetal ? -10 : height + 10;
            this.size = Math.random() * (this.depth * 1.2) + 0.6;
            this.alpha = Math.random() * 0.45 + 0.15;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            ctx.beginPath();
            if (this.isPetal) {
                // Draw soft oval rose petal
                ctx.ellipse(0, 0, this.size * 1.8, this.size * 0.9, 0, 0, Math.PI * 2);
            } else {
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            }

            ctx.fillStyle = `${this.color}${this.alpha})`;
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < 45; i++) {
        particles.push(new GoldSpark());
    }

    function drawMandala(centerX, centerY, baseRadius) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotationAngle + scrollY * 0.0003);
        
        const sides = 8;
        const maxLayers = 4;
        
        for (let layer = 1; layer <= maxLayers; layer++) {
            const r = baseRadius * (layer * 0.25);
            ctx.strokeStyle = `rgba(197, 160, 89, ${0.14 - layer * 0.02})`;
            ctx.lineWidth = 0.8;

            ctx.beginPath();
            for (let i = 0; i < sides; i++) {
                const angle1 = (i * Math.PI * 2) / sides;
                const angle2 = ((i + 2) * Math.PI * 2) / sides;
                
                const x1 = Math.cos(angle1) * r;
                const y1 = Math.sin(angle1) * r;
                const x2 = Math.cos(angle2) * r;
                const y2 = Math.sin(angle2) * r;
                
                if (i === 0) ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
            }
            ctx.closePath();
            ctx.stroke();
        }
        ctx.restore();
    }

    function loop() {
        ctx.clearRect(0, 0, width, height);
        rotationAngle += 0.0004;

        const mandalaRadius = Math.min(width, height) * 0.35;
        drawMandala(width / 2, height * 0.45, mandalaRadius);

        particles = particles.filter(particle => {
            const keep = particle.update();
            if (keep) particle.draw();
            return keep;
        });

        requestAnimationFrame(loop);
    }
    loop();
}

/* =========================================================================
   3. Cinematic Opening Animation
   ========================================================================= */
function initCinematicOpening() {
    if (!window.gsap) return;

    gsap.set("#heroGlow", { opacity: 0, scale: 0.5 });
    gsap.set("#heroBismillah", { opacity: 0, y: 10 });
    gsap.set("#archDrawPath", { strokeDasharray: 550, strokeDashoffset: 550 });
    gsap.set(".name-animate", { opacity: 0, y: 20 });
    gsap.set(".parent-lineage", { opacity: 0, y: 10 });
    gsap.set("#heroInviteText", { opacity: 0, y: 15 });
    gsap.set("#heroScrollBtn", { opacity: 0 });

    const openTimeline = gsap.timeline();

    openTimeline
        .to("#heroGlow", { opacity: 0.7, scale: 1, duration: 1.2, ease: "power2.out" })
        .to("#heroBismillah", { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "-=0.6")
        .to("#archDrawPath", { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, "-=0.6")
        .to("#heroBride", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=1.0")
        .to("#heroAmp", { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.5)" }, "-=0.6")
        .to("#heroGroom", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.5")
        .to(".parent-lineage", { opacity: 0.9, y: 0, duration: 0.8, stagger: 0.15 }, "-=0.4")
        .to("#heroInviteText", { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "-=0.5")
        .to("#heroScrollBtn", { opacity: 1, y: 0, duration: 0.8 }, "-=0.3");
}

/* =========================================================================
   4. Scroll Animation System (Golden Thread Progress Draw)
   ========================================================================= */
function initScrollAnimationSystem() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.classList.toggle('menu-open');
            navLinks.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                document.body.classList.remove('menu-open');
                navLinks.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                document.body.classList.remove('menu-open');
                navLinks.classList.remove('active');
            }
        });
    }

    if (!window.gsap || !window.ScrollTrigger) return;

    ScrollTrigger.create({
        trigger: "#verse",
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => document.body.className = "theme-light",
        onLeaveBack: () => document.body.className = "theme-dark",
    });

    ScrollTrigger.create({
        trigger: ".closing-section",
        start: "top 80%",
        onEnter: () => document.body.className = "theme-dark",
        onLeaveBack: () => document.body.className = "theme-light"
    });

    gsap.set("#verseArchPath", { strokeDasharray: 400, strokeDashoffset: 400 });
    gsap.set(["#verseSep1", "#verseArabic", "#verseEnglish", "#verseSource", "#verseSep2"], { opacity: 0, y: 15 });

    const verseTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#verse",
            start: "top 80%",
        }
    });

    verseTimeline
        .to("#verseArchPath", { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" })
        .to("#verseSep1", { opacity: 1, y: 0, duration: 0.6 }, "-=0.8")
        .to("#verseArabic", { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "-=0.5")
        .to("#verseEnglish", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.6")
        .to("#verseSource", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to("#verseSep2", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

    const storyCards = document.querySelectorAll(".scroll-reveal-card");
    storyCards.forEach(card => {
        gsap.fromTo(card, 
            { opacity: 0, y: 35 },
            { 
                opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                }
            }
        );
    });

    // Golden Thread Timeline Draw Animation
    gsap.fromTo("#timelineProgressLine", 
        { scaleY: 0 },
        { 
            scaleY: 1, 
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top 70%",
                end: "bottom 80%",
                scrub: true
            }
        }
    );

    const timelineItems = document.querySelectorAll(".scroll-reveal-timeline");
    timelineItems.forEach(item => {
        gsap.fromTo(item,
            { opacity: 0, y: 35 },
            {
                opacity: 1, y: 0, duration: 1.0, ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%"
                }
            }
        );
    });

    const familyCols = document.querySelectorAll(".scroll-reveal-family");
    familyCols.forEach(col => {
        gsap.fromTo(col,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 1.0, ease: "power2.out",
                scrollTrigger: {
                    trigger: col,
                    start: "top 85%"
                }
            }
        );
    });

    gsap.fromTo("#venueRevealGrid",
        { opacity: 0, y: 35 },
        {
            opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
            scrollTrigger: {
                trigger: "#venue",
                start: "top 85%"
            }
        }
    );

    gsap.fromTo("#dresscodeRevealCard",
        { opacity: 0, y: 25 },
        {
            opacity: 1, y: 0, duration: 1.0, ease: "power2.out",
            scrollTrigger: {
                trigger: ".dresscode-section",
                start: "top 88%"
            }
        }
    );

    gsap.set("#closingRevealArch", { opacity: 0, scale: 0.96 });
    gsap.set(".closing-animate-line", { opacity: 0, y: 20 });

    const closingTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".closing-section",
            start: "top 75%"
        }
    });

    closingTimeline
        .to("#closingRevealArch", { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" })
        .to(".closing-animate-line", { 
            opacity: 1, y: 0, duration: 0.9, ease: "power1.out", stagger: 0.25 
        }, "-=0.8");
}

/* =========================================================================
   5. Real-time Countdown Timer
   ========================================================================= */
function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    const targetDateStr = countdownEl.getAttribute('data-date');
    const targetDate = new Date(targetDateStr).getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function calculateTime() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { d: 0, h: 0, m: 0, s: 0, expired: true };
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        return { d, h, m, s, expired: false };
    }

    function updateDisplay() {
        const time = calculateTime();
        if (time.expired) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            const titleEl = document.querySelector('.countdown-title');
            if (titleEl) titleEl.textContent = 'The Special Day is Here! Alhamdulillah.';
            return;
        }

        daysEl.textContent = String(time.d).padStart(2, '0');
        hoursEl.textContent = String(time.h).padStart(2, '0');
        minutesEl.textContent = String(time.m).padStart(2, '0');
        secondsEl.textContent = String(time.s).padStart(2, '0');
    }

    updateDisplay();
    setInterval(updateDisplay, 1000);
}

/* =========================================================================
   6. Islamic Nasheed Player with Web Audio Fallback
   ========================================================================= */
function initNasheedAudio() {
    const audioContainer = document.getElementById('audioContainer');
    const audioToggle = document.getElementById('audioToggle');
    const bgMusic = document.getElementById('bgMusic');

    if (!audioToggle) return;

    let isPlaying = false;
    let fadeInterval = null;
    let fallbackSynthActive = false;
    let audioCtx = null, mainGain = null, delayNode = null, schedulerTimer = null;

    const pentatonicScale = [155.56, 174.61, 196.00, 233.08, 261.63, 311.13, 349.23, 392.00];

    function startFallbackSynth() {
        fallbackSynthActive = true;
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        mainGain = audioCtx.createGain();
        mainGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        mainGain.connect(audioCtx.destination);

        function playNote() {
            if (!fallbackSynthActive) return;
            const freq = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.0);
            osc.connect(gain);
            gain.connect(mainGain);
            osc.start();
            osc.stop(audioCtx.currentTime + 3.2);
            schedulerTimer = setTimeout(playNote, 1600 + Math.random() * 1200);
        }
        playNote();
    }

    function stopFallbackSynth() {
        fallbackSynthActive = false;
        clearTimeout(schedulerTimer);
        if (audioCtx) {
            audioCtx.close();
            audioCtx = null;
        }
    }

    function playNasheed() {
        if (!bgMusic) {
            startFallbackSynth();
            audioContainer.classList.add('playing');
            audioToggle.querySelector('.audio-text').textContent = 'Mute Nasheed';
            isPlaying = true;
            return;
        }

        clearInterval(fadeInterval);
        bgMusic.volume = 0;

        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                audioContainer.classList.add('playing');
                audioToggle.querySelector('.audio-text').textContent = 'Mute Nasheed';
                isPlaying = true;

                let vol = 0;
                fadeInterval = setInterval(() => {
                    if (vol < 0.5) {
                        vol += 0.05;
                        bgMusic.volume = Math.min(vol, 0.5);
                    } else {
                        clearInterval(fadeInterval);
                    }
                }, 60);
            }).catch(err => {
                startFallbackSynth();
                audioContainer.classList.add('playing');
                audioToggle.querySelector('.audio-text').textContent = 'Mute Nasheed';
                isPlaying = true;
            });
        }
    }

    function pauseNasheed() {
        if (fallbackSynthActive) {
            stopFallbackSynth();
            audioContainer.classList.remove('playing');
            audioToggle.querySelector('.audio-text').textContent = 'Play Nasheed';
            isPlaying = false;
            return;
        }

        if (!bgMusic) return;

        clearInterval(fadeInterval);
        let vol = bgMusic.volume;

        fadeInterval = setInterval(() => {
            if (vol > 0.05) {
                vol -= 0.05;
                bgMusic.volume = Math.max(vol, 0);
            } else {
                clearInterval(fadeInterval);
                bgMusic.pause();
                audioContainer.classList.remove('playing');
                audioToggle.querySelector('.audio-text').textContent = 'Play Nasheed';
                isPlaying = false;
            }
        }, 50);
    }

    audioToggle.addEventListener('click', () => {
        if (isPlaying) {
            pauseNasheed();
        } else {
            playNasheed();
        }
    });
}
