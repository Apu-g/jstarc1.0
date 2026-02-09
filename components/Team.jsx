"use client";

import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { DemoTeam } from "@/components/DemoTeam";
import { ConstellationTeam } from "@/components/ConstellationTeam";
import { blackbelts } from "@/data/blackbelts";
import { masters } from "@/data/masters";

// --- Main Team Component ---
export const Team = () => {
    return (
        <section id="team" className="relative overflow-hidden text-white">
            {/* Section 1: Logo Intro */}
            <div className="relative h-[60vh] w-full flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="relative z-10 text-center"
                >
                    <motion.img
                        src="/assets/jstarc_logo_full.png"
                        alt="JStarc Logo"
                        className="w-[300px] md:w-[450px] mx-auto drop-shadow-2xl brightness-125 saturate-125"
                        animate={{ scale: [1, 1.02, 1], opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <p className="text-xl md:text-2xl text-muted mt-8 tracking-widest uppercase font-semibold">Our Team</p>
                </motion.div>
            </div>

            {/* Section 2: Masters Animated Testimonials */}
            <div className="relative py-12 px-2 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">Meet Our <span className="text-primary">Masters</span></h2>
                </div>
                <AnimatedTestimonials testimonials={masters} autoplay={true} />
            </div>

            {/* Section: Demonstration Team */}
            <DemoTeam />

            {/* Section 3: Constellation Team Timeline */}
            <ConstellationTeam members={blackbelts} />
        </section>
    );
};
