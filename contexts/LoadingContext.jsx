"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LoadingContext = createContext(undefined);

export const LoadingProvider = ({ children }) => {
    const [introShown, setIntroShown] = useState(false);
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        // Check if intro has been shown in this session
        if (typeof window !== 'undefined') {
            const hasSeenIntro = sessionStorage.getItem('jstarc-intro-shown') === 'true';
            if (hasSeenIntro) {
                setIntroShown(true);
                setShowNavbar(true);
            }
        }
    }, []);

    const markIntroComplete = () => {
        setIntroShown(true);
        setShowNavbar(true);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('jstarc-intro-shown', 'true');
        }
    };

    const resetIntro = () => {
        setIntroShown(false);
        setShowNavbar(false);
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('jstarc-intro-shown');
        }
    };

    return (
        <LoadingContext.Provider value={{
            introShown,
            showNavbar,
            markIntroComplete,
            resetIntro
        }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
