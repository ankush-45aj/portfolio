export default function OverlayMenu({ open, setOpen }) {
    const menuItems = [
        { label: "Home", id: "home" },
        { label: "About", id: "about" },
        { label: "Skills", id: "skills" },
        { label: "Projects", id: "projects" },
        { label: "Contact", id: "contact" },
    ];
    const handleMenuClick = (id) => {
        setOpen(false);
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }, 300);
    };
    return (
        <>
            {/* CLICK CATCHER — sits BELOW navbar */}
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 z-30
        ${open ? "pointer-events-auto" : "pointer-events-none"}`}
            />

            {/* TOP CURTAIN */}
            <div
                className={`fixed inset-x-0 top-0 h-1/2 bg-black z-30
        transition-transform duration-800 ease-[cubic-bezier(0.77,0,0.175,1)]
        ${open ? "translate-y-0" : "-translate-y-full"}`}
            />

            {/* BOTTOM CURTAIN */}
            <div
                className={`fixed inset-x-0 bottom-0 h-1/2 bg-black z-30
        transition-transform duration-800 ease-[cubic-bezier(0.77,0,0.175,1)]
        ${open ? "translate-y-0" : "translate-y-full"}`}
            />

            {/* MENU CONTENT — sits ABOVE curtains */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`fixed inset-0 z-40 flex flex-col items-center justify-center
        transition-opacity duration-500
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                <ul className="space-y-10 text-center">
                    {menuItems.map((item) => (
                        <li
                            key={item.label}
                            onClick={() => handleMenuClick(item.id)}
                            className="text-white text-4xl md:text-6xl font-bold tracking-widest hover:text-pink-500 transition-all cursor-pointer"
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>

                {/* Optional Mobile Button */}
                <button
                    onClick={() => handleMenuClick("contact")}
                    className="mt-16 md:hidden px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600"
                >
                    Reach Out
                </button>
            </div>
        </>
    );
}
