"use client";

import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

const masters = [
    {
        id: 1,
        name: "Master Jai kumar Kannan",
        role: "6th Dan Black Belt",
        desc: "Head instructor with over 20+ years of experience.",
        img: "/assets/masters/jaimaster.jpg"
    },
    {
        id: 2,
        name: "Master Nilesh Jalnawala",
        role: "8th Dan Black Belt",
        desc: "competitive poomsae.",
        img: "/assets/masters/nilesh master.jpg"
    },
];

export const HomeMasters = () => {
    return (
        <section className="py-24 overflow-hidden relative">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet Our Masters</h2>
                    <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full" />
                </motion.div>

                <div className="flex flex-wrap justify-center gap-12 md:gap-20 max-w-5xl mx-auto">
                    {masters.map((master, index) => (
                        <motion.div
                            key={master.id}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="flex-1 min-w-[300px]"
                        >
                            <SpotlightCard className="h-full flex flex-col items-center text-center">
                                <div className="relative mb-8 group">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 rounded-full bg-red-600/20 blur-2xl transform group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100" />

                                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-zinc-900 shadow-2xl relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                                        <img
                                            src={master.img}
                                            alt={master.name}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{master.name}</h3>
                                <p className="text-red-500 font-bold mb-3">{master.role}</p>
                                <p className="text-gray-400 max-w-xs mx-auto leading-relaxed">{master.desc}</p>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
