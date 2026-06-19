import { attractions } from '../../data/dubna';
import AttractionCard from '../ui/AttractionCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Attractions() {
  return (
    <section id="attractions" className="bg-bg-primary py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader eyebrow="Что посмотреть" title="Достопримечательности" className="mb-16" />

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto md:auto-rows-[240px]">
          {attractions.map((attraction, i) => (
            <AttractionCard key={attraction.id} attraction={attraction} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
