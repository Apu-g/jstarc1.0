"use client";

import { motion } from "framer-motion";
import LogoLoop from './LogoLoop';

const brands = [
    "/assets/logos/powerbrand1.jpg",
    "/assets/logos/powerbrand2.jpg",
    "/assets/logos/powerbrand3.jpg",
    "/assets/logos/powerbrand4.png",
    "/assets/logos/powerbrand5.png",
];

export const PowerBrands = () => {
    // Format logos for LogoLoop
    const logoItems = brands.map((src, index) => ({
        src,
        alt: `Powerbrand ${index + 1}`,
        // Add styling for internal logo rendering if needed, 
        // but LogoLoop handles images directly via 'src' prop in items
    }));

    return (
        <section className="py-12 relative border-b border-white/5">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-8"
                >
                    <h2 className="text-4xl font-bold text-white mb-4 text-glow">Powerbrands</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
                </motion.div>

                <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] transition-shadow duration-300">
                    <LogoLoop
                        logos={logoItems}
                        speed={100}
                        direction="left"
                        logoHeight={80} // Increased height for better visibility
                        gap={60}
                        pauseOnHover={true}
                        width="100%" // Container controls width
                        className="opacity-90 hover:opacity-100 transition-all duration-500"
                    />
                </div>
            </div>
        </section>
    );
};
