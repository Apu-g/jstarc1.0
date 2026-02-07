"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Award, Instagram, Youtube } from "lucide-react";

const beltColors = {
    "White": "#e5e7eb",
    "Yellow": "#facc15",
    "Green": "#22c55e",
    "Blue": "#3b82f6",
    "Red": "#ef4444",
    "Black": "#7c3aed",
    "Black Belt": "#7c3aed",
    "Red Belt": "#ef4444"
};

const getBeltColor = (rank) => {
    if (!rank) return beltColors["Black"];
    for (const key of Object.keys(beltColors)) {
        if (rank.includes(key)) return beltColors[key];
    }
    return beltColors["Black"];
};

// Dummy data generator for empty fields
const enrichMemberData = (member) => ({
    ...member,
    bio: member.bio || `A dedicated martial artist with a passion for excellence. ${member.name} has shown remarkable growth and technical proficiency in their journey to ${member.rank}.`,
    achievements: member.achievements || ["State Championship Gold 2024", "National Qualifier", "Best Technical Player"],
    certificates: ["Kukkiwon 1st Dan", "State Referee Class C"],
    gallery: [
        member.img,
        "/assets/jstarc_team/007ed55b-c516-468b-b3d6-9a1c62f5a38d.jpg",
        "/assets/jstarc_team/0e07f5c2-9b97-415a-b0b3-c148dceef470.jpg"
    ],
    socials: {
        insta: "#",
        yt: "#"
    }
});

const ParticleDust = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.3 + 0.1
        }));
        setTimeout(() => setParticles(newParticles), 0);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-white will-change-transform"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [p.opacity, p.opacity * 1.2, p.opacity],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

