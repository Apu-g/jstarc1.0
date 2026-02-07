import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HomeMasters } from "@/components/HomeMasters";
import { PowerBrands } from "@/components/PowerBrands";
import { Affiliations } from "@/components/Affiliations";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { MarqueeGallery } from "@/components/MarqueeGallery";
import { Contact } from "@/components/Contact";

export default function Home() {
    return (
        <main className="min-h-screen text-slate-300 selection:bg-neon-blue selection:text-black">
            <Navbar />
            <Hero />
            <HomeMasters />
            <PowerBrands />
            <Affiliations />
            <WhyChooseUs />
            <MarqueeGallery />
            <Contact />
        </main>
    );
}
