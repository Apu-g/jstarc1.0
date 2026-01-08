"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useInView, useScroll, useSpring, useTime, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { cn } from "@/lib/utils";

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const masters = [
    { id: 1, name: "Master Jai kumar Kannan", role: "Head Instructor", img: "/assets/masters/jaimaster.jpg", info: "5th Dan Black Belt" },
    { id: 2, name: "Master Nilesh Jalnawala", role: "Senior Coach", img: "/assets/masters/nilesh master.jpg", info: "4th Dan Black Belt" },
    { id: 3, name: "Master Kumar Imam", role: "Senior Instructor", img: "/assets/masters/kumarimam.jpg", info: "Senior Instructor" },
    { id: 4, name: "Master Balendra", role: "Instructor", img: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=600&auto=format&fit=crop", info: "Instructor" },
    { id: 5, name: "Master Kumar", role: "Instructor", img: "https://images.unsplash.com/photo-1583468982260-872d5c417b1d?q=80&w=600&auto=format&fit=crop", info: "Instructor" },
];

// Duplicate masters for infinite loop illusion
const extendedMasters = [...masters, ...masters, ...masters];

const memberData = [
    { id: 1, name: "Student 1", rank: "Black Belt", desc: "Gold Medalist", img: "/assets/demo_team/0d9384c0-5180-4fcd-8642-0154d01ffd98.jpg" },
    { id: 2, name: "Student 2", rank: "Red Belt", desc: "Best Poomsae", img: "/assets/demo_team/11176fcd-c874-4638-aaf0-5d418879c21e.jpg" },
    { id: 3, name: "Student 3", rank: "Blue Belt", desc: "Sparring Pro", img: "/assets/demo_team/36654309-50f4-481a-844f-72ae6cdaa7f4.jpg" },
    { id: 4, name: "Student 4", rank: "Black Belt", desc: "Speed King", img: "/assets/demo_team/384974bc-7b49-4b59-a907-9b85b0a8444c.jpg" },
    { id: 5, name: "Student 5", rank: "Red Belt", desc: "Forms Expert", img: "/assets/demo_team/4749097e-f4a3-4058-abf6-0db21f49730f.jpg" },
    { id: 6, name: "Student 6", rank: "Red Belt", desc: "Demo Team Captain", img: "/assets/demo_team/4ffad43b-1786-40f0-a4e0-913402f4bb63.jpg" },
    { id: 7, name: "Student 7", rank: "Blue Belt", desc: "Trick Kicking", img: "/assets/demo_team/6dba0c06-1f2e-43cf-b631-b5c5a994100e.jpg" },
    { id: 8, name: "Student 8", rank: "Black Belt", desc: "Weapon Specialist", img: "/assets/demo_team/6e0036b0-6242-47fc-84e7-8f513f19f8f6.jpg" },
    { id: 9, name: "Student 9", rank: "Blue Belt", desc: "Power Breaking", img: "/assets/demo_team/838698b2-ca30-4f72-8ce0-cee1346cd6ed.jpg" },
    { id: 10, name: "Student 10", rank: "Red Belt", desc: "Flexibility", img: "/assets/demo_team/95a0c19b-54d2-4252-82f3-17b986434ecd.jpg" },
];

const DynamicGrid = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #333 1px, transparent 1px),
                        linear-gradient(to bottom, #333 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
            />
        </div>
    );
};

// --- Custom Hook for 3D Orbit Physics ---
// Added randomness to visual parameters for organic feel
const useOrbit = (idx: number, total: number, radiusX: number, radiusY: number, speed: number, yOffset: number, phaseOffset: number, isMobile: boolean) => {
    const time = useTime();
    // Increase speed base for "bit faster" feel
    const adjustedSpeed = isMobile ? speed * 1.2 : speed;
    const smoothTime = useTransform(time, [0, 100000], [0, 1000 * adjustedSpeed], { clamp: false });

    // Offset each item
    const initialAngle = (idx / total) * Math.PI * 2 + phaseOffset;

    // Reduce scale on mobile
    const currentRadiusX = isMobile ? radiusX * 0.5 : radiusX;
    const currentRadiusY = isMobile ? radiusY * 0.6 : radiusY;

    const x = useTransform(smoothTime, (t) => Math.cos(t / 10000 + initialAngle) * currentRadiusX);
    const z = useTransform(smoothTime, (t) => Math.sin(t / 10000 + initialAngle)); // Z-depth (-1 to 1)

    // Y position simulates "tilt" plus random scatter
    const y = useTransform(z, (v) => (v * currentRadiusY * 0.2) + (isMobile ? yOffset * 0.6 : yOffset));

    // Scale calculation based on Z (perspective) - More dramatic range
    const scale = useTransform(z, [-1, 1], [0.4, 1.4]);
    const opacity = useTransform(z, [-1, 1], [0.2, 1]);
    const blur = useTransform(z, [-1, 1], ["6px", "0px"]);
    const zIndex = useTransform(z, (v) => Math.round(v * 100));

    return { x, y, scale, opacity, blur, zIndex };
};

