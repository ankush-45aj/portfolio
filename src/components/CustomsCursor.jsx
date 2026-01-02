import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const posRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    useEffect(() => {
        // ✅ Disable on touch devices (important)
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const moveHandler = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;

            // start RAF loop only once
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        const animate = () => {
            const cursor = cursorRef.current;
            if (!cursor) return;

            // Smooth follow (lerp)
            posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.2;
            posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.2;

            cursor.style.transform = `
        translate3d(
          ${posRef.current.x - 40}px,
          ${posRef.current.y - 40}px,
          0
        )
      `;

            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", moveHandler, { passive: true });

        return () => {
            window.removeEventListener("mousemove", moveHandler);
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-500 blur-3xl opacity-150" />
        </div>
    );
}
