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

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <LiveDashboard />
      <Attractions />
      <Science />
      <Architecture />
      <Climate />
      <Gallery />
      <Map />
    </>
  );
}
