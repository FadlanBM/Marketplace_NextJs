import CallToAction from "@/components/layout/landing/call-to-action-1";
import Content from "@/components/layout/landing/content-3";
import FAQs from "@/components/layout/landing/faqs-2";
import Features from "@/components/layout/landing/features-3";
import Footer from "@/components/layout/landing/footer-4";
import { HeroHeader } from "@/components/layout/landing/header";
import HeroSection from "@/components/layout/landing/hero-section-2";
import LogoCloud from "@/components/layout/landing/logo-cloud-2";
import Pricing from "@/components/layout/landing/pricing-1";
import { MarqueeDemo } from "@/components/layout/landing/review-testimoni";
import Team from "@/components/layout/landing/team-1";

export default function Home() {
  return (
    <main>
      <HeroHeader />
      <HeroSection />
      <LogoCloud />
      <Features />
      <Content />
      <Team />
      <MarqueeDemo />
      <Pricing />
      <CallToAction />
      <FAQs />
      <Footer />
    </main>
  );
}
