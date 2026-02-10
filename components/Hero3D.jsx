"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blackbelts } from "@/data/blackbelts";
import { useLoading } from "@/contexts/LoadingContext";

// --- Components ---

const LoadingScreen = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={onComplete}
    >
      {/* Spinning ring */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-2 border-slate-700 animate-spin"
          style={{
            borderTopColor: '#00f3ff',
            borderRightColor: '#00f3ff',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/assets/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
        </div>
      </div>

      {/* Logo text */}
      <motion.h1
        className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        JSTARC
      </motion.h1>
      <motion.p
        className="text-lg tracking-[0.5em] text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        BENGALURU
      </motion.p>

      {/* Loading bar */}
      <div className="mt-10 w-48 h-0.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#00f3ff] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
        />
      </div>
    </motion.div>
  );
};

const IntroAnimation = ({ onComplete }) => {
  // Use first 4 blackbelts or placeholders if not enough
  const displayFighters = blackbelts.slice(0, 4).map((b, i) => ({
    src: b.img,
    ...[
      { x: -300, y: -100, rotate: -15, delay: 0 },
      { x: 300, y: -50, rotate: 12, delay: 0.1 },
      { x: -200, y: 100, rotate: -8, delay: 0.2 },
      { x: 250, y: 80, rotate: 10, delay: 0.3 }
    ][i % 4]
  }));

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black overflow-hidden perspective-container pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3.5, duration: 0.8 }}
      onAnimationComplete={onComplete}
    >
      {/* Logo flying back */}
      <motion.div
        className="absolute z-10 flex flex-col items-center"
        initial={{ scale: 3, y: 0 }}
        animate={{ scale: 1, y: -180 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
          JSTARC
        </h1>
        <p className="text-center text-lg tracking-[0.5em] text-slate-400">
          BENGALURU
        </p>
      </motion.div>

      {/* Fighter photos rushing toward camera */}
      {displayFighters.map((fighter, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            scale: 0.1,
            x: fighter.x * 0.3,
            y: fighter.y * 0.3,
            rotateY: fighter.rotate,
            rotateZ: fighter.rotate * 0.5,
            opacity: 0,
            z: -1000,
          }}
          animate={{
            scale: 1.4,
            x: fighter.x,
            y: fighter.y,
            rotateY: 0,
            rotateZ: 0,
            opacity: [0, 1, 1, 0],
            z: 500,
          }}
          transition={{
            duration: 1.8,
            delay: 0.8 + fighter.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative">
            <img
              src={fighter.src}
              alt="Fighter"
              className="w-40 md:w-56 h-auto rounded-lg object-cover"
              style={{
                boxShadow: "0 0 40px rgba(0, 243, 255, 0.3), 0 0 80px rgba(0, 243, 255, 0.15)",
              }}
            />
            {/* Motion trail effect */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: "linear-gradient(180deg, transparent 50%, rgba(0, 243, 255, 0.2) 100%)",
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Radial burst effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ delay: 1.5, duration: 1.5 }}
        style={{
          background: "radial-gradient(circle at center, rgba(0, 243, 255, 0.15) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(0, 243, 255, 0.12) 0%, transparent 60%)",
        }}
      />

      {/* Logo */}
      <motion.div
        className="text-center z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img src="/assets/logo.png" alt="JStarc Logo" className="w-24 h-24 md:w-32 md:h-32 object-contain mb-6 drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tighter">
          JSTARC
        </h1>
        <p className="text-xl md:text-2xl tracking-[0.6em] text-slate-400 mt-1 pl-2">
          BENGALURU
        </p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="mt-8 text-xl md:text-2xl font-light text-slate-300 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Master the Art of{" "}
        <span className="font-semibold text-[#00f3ff]">Self Defense</span>
      </motion.p>

      {/* CTA Button */}
      <motion.a
        href="#contact"
        className="mt-10 z-10 text-sm tracking-widest uppercase px-10 py-4 border border-[#00f3ff]/50 text-white hover:bg-[#00f3ff]/10 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        Join Today
      </motion.a>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-[#00f3ff]/60 to-transparent" />
        <span className="text-xs tracking-[0.3em] text-slate-500 uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
};

// --- Main Container ---

const Hero3D = () => {
  const { introShown, markIntroComplete } = useLoading();
  const [stage, setStage] = useState('loading'); // loading -> intro -> hero

  useEffect(() => {
    // If intro was already shown, skip directly to hero
    if (introShown) {
      setStage('hero');
    }
  }, [introShown]);

  useEffect(() => {
    // Prevent scrolling during loading/intro
    if (stage !== 'hero') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [stage]);

  const handleIntroComplete = () => {
    setStage('hero');
    markIntroComplete();
  };

  return (
    <div className="relative bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {stage === 'loading' && !introShown && (
          <LoadingScreen key="loader" onComplete={() => setStage('intro')} />
        )}
        {stage === 'intro' && !introShown && (
          <IntroAnimation key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <motion.div
        className="transition-opacity duration-1000"
        initial={{ opacity: introShown ? 1 : 0 }}
        animate={{ opacity: stage === 'hero' ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>
    </div>
  );
};

export default Hero3D;
