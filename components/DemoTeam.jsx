"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScrambledText from "@/components/ui/scrambled-text";

// Team images for orbiting
const orbitImages = [
    "/assets/jstarc_team/007ed55b-c516-468b-b3d6-9a1c62f5a38d.jpg",
    "/assets/jstarc_team/0e07f5c2-9b97-415a-b0b3-c148dceef470.jpg",
    "/assets/jstarc_team/1578fc6b-e846-4bd8-a5a1-2a6724080abc.jpg",
    "/assets/jstarc_team/238ac687-20db-40d0-9a4a-0414f38c8302.jpg",
    "/assets/jstarc_team/3a920344-a398-47d8-8d16-e6b3e298aa36.jpg",
    "/assets/jstarc_team/3a9679b5-216d-4d52-8e8b-e047de2f69e8.jpg",
    "/assets/jstarc_team/3f17e987-ff28-4cfd-af9c-01d0971af864.jpg",
    "/assets/jstarc_team/423f9d2f-8bb3-4dd5-9f12-2c3e38e6dcf0.jpg",
];

// Center image - the girl doing the kick
const centerImage = "/assets/central-master-kick.png";

// Single orbiting satellite component with 3D depth effect
const OrbitingSatellite = ({ image, index, total, angle, radius }) => {
    // Calculate position based on current angle
    const itemAngle = angle + (index / total) * Math.PI * 2;

    // X position on the ellipse
    const x = Math.cos(itemAngle) * radius;

    // Y position - compressed for 3D perspective effect
    const y = Math.sin(itemAngle) * (radius * 0.35);

    // Z-depth simulation: items at top of orbit (sin > 0) are "behind", bottom are "in front"
    const depth = Math.sin(itemAngle);

    // Scale based on depth - larger when in front (bottom), smaller when behind (top)
    const scale = 0.6 + (depth + 1) * 0.3; // Range: 0.6 to 1.2

    // Opacity based on depth - more visible in front, fade when behind
    const opacity = 0.3 + (depth + 1) * 0.35; // Range: 0.3 to 1.0

    // Z-index: items in front should be on top
    const zIndex = Math.round((depth + 1) * 10) + 10;

    return (
        <motion.div
            className="absolute rounded-full overflow-hidden border-2 border-white/20 bg-black"
            style={{
                width: 70,
                height: 70,
                left: "50%",
                top: "50%",
                x: x - 35,
                y: y - 35,
                scale,
                opacity,
                zIndex,
            }}
        >
            <img
                src={image}
                alt={`Team member ${index + 1}`}
                className="w-full h-full object-cover"
            />
        </motion.div>
    );
};

export const DemoTeam = () => {
    const [angle, setAngle] = useState(0);

    // Continuous rotation animation
    useEffect(() => {
        const duration = 20000; // 20 seconds for full rotation
        let startTime = Date.now();
        let animationFrame;

        const animateOrbit = () => {
            const elapsed = Date.now() - startTime;
            const progress = (elapsed % duration) / duration;
            setAngle(progress * Math.PI * 2);
            animationFrame = requestAnimationFrame(animateOrbit);
        };

        animationFrame = requestAnimationFrame(animateOrbit);

        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content - Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] mb-6">
                            <ScrambledText text="JSTARC" as="span" className="block" />
                            <ScrambledText text="BENGALURU" as="span" className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink" />
                            <ScrambledText text="DEMONSTRATION" as="span" className="block" />
                            <ScrambledText text="TEAM" as="span" className="block" />
                        </h2>
                        <p className="text-xl text-muted max-w-lg mb-8 border-l-4 border-primary pl-6">
                            Mastery, Discipline, and the Future of Martial Arts.
                        </p>
                    </motion.div>

                    {/* Right Content - Electron Orbit Animation */}
                    <div className="relative flex items-center justify-center min-h-[500px]">

                        {/* Center Image - The Girl */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                            className="relative z-30 w-52 h-52 md:w-72 md:h-72 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden"
                            style={{
                                boxShadow: "0 0 60px rgba(255,255,255,0.15), 0 0 100px rgba(239,68,68,0.1)"
                            }}
                        >
                            <img
                                src={centerImage}
                                alt="Demo Team Center"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Orbiting Satellites */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {orbitImages.map((img, index) => (
                                <OrbitingSatellite
                                    key={index}
                                    image={img}
                                    index={index}
                                    total={orbitImages.length}
                                    angle={angle}
                                    radius={200}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
