"use client";

import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { DemoTeam } from "@/components/DemoTeam";
import { ConstellationTeam } from "@/components/ConstellationTeam";

const masters = [
    {
        name: "Master Jai Kumar Kannan",
        designation: "Head Instructor - 5th Dan Black Belt",
        src: "/assets/masters/jaimaster.jpg",
        quote: "Dedication and discipline are the pillars of success. Taekwondo is not just a sport, it's a way of life."
    },
    {
        name: "Master Nilesh Jalnawala",
        designation: "Senior Coach - 4th Dan Black Belt",
        src: "/assets/masters/nilesh master.jpg",
        quote: "Striving for excellence in every kick and punch. Focus, power, and respect define our practice."
    },
    {
        name: "Master Kumar Imam",
        designation: "Senior Instructor",
        src: "/assets/masters/kumarimam.jpg",
        quote: "Empowering students through the art of self-defense. Building confidence one step at a time."
    },
    {
        name: "Master Balendra",
        designation: "Instructor",
        src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder for now
        quote: "Consistent effort brings consistent results. Train hard, stay humble, and grow strong."
    },
    {
        name: "Master Kumar",
        designation: "Instructor",
        src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder as original was empty
        quote: "Passion for teaching connects us all. Seeing students progress is the greatest reward."
    }
];

const memberData = [
    { id: 1, name: "Vivek", rank: "Black Belt", desc: "Demonstration Team", img: "/assets/jstarc_blackbelts/vivek.png", facePos: "50% 5%" },
    { id: 2, name: "Rajesh", rank: "Black Belt", desc: "Senior Coach", img: "/assets/jstarc_blackbelts/rajesh.png", facePos: "50% 15%" },
    { id: 3, name: "Manju", rank: "Black Belt", desc: "Instructor", img: "/assets/jstarc_blackbelts/manju.png", facePos: "50% 15%" },
    { id: 4, name: "Kishore", rank: "Black Belt", desc: "Power Breaking", img: "/assets/jstarc_blackbelts/kishore.png", facePos: "50% 5%" },
    { id: 5, name: "Kaif", rank: "Black Belt", desc: "Sparring Champion", img: "/assets/jstarc_blackbelts/kaif.png", facePos: "50% 15%" },
    { id: 6, name: "Jayesh", rank: "Black Belt", desc: "Poomsae Expert", img: "/assets/jstarc_blackbelts/jayesh.png", facePos: "50% 15%" },
    { id: 7, name: "Jadon", rank: "Black Belt", desc: "Technical Specialist", img: "/assets/jstarc_blackbelts/jadon.png", facePos: "50% 15%" },
    { id: 8, name: "Apu", rank: "Black Belt", desc: "Master", img: "/assets/jstarc_blackbelts/apu.png", facePos: "50% 15%" },
];

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
            <ConstellationTeam members={memberData} />
        </section>
    );
};
