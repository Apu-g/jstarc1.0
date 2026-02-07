"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Trophy, Medal } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

// Data extracted from user uploaded image
const eventsData = [
    {
        id: 1,
        title: "National Poomsae Championships 2023",
        date: "Dec 15, 2023",
        location: "Seoul, KR",
        category: "Win",
        image: "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=800&auto=format&fit=crop", // Placeholder for martial arts
    },
    {
        id: 2,
        title: "City Taekwondo Tournament 2023",
        date: "Nov 05, 2023",
        location: "JStarc Arena",
        category: "Participation",
        image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Advanced Kicking Seminar 2023",
        date: "Sep 21, 2023",
        location: "JStarc Dojang",
        category: "Participation",
        image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "State Sparring Competition 2022",
        date: "Jul 10, 2022",
        location: "State Gymnasium",
        category: "Win",
        image: "https://images.unsplash.com/photo-1564415051543-9302a54e511d?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Community Festival Demo 2022",
        date: "Jun 18, 2022",
        location: "Central Park",
        category: "Participation",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "Regional Forms Championship 2022",
        date: "Apr 25, 2022",
        location: "Regional Sports Hall",
        category: "Win",
        image: "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=800&auto=format&fit=crop",
    }
];

export const Events = () => {
    return (
        <section id="events" className="relative py-24 text-white">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/10 to-transparent opacity-50" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">Track Record & Events</h2>
                    <p className="text-muted max-w-2xl mx-auto">
                        From local demonstrations to international victories, our students constantly push their limits.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventsData.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <SpotlightCard className="p-0 rounded-2xl border-white/10 bg-transparent hover:border-primary/50 transition-all duration-300 hover:shadow-glow group h-full">
                                {/* Image */}
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Tag */}
                                    <div className="absolute top-4 right-4 z-20">
                                        {event.category === "Win" ? (
                                            <span className="bg-yellow-500/80 backdrop-blur-sm text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                                <Trophy size={12} /> WIN
                                            </span>
                                        ) : (
                                            <span className="bg-blue-500/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                                <Medal size={12} /> PARTICIPATION
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-muted mb-3">
                                        <span className="flex items-center gap-1 text-primary">
                                            <Calendar size={14} /> {event.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} /> {event.location}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors leading-tight">
                                        {event.title}
                                    </h3>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all text-sm tracking-widest uppercase font-medium">
                        View All Archives
                    </button>
                </div>
            </div>
        </section>
    );
};
