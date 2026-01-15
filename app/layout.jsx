import { Inter } from "next/font/google"; // Using Google Fonts as requested
import "./globals.css";
import { cn } from "@/lib/utils";

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
            <body className={cn(inter.className, "bg-black text-white antialiased")}>
                {children}
            </body>
        </html>
    );
}
