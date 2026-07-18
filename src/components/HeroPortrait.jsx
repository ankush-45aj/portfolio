import { useEffect, useRef } from "react";
import normalPortrait from "../assets/Ankush2.png";
import armourPortrait from "../assets/Ankusharmour.png";

const PARTICLES = Array.from({ length: 16 }, (_, index) => ({
  angle: (Math.PI * 2 * index) / 16 + (index % 3) * 0.22,
  distance: 45 + ((index * 37) % 130),
  size: 1 + (index % 3),
  speed: 0.55 + (index % 5) * 0.11,
}));

const lerp = (from, to, amount) => from + (to - from) * amount;

/**
 * A cursor-driven mask reveal. All animated values live in refs / CSS variables
 * so moving over the portrait never causes a React render.
 */
export default function HeroPortrait() {
  const portraitRef = useRef(null);
  const particleRefs = useRef([]);
  const pointer = useRef({ x: 0, y: 0 });
  const light = useRef({ x: 0, y: 0, radius: 0, opacity: 0 });
  const hovering = useRef(false);
  const animationFrame = useRef(0);

  useEffect(() => {
    const MAX_RADIUS = 160;
    const POSITION_LERP = 0.105;
    const RADIUS_LERP = 0.09;
    const OPACITY_LERP = 0.1;

    const animate = (time) => {
      const node = portraitRef.current;
      if (node) {
        // The position and radius have independent easing for a weighted torch feel.
        light.current.x = lerp(light.current.x, pointer.current.x, POSITION_LERP);
        light.current.y = lerp(light.current.y, pointer.current.y, POSITION_LERP);
        light.current.radius = lerp(
          light.current.radius,
          hovering.current ? MAX_RADIUS : 0,
          RADIUS_LERP,
        );
        light.current.opacity = lerp(
          light.current.opacity,
          hovering.current ? 1 : 0,
          OPACITY_LERP,
        );

        const { x, y, radius, opacity } = light.current;
        node.style.setProperty("--reveal-x", `${x}px`);
        node.style.setProperty("--reveal-y", `${y}px`);
        node.style.setProperty("--reveal-radius", `${radius}px`);
        node.style.setProperty("--reveal-opacity", opacity.toFixed(3));

        // Dust stays attached to the delayed light, with a slow independent drift.
        particleRefs.current.forEach((particle, index) => {
          if (!particle) return;
          const config = PARTICLES[index];
          const drift = time * 0.001 * config.speed;
          const distance = config.distance + Math.sin(drift * 1.6) * 13;
          const px = x + Math.cos(config.angle + drift) * distance;
          const py = y + Math.sin(config.angle + drift * 1.25) * distance;
          particle.style.transform = `translate3d(${px}px, ${py}px, 0)`;
          particle.style.opacity = String(opacity * (0.25 + (Math.sin(drift + index) + 1) * 0.23));
        });
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  const updatePointer = (event) => {
    const bounds = portraitRef.current?.getBoundingClientRect();
    if (!bounds) return;

    pointer.current.x = event.clientX - bounds.left;
    pointer.current.y = event.clientY - bounds.top;
  };

  const handlePointerEnter = (event) => {
    updatePointer(event);
    // Begin at the pointer; the next movements retain their cinematic lag.
    light.current.x = pointer.current.x;
    light.current.y = pointer.current.y;
    hovering.current = true;
  };

  return (
    <div
      ref={portraitRef}
      className="hero-portrait-wrapper"
      onPointerEnter={handlePointerEnter}
      onPointerMove={updatePointer}
      onPointerLeave={() => {
        hovering.current = false;
      }}
    >
      {/* Reality layer: always present beneath the dimensional reveal. */}
      <img className="hero-portrait-img" src={normalPortrait} alt="Ankush Jha" draggable={false} />

      {/* Armour uses the same contained layout, revealed exclusively by the CSS mask. */}
      <div className="hero-portrait-armour" aria-hidden="true">
        <img
          className="hero-portrait-armour-image"
          src={armourPortrait}
          alt=""
          draggable={false}
        />
      </div>

      {/* Masked atmosphere follows the light without affecting either source image. */}
      <div className="hero-portrait-aura" aria-hidden="true" />
      <div className="hero-portrait-smoke" aria-hidden="true" />

      <div className="hero-portrait-dust" aria-hidden="true">
        {PARTICLES.map((particle, index) => (
          <span
            key={index}
            ref={(node) => {
              particleRefs.current[index] = node;
            }}
            style={{ width: particle.size, height: particle.size }}
          />
        ))}
      </div>
    </div>
  );
}
