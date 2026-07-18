import { Typewriter } from "react-simple-typewriter";
import { FaXTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import HeroPortrait from "../components/HeroPortrait";
import ParticlesBackground from "../components/ParticlesBackground";

export default function Home() {
  return (
    <section id="home" className="w-full h-screen relative bg-black overflow-hidden flex items-center">
      <ParticlesBackground />

      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[60px]" />
      <div className="absolute right-0 bottom-0 w-[300px] h-[400px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[60px]" />

      <div className="z-10 w-full px-[clamp(1.25rem,2vw,3rem)] grid grid-cols-1 md:grid-cols-[0.72fr_1.28fr] items-center gap-10">
        <div className="text-white space-y-6">
          <p className="text-sm tracking-widest text-gray-400 uppercase">Software Developer</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="text-[#1cd8d2]">Hello, I&apos;m</span><br />
            Ankush Jha
          </h1>
          <h2 className="text-xl sm:text-2xl text-gray-300">
            <Typewriter
              words={["Full Stack Developer", "React Enthusiast", "AI & ML Student", "Building Modern Web Apps"]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h2>
          <p className="text-gray-400 max-w-lg">
            I turn complex ideas into seamless, fast and scalable web applications with clean UI and strong performance.
          </p>
          <div className="hero-buttons">
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="primary-btn">
              View My Work
            </button>
            <a href="/resume.pdf" download className="primary-btn">Download Resume</a>
          </div>
          <div className="social-icons">
            <a href="https://x.com/ankushjha45" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href="https://www.instagram.com/_ankush_45/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/ankush-jha-a04228376/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://github.com/ankush-45aj" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </div>

        <HeroPortrait />
      </div>
    </section>
  );
}
