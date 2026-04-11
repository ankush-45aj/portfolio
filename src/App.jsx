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

export default function App() {
  const [showIntro, setShowIntro] = useState(
    !sessionStorage.getItem("introPlayed")
  );

  const handleFinish = () => {
    sessionStorage.setItem("introPlayed", "true");
    setShowIntro(false);
  };

  return (
    <div className="relative gradient text-white min-h-screen">
      {/* MAIN CONTENT ALWAYS RENDERED */}
      <CustomCursor />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Project />
      <Contact />
      <SplineFooter />

      {/* INTRO OVERLAY */}
      {showIntro && <IntroAnimation onFinish={handleFinish} />}
    </div>
  );
}
