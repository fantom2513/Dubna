export default function SectionDivider({ flipped = false }: { flipped?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="w-full h-px relative overflow-hidden"
      style={{
        background: flipped
          ? 'linear-gradient(90deg, transparent 0%, rgba(79,195,247,0.18) 30%, rgba(232,184,75,0.12) 60%, transparent 100%)'
          : 'linear-gradient(90deg, transparent 0%, rgba(232,184,75,0.12) 40%, rgba(79,195,247,0.18) 70%, transparent 100%)',
      }}
    />
  );
}