// --- Cinematic Spiral / Vortex Hero ---
const CinematicSpiral = () => {
    // Responsive check for tighter orbit on mobile
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const [orbiters, setOrbiters] = useState<any[]>([]);

    useEffect(() => {
        const base = [...memberData, ...memberData, ...memberData];
        const generated = base.map((member, i) => ({
            ...member,
            radiusX: 180 + Math.random() * 350,
            radiusY: 40 + Math.random() * 120,
            speed: 15 + Math.random() * 15,
            yOffset: (Math.random() - 0.5) * 300,
            phaseOffset: Math.random() * Math.PI * 2,
        }));
        setOrbiters(generated);
    }, []);

    return (
        <div className="relative w-full min-h-[90vh] overflow-hidden flex flex-col md:flex-row items-center justify-center bg-black">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />

            {/* Left Content */}
            <div className="relative z-30 w-full md:w-1/3 p-10 md:pl-20 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-4"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                        JSTARC <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">BENGALURU</span> <br />
                        DEMONSTRATION <br /> TEAM
                    </h2>
                    <p className="text-gray-400 text-lg md:max-w-xs font-light tracking-wide">
                        Mastery, Discipline, and the Future of Martial Arts.
                    </p>
                </motion.div>
            </div>

            {/* Visual Centerpiece */}
            <div className="relative w-full md:w-2/3 h-[600px] md:h-[800px] flex items-center justify-center perspective-1000">
                {/* Central Anchor: The Master */}
                <div className="relative z-20 w-[400px] h-[600px] flex items-center justify-center">
                    {/* Core Glow */}
                    <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full animate-pulse opacity-50" />

                    <img
                        src="/assets/central-master-kick.png"
                        alt="Central Master"
                        className="relative h-full w-auto object-contain z-20 drop-shadow-[0_0_50px_rgba(59,130,246,0.4)]"
                    />
                </div>

                {/* Orbiting Vortex System */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    {orbiters.map((orbiter: any, i) => (
                        <Orbiter key={i} index={i} total={orbiters.length} config={orbiter} isMobile={isMobile} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Orbiter = ({ index, total, config, isMobile }: { index: number, total: number, config: any, isMobile: boolean }) => {
    const { x, y, scale, opacity, blur, zIndex } = useOrbit(
        index,
        total,
        config.radiusX,
        config.radiusY,
        config.speed,
        config.yOffset,
        config.phaseOffset,
        isMobile
    );

    return (
        <motion.div
            style={{ x, y, zIndex, scale, opacity }}
            // Reduced size for mobile (w-14 h-14) vs Desktop (w-24 h-24)
            className="absolute top-1/2 left-1/2 -ml-7 -mt-7 md:-ml-12 md:-mt-12 w-14 h-14 md:w-24 md:h-24 flex items-center justify-center"
        >
            {/* Trail or Glow */}
            <div className="absolute inset-0 rounded-full bg-red-500/10 blur-xl" />

            <motion.div
                style={{ filter: `blur(${blur.get()})` }}
                className="relative w-full h-full rounded-full border border-white/20 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] bg-black/50 backdrop-blur-sm"
            >
                <img
                    src={config.img}
                    alt="Student"
                    className="w-full h-full object-cover opacity-90"
                />
            </motion.div>
        </motion.div>
    );
};

// --- Updated Zigzag Line (Tighter Physics) ---
const ZigzagLine = ({ containerRef }: { containerRef: any }) => {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // TIGHTER Physics: stiffness 100, damping 30
    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const d = `
        M 50 0 
        C 50 5, 10 5, 10 10
        C 10 20, 90 20, 90 30
        C 90 40, 10 40, 10 50
        C 10 60, 90 60, 90 70
        C 90 80, 10 80, 10 90
        C 10 95, 50 95, 50 100
    `;

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ overflow: "visible" }}
            >
                <defs>
                    <linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
                        <stop offset="90%" stopColor="#ef4444" stopOpacity="1" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </linearGradient>
                    <filter id="neon_glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <path
                    d={d}
                    fill="none"
                    stroke="#222"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                />

                <motion.path
                    d={d}
                    fill="none"
                    stroke="url(#beamGradient)"
                    strokeWidth="2"
                    filter="url(#neon_glow)"
                    style={{ pathLength }}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
};

const StudentCard = ({ member, index }: { member: any, index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-45% 0px -45% 0px", once: false });
    const isEven = index % 2 === 0;

    return (
        <div className={cn(
            "flex w-full relative z-10 py-16",
            isEven ? "justify-start pl-[5%] md:pl-[8%]" : "justify-end pr-[5%] md:pr-[8%]"
        )}>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ?
                    { opacity: 1, scale: 1.15 } :
                    { opacity: 0.3, scale: 0.5 }
                }
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                    "relative flex items-center gap-4 max-w-[85%]",
                    isEven ? "flex-row text-left" : "flex-row-reverse text-right"
                )}
            >
                <div className="relative group shrink-0">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                            "absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,1)] z-30",
                            isEven ? "-left-2" : "-right-2"
                        )}
                    />

                    <img
                        src={member.img}
                        alt={member.name}
                        className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover border-4 border-zinc-900 shadow-2xl relative z-10 bg-black"
                    />
                </div>

                <div className="space-y-1">
                    <h3 className="text-lg md:text-2xl font-bold text-white transition-colors duration-300 group-hover:text-red-500">{member.name}</h3>
                    <p className="text-red-500 font-bold uppercase text-xs tracking-wider">{member.rank}</p>
                    <p className="text-gray-400 text-xs md:text-sm">{member.desc}</p>
                </div>
            </motion.div>
        </div>
    );
}

