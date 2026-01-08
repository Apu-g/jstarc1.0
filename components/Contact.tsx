"use client";

import { MapPin, Phone, Mail } from "lucide-react";

export const Contact = () => {
    return (
        <section id="contact" className="bg-black text-white pt-24 pb-12 border-t border-zinc-900">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Start Your Journey</h2>
                        <p className="text-gray-400 mb-8 max-w-md">
                            Visit us for a free trial class. Experience the discipline and power of Taekwondo firsthand.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-red-600 mt-1" />
                                <div>
                                    <h4 className="font-bold">Locate Us</h4>
                                    <p className="text-gray-400">Jstarc Taekwondo Bengaluru<br />123 Martial Arts Ave, Bengaluru, 560001</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="text-red-600 mt-1" />
                                <div>
                                    <h4 className="font-bold">Call Us</h4>
                                    <p className="text-gray-400">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="text-red-600 mt-1" />
                                <div>
                                    <h4 className="font-bold">Email Us</h4>
                                    <p className="text-gray-400">info@jstarcblr.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Map Placeholder */}
                    <div className="w-full h-[400px] bg-zinc-900 rounded-2xl overflow-hidden relative">
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                            Map Integration Placeholder
                            {/* In production, embed Google Maps iframe here */}
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-8 text-center text-gray-500 text-sm">
                    &copy; 2026 Jstarc Taekwondo Bengaluru. All rights reserved.
                </div>
            </div>
        </section>
    )
}
