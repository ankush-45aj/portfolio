import { useState } from "react";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomsCursor";
import IntroAnimation from "./components/introAnimation";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Project from "./sections/Project";
import Contact from "./sections/Contact";
import SplineFooter from "./sections/Footer";
// import Experience from "./sections/Experience";
// import Testimonials from "./sections/Testimonials";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  return (
    <div className="relative gradient text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Project />
      {/* <Experience /> */}
      {/* <Testimonials /> */}
      <Contact />
      <SplineFooter />
      {showIntro && <IntroAnimation onFinish={() => setShowIntro(false)} />}
    </div>
  );
}
