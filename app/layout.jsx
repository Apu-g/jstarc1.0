import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Grainient from '@/components/ui/Grainient';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
    title: "Jstarc Taekwondo Bengaluru",
    description: "Premium Taekwondo Training in Bengaluru",
};

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en" className="scroll-pt-28 scroll-smooth">
            <body className={cn(spaceGrotesk.className, "antialiased relative")}>
                <div className="min-h-screen relative overflow-x-hidden text-slate-300">
                    <div className="fixed inset-0 z-0">
                        <Grainient
                            color1="#0a0a0a"
                            color2="#312f37"
                            color3="#22224e"
                            timeSpeed={0.25}
                            colorBalance={0}
                            warpStrength={1}
                            warpFrequency={5.4}
                            warpSpeed={2}
                            warpAmplitude={50}
                            blendAngle={0}
                            blendSoftness={0.05}
                            rotationAmount={500}
                            noiseScale={1.35}
                            grainAmount={0.01}
                            grainScale={2}
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
        </html>
    );
}
