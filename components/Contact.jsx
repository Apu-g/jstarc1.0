"use client";

import { MapPin, Phone, Mail } from "lucide-react";

export const Contact = () => {
    return (
        <section id="contact" className="pt-24 pb-12 border-t border-white/5 bg-black/40">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h2 className="text-4xl font-bold mb-6 text-white text-glow">Start Your Journey</h2>
                        <p className="text-slate-300 mb-8 max-w-md">
                            Visit us for a free trial class. Experience the discipline and power of Taekwondo firsthand.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-full bg-neon-blue/10 text-neon-blue group-hover:bg-neon-blue/20 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-neon-blue transition-colors">Locate Us</h4>
                                    <p className="text-slate-400">Jstarc Taekwondo Bengaluru<br />123 Martial Arts Ave, Bengaluru, 560001</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-full bg-neon-purple/10 text-neon-purple group-hover:bg-neon-purple/20 group-hover:shadow-[0_0_15px_rgba(188,19,254,0.3)] transition-all duration-300">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-neon-purple transition-colors">Call Us</h4>
                                    <p className="text-slate-400">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-full bg-neon-green/10 text-neon-green group-hover:bg-neon-green/20 group-hover:shadow-[0_0_15px_rgba(10,255,10,0.3)] transition-all duration-300">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-neon-green transition-colors">Email Us</h4>
                                    <p className="text-slate-400">info@jstarcblr.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Map Placeholder */}
                    <div className="glass-card w-full h-[400px] overflow-hidden relative transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>
                        <div className="text-slate-400 text-center z-10">
                            <MapPin className="w-12 h-12 mx-auto mb-4 text-white/20" />
                            <p>Map Integration Placeholder</p>
                            {/* In production, embed Google Maps iframe here */}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-slate-500 text-sm">
                    &copy; 2026 Jstarc Taekwondo Bengaluru. All rights reserved.
                </div>
            </div>
        </section>
    )
}
