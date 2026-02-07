"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Medal } from "lucide-react";
import StarBorder from "./StarBorder";
import SpotlightCard from "./SpotlightCard";

const features = [
    {
        title: "Classes for All Ages",
        description: "From kids and teens to adults and families, we offer programs tailored to every age and skill level.",
        icon: Users,
        color: "bg-neon-green/20 text-neon-green shadow-[0_0_20px_rgba(10,255,10,0.3)]",
    },
    {
        title: "Flexible Schedule",
        description: "Our diverse class schedule is designed to fit your busy life, with options available throughout the week.",
        icon: Calendar,
        color: "bg-neon-blue/20 text-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.3)]",
    },
    {
        title: "Proven Achievements",
        description: "Join a community of champions. Our students consistently excel in local, state, and national competitions.",
        icon: Medal,
        color: "bg-neon-purple/20 text-neon-purple shadow-[0_0_20px_rgba(188,19,254,0.3)]",
    },
];

export const WhyChooseUs = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-glow">Why Train with JStarc?</h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green mx-auto rounded-full shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="h-full group"
                        >
                            <StarBorder as="div" className="w-full h-full" color="#00f3ff" speed="6s">
                                <SpotlightCard className="h-full text-center p-8 bg-black/40 border-none backdrop-blur-md" spotlightColor="rgba(0, 243, 255, 0.15)">
                                    <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 ${feature.color} group-hover:scale-110 transition-transform duration-500`}>
                                        <feature.icon size={40} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neon-blue group-hover:text-glow-blue transition-all duration-300">{feature.title}</h3>
                                    <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                                        {feature.description}
                                    </p>
                                </SpotlightCard>
                            </StarBorder>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
