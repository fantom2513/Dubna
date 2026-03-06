import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useInView } from '../../hooks/useInView';

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

const mapPoints = [
  { lat: 56.740, lon: 37.185, label: 'ОИЯИ', color: '#4fc3f7' },
  { lat: 56.758, lon: 37.163, label: 'Набережная Волги', color: '#7ecb7e' },
  { lat: 56.731, lon: 37.160, label: 'ДК «Мир»', color: '#e8b84b' },
  { lat: 56.738, lon: 37.170, label: 'Центр города', color: '#e8edf5' },
  { lat: 56.748, lon: 37.143, label: 'Парк Большая Волга', color: '#7ecb7e' },
];

export default function Map() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="map" className="bg-bg-primary py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={ref}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-accent-primary text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Расположение
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="font-cormorant font-bold text-text-primary mb-6"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(36px, 5vw, 56px)' }}
            >
              Где находится Дубна
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              className="text-text-secondary leading-relaxed mb-8"
            >
              Дубна расположена в Московской области, в 125 км к северу от Москвы,
              на берегах Волги и канала имени Москвы. Город разделён на два берега:
              правый — исторический, с архитектурой 1950-х, и левый — научный, с ОИЯИ.
            </motion.p>

            {/* Coordinates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="space-y-3"
            >
              {[
                { label: 'Широта', value: '56°44′ с.ш.' },
                { label: 'Долгота', value: '37°10′ в.д.' },
                { label: 'До Москвы', value: '~125 км' },
                { label: 'Площадь', value: '67 км²' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span
                    className="text-xs text-text-secondary uppercase tracking-wider w-28"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    {item.label}
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                  <span
                    className="text-sm text-accent-primary"
                    style={{ fontFamily: '"IBM Plex Mono", monospace', whiteSpace: 'nowrap' }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Leaflet Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden border border-white/5"
            style={{ height: '460px' }}
          >
            <MapContainer
              center={[56.74, 37.17]}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
              zoomControl={true}
              scrollWheelZoom={false}
            >
              <MapResizer />
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              {mapPoints.map((point) => (
                <CircleMarker
                  key={point.label}
                  center={[point.lat, point.lon]}
                  radius={7}
                  pathOptions={{
                    color: point.color,
                    fillColor: point.color,
                    fillOpacity: 0.85,
                    weight: 2,
                  }}
                >
                  <Popup>
                    <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px' }}>
                      {point.label}
                    </span>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
