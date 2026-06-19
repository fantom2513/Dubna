import ElementsTable from '../ui/ElementsTable';
import DiscoveriesTimeline from '../ui/DiscoveriesTimeline';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Science() {
  return (
    <section id="science" className="bg-bg-secondary py-32 px-6 relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-100 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader eyebrow="ОИЯИ · Атомное сердце" title="Синтез элементов" className="mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Timeline */}
          <DiscoveriesTimeline />

          {/* Right: Periodic table (104-118) */}
          <div>
            <ElementsTable />
          </div>
        </div>
      </div>
    </section>
  );
}