export const Team = () => {
    const sectionRef = useRef(null);

    return (
        <section id="team" className="relative py-24 bg-black text-white overflow-hidden">
            <DynamicGrid />

            {/* Masters Carousel */}
            <div className="container mx-auto px-6 mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-black mb-4 uppercase tracking-tight">Meet Our Masters</h2>
                    <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full" />
                </motion.div>

                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    initialSlide={2}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: true,
                    }}
                    loop={true}
                    navigation={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    className="w-full py-12 [&_.swiper-slide]:transition-all [&_.swiper-slide]:duration-500 [&_.swiper-slide:not(.swiper-slide-active)]:opacity-40 [&_.swiper-slide:not(.swiper-slide-active)]:blur-[3px] [&_.swiper-slide:not(.swiper-slide-active)]:scale-90 [&_.swiper-button-prev]:text-red-600 [&_.swiper-button-next]:text-red-600"
                >
                    {extendedMasters.map((master, index) => (
                        <SwiperSlide key={`${master.id}-${index}`} className="!w-[300px] md:!w-[400px] !h-[550px] bg-zinc-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                            <img src={master.img} alt={master.name} className="h-full w-full object-cover" />
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                                <h3 className="text-2xl font-bold">{master.name}</h3>
                                <p className="text-red-500">{master.role}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* NEW: Cinematic Hero Vortex */}
            <CinematicSpiral />

            {/* Rising Stars Zigzag */}
            <div className="relative py-12" ref={sectionRef}>
                <div className="container mx-auto px-2 relative">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center mb-24 relative z-10"
                    >
                        <h2 className="text-5xl font-black mb-4 uppercase">BLACK BELTS</h2>
                        <p className="text-gray-400 uppercase tracking-widest">rising stars</p>
                    </motion.div>

                    <div className="relative w-full max-w-4xl mx-auto">
                        <ZigzagLine containerRef={sectionRef} />

                        <div className="relative flex flex-col w-full">
                            {memberData.map((member, index) => (
                                <StudentCard key={member.id} member={member} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
