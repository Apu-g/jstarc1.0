"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";



// ... existing imports

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Events", href: "/events" },
        { label: "Our Team", href: "/team" },
        { label: "Contact", href: "/#contact" }
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center",
                scrolled || pathname !== "/" ? "glass border-b border-white/5 shadow-glow-blue/10 py-3" : "bg-transparent py-5"
            )}
        >
            <Link href="/" className="flex items-center gap-3 group">
                {/* Logo Image */}
                <img src="/assets/logo.png" alt="JStarc Logo" className="h-16 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
                <span className="text-2xl font-bold tracking-tighter text-white group-hover:text-glow-blue transition-all duration-300">
                    JSTARC<span className="text-neon-blue">.</span>
                </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={cn(
                            "text-slate-300 hover:text-neon-blue hover:text-glow-blue font-medium transition-all duration-300 text-sm uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-neon-blue after:transition-all after:duration-300 hover:after:w-full",
                            pathname === link.href && "text-white text-glow-blue after:w-full"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Mobile Menu Icon */}
            <button
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(true)}
            >
                <Menu size={28} />
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 bg-dark/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center gap-8 md:hidden border-l border-white/10"
                    >
                        <button
                            className="absolute top-6 right-6 text-white hover:text-neon-blue transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white uppercase tracking-widest hover:text-neon-blue hover:text-glow-blue transition-all duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
