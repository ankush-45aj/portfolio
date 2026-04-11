
import { useEffect, useRef, useState } from "react";
import "./SplineFooter.css";

export default function SplineFooter() {
    const footerRef = useRef(null);
    const textRef = useRef(null);
    const bubbleRef = useRef(null);

    const [showChat, setShowChat] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [useFallback, setUseFallback] = useState(false);
    const [SplineComponent, setSplineComponent] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const handleChange = () => setIsMobile(mediaQuery.matches);
        handleChange();
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // --- DESKTOP LOGIC (Spline lazy-load) ---
    useEffect(() => {
        if (typeof window === "undefined" || isMobile) return;
        let observer;
        const loadSpline = () => {
            import("@splinetool/react-spline")
                .then((module) => setSplineComponent(() => module.default))
                .catch(() => setUseFallback(true));
        };
        if (footerRef.current) {
            observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    loadSpline();
                    observer.disconnect();
                }
            }, { threshold: 0.1 });
            observer.observe(footerRef.current);
        }
        return () => observer && observer.disconnect();
    }, [isMobile]);

    // --- SHARED HANDLERS ---
    const handleMouseMove = (e) => {
        if (isMobile || !bubbleRef.current || !textRef.current || !footerRef.current) return;
        const rect = footerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        bubbleRef.current.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        textRef.current.style.transform = `translate(${-x * 20}px, ${-y * 20}px)`;
    };

    const handleBubbleClick = () => {
        setShowChat(!showChat);
    };

    // --- MOBILE SPECIFIC VIEW ---
    // --- MOBILE SPECIFIC VIEW (Plasma Experience) ---
    if (isMobile) {
        return (
            <footer className="plasma-footer">
                {/* SVG Filter for the Gooey Effect */}
                <svg style={{ position: "absolute", width: 0, height: 0 }}>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    </filter>
                </svg>

                <div className="plasma-container" onClick={handleBubbleClick}>
                    <div className="plasma-orb">
                        <div className="blob"></div>
                        <div className="blob"></div>
                        <div className="blob"></div>
                    </div>
                    <div className={`plasma-status ${showChat ? "active" : ""}`}>
                        NEURAL LINK ESTABLISHED
                    </div>
                </div>

                <div className="plasma-content">
                    <h2 className="glitch-text" data-text="EVOLVE">EVOLVE</h2>
                    <p>Next-Gen Development</p>
                    <div className="plasma-divider"></div>
                    <span className="copyright">© {new Date().getFullYear()} Ankush Jha</span>
                </div>
            </footer>
        );
    }

    // --- DESKTOP VIEW (Your Original) ---
    return (
        <footer
            ref={footerRef}
            className="spline-footer"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                bubbleRef.current.style.transform = "translate(0,0)";
                textRef.current.style.transform = "translate(0,0)";
                setShowChat(false);
            }}
        >
            <div className="spline-container">
                {!useFallback && SplineComponent ? (
                    <>
                        <SplineComponent
                            scene="https://prod.spline.design/a0ZwSyHA65saLANM/scene.splinecode"
                            onLoad={() => setIsLoaded(true)}
                            style={{ willChange: "transform" }}
                        />
                        {!isLoaded && <div className="loader">Initializing AI...</div>}
                    </>
                ) : (
                    <div className="fallback-scene">
                        <div className="robot-head">🤖</div>
                    </div>
                )}
            </div>

            <div ref={bubbleRef} className="ai-bubble" onClick={() => setShowChat(true)}>
                <span className="bubble-emoji">🤖</span>
                <div className={`chat-box ${showChat ? "visible" : ""}`}>System Online</div>
            </div>

            <div ref={textRef} className="footer-content">
                <h2>Let's Build Something Intelligent</h2>
                <p>Code × Creativity × 3D Experience</p>
                <span>© {new Date().getFullYear()} Ankush Jha</span>
            </div>
        </footer>
    );
}