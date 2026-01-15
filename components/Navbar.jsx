"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Events", href: "/events" },
        { name: "Our Team", href: "/team" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center",
                scrolled || pathname !== "/" ? "bg-black/90 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
            )}
        >
            <Link href="/" className="flex items-center gap-3">
                {/* Logo Image */}
                <img src="/assets/logo.png" alt="JStarc Logo" className="h-16 w-auto object-contain" />
                <span className="text-2xl font-bold tracking-tighter text-white">
                    JSTARC<span className="text-red-600">.</span>
                </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                            "text-white/80 hover:text-red-500 font-medium transition-colors text-sm uppercase tracking-widest",
                            pathname === link.href && "text-red-500 font-bold"
                        )}
                    >
                        {link.name}
                    </Link>
                ))}
                <Link
                    href="/#contact"
                    className="text-white/80 hover:text-red-500 font-medium transition-colors text-sm uppercase tracking-widest"
                >
                    Contact
                </Link>
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
                        className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        <button
                            className="absolute top-6 right-6 text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white uppercase tracking-widest hover:text-red-500 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/#contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-2xl font-bold text-white uppercase tracking-widest hover:text-red-500 transition-colors"
                        >
                            Contact
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
