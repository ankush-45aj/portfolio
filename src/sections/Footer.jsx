
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


    // Helper: check if mobile
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;

    // Lazy-load Spline only if footer is near viewport and not on mobile
    useEffect(() => {
        if (typeof window === "undefined" || isMobile) return;
        let observer;
        const loadSpline = () => {
            import("@splinetool/react-spline")
                .then((module) => {
                    setSplineComponent(() => module.default);
                })
                .catch((error) => {
                    console.warn("Spline failed to load, using fallback:", error);
                    setUseFallback(true);
                    setIsLoaded(true);
                });
        };
        if (footerRef.current && "IntersectionObserver" in window) {
            observer = new window.IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        loadSpline();
                        observer.disconnect();
                    }
                },
                { root: null, threshold: 0.1 }
            );
            observer.observe(footerRef.current);
        } else {
            loadSpline();
        }
        return () => observer && observer.disconnect();
    }, [isMobile]);


    // GSAP animations: lazy-load only if footer is near viewport and not on mobile
    useEffect(() => {
        if (typeof window === "undefined" || !footerRef.current || !textRef.current || isMobile) return;
        let observer, cleanup;
        const loadGSAP = async () => {
            let gsapAnimations = [];
            try {
                const gsap = (await import("gsap")).default;
                const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
                gsap.registerPlugin(ScrollTrigger);
                const textAnim = gsap.fromTo(
                    textRef.current,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
                gsapAnimations.push(textAnim);
                const bgAnim = gsap.to(footerRef.current, {
                    backgroundColor: "#050505",
                    ease: "none",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 80%",
                        end: "bottom bottom",
                        scrub: 1,
                    },
                });
                gsapAnimations.push(bgAnim);
            } catch (error) {
                console.warn("GSAP animations failed:", error);
            }
            cleanup = () => {
                gsapAnimations.forEach(anim => {
                    if (anim && anim.scrollTrigger) anim.scrollTrigger.kill();
                    if (anim && anim.kill) anim.kill();
                });
                gsapAnimations = [];
            };
        };
        if (footerRef.current && "IntersectionObserver" in window) {
            observer = new window.IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        loadGSAP();
                        observer.disconnect();
                    }
                },
                { root: null, threshold: 0.1 }
            );
            observer.observe(footerRef.current);
        } else {
            loadGSAP();
        }
        return () => {
            observer && observer.disconnect();
            cleanup && cleanup();
        };
    }, [isMobile]);


    // Only enable mouse parallax on desktop
    const handleMouseMove = (e) => {
        if (isMobile || !bubbleRef.current || !textRef.current || !footerRef.current) return;
        const rect = footerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        bubbleRef.current.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        textRef.current.style.transform = `translate(${-x * 20}px, ${-y * 20}px)`;
    };


    const handleMouseLeave = () => {
        if (bubbleRef.current) {
            bubbleRef.current.style.transform = "translate(0, 0)";
        }
        if (textRef.current) {
            textRef.current.style.transform = "translate(0, 0)";
        }
        setShowChat(false);
    };

    const handleBubbleClick = () => {
        // Simple interaction
        if (bubbleRef.current) {
            bubbleRef.current.style.transform = "scale(1.2)";
            setTimeout(() => {
                if (bubbleRef.current) {
                    bubbleRef.current.style.transform = "translate(0, 0) scale(1)";
                }
            }, 300);
        }
    };


    // Use a reliable Spline scene URL
    const splineScene = "https://prod.spline.design/a0ZwSyHA65saLANM/scene.splinecode";
    return (
        <footer
            ref={footerRef}
            className="spline-footer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="spline-container">
                {!isMobile && !useFallback && SplineComponent ? (
                    <>
                        <SplineComponent
                            scene={splineScene}
                            onLoad={() => {
                                setIsLoaded(true);
                                console.log("Spline loaded successfully");
                            }}
                            onError={(error) => {
                                console.error("Spline failed to load:", error);
                                setUseFallback(true);
                                setIsLoaded(true);
                            }}
                        />
                        {!isLoaded && (
                            <div className="loader">
                                <div className="loader-spinner"></div>
                                Initializing AI...
                            </div>
                        )}
                    </>
                ) : (
                    // Fallback 3D-like visualization (fewer elements for perf)
                    <div className="fallback-scene">
                        <div className="robot-container">
                            <div className="robot-head">🤖</div>
                            <div className="robot-body"></div>
                            <div className="robot-arm left"></div>
                            <div className="robot-arm right"></div>
                        </div>
                        <div className="floating-elements">
                            {[...Array(isMobile ? 4 : 7)].map((_, i) => (
                                <div
                                    key={i}
                                    className="floating-element"
                                    style={{
                                        animationDelay: `${i * 0.15}s`,
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div
                ref={bubbleRef}
                className="ai-bubble"
                onMouseEnter={() => setShowChat(true)}
                onMouseLeave={() => setShowChat(false)}
                onClick={handleBubbleClick}
            >
                <span className="bubble-emoji">🤖</span>
                <div className={`chat-box ${showChat ? "visible" : ""}`}>
                    {useFallback ? "System Ready" : "System Online"}<br />
                    Click to interact!
                </div>
            </div>

            <div ref={textRef} className="footer-content">
                <h2>Let's Build Something Intelligent</h2>
                <p>Code × Creativity × 3D Experience</p>
                <span>© {new Date().getFullYear()} Ankush Jha</span>
            </div>
        </footer>
    );
}