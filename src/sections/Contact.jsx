import { useState } from "react";
// import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import emailjs from "emailjs-com";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.send(
                "service_490tqrk",
                "template_inlhqkd",
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                },
                "wxGHMYQnxcm-WzFWq"
            );

            alert("✅ Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error(error);
            alert("❌ Failed to send message. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <section
            id="contact"
            className="relative min-h-screen bg-black text-white px-6 py-24 overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-xl"></div>


            <div className="relative max-w-6xl mx-auto">
                {/* Heading */}
                <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-6">
                    Let’s Build Something <span className="text-blue-500">Awesome</span>
                </h2>

                <p className="text-gray-400 text-center max-w-2xl mx-auto mb-20">
                    I’m always open to discussing new projects, creative ideas, or
                    opportunities to be part of your vision.
                </p>

                <div className="grid md:grid-cols-2 gap-14 items-start">

                    {/* LEFT SIDE */}
                    <div className="space-y-10">

                        {/* About Me Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <Sparkles className="text-blue-500" />
                                <h3 className="text-xl font-semibold">About Me</h3>
                            </div>

                            <p className="text-gray-300 leading-relaxed">
                                I’m <span className="text-white font-medium">Ankush</span>, a
                                passionate
                                <span className="text-blue-400"> full-stack developer</span> and
                                AI & ML engineering student. I love building modern web apps with
                                clean UI, scalable backend logic, and impactful user experiences.

                                <br />
                                <br />

                                Currently focused on React, Node.js, and real-world projects that
                                create impact 🚀
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-5 text-gray-300">
                            <div className="flex items-center gap-4">
                                <Mail className="text-blue-500" />
                                <span>jhaankush47@gmail.com</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <Phone className="text-green-500" />
                                <span>+91 9764639606</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <MapPin className="text-red-500" />
                                <span>India</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/5 border border-white/10 backdrop-blur-sm p-10 rounded-2xl shadow-2xl space-y-6"
                    >
                        <div>
                            <label className="text-sm text-gray-400">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full mt-2 bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full mt-2 bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Your Message</label>
                            <textarea
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full mt-2 bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl py-4 font-semibold disabled:opacity-60"
                        >
                            {loading ? "Sending..." : "Send Message"}
                            <Send size={18} />
                        </button>
                    </form>

                </div>
            </div>


        </section>
    );
}
