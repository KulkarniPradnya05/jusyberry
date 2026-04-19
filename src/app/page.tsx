import StrawberryCanvas from "../components/StrawberryCanvas";
import FeaturesSection from "../components/FeaturesSection";
import FarmSection from "../components/FarmSection";
import ProductsSection from "../components/ProductsSection";
import JournalSection from "../components/JournalSection";
import ContactSection from "../components/ContactSection";
import CTASection from "../components/CTASection";

import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans antialiased selection:bg-[#FF1744] selection:text-white">
      {/* Drifting background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] bg-[#FF1744]/[0.02] rounded-full blur-3xl animate-[drift_20s_ease-in-out_infinite_alternate]" />
        <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] bg-[#FF689D]/[0.03] rounded-full blur-[120px] animate-[drift_25s_ease-in-out_infinite_alternate_reverse]" />
      </div>

      <div className="relative z-10 w-full">
        <StrawberryCanvas />
        <FarmSection />
        <ProductsSection />
        <FeaturesSection />
        <JournalSection />
        <ContactSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
