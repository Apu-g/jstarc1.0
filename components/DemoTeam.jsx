"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Using placeholders for now, but configured for the circular look
const teamImages = [
    "/assets/jstarc_team/007ed55b-c516-468b-b3d6-9a1c62f5a38d.jpg",
    "/assets/jstarc_team/0e07f5c2-9b97-415a-b0b3-c148dceef470.jpg",
    "/assets/jstarc_team/1578fc6b-e846-4bd8-a5a1-2a6724080abc.jpg",
    "/assets/jstarc_team/238ac687-20db-40d0-9a4a-0414f38c8302.jpg",
    "/assets/jstarc_team/3a920344-a398-47d8-8d16-e6b3e298aa36.jpg",
    "/assets/jstarc_team/3a9679b5-216d-4d52-8e8b-e047de2f69e8.jpg",
    "/assets/jstarc_team/3f17e987-ff28-4cfd-af9c-01d0971af864.jpg",
    "/assets/jstarc_team/423f9d2f-8bb3-4dd5-9f12-2c3e38e6dcf0.jpg",
    "/assets/jstarc_team/4c1e8288-d28a-4995-803b-2ad1c756d8f2.jpg",
    "/assets/jstarc_team/673326a9-2535-46be-ad18-ba5dbada0deb.jpg",
    "/assets/jstarc_team/6d8ead85-30b3-4aec-aa81-599b07296044.jpg",
    "/assets/jstarc_team/6dd5463e-b9cd-4f06-847d-f5a8cae41b3c.jpg",
    "/assets/jstarc_team/776c05b2-5542-4c77-b09c-70bf0d82a0ce.jpg",
    "/assets/jstarc_team/7ef25940-bbd6-43e8-af96-8d0249a502e0.jpg",
    "/assets/jstarc_team/87cd94ec-efac-415e-a146-26a77fa27b2f.jpg",
    "/assets/jstarc_team/8cead97b-d9b7-4774-9805-9c877f79a5c9.jpg",
];

export const DemoTeam = () => {
    // Duplicate the array to create a seamless loop
    const duplicatedImages = [...teamImages, ...teamImages];

    return (
        <section className="py-24 overflow-hidden relative">
            <div className="container mx-auto px-6 mb-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Award-Winning Demo Team</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Witness the skill, precision, and power of our nationally recognized demonstration team.
                    </p>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full flex overflow-hidden mask-gradient-to-r from-transparent via-black to-transparent">
                <motion.div
                    className="flex gap-8 items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear"
                    }}
                    style={{ width: "max-content" }}
                >
                    {duplicatedImages.map((src, index) => (
                        <div
                            key={index}
                            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-zinc-800 flex-shrink-0 transition-all duration-300 hover:scale-110 hover:border-red-600 z-10"
                        >
                            <img
                                src={src}
                                alt={`Demo Team member ${index}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

        </section>
    );
}
