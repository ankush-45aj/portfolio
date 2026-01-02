import profileImg from "../assets/profile.png"; // replace with your image

export default function About() {
    return (
        <section id="about" className="w-full min-h-screen bg-black text-white px-6 py-24">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                {/* LEFT — PROFILE IMAGE */}
                <div className="flex justify-center md:justify-start">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-40"></div>
                        <img
                            src={profileImg}
                            alt="Profile"
                            className="relative w-100 h-90 object-cover rounded-2xl border border-white/10"
                        />
                    </div>
                </div>

                {/* RIGHT — CONTENT */}
                <div>
                    {/* NAME */}
                    <h1 className="text-4xl md:text-5xl font-extrabold">
                        <span className="text-white">Ankush</span>{" "}
                        <span className="text-pink-500">Jha</span>
                    </h1>

                    {/* ROLE */}
                    <p className="mt-3 text-lg text-gray-400">
                        Full Stack Developer
                    </p>

                    {/* DESCRIPTION */}
                    <p className="mt-6 text-gray-300 leading-relaxed max-w-xl">
                        I build scalable, modern web applications with a strong focus on
                        clean architecture, delightful user experiences, and performance.
                        I love transforming ideas into production-ready products using
                        modern technologies.
                    </p>

                    {/* STATS */}
                    <div className="mt-5 grid grid-cols-3 gap-1 max-w-xl">
                        {[
                            { title: "Experience", value: "1+ Years" },
                            { title: "Specialty", value: " Full Stack, AI&ML" },
                            { title: "Focus", value: "UI & UX, performance" },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                            >
                                <p className="text-sm text-gray-300">{item.title}</p>
                                <p className="text-sm font-semibold mt-1">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA BUTTONS */}
                    <div className="mt-10 flex gap-4">
                        <a
                            href="#projects"
                            className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="px-6 py-3 rounded-full border border-white/20 hover:border-pink-500 text-white transition"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>

            {/* ABOUT ME SECTION */}
            <div className="max-w-6xl mx-auto mt-24">
                <h2 className="text-3xl font-bold mb-6">About Me</h2>
                <p className="text-gray-400 max-w-3xl leading-relaxed">
                    I am an AI & Machine Learning student pursuing B.Tech.
                    Alongside my core studies,have a Experience about 1 years in web dev , start a startup "Grey Matter Accademy" runs independently  I’m actively building skills in web development.
                    I enjoy turning ideas into functional, user-friendly applications.
                    Learning new technologies and improving my problem-solving keeps me motivated.
                    I believe in consistent practice and hands-on projects for real growth.
                    Focused on building a strong foundation for a future in tech.
                </p>
            </div>
        </section>
    );
}
