import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    {
        subtitle: "my react journey",
        title: "THE ART \n OF REACT",
        color: "#d97706",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2564&auto=format&fit=crop",
        description: "Building dynamic interfaces with component-based architecture and modern hooks learning form Sheryians coding school .",
        stack: ["Hooks", "Context API", "Redux", "Next.js"],
        details: { experience: "2+ Years", projects: "15+", level: "Advanced" }
    },
    {
        subtitle: "DSA",
        title: "SCALABLE \n LOGIC, \n COMPLICATED ALGO",
        color: "#3b82f6",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2564&auto=format&fit=crop",
        description: "Enterprise-grade applications with strict typing and scalable patterns .",
        stack: ["Generics", "Interfaces", "Decorators", "Advanced Types"],
        details: { experience: "1.5 Years", projects: "10+", level: "Intermediate" }
    },
    {
        subtitle: "BACKEND",
        title: "THE NODE \n ECOSYSTEM",
        color: "#10b981",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2564&auto=format&fit=crop",
        description: "High-performance backend services and RESTful API development , Mastery in node with the help of anurag singh procoder.",
        stack: ["Express", "MongoDB", "JWT", "Microservices"],
        details: { experience: "1 Year", projects: "8+", level: "Intermediate" }
    },
    {
        subtitle: "My sql and mongo db ",
        title: "DATABASE \n MASTERY",
        color: "#8b5cf6",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2564&auto=format&fit=crop",
        description: "Optimized data modeling and complex query architecture.",
        stack: ["PostgreSQL", "Redis", "Prisma", "Indexing"],
        details: { experience: "1 Year", projects: "6+", level: "Intermediate" }
    }
];

const timeline = [
    { year: "2023", title: "Started Programming", desc: "Basic computer science and problem solving.", icon: "🚀" },
    { year: "2024", title: "HTML", desc: "Learned semantic structure and web fundamentals.", icon: "🌐" },
    { year: "2024", title: "CSS", desc: "Layouts, Flexbox, Grid and responsive design.", icon: "🎨" },
    { year: "2024", title: "JavaScript Mastery", desc: "DOM, async programming and advanced concepts.", icon: "⚡" },
    { year: "2024", title: "React", desc: "Component architecture, hooks and frontend apps.", icon: "⚛️" },
    { year: "2025", title: "Backend Development", desc: "Node.js, Express and API development.", icon: "🔧" },
    { year: "2025", title: "Databases", desc: "MongoDB, SQL and data modeling.", icon: "🗄️" },
    { year: "2025", title: "Python", desc: "Scientific computing and automation.", icon: "🐍" },
    { year: "2025", title: "NumPy & Pandas", desc: "Data analysis and manipulation.", icon: "📊" },
    { year: "2025", title: "Data Visualization", desc: "Matplotlib, Seaborn and storytelling with data.", icon: "📈" },
    { year: "2025", title: "DSA", desc: "Algorithms and problem solving.", icon: "🧠" },
    { year: "2026", title: "Machine Learning", desc: "Models, training pipelines and AI systems.", icon: "🤖" }
];

const creators = [
    { name: "Anurag Singh procoder", channel: "ProCoder", focus: "React Architecture" },
    { name: "Sheryians", channel: "Coding School", focus: "UI Animations" },
    { name: "CampusX", channel: "Data Engineering", focus: "System Design" },
    { name: "harry", channel: "code with harry", focus: "python" },
    { name: "gaurav sir", channel: "DSA", focus: "java" },
];

