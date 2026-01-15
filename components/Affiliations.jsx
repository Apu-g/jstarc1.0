"use client";

import { motion } from "framer-motion";

const affiliations = [
    "/assets/logos/affiliated1.jpg",
    "/assets/logos/affiliated2.jpg",
    "/assets/logos/affiliated3.jpg",
    "/assets/logos/affiliated4.jpg",
];

export const Affiliations = () => {
    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Affiliated To</h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {affiliations.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                        >
                            {/* Glass Reflection */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                            {/* Logo Container - Clean white box for best visibility of logos */}
                            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-white p-4 shadow-inner">
                                <img
                                    src={src}
                                    alt={`Affiliation ${index + 1}`}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
