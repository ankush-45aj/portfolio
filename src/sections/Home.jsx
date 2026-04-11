import React from "react";
import { Typewriter } from "react-simple-typewriter";
import ParticlesBackground from "../components/ParticlesBackground";
import AnkushImg from "../assets/Ankush.png";
import { FaXTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";


export default function Home() {
    return (
        <section
            id="home"
            className="w-full h-screen relative bg-black overflow-hidden flex items-center"
        >
            {/* Background Particles */}
            <ParticlesBackground />

            {/* LEFT Glowing Bulb */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2
                w-[300px] h-[300px] rounded-full
                bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
                opacity-20 blur-[60px]"
            ></div>

            {/* RIGHT Glowing Bulb */}
            <div className="absolute right-0 bottom-0
                w-[300px] h-[400px] rounded-full
                bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
                opacity-20 blur-[60px]"
            ></div>

            {/* MAIN CONTENT */}
            <div className="z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">

                {/* LEFT TEXT */}
                <div className="text-white space-y-6">
                    <p className="text-sm tracking-widest text-gray-400 uppercase">
                        Software Developer
                    </p>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                        <span className="text-[#1cd8d2]">Hello, I'm</span>
                        <br />
                        Ankush Jha
                    </h1>

                    {/* TYPEWRITER */}
                    <h2 className="text-xl sm:text-2xl text-gray-300">
                        <Typewriter
                            words={[
                                "Full Stack Developer",
                                "React Enthusiast",
                                "AI & ML Student",
                                "Building Modern Web Apps",
                            ]}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={80}
                            deleteSpeed={50}
                            delaySpeed={1500}
                        />
                    </h2>

                    <p className="text-gray-400 max-w-lg">
                        I turn complex ideas into seamless, fast and scalable
                        web applications with clean UI and strong performance.
                    </p>

                    {/* BUTTONS */}
                    <div className="hero-buttons">
                        <button
                            onClick={() =>
                                document.getElementById("projects").scrollIntoView({
                                    behavior: "smooth",
                                })
                            }
                            className="primary-btn"
                        >
                            View My Work
                        </button>

                        <a
                            href="/resume.pdf"
                            download
                            className="primary-btn"
                        >
                            Download Resume
                        </a>
                    </div>
                    <div className="social-icons">
                        <a href="https://x.com/ankushjha45" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter />
                        </a>
                        <a href="https://www.instagram.com/_ankush_45/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>

                        <a href="https://www.linkedin.com/in/ankush-jha-a04228376/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn />
                        </a>

                        <a href="https://github.com/ankush-45aj" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative md:absolute md:inset-y-0 md:right-0 w-full md:w-[65%] overflow-hidden">
                    <img
                        src={AnkushImg}
                        alt="Ankush"
                        className="
            hidden md:block        /* 👈 Hides image on mobile */
            relative md:absolute
            mx-auto md:mx-0
            md:right-[-15%]
            top-0 md:top-1/2
            md:-translate-y-[50%]
            h-[320px] sm:h-[0] md:h-[130%]
            object-contain md:object-cover
            grayscale
            opacity-80
            pointer-events-none
        "
                    />
                </div>




            </div>


        </section>
    );
}
