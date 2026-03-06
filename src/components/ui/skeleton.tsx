import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

function ShimmerSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("rounded", className)}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--glass-bg) 25%, rgba(255,255,255,0.06) 50%, var(--glass-bg) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
      }}
    />
  )
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn("rounded-xl p-5 space-y-3", className)}
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
      }}
    >
      <ShimmerSkeleton className="h-32 rounded-lg w-full" />
      <ShimmerSkeleton className="h-4 rounded w-3/4" />
      <ShimmerSkeleton className="h-4 rounded w-1/2" />
      <ShimmerSkeleton className="h-4 rounded w-5/6" />
    </div>
  )
}

function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  const widths = ['w-full', 'w-5/6', 'w-4/5', 'w-3/4', 'w-2/3'];
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <ShimmerSkeleton key={i} className={cn("h-4 rounded", widths[i % widths.length])} />
      ))}
    </div>
  )
}

export { Skeleton, ShimmerSkeleton, SkeletonCard, SkeletonText }
