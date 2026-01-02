import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        // ✅ Accessibility: reduce motion
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) return;

        const isMobile = window.innerWidth < 768;

        // ✅ Quality scaling
        const PARTICLE_COUNT = isMobile ? 20 : 60;
        const FPS = isMobile ? 30 : 60;
        const SPEED = isMobile ? 0.3 : 0.6;

        const colors = ["rgba(255,255,255,0.7)"];
        let particles = [];
        let animationId;
        let lastTime = 0;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * (isMobile ? 1.5 : 2.5) + 1;
                this.speedX = (Math.random() - 0.5) * SPEED;
                this.speedY = (Math.random() - 0.5) * SPEED;
                this.color = colors[0];
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

                if (!isMobile) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = this.color;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                this.draw();
            }
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        }

        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            createParticles();
        }

        function animate(time) {
            if (time - lastTime < 1000 / FPS) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            lastTime = time;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => p.update());
            animationId = requestAnimationFrame(animate);
        }

        function handleVisibility() {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animationId = requestAnimationFrame(animate);
            }
        }

        resizeCanvas();
        animationId = requestAnimationFrame(animate);

        window.addEventListener("resize", resizeCanvas);
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resizeCanvas);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    );
}