export default function ParallaxSkillScroll() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const slides = gsap.utils.toArray(".skill-slide");

        const ctx = gsap.context(() => {
            gsap.config({ force3D: true });

            // Stack slides: all hidden except first
            gsap.set(slides, { autoAlpha: 0, scale: 1.1 });
            gsap.set(slides[0], { autoAlpha: 1, scale: 1 });

            slides.forEach((slide, i) => {
                gsap.set(slide, { zIndex: slides.length - i });
            });

            // One master timeline — same on desktop & mobile
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${slides.length * 150}%`,
                    scrub: 1.2,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                }
            });

            slides.forEach((slide, i) => {
                if (i === slides.length - 1) return;

                const next = slides[i + 1];
                const text = slide.querySelector(".text-content");
                const image = slide.querySelector(".bg-image");
                const panel = slide.querySelector(".skill-panel");

                tl.to(image, { scale: 1.3, duration: 1, ease: "none" }, i);
                tl.to(text, { y: -100, opacity: 0, filter: "blur(20px)", duration: 0.8 }, i);
                tl.to(panel, { x: 100, opacity: 0, duration: 0.6 }, i + 0.2);
                tl.to(slide, { autoAlpha: 0, scale: 0.9, duration: 1, ease: "power3.inOut" }, i + 0.5);

                tl.fromTo(
                    next,
                    { autoAlpha: 0, scale: 1.15 },
                    { autoAlpha: 1, scale: 1, duration: 1, ease: "power3.out" },
                    i + 0.5
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative w-full bg-black text-white font-sans selection:bg-amber-500 selection:text-black">

            {/* Skill Slides — pinned stack (desktop + mobile) */}
            <div ref={containerRef} className="relative block" style={{ height: "100svh" }}>
                {skills.map((skill, i) => (
                    <section
                        key={i}
                        className="skill-slide absolute inset-0 w-full overflow-hidden will-change-transform"
                        style={{ zIndex: skills.length - i }}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <img
                                src={skill.image}
                                alt={skill.title}
                                className="bg-image w-full h-full object-cover opacity-60 md:opacity-70 scale-105 md:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 md:bg-black/20" />
                        </div>

                        {/* Content */}
                        <div className="relative h-full w-full max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                            {/* Left: Text */}
                            <div className="text-content col-span-1 md:col-span-7 space-y-4 md:space-y-6 text-center md:text-left pt-20 md:pt-0">
                                <div
                                    className="inline-flex items-center gap-3 text-[11px] tracking-[0.4em] uppercase font-medium"
                                    style={{ color: skill.color }}
                                >
                                    <span className="w-12 h-px bg-current opacity-50"></span>
                                    {skill.subtitle}
                                </div>

                                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] uppercase">
                                    {skill.title.split("\n").map((line, idx) => (
                                        <span key={idx} className="block">{line}</span>
                                    ))}
                                </h1>

                                <p className="text-white/70 text-base md:text-lg max-w-md leading-relaxed font-light mx-auto md:mx-0">
                                    {skill.description}
                                </p>
                            </div>

                            {/* Right: Panel */}
                            <div className="skill-panel col-span-1 md:col-span-5 flex justify-center md:justify-end pb-20 md:pb-0">
                                <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl w-full max-w-sm space-y-6">

                                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                        <span className="text-xl md:text-2xl font-bold tracking-tight">{skill.stack[0]}</span>
                                        <span
                                            className="text-xs px-3 py-1 rounded-full border"
                                            style={{ borderColor: skill.color, color: skill.color }}
                                        >
                                            {skill.details.level}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <div className="text-[10px] uppercase tracking-wider text-white/40">Experience</div>
                                            <div className="text-lg font-semibold">{skill.details.experience}</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[10px] uppercase tracking-wider text-white/40">Projects</div>
                                            <div className="text-lg font-semibold">{skill.details.projects}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="text-[10px] uppercase tracking-wider text-white/40">Core Stack</div>
                                        <div className="flex flex-wrap gap-2">
                                            {skill.stack.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] uppercase tracking-wider text-white/40">
                                            <span>Proficiency</span>
                                            <span>85%</span>
                                        </div>
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{ width: "85%", backgroundColor: skill.color }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide Number */}
                        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-[10px] tracking-widest text-white/30">
                            0{i + 1} / 0{skills.length}
                        </div>
                    </section>
                ))}
            </div>

            {/* Learning Journey */}
            <div className="relative bg-neutral-950 py-24 md:py-32 px-6 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 md:mb-20 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Learning Journey</h2>
                        <p className="text-white/50">The path from beginner to full-stack developer</p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />

                        <div className="space-y-8 md:space-y-24">
                            {timeline.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`relative flex items-start md:items-center gap-4 md:gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="hidden md:block md:w-1/2" />

                                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full border-2 border-neutral-950 mt-1.5 md:mt-0 z-10" />

                                    <div className="pl-10 md:pl-0 md:w-1/2">
                                        <div className="p-5 md:p-6 bg-white/5 backdrop-blur border border-white/10 rounded-2xl hover:border-amber-500/50 transition-colors w-full">
                                            <div className="text-2xl md:text-3xl mb-2">{item.icon}</div>
                                            <div className="text-amber-400 text-sm font-bold mb-1">{item.year}</div>
                                            <div className="text-white/90 text-lg md:text-xl font-bold mb-1">{item.title}</div>
                                            <div className="text-white/60 text-sm">{item.desc}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mentors */}
                    <div className="mt-24 md:mt-32">
                        <h3 className="text-xl md:text-2xl font-bold text-center mb-8 md:mb-12 text-white/80">Key Mentors</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {creators.map((creator, idx) => (
                                <div
                                    key={idx}
                                    className="group p-5 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mb-4 flex items-center justify-center text-base md:text-lg font-bold">
                                        {creator.name[0]}
                                    </div>
                                    <div className="font-semibold text-base md:text-lg mb-1">{creator.name}</div>
                                    <div className="text-amber-400 text-sm mb-2">{creator.channel}</div>
                                    <div className="text-white/50 text-xs">{creator.focus}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}