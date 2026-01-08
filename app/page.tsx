import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HomeMasters } from "@/components/HomeMasters";
import { PowerBrands } from "@/components/PowerBrands";
import { Affiliations } from "@/components/Affiliations";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { DemoTeam } from "@/components/DemoTeam";
import { Contact } from "@/components/Contact";

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
            <Navbar />
            <Hero />
            <HomeMasters />
            <PowerBrands />
            <Affiliations />
            <WhyChooseUs />
            <DemoTeam />
            <Contact />
        </main>
    );
}
