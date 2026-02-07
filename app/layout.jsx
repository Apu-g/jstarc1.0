import { Space_Grotesk } from "next/font/google"; // Using Google Fonts as requested
import "./globals.css";
import { cn } from "@/lib/utils";
import Grainient from '@/components/Grainient';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
    title: "Jstarc Taekwondo Bengaluru",
    description: "Premium Taekwondo Training in Bengaluru",
};

// ... existing imports

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en" className="scroll-pt-28 scroll-smooth">
            <body className={cn(spaceGrotesk.className, "antialiased relative")}>
                <div className="min-h-screen relative overflow-x-hidden text-slate-300 bg-[#050505]"> {/* Darker, cleaner bg */}
                    <div className="fixed inset-0 z-0 opacity-40"> {/* Toned down background for professionalism */}
                        <Grainient
                            color1="#050505"
                            color2="#1a0b2e"
                            color3="#001219"
                            timeSpeed={0.25}
                            colorBalance={-0.12}
                            warpStrength={0.7}
                            warpFrequency={5}
                            warpSpeed={2}
                            warpAmplitude={63}
                            blendAngle={0}
                            blendSoftness={0.05}
                            rotationAmount={500}
                            noiseScale={2}
                            grainAmount={0.1}
                            grainScale={2.9}
                            grainAnimated={false}
                            contrast={1.5}
                            gamma={1}
                            saturation={1}
                            centerX={0}
                            centerY={0}
                            zoom={0.9}
                        />
                    </div>
                    <div className="relative z-10 w-full">
                        {children}
                    </div>
                </div>
            </body>
        </html >
    );
}
