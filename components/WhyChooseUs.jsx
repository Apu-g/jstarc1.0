"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Medal } from "lucide-react";

const features = [
    {
        title: "Classes for All Ages",
        description: "From kids and teens to adults and families, we offer programs tailored to every age and skill level.",
        icon: Users,
        color: "bg-green-100 text-green-600",
    },
    {
        title: "Flexible Schedule",
        description: "Our diverse class schedule is designed to fit your busy life, with options available throughout the week.",
        icon: Calendar,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Proven Achievements",
        description: "Join a community of champions. Our students consistently excel in local, state, and national competitions.",
        icon: Medal,
        color: "bg-yellow-100 text-yellow-600",
    },
];

export const WhyChooseUs = () => {
    return (
        <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Train with JStarc?</h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl text-center hover:border-red-600 transition-colors group"
                        >
                            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-500`}>
                                <feature.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
