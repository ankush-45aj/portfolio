import React, { useRef, useEffect, useCallback, useState } from "react";
import normalImg from "../assets/Ankush.png";
import monsterImg from "../assets/AnkushMonster.png";

// ─── Utility: lerp ────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;

// ─── Floating Particle ────────────────────────────────────────────────────────
function Particle({ x, y, containerRef }) {
  const ref = useRef(null);
  const state = useRef({
    px: x,
    py: y,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -(Math.random() * 0.8 + 0.4),
    life: 1,
    decay: Math.random() * 0.012 + 0.008,
    size: Math.random() * 3 + 1,
    dead: false,
  });

  useEffect(() => {
    let raf;
    const tick = () => {
      const s = state.current;
      s.life -= s.decay;
      s.px += s.vx;
      s.py += s.vy;
      s.vx *= 0.99;
      if (ref.current) {
        ref.current.style.transform = `translate(${s.px}px, ${s.py}px)`;
        ref.current.style.opacity = Math.max(0, s.life);
        ref.current.style.width = `${s.size}px`;
        ref.current.style.height = `${s.size}px`;
      }
      if (s.life > 0) {
        raf = requestAnimationFrame(tick);
      } else {
        if (ref.current) ref.current.style.display = "none";
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        borderRadius: "50%",
        background: "radial-gradient(circle, #ff2200, #ff6600, transparent)",
        boxShadow: "0 0 6px 2px rgba(255,30,0,0.7)",
        pointerEvents: "none",
        willChange: "transform, opacity",
        zIndex: 30,
      }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MonsterReveal({ className = "" }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const monsterLayerRef = useRef(null);
  const redGlowRef = useRef(null);
  const filmGrainRef = useRef(null);
  const eyeGlowRef = useRef(null);

  // Mouse tracking state (raw & interpolated)
  const mouse = useRef({ x: 0.5, y: 0.5 }); // normalised 0-1
  const smooth = useRef({ x: 0.5, y: 0.5 });
  const vel = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const revealRadius = useRef(0); // 0 = hidden, 1 = full reveal
  const shakeOffset = useRef({ x: 0, y: 0 });
  const eyeFlicker = useRef(1);
  const eyeFlickerTimer = useRef(0);
  const [particles, setParticles] = useState([]);
  const particleIdRef = useRef(0);
  const particleTimerRef = useRef(0);
  const rafRef = useRef(null);

  // ── Spawn particles near cursor ──────────────────────────────────────────
  const spawnParticle = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = smooth.current.x * rect.width;
    const cy = smooth.current.y * rect.height;
    const spread = 60;
    const px = cx + (Math.random() - 0.5) * spread;
    const py = cy + (Math.random() - 0.5) * spread;
    const id = particleIdRef.current++;
    setParticles((prev) => [
      ...prev.slice(-25),
      { id, x: px, y: py },
    ]);
  }, []);

  // ── RAF loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const RADIUS = 200; // px — reveal radius
    const FEATHER = 80; // px — soft edge feather
    const EASING = 0.08; // spring lerp factor

    let lastTime = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 16.67, 3); // normalised delta
      lastTime = now;

      // ── Smooth mouse tracking ──────────────────────────────────────────
      const prevSX = smooth.current.x;
      const prevSY = smooth.current.y;
      smooth.current.x = lerp(smooth.current.x, mouse.current.x, EASING * dt);
      smooth.current.y = lerp(smooth.current.y, mouse.current.y, EASING * dt);

      vel.current.x = (smooth.current.x - prevSX) * 200;
      vel.current.y = (smooth.current.y - prevSY) * 200;

      // ── Screen shake on fast movement ──────────────────────────────────
      const speed = Math.hypot(vel.current.x, vel.current.y);
      if (speed > 2) {
        const shakeAmt = Math.min(speed * 0.5, 6);
        shakeOffset.current.x = lerp(
          shakeOffset.current.x,
          (Math.random() - 0.5) * shakeAmt,
          0.4
        );
        shakeOffset.current.y = lerp(
          shakeOffset.current.y,
          (Math.random() - 0.5) * shakeAmt,
          0.4
        );
      } else {
        shakeOffset.current.x = lerp(shakeOffset.current.x, 0, 0.15);
        shakeOffset.current.y = lerp(shakeOffset.current.y, 0, 0.15);
      }

      // ── Reveal radius interpolation ────────────────────────────────────
      const targetRadius = isHovering.current ? 1 : 0;
      revealRadius.current = lerp(revealRadius.current, targetRadius, 0.05 * dt);

      // ── Eye flicker ────────────────────────────────────────────────────
      eyeFlickerTimer.current += dt;
      if (eyeFlickerTimer.current > 8 + Math.random() * 15) {
        eyeFlickerTimer.current = 0;
        eyeFlicker.current = 0.3 + Math.random() * 0.4;
        setTimeout(() => {
          eyeFlicker.current = 1;
        }, 60 + Math.random() * 80);
      }

      // ── Apply mask to monster layer ────────────────────────────────────
      if (monsterLayerRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const cx = smooth.current.x * rect.width;
        const cy = smooth.current.y * rect.height;
        const r = revealRadius.current;
        const actualRadius = RADIUS * r;
        const featherOuter = (RADIUS + FEATHER) * r;

        // CSS mask: radial gradient creates the soft reveal
        if (r < 0.005) {
          monsterLayerRef.current.style.maskImage = "none";
          monsterLayerRef.current.style.webkitMaskImage = "none";
        } else {
          // Noise displacement on edge: slightly perturb x,y
          const noiseX = cx + Math.sin(now * 0.003) * 4 * r;
          const noiseY = cy + Math.cos(now * 0.002) * 3 * r;

          const mask = `radial-gradient(circle ${featherOuter}px at ${noiseX}px ${noiseY}px, 
            black 0%, 
            black ${(actualRadius / featherOuter) * 80}%, 
            transparent 100%)`;
          monsterLayerRef.current.style.maskImage = mask;
          monsterLayerRef.current.style.webkitMaskImage = mask;

          // Chromatic aberration: slight R/G/B offset on monster layer
          const abr = speed * 0.3;
          monsterLayerRef.current.style.filter = `
            drop-shadow(${abr}px 0 0 rgba(255,0,0,0.3))
            drop-shadow(-${abr}px 0 0 rgba(0,0,255,0.15))
            brightness(${0.85 + revealRadius.current * 0.15})
          `;
        }

        // ── Red glow ring around reveal area ────────────────────────────
        if (redGlowRef.current) {
          const glowSize = (RADIUS + FEATHER + 40) * r;
          redGlowRef.current.style.left = `${cx - glowSize}px`;
          redGlowRef.current.style.top = `${cy - glowSize}px`;
          redGlowRef.current.style.width = `${glowSize * 2}px`;
          redGlowRef.current.style.height = `${glowSize * 2}px`;
          redGlowRef.current.style.opacity = String(r * 0.7);
        }

        // ── Screen shake on container ────────────────────────────────────
        containerRef.current.style.transform = `translate(${shakeOffset.current.x}px, ${shakeOffset.current.y}px)`;

        // ── Eye glow flicker ─────────────────────────────────────────────
        if (eyeGlowRef.current) {
          eyeGlowRef.current.style.opacity = String(
            revealRadius.current * eyeFlicker.current * 0.85
          );
        }
      }

      // ── Film grain animation ───────────────────────────────────────────
      if (filmGrainRef.current && revealRadius.current > 0.05) {
        filmGrainRef.current.style.backgroundPosition = `${Math.random() * 200}px ${Math.random() * 200}px`;
        filmGrainRef.current.style.opacity = String(
          revealRadius.current * 0.12
        );
      } else if (filmGrainRef.current) {
        filmGrainRef.current.style.opacity = "0";
      }

      // ── Particle spawn ─────────────────────────────────────────────────
      particleTimerRef.current += dt;
      if (
        isHovering.current &&
        revealRadius.current > 0.3 &&
        particleTimerRef.current > 4
      ) {
        particleTimerRef.current = 0;
        spawnParticle();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [spawnParticle]);

  // ── Mouse event handlers ───────────────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current.x = (e.clientX - rect.left) / rect.width;
    mouse.current.y = (e.clientY - rect.top) / rect.height;
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`monster-reveal-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        display: "inline-block",
        willChange: "transform",
        cursor: "none",
      }}
    >
      {/* ── Layer 1: Normal portrait ─────────────────────────────────── */}
      <img
        src={normalImg}
        alt="Ankush"
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(100%)",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      {/* ── Layer 2: Monster portrait (masked) ───────────────────────── */}
      <img
        ref={monsterLayerRef}
        src={monsterImg}
        alt=""
        draggable={false}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          userSelect: "none",
          maskImage: "none",
          WebkitMaskImage: "none",
          willChange: "mask-image, filter",
          zIndex: 2,
        }}
      />

      {/* ── Red emissive ring glow ───────────────────────────────────── */}
      <div
        ref={redGlowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, transparent 30%, rgba(255,0,0,0.35) 55%, rgba(180,0,0,0.15) 75%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 3,
          opacity: 0,
          filter: "blur(8px)",
          willChange: "left, top, width, height, opacity",
        }}
      />

      {/* ── Eye glow overlay ─────────────────────────────────────────── */}
      <div
        ref={eyeGlowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 10% at 43% 37%, rgba(255,30,0,0.5) 0%, transparent 80%), radial-gradient(ellipse 60% 10% at 57% 37%, rgba(255,30,0,0.5) 0%, transparent 80%)",
          mixBlendMode: "screen",
          pointerEvents: "none",
          zIndex: 4,
          opacity: 0,
          willChange: "opacity",
        }}
      />

      {/* ── Film grain ───────────────────────────────────────────────── */}
      <div
        ref={filmGrainRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 5,
          willChange: "opacity, background-position",
        }}
      />

      {/* ── Floating particles ───────────────────────────────────────── */}
      {particles.map((p) => (
        <Particle
          key={p.id}
          x={p.x}
          y={p.y}
          containerRef={containerRef}
        />
      ))}

      {/* ── Custom horror cursor ─────────────────────────────────────── */}
      <HorrorCursor containerRef={containerRef} smooth={smooth} revealRadius={revealRadius} />
    </div>
  );
}

// ─── Custom Horror Cursor ──────────────────────────────────────────────────────
function HorrorCursor({ containerRef, smooth, revealRadius }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    let raf;
    const tick = () => {
      if (cursorRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const cx = smooth.current.x * rect.width;
        const cy = smooth.current.y * rect.height;
        const r = revealRadius.current;
        cursorRef.current.style.transform = `translate(${cx - 16}px, ${cy - 16}px)`;
        cursorRef.current.style.opacity = String(r > 0.05 ? 1 : 0);
        cursorRef.current.style.boxShadow = `0 0 ${8 + r * 20}px ${4 + r * 10}px rgba(255,0,0,${0.4 + r * 0.4})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [containerRef, smooth, revealRadius]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "2px solid rgba(255, 30, 0, 0.9)",
        background: "rgba(255, 0, 0, 0.08)",
        pointerEvents: "none",
        zIndex: 20,
        opacity: 0,
        willChange: "transform, opacity, box-shadow",
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
