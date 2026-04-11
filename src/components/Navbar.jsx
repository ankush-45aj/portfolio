import { useState } from "react";
import OverlayMenu from "./overlayMenu";
import Logo from "../assets/Logo.png";


export default function Navbar() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const handleReachOut = () => {
        const el = document.getElementById("contact");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="w-full px-6 md:px-12 py-3 md:py-4 flex items-center justify-between">

                    {/* LEFT - LOGO */}
                    <div className="text-white font-extrabold text-lg md:text-xl tracking-widest flex items-center flex-shrink-0">
                        <img src={Logo} alt="Logo" className="w-7 md:w-8 h-7 md:h-8 inline-block -mr-1" />
                        <span className="text-white">N</span>
                        <span className="text-pink-500">K</span>
                        <span className="text-white">USH</span>
                        <span className="text-white ml-1 hidden sm:inline">STUDIOS</span>
                    </div>

                    {/* CENTER/RIGHT - BUTTONS & HAMBURGER */}
                    <div className="flex items-center gap-3 md:gap-4 ml-auto">

                        {/* REACH OUT - Desktop */}
                        <button
                            className="hidden md:inline-flex px-5 md:px-6 py-2 text-sm md:text-base font-semibold rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 whitespace-nowrap flex-shrink-0"
                            onClick={handleReachOut}
                        >
                            Reach Out
                        </button>

                        {/* REACH OUT - Mobile */}
                        <button
                            className="md:hidden px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 whitespace-nowrap flex-shrink-0"
                            onClick={handleReachOut}
                        >
                            Reach Out
                        </button>

                        {/* HAMBURGER MENU */}
                        <button
                            onClick={toggleMenu}
                            className="flex flex-col gap-1.5 group z-50 relative flex-shrink-0 md:ml-0"
                            aria-label={open ? "Close Menu" : "Open Menu"}
                        >
                            <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 origin-center
                                ${open ? 'rotate-45 translate-y-2' : 'group-hover:w-7'}`}></span>

                            <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300
                                ${open ? 'opacity-0 scale-0' : 'group-hover:w-7'}`}></span>

                            <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 origin-center
                                ${open ? '-rotate-45 -translate-y-2' : 'group-hover:w-7'}`}></span>
                        </button>
                    </div>

                </div>
            </nav>

            {/* OVERLAY MENU */}
            <OverlayMenu open={open} setOpen={setOpen} />
        </>
    );
}