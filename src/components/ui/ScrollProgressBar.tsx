import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 z-[9999] h-[2px] pointer-events-none"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(to right, #4fc3f7, #e8b84b)',
        transition: 'width 80ms linear',
      }}
    />
  );
}
