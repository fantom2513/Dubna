import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Starfield
function Stars() {
  const ref = useRef<THREE.Points>(null);
  const [positions, sizes] = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
      sz[i] = Math.random() * 2 + 0.2;
    }
    return [pos, sz];
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01;
      ref.current.rotation.x += delta * 0.003;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#8ab4f8"
        size={0.3}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

// Orbit particles
function OrbitParticles({
  radius,
  count,
  speed,
  tilt,
  color,
}: {
  radius: number;
  count: number;
  speed: number;
  tilt: number;
  color: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius * 0.3;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [radius, count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + timeOffset;
      ref.current.rotation.y = t;
      ref.current.rotation.x = tilt;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.15} sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

// Central icosahedron
function AtomCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = t * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial color="#4fc3f7" wireframe opacity={0.35} transparent />
    </mesh>
  );
}

// Camera animation
function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.15) * 2;
    camera.position.y = Math.cos(t * 0.1) * 1.5;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={['#07090f', 20, 80]} />
      <CameraRig />
      <Stars />
      <AtomCore />
      <OrbitParticles radius={5} count={80} speed={0.5} tilt={0} color="#4fc3f7" />
      <OrbitParticles radius={7} count={100} speed={0.3} tilt={Math.PI / 4} color="#7ecb7e" />
      <OrbitParticles radius={9} count={120} speed={0.2} tilt={-Math.PI / 5} color="#e8b84b" />
    </>
  );
}

const letters = 'ДУБНА'.split('');

const badge = [
  { value: '1956', label: 'Основан' },
  { value: '105 Db', label: 'Элемент' },
  { value: 'ОИЯИ', label: 'Центр науки' },
];

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-bg-primary">
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 16], fov: 60 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#07090f' }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/30 via-transparent to-bg-primary/80 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        {/* Coordinates */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8 text-center"
        >
          <span
            className="text-xs text-accent-primary/70 tracking-[0.3em] uppercase"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            55°44′ с.ш. · 37°14′ в.д. · МО, РОССИЯ
          </span>
        </motion.div>

        {/* Ruler line */}
        <RulerLine />

        {/* Main title */}
        <div className="flex items-center gap-0 md:gap-2 my-4">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-text-primary font-cormorant font-black leading-none tracking-wider select-none"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(72px, 14vw, 140px)',
                textShadow: '0 0 60px rgba(79,195,247,0.15)',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-text-secondary text-center mt-4 tracking-[0.15em] uppercase text-sm md:text-base"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          Наукоград · Город на Волге · Атомная столица России
        </motion.p>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          {badge.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/20 bg-bg-card/60 backdrop-blur-sm"
            >
              <span
                className="text-accent-primary text-sm font-bold"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {b.value}
              </span>
              <span className="text-text-secondary text-xs">{b.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span
              className="text-xs text-text-secondary tracking-[0.2em] uppercase"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Прокрутить
            </span>
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
              <rect x="8" y="0" width="4" height="14" rx="2" fill="none" stroke="#4fc3f7" strokeWidth="1.5" />
              <rect x="8.5" y="2" width="3" height="5" rx="1.5" fill="#4fc3f7" opacity="0.7" />
              <path d="M3 18 L10 26 L17 18" stroke="#4fc3f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function RulerLine() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="w-full max-w-xl flex items-center gap-0 mb-2"
    >
      <div className="flex-1 flex items-end gap-0 h-4">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-l border-accent-primary/20"
            style={{ height: i % 5 === 0 ? '16px' : '8px', marginTop: 'auto' }}
          />
        ))}
      </div>
    </motion.div>
  );
}
