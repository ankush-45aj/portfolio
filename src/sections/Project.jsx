import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import parallax from "../assets/image1.png";
import portifolioImage from "../assets/portifolioImage.png"

gsap.registerPlugin(ScrollTrigger);

export function useHorizontalScroll({ sectionRef, trackRef, progressRef }) {
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!trackRef.current) return;
            const totalWidth = trackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            const scrollDistance = totalWidth - viewportWidth;

            if (scrollDistance <= 0) return;

            const tween = gsap.to(trackRef.current, {
                x: -scrollDistance,
                ease: "none",
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${scrollDistance}`,
                pin: true,
                scrub: true,
                animation: tween,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (progressRef?.current) {
                        progressRef.current.style.transform = `scaleX(${self.progress})`;
                        progressRef.current.style.transformOrigin = "left";
                    }
                },
            });
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);
}


/*********************************
 * PROJECTS COMPONENT
 *********************************/
const projects = [
    {
        id: 1,
        title: "AI Dashboard",
        image: "https://via.placeholder.com/500x300",
        github: "https://github.com/yourname/ai-dashboard",
        live: "https://ai-dashboard.live",
    },
    {
        id: 2,
        title: "Banking App",
        image: "https://via.placeholder.com/500x300",
        github: "https://github.com/yourname/banking-app",
        live: "https://banking-app.live",
    },
    {
        id: 3,
        title: "Paralax web",
        image: parallax,
        github: "https://github.com/ankush-45aj/parallax-web",
        live: "https://parallax-web-amber.vercel.app/",
    },
    {
        id: 4,
        title: "Portfolio",
        image: portifolioImage,
        github: "github.com/ankush-45aj/portfolio",
        live: "https://portfolio-gamma-sage-22.vercel.app/",
    },
];

export default function ProjectsHorizontalScroll() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const progressRef = useRef(null);

    useHorizontalScroll({ sectionRef, trackRef, progressRef });

    return (
        <section id="projects" ref={sectionRef} className="relative w-full bg-black">
            {/* Progress bar */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-50">
                <div ref={progressRef} className="h-full w-full bg-white scale-x-0" />
            </div>

            {/* Desktop Horizontal Scroll */}
            <div className="hidden md:flex h-screen items-center overflow-hidden">
                <div
                    ref={trackRef}
                    className="flex gap-10 px-16"
                >
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative min-w-[360px] lg:min-w-[420px] h-[240px] lg:h-[280px] rounded-2xl overflow-hidden bg-[#1a1a1a] shadow-xl"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white">
                                <h3 className="text-lg lg:text-xl font-semibold mb-4">
                                    {project.title}
                                </h3>
                                <div className="flex gap-4">
                                    <a href={project.github} target="_blank" className="px-4 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition">GitHub</a>
                                    <a href={project.live} target="_blank" className="px-4 py-2 bg-white text-black rounded-full text-sm">Live</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile / Tablet Fallback */}
            <div className="md:hidden px-5 py-20 grid gap-8">
                {projects.map((project) => (
                    <div key={project.id} className="rounded-xl overflow-hidden bg-[#1a1a1a]">
                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                        <div className="p-4 text-white">
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <div className="flex gap-4 mt-3">
                                <a href={project.github} className="underline">GitHub</a>
                                <a href={project.live} className="underline">Live</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
