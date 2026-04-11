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
        details: {
            experience: "2+ Years",
            projects: "15+",
            level: "Advanced"
        }
    },
    {
        subtitle: "DSA",
        title: "SCALABLE \n LOGIC, \n COMPLICATED ALGO",
        color: "#3b82f6",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2564&auto=format&fit=crop",
        description: "Enterprise-grade applications with strict typing and scalable patterns .",
        stack: ["Generics", "Interfaces", "Decorators", "Advanced Types"],
        details: {
            experience: "1.5 Years",
            projects: "10+",
            level: "Intermediate"
        }
    },
    {
        subtitle: "BACKEND",
        title: "THE NODE \n ECOSYSTEM",
        color: "#10b981",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2564&auto=format&fit=crop",
        description: "High-performance backend services and RESTful API development , Mastery in node with the help of anurag singh procoder.",
        stack: ["Express", "MongoDB", "JWT", "Microservices"],
        details: {
            experience: "1 Year",
            projects: "8+",
            level: "Intermediate"
        }
    },
    {
        subtitle: "My sql and mongo db ",
        title: "DATABASE \n MASTERY",
        color: "#8b5cf6",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2564&auto=format&fit=crop",
        description: "Optimized data modeling and complex query architecture.",
        stack: ["PostgreSQL", "Redis", "Prisma", "Indexing"],
        details: {
            experience: "1 Year",
            projects: "6+",
            level: "Intermediate"
        }
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
    const footerRef = useRef(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // Show slides normally on mobile (no animation)
            gsap.set(".skill-slide", {
                clearProps: "all",
                position: "relative",
                autoAlpha: 1
            });
            return;
        }

        let ctx = gsap.context(() => {
            gsap.config({
                force3D: true
            });

            const slides = gsap.utils.toArray(".skill-slide");

            // Initial setup with proper z-index
            gsap.set(slides, { autoAlpha: 0, scale: 1.1 });
            gsap.set(slides[0], { autoAlpha: 1, scale: 1, zIndex: slides.length });

            // Set z-index for all slides
            slides.forEach((slide, i) => {
                gsap.set(slide, { zIndex: slides.length - i });
            });

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

                const current = slide;
                const next = slides[i + 1];
                const text = current.querySelector(".text-content");
                const image = current.querySelector(".bg-image");
                const info = current.querySelector(".skill-panel");

                // Parallax zoom out current
                tl.to(image, {
                    scale: 1.3,
                    duration: 1,
                    ease: "none"
                }, i);

                tl.to(text, {
                    y: -100,
                    opacity: 0,
                    filter: "blur(20px)",
                    duration: 0.8,
                    ease: "power2.in"
                }, i);

                tl.to(info, {
                    x: 100,
                    opacity: 0,
                    duration: 0.6
                }, i + 0.2);

                tl.to(current, {
                    autoAlpha: 0,
                    duration: 0.6
                }, i + 0.8);

                // Bring in next slide
                tl.to(next, {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out"
                }, i + 0.6);
            });

            // Footer reveal
            if (footerRef.current) {
                gsap.from(footerRef.current, {
                    y: 100,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full bg-black text-white font-sans selection:bg-amber-500 selection:text-black">

            {/* Skill Slides Container */}
            <div className="relative h-screen">
                {skills.map((skill, i) => (
                    <section
                        key={i}
                        className="skill-slide absolute inset-0 w-full h-full overflow-hidden will-change-transform"
                        style={{ zIndex: skills.length - i }}
                    >
                        {/* Background Image with Parallax */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <img
                                src={skill.image}
                                alt={skill.title}
                                loading="lazy"
                                className="bg-image w-full h-full object-cover opacity-70 scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                        </div>

                        {/* Main Content Grid */}
                        <div className="relative h-full w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">

                            {/* Left: Typography */}
                            <div className="text-content col-span-1 md:col-span-7 space-y-4 md:space-y-6 text-center md:text-left">
                                <div
                                    className="inline-flex items-center gap-3 text-[11px] tracking-[0.4em] uppercase font-medium"
                                    style={{ color: skill.color }}
                                >
                                    <span className="w-12 h-px bg-current opacity-50"></span>
                                    {skill.subtitle}
                                </div>

                                <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] uppercase">
                                    {skill.title.split("\n").map((line, idx) => (
                                        <div key={idx} className="block">{line}</div>
                                    ))}
                                </h1>

                                <p className="text-white/60 text-lg max-w-md leading-relaxed font-light">
                                    {skill.description}
                                </p>
                            </div>

                            {/* Right: Skill Info Panel */}
                            <div className="skill-panel col-span-1 md:col-span-5 flex justify-center md:justify-end">
                                <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-full max-w-sm space-y-6">

                                    {/* Skill Header */}
                                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                        <span className="text-2xl font-bold tracking-tight">{skill.stack[0]}</span>
                                        <span
                                            className="text-xs px-3 py-1 rounded-full border"
                                            style={{ borderColor: skill.color, color: skill.color }}
                                        >
                                            {skill.details.level}
                                        </span>
                                    </div>

                                    {/* Stats Grid */}
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

                                    {/* Tech Stack */}
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

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] uppercase tracking-wider text-white/40">
                                            <span>Proficiency</span>
                                            <span>85%</span>
                                        </div>
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{
                                                    width: "85%",
                                                    backgroundColor: skill.color
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide Number */}
                        <div className="absolute bottom-8 right-8 text-[10px] tracking-widest text-white/30">
                            0{i + 1} / 0{skills.length}
                        </div>
                    </section>
                ))}
            </div>

            {/* Learning Journey Section (Separate from slides) */}
            <div ref={footerRef} className="relative bg-neutral-950 py-32 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Learning Journey</h2>
                        <p className="text-white/50">The path from beginner to full-stack developer</p>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/10" />

                        <div className="space-y-24">
                            {timeline.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`timeline-item flex flex-col md:flex-row items-center gap-6 md:gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="w-full md:w-1/2 text-center md:text-left">
                                        <div className="inline-block p-6 bg-white/5 backdrop-blur border border-white/10 rounded-2xl hover:border-amber-500/50 transition-colors">
                                            <div className="text-3xl mb-2">{item.icon}</div>
                                            <div className="text-amber-400 text-sm font-bold mb-1">{item.year}</div>
                                            <div className="text-white/80 text-sm">{item.title}</div>
                                            <div className="text-amber-400 text-sm font-bold mb-1">{item.desc}</div>
                                        </div>
                                    </div>
                                    <div className="w-4 h-4 bg-amber-500 rounded-full border-4 border-black z-10" />
                                    <div className="w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mentors Section */}
                    <div className="mt-32">
                        <h3 className="text-2xl font-bold text-center mb-12 text-white/80">Key Mentors</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {creators.map((creator, idx) => (
                                <div
                                    key={idx}
                                    className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mb-4 flex items-center justify-center text-lg font-bold">
                                        {creator.name[0]}
                                    </div>
                                    <div className="font-semibold text-lg mb-1">{creator.name}</div>
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