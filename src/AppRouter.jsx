import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Project from "./sections/Project";
import Contact from "./sections/Contact";
import SplineFooter from "./sections/Footer";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomsCursor";
import IntroAnimation from "./components/introAnimation";
import { useState } from "react";

export default function AppRouter() {
    const [showIntro, setShowIntro] = useState(true);
    return (
        <BrowserRouter>
            <div className="relative gradient text-white min-h-screen">
                <CustomCursor />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/projects" element={<Project />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                <SplineFooter />
                {showIntro && <IntroAnimation onFinish={() => setShowIntro(false)} />}
            </div>
        </BrowserRouter>
    );
}
