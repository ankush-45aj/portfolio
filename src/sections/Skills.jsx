import { motion } from "framer-motion";
import { Code, Database, Github, Terminal, Atom } from "lucide-react";

const skills = [
    { name: "React", icon: <Atom size={36} className="text-sky-400" />, level: 90 },
    { name: "JavaScript", icon: <Code size={36} className="text-yellow-300" />, level: 85 },
    { name: "Node.js", icon: <Terminal size={36} className="text-green-500" />, level: 80 },
    { name: "MongoDB", icon: <Database size={36} className="text-green-400" />, level: 75 },
    { name: "Git", icon: <Github size={36} className="text-gray-300" />, level: 88 },
];

export default function Skills() {
    return (
        <section id="skills" className="bg-black text-white py-20 px-6">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-4xl-  font-bold">My Skills</h2>
                <p className="text-gray-400 mt-2">Technologies I work with & enjoy using</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="bg-gray-800 p-6 rounded-xl shadow-lg"
                    >
                        <div className="flex items-center justify-center gap-4 mb-4">
                            {skill.icon}
                            <h4 className="text-xl font-semibold">{skill.name}</h4>
                        </div>

                        {/* Skill Bar */}
                        <div className="bg-gray-700 rounded-full h-2">
                            <motion.div
                                className="bg-sky-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>

                        <span className="block text-sm text-gray-300 mt-2">
                            {skill.level}%
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
