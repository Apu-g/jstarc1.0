"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";

// --- Text Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: (customDelay = 0) => ({
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: customDelay,
        },
    }),
};

const letterVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.0,
            ease: "easeOut",
        },
    },
};

// --- Particle System (Three.js) ---
const Particles = () => {
    const count = 400;
    const mesh = useRef(null);

    // Generate Soft blurred circle texture programmatically
    const particleTexture = useMemo(() => {
        if (typeof document === 'undefined') return null; // Server-side guard
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        if (context) {
            const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Core
            gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)'); // Soft edge
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Fade out
            context.fillStyle = gradient;
            context.fillRect(0, 0, 32, 32);
        }
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }, []);

    // Generate random positions and slight velocity factors
    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        const velocities = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            temp[i * 3] = (Math.random() - 0.5) * 35; // x
            temp[i * 3 + 1] = (Math.random() - 0.5) * 25; // y
            temp[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
            velocities[i] = Math.random() * 0.02; // Individual speeds
        }
        return { positions: temp, velocities };
    }, []);

    useFrame((state) => {
        if (mesh.current) {
            // Gentle global rotation 
            mesh.current.rotation.y += 0.0005;
            mesh.current.rotation.x += 0.0002;
        }
    });

    if (!particleTexture) return null; // Wait for texture

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles.positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.25}
                map={particleTexture}
                transparent={true}
                depthWrite={false}
                opacity={0.8}
                sizeAttenuation={true}
                color="#ffffff"
            />
        </points>
    );
};

// Component to render text with stagger
const CinematicText = ({ text, className, delay = 0 }) => {
    return (
        <motion.div
            className={`flex flex-wrap justify-center overflow-hidden ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            custom={delay}
        >
            {text.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.div>
    );
}

export const Hero = () => {
    return (
        <section id="home" className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">

            {/* Background Image with Blur */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img
                    src="/assets/hero-bg.jpg"
                    alt="JStarc Team Background"
                    className="w-full h-full object-cover blur-[8px] scale-105"
                />
            </div>

            {/* 3D Particles Layer */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: true }}>
                    <ambientLight intensity={0.5} />
                    <Particles />
                </Canvas>
            </div>

            {/* Main Content */}
            <div className="relative z-30 container mx-auto px-6 text-center">

                <div className="flex flex-col items-center">
                    {/* Innovative Staggered Text */}
                    <div className="mb-6">
                        <CinematicText
                            text="JSTARC"
                            delay={0.2}
                            className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl uppercase tracking-tight"
                        />
                        <CinematicText
                            text="BENGALURU"
                            delay={1.2}
                            className="text-6xl md:text-8xl font-black text-gray-300 drop-shadow-2xl uppercase tracking-tight -mt-2 md:-mt-4"
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light tracking-wide mb-10"
                    >
                        Master the Art of Self Defense
                    </motion.p>

                    {/* CTA Button */}
                    <motion.a
                        href="#contact"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 bg-red-600 text-white text-lg font-bold rounded-full shadow-lg hover:bg-red-700 transition-colors uppercase tracking-widest"
                    >
                        Join Today
                    </motion.a>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-30"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent mx-auto" />
                <span className="text-[10px] uppercase tracking-[0.2em] mt-2 block backdrop-blur-sm">Scroll</span>
            </motion.div>

        </section>
    );
};
