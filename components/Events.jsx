"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Trophy, Medal } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import EventGallery from "./EventGallery";

export const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events/list');
                const data = await res.json();
                if (data.events && data.events.length > 0) {
                    setEvents(data.events);
                }
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        };
        fetchEvents();
    }, []);

    return (
        <section id="events" className="relative py-12 md:py-24 text-white">
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
                        Click on an event to view the gallery.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedEvent(event)}
                                className="cursor-pointer"
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
                                                    <Medal size={12} /> GALLERY
                                                </span>
                                            )}
                                        </div>
                                        {/* View Gallery Overlay Hint */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-30">
                                            <span className="text-white border border-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                                                View Gallery
                                            </span>
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
                        ))
                    ) : (
                        <div className="col-span-full text-center text-slate-500 py-12">
                            Loading events...
                        </div>
                    )}
                </div>

                <div className="mt-16 text-center">
                    <button className="border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all text-sm tracking-widest uppercase font-medium">
                        View All Archives
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {selectedEvent && (
                    <EventGallery event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};