const ConstellationNode = ({ member, xPos, yPos, isActive, onFocus }) => {
    const color = getBeltColor(member.rank);
    const [isHovered, setIsHovered] = useState(false);
    
    // Active state is either scrolled-to (isActive) or hovered
    const isActiveState = isActive || isHovered;
    
    // Determine info panel position: if node is on right (xPos > 0), show panel on left. And vice versa.
    const isRightSide = xPos > 0;

    return (
        <motion.div
            className="absolute w-full flex justify-center will-change-transform z-20"
            style={{ top: yPos }}
            initial={{ opacity: 0 }}
            animate={{ 
                opacity: 1,
                zIndex: isHovered ? 50 : (isActive ? 40 : 20)
            }}
            transition={{ duration: 0.5 }}
        >
            <div 
                className="relative flex items-center justify-center"
                style={{ 
                    transform: `translateX(${xPos}px)`,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Node Container */}
                <motion.div
                    className="relative group cursor-pointer will-change-transform"
                    onClick={() => onFocus(member)}
                    animate={{ 
                        scale: isActiveState ? 1.2 : 1,
                    }}
                    whileHover={{ scale: 1.25 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {/* Pulsing Glow (Active/Hovered) */}
                    {isActiveState && (
                        <motion.div 
                            className="absolute -inset-8 rounded-full blur-xl opacity-40 pointer-events-none"
                            style={{ backgroundColor: color }}
                            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}

                    {/* Node Image Circle */}
                    <div 
                        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full p-[2px] transition-all duration-300 bg-black overflow-hidden"
                        style={{ 
                            boxShadow: isActiveState ? `0 0 30px ${color}60` : '0 0 15px rgba(255,255,255,0.1)',
                            border: `2px solid ${isActiveState ? color : 'rgba(255,255,255,0.2)'}`
                        }}
                    >
                        <motion.img 
                            layoutId={`image-${member.id}`}
                            src={member.img} 
                            alt={member.name} 
                            className="w-full h-full object-cover transition-all duration-500"
                            style={{
                                filter: isActiveState ? "grayscale(0%)" : "grayscale(100%) brightness(0.7)",
                                objectPosition: member.facePos || "center top"
                            }}
                            transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                        />
                    </div>

                    {/* Connector Dot removed */}
                </motion.div>

                {/* Occurrence Indicator / Info Panel */}
                <AnimatePresence>
                    {isActiveState && (
                        <motion.div
                            initial={{ opacity: 0, x: isRightSide ? 20 : -20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: isRightSide ? 20 : -20, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            onClick={() => onFocus(member)}
                            className={cn(
                                "absolute top-1/2 -translate-y-1/2 w-64 pointer-events-none md:pointer-events-auto hidden md:block cursor-pointer transition-colors",
                                isRightSide ? "right-full mr-6 text-right" : "left-full ml-6 text-left"
                            )}
                        >
                            <h4 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{member.name}</h4>
                            <p className="text-sm uppercase tracking-[0.2em] font-bold opacity-90" style={{ color }}>{member.rank}</p>
                            {member.desc && <p className="text-slate-300 text-sm mt-2 font-medium opacity-80">{member.desc}</p>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

// Full-Screen Morphing Overlay
const FocusModeOverlay = ({ member, index, onClose }) => {
    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "auto"; };
    }, []);

    if (!member) return null;
    
    const color = getBeltColor(member.rank);
    const enrichedMember = enrichMemberData(member);
    const isEven = index % 2 === 0;

    return (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={onClose}
            />

            <div className={`relative w-full h-full flex flex-col md:flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} pointer-events-none`}>
                
                {/* Image Side - Morph Target */}
                <div 
                    className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <motion.img 
                        layoutId={`image-${member.id}`}
                        src={member.img} 
                        alt={member.name} 
                        className="w-full h-full object-contain"
                        style={{ objectPosition: "center" }}
                        transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                    />
                    <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         transition={{ duration: 0.3 }}
                         className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r" 
                    />
                    
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors md:hidden"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content Side */}
                <motion.div 
                    className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 overflow-y-auto bg-black/40 md:bg-transparent pointer-events-auto"
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isEven ? 50 : -50 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={onClose}
                        className="hidden md:block absolute top-8 right-8 z-50 p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <div className="space-y-8 max-w-2xl mx-auto md:mx-0">
                        <div>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-sm font-bold tracking-[0.3em] uppercase mb-4" 
                                style={{ color }}
                            >
                                {member.rank}
                            </motion.p>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-7xl font-black text-white leading-none mb-6"
                            >
                                {member.name}
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-slate-300 text-lg leading-relaxed font-light"
                            >
                                {enrichedMember.bio}
                            </motion.p>
                        </div>

                        <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="h-px w-full bg-white/20 origin-left" 
                        />

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
                                <Award className="text-yellow-500" /> Achievements
                            </h3>
                            <ul className="space-y-4">
                                {enrichedMember.achievements.map((achievement, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-300 text-lg">
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
                                        {achievement}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex gap-6 pt-8"
                        >
                            <a href="#" className="p-4 rounded-full bg-white/5 hover:bg-white/10 hover:text-pink-500 transition-all text-white border border-white/10">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="p-4 rounded-full bg-white/5 hover:bg-white/10 hover:text-red-500 transition-all text-white border border-white/10">
                                <Youtube size={24} />
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export const ConstellationTeam = ({ members }) => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
    const [activeIndex, setActiveIndex] = useState(0);
    const [focusedMember, setFocusedMember] = useState(null);
    
    // Spacing configuration
    const NODE_SPACING = 300; 
    const TOTAL_HEIGHT = members.length * NODE_SPACING + 400;
    
    // Update dimensions on resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: TOTAL_HEIGHT
                });
            }
        };
        
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [TOTAL_HEIGHT]);

    // Calculate node positions (Sine Wave)
    const nodePositions = useMemo(() => {
        return members.map((_, i) => {
            const isDesktop = dimensions.width > 768;
            const baseAmp = isDesktop ? Math.min(dimensions.width * 0.18, 220) : Math.min(dimensions.width * 0.14, 110);
            const side = i % 2 === 0 ? -1 : 1;
            const wobble = Math.sin(i * 0.9) * (baseAmp * 0.18);
            const x = side * baseAmp + wobble;
            const y = i * NODE_SPACING + 200; // Start offset
            return { x, y };
        });
    }, [members, dimensions, NODE_SPACING]);

    // Generate SVG Path
    const pathD = useMemo(() => {
        if (nodePositions.length === 0) return "";
        let d = `M ${dimensions.width / 2 + nodePositions[0].x} ${nodePositions[0].y}`;
        for (let i = 0; i < nodePositions.length - 1; i++) {
            const curr = nodePositions[i];
            const next = nodePositions[i+1];
            const p1 = { x: dimensions.width / 2 + curr.x, y: curr.y };
            const p2 = { x: dimensions.width / 2 + next.x, y: next.y };
            const cp1 = { x: p1.x, y: (p1.y + p2.y) / 2 };
            const cp2 = { x: p2.x, y: (p1.y + p2.y) / 2 };
            d += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}`;
        }
        return d;
    }, [nodePositions, dimensions]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    
    // Sync active index with scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const scrollPx = latest * (TOTAL_HEIGHT - window.innerHeight);
        const centerOffset = window.innerHeight / 2;
        const currentY = scrollPx + centerOffset;

        let closestIndex = 0;
        let minDiff = Infinity;
        
        nodePositions.forEach((pos, index) => {
            const diff = Math.abs(pos.y - currentY);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = index;
            }
        });
        
        if (closestIndex !== activeIndex) {
            setActiveIndex(closestIndex);
        }
    });

    const focusedIndex = focusedMember ? members.findIndex(m => m.id === focusedMember.id) : -1;

    return (
        <section 
            className="relative w-full bg-[#050507]"
            style={{ height: TOTAL_HEIGHT }}
        >
            <AnimatePresence>
                {focusedMember && (
                    <FocusModeOverlay 
                        member={focusedMember} 
                        index={focusedIndex}
                        onClose={() => setFocusedMember(null)}
                    />
                )}
            </AnimatePresence>

            {/* Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#0a0a0f] to-[#050507]" />
            <div className="absolute inset-0 opacity-[0.03]" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />
            
            <ParticleDust />

            <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
                {/* Header */}
                <div className="absolute top-20 left-0 w-full text-center z-20 pointer-events-none">
                     <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2 text-glow">
                        Black Belts
                    </h2>
                    <p className="text-blue-200/50 uppercase tracking-[0.3em] text-sm font-light">
                        Rising Stars
                    </p>
                </div>

                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="10%" stopColor="rgba(59, 130, 246, 0.4)" />
                            <stop offset="50%" stopColor="rgba(124, 58, 237, 0.8)" />
                            <stop offset="90%" stopColor="rgba(59, 130, 246, 0.4)" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                        <filter id="glowLine">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    
                    {/* Background Trace Line */}
                    <path 
                        d={pathD}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="1"
                    />
                    
                    {/* Animated Drawing Line - Synced with scroll */}
                    <motion.path 
                        d={pathD}
                        fill="none"
                        stroke="url(#pathGradient)"
                        strokeWidth="3"
                        filter="url(#glowLine)"
                        style={{ pathLength: scrollYProgress }}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Nodes */}
                {members.map((member, index) => (
                    <ConstellationNode 
                        key={member.id}
                        member={member}
                        xPos={nodePositions[index]?.x || 0}
                        yPos={nodePositions[index]?.y || 0}
                        isActive={index === activeIndex}
                        onFocus={setFocusedMember}
                    />
                ))}
            </div>
        </section>
    );
};

export default ConstellationTeam;