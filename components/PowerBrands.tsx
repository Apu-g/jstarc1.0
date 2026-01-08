"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/navigation';

const brands = [
    "/assets/logos/powerbrand1.jpg",
    "/assets/logos/powerbrand2.jpg",
    "/assets/logos/powerbrand3.jpg",
    "/assets/logos/powerbrand4.png",
    "/assets/logos/powerbrand5.png",
];

export const PowerBrands = () => {
    return (
        <section className="py-24 bg-black relative border-b border-white/5">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Powerbrands</h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
                </motion.div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    navigation
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={true}
                    className="w-full max-w-6xl mx-auto px-12"
                >
                    {brands.map((src, index) => (
                        <SwiperSlide key={index} className="py-8">
                            <div className="group relative h-64 flex items-center justify-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-300 mx-4 shadow-lg hover:shadow-red-900/20">

                                {/* Inner pure white container for logo clarity */}
                                <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center p-6 shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={src}
                                        alt={`Powerbrand ${index + 1}`}
                                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
