import { Team } from "@/components/Team";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";

export default function TeamPage() {
    return (
        <main className="min-h-screen text-white selection:bg-red-600 selection:text-white">
            <Navbar />
            <div className="pt-32">
                <Team />
            </div>
            <Contact />
        </main>
    );
}