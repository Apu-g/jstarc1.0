"use client";

import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const masters = [
    {
        id: 2,
        name: "Master Nilesh Jalnawala",
        role: "8th Dan Black Belt",
        desc: "competitive poomsae.",
        img: "/assets/masters/nilesh master.jpg"
    },
    {
        id: 1,
        name: "Master Jai kumar Kannan",
        role: "6th Dan Black Belt",
        desc: "Head instructor with over 20+ years of experience.",
        img: "/assets/masters/jaimaster.jpg"
    },
];

export const HomeMasters = () => {
    return (
        <section className="py-8 md:py-12 overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6 md:mb-8"
                >
                    <h2 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-4">Meet Our Masters</h2>
                    <div className="w-16 md:w-24 h-1 md:h-1.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                </motion.div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-12 md:gap-20">
                    {masters.map((master) => (
                        <CardContainer key={master.id} className="inter-var w-full sm:w-auto">
                            <CardBody className="glass relative group/card border-transparent w-[90vw] sm:w-[24rem] h-auto rounded-xl p-4 sm:p-8 hover:shadow-glow transition-all duration-300">
                                <CardItem
                                    translateZ="50"
                                    className="w-full flex justify-center mt-2 sm:mt-4"
                                >
                                    <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-lg">
                                        <img
                                            src={master.img}
                                            alt={master.name}
                                            className="h-full w-full object-cover object-top"
                                        />
                                    </div>
                                </CardItem>
                                <CardItem
                                    translateZ="60"
                                    className="text-xl sm:text-2xl font-bold text-white text-center w-full mt-4 sm:mt-6"
                                >
                                    {master.name}
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="70"
                                    className="text-primary font-bold text-center w-full mt-1 sm:mt-2 text-xs sm:text-sm uppercase tracking-wider"
                                >
                                    {master.role}
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="50"
                                    className="text-muted text-xs sm:text-sm max-w-sm mt-3 sm:mt-4 text-center w-full leading-relaxed"
                                >
                                    {master.desc}
                                </CardItem>
                            </CardBody>
                        </CardContainer>
                    ))}
                </div>
            </div>
        </section>
    );
};
