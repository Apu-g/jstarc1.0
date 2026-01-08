"use client";

import { motion } from "framer-motion";
import { Shield, Users, Award, Trophy, UserCheck, Medal } from "lucide-react";

const stats = [
    { id: 1, label: "Years of Operation", value: "15+", icon: Trophy },
    { id: 2, label: "Students Trained", value: "500+", icon: UserCheck },
    { id: 3, label: "Medals Won", value: "250+", icon: Medal },
];

const values = [
    {
        id: "discipline",
        title: "Discipline",
        desc: "Cultivating focus, self-control, and a strong work ethic through structured training.",
        icon: Shield,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        id: "respect",
        title: "Respect",
        desc: "Honoring our instructors, fellow students, and the traditions of Taekwondo.",
        icon: Users,
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20"
    },
    {
        id: "integrity",
        title: "Integrity",
        desc: "Upholding honesty and strong moral principles in all our actions.",
        icon: Award,
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500/20"
    }
];

export const About = () => {
    return (
        <section id="about" className="relative py-24 bg-zinc-950 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/assets/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-zinc-900/50 to-black pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">About JStarc</h2>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Passion. Discipline. Excellence.</h1>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
                </motion.div>

                {/* Our Story */}
                <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <div className="relative rounded-2xl overflow-hidden group">
                            {/* Subtle red gradient overlay for theme consistency */}
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent opacity-60 mix-blend-overlay z-10" />
                            <img
                                src="/assets/1.jpg"
                                alt="JStarc Training"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:w-1/2 space-y-8"
                    >
                        <div>
                            <h3 className="text-3xl font-bold mb-4 text-white">Our Story</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                Founded with a passion for martial arts and a commitment to personal growth, <span className="text-white font-semibold">JStarc Taekwondo Club</span> has been a pillar of the community for over a decade. Our journey began with a small group of dedicated students and has grown into a thriving family of martial artists, united by a shared dedication to excellence.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Mission & Values */}
                <div className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Mission & Values</h3>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            We are dedicated to fostering an environment of respect, discipline, and perseverance. Our core values guide every aspect of our training, helping students build character both on and off the mat.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className={`p-8 rounded-2xl border ${item.border} ${item.bg} bg-opacity-5 relative overflow-hidden group hover:bg-opacity-10 transition-all duration-300`}
                            >
                                <div className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center mb-6`}>
                                    <item.icon className={`w-7 h-7 ${item.color}`} />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Team Philosophy */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-zinc-900/50 rounded-3xl p-12 text-center mb-32 border border-zinc-800 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
                    <h3 className="text-3xl font-bold mb-6">Team Philosophy</h3>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-4xl mx-auto italic">
                        "Our coaching philosophy is centered on positive reinforcement and individual attention. We believe in nurturing each student's potential, celebrating progress, and building a supportive community where everyone feels empowered to achieve their personal best."
                    </p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="pt-8 md:pt-0 px-4"
                        >
                            <stat.icon className="w-10 h-10 text-red-600 mx-auto mb-4 opacity-80" />
                            <div className="text-5xl font-black text-white mb-2">{stat.value}</div>
                            <div className="text-gray-500 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
                            {index === 1 && <p className="text-xs text-gray-600 mt-2">Impacting lives daily</p>}
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};
