import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Stats from '@/components/sections/Stats';
import LiveDashboard from '@/components/sections/LiveDashboard';
import Attractions from '@/components/sections/Attractions';
import Science from '@/components/sections/Science';
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
      <SectionDivider flipped />
      <Stats />
      <SectionDivider />
      <LiveDashboard />
      <SectionDivider flipped />
      <Attractions />
      <SectionDivider />
      <Science />
      <SectionDivider flipped />
      <Architecture />
      <SectionDivider />
      <Climate />
      <SectionDivider flipped />
      <Gallery />
      <SectionDivider />
      <Map />
    </>
  );
}
