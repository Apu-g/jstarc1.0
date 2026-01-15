import { Inter } from "next/font/google"; // Using Google Fonts as requested
import "./globals.css";
import { cn } from "@/lib/utils";
import LiquidEther from "@/components/LiquidEther";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Jstarc Taekwondo Bengaluru",
    description: "Premium Taekwondo Training in Bengaluru",
};

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "bg-black text-white antialiased relative")}>
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <LiquidEther
                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                        mouseForce={20}
                        cursorSize={100}
                        isViscous={false}
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={32}
                        resolution={0.5}
                        isBounce={false}
                        autoDemo={true}
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                    />
                </div>
                <div className="relative z-10">
                    {children}
                </div>
            </body>
        </html>
    );
}
