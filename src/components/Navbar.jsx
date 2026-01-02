import { useState } from "react";
import OverlayMenu from "./overlayMenu";
import Logo from "../assets/Logo.png";


export default function Navbar() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className="absolute top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* LEFT - NAME */}
                    <div className="text-white font-extrabold text-xl tracking-widest flex items-center">
                        <img src={Logo} alt="Logo" className="w-8 h-8 inline-block -mr-1" />

                        <span className="text-white inline-block">N</span>
                        <span className="text-pink-500 inline-block">K</span>
                        <span className="text-white inline-block">USH</span>
                        {/* Add margin to this span to move 'STUDIOS' */}
                        <span className="text-white inline-block ml-1">STUDIOS</span>
                    </div>




                    {/* CENTER - HAMBURGER */}
                    <button
                        onClick={toggleMenu}
                        className="flex flex-col gap-[6px] group z-50 relative"
                        aria-label={open ? "Close Menu" : "Open Menu"}
                    >
                        <span className={`w-8 h-[2px] bg-white transition-all duration-300 
        ${open ? 'rotate-45 translate-y-2' : 'group-hover:w-10'}`}></span>

                        <span className={`w-6 h-[2px] bg-white transition-all duration-300 
        ${open ? 'opacity-0' : 'group-hover:w-10'}`}></span>

                        <span className={`w-4 h-[2px] bg-white transition-all duration-300 
        ${open ? '-rotate-45 -translate-y-2 w-8' : 'group-hover:w-10'}`}></span>
                    </button>


                    {/* RIGHT - REACH OUT */}
                    <button
                        className="hidden md:inline-block px-6 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 transition-transform shadow-lg"
                        onClick={() => {
                            const el = document.getElementById("contact");
                            if (el) {
                                el.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        Reach Out
                    </button>

                </div>
            </nav>

            {/* OVERLAY MENU */}
            <OverlayMenu open={open} setOpen={setOpen} />
        </>
    );
}