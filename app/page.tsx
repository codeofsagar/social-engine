import { Hero} from "@/components";
import { AboutDemo } from "@/components/Pages/AboutDemo";
import AboutSection from "@/components/Pages/AboutSection";

import HomeContactSection from "@/components/Pages/HomeContactSection";
import PackageSection from "@/components/Pages/PackageSection";
import Reviews from "@/components/Pages/Reviews";
import ServicesSection from "@/components/Pages/ServicesSection";

export default async function Home() {
  return (
    <main className="scroll-smooth">
      <Hero />
      <AboutDemo/>
      <AboutSection/>
      <ServicesSection/>
    <PackageSection/>
    <Reviews/>
    <HomeContactSection/>
    
     

    </main>
  );
}
