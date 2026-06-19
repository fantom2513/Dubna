import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Stats from '@/components/sections/Stats';
import LiveDashboard from '@/components/sections/LiveDashboard';
import Attractions from '@/components/sections/Attractions';
import Science from '@/components/sections/Science';
import ElementSpotlight from '@/components/sections/ElementSpotlight';
import Architecture from '@/components/sections/Architecture';
import Climate from '@/components/sections/Climate';
import Gallery from '@/components/sections/Gallery';
import Map from '@/components/sections/Map';
import SectionDivider from '@/components/ui/SectionDivider';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      {/* Stats → LiveDashboard share a background — divider separates them */}
      <Stats />
      <SectionDivider flipped />
      <LiveDashboard />
      <Attractions />
      {/* Science → ElementSpotlight share a background */}
      <Science />
      <SectionDivider />
      <ElementSpotlight />
      <Architecture />
      <Climate />
      <Gallery />
      {/* Gallery → Map share a background */}
      <SectionDivider flipped />
      <Map />
    </>
  );
}
