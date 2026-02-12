"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLoading } from "@/contexts/LoadingContext";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { showNavbar } = useLoading();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Events", href: "/events" },
        { label: "Team", href: "/team" }
    ];

    // Don't render navbar until intro is complete (only on home page first visit)
    if (!showNavbar && pathname === '/') {
        return null;
    }

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                    "fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 transition-all duration-300",
                    "flex items-center justify-between border border-white/10 px-6 py-3 rounded-full",
                    "bg-black/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_12px_rgba(0,123,255,0.4)] transition-all duration-300",
                    scrolled && "bg-black/80 shadow-2xl border-white/10"
                )}
            >
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <div className="bg-white/5 p-1.5 rounded-full border border-white/10 hover:border-neon-blue/50 transition-colors">
                        <img
                            src="/assets/logo.png"
                            alt="JStarc"
                            className="h-8 w-8 object-contain"
                        />
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 ml-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="relative overflow-hidden h-6 group"
                        >
                            <span
                                className={cn(
                                    "block transition-transform duration-300 group-hover:-translate-y-full text-sm font-medium text-slate-300",
                                    pathname === link.href && "text-white font-semibold"
                                )}
                            >
                                {link.label}
                            </span>
                            <span
                                className={cn(
                                    "block absolute top-full left-0 transition-transform duration-300 group-hover:translate-y-[-100%] text-sm font-medium text-neon-blue",
                                    pathname === link.href && "text-neon-blue"
                                )}
                            >
                                {link.label}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-4 ml-auto">
                    <Link href="/#contact">
                        <button className="border border-slate-600 hover:bg-slate-800 hover:border-slate-500 px-5 py-2 rounded-full text-sm font-medium text-white transition-all">
                            Contact
                        </button>
                    </Link>
                    <Link href="/#join">
                        <button className="bg-white hover:bg-slate-100 text-black px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                            Get Started
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-slate-300 hover:text-white"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu size={24} />
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-4 top-24 z-[60] bg-black/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 md:hidden flex flex-col gap-6 shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm uppercase tracking-widest">Menu</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "text-lg font-medium transition-colors",
                                        pathname === link.href ? "text-neon-blue" : "text-slate-300 hover:text-white"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="h-px bg-slate-800 my-2" />

                        <div className="flex flex-col gap-3">
                            <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full border border-slate-600 hover:bg-slate-800 px-4 py-3 rounded-xl text-sm font-medium text-white transition-all">
                                    Contact Us
                                </button>
                            </Link>
                            <Link href="/#join" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full bg-white hover:bg-slate-200 text-black px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-white/10">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
