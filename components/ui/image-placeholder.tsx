import { cn } from "@/lib/utils";

type AspectRatio = "portrait" | "landscape" | "square" | "hero" | "wide";
type GradientTheme = "warm" | "cool" | "sage" | "gold";

interface ImagePlaceholderProps {
  aspect?: AspectRatio;
  gradient?: GradientTheme;
  label?: string;
  className?: string;
}

const aspectStyles: Record<AspectRatio, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  hero: "aspect-[16/9]",
  wide: "aspect-[21/9]",
};

const gradientStyles: Record<GradientTheme, string> = {
  warm: "from-taupe-dark/20 via-accent/10 to-cream/5",
  cool: "from-charcoal/15 via-grey-warm/10 to-linen/5",
  sage: "from-sage/20 via-sage-wash/15 to-cream/5",
  gold: "from-gold/20 via-accent-soft/10 to-warm-white/5",
};

export function ImagePlaceholder({
  aspect = "landscape",
  gradient = "warm",
  label,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br",
        aspectStyles[aspect],
        gradientStyles[gradient],
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
      {label && (
        <span className="absolute bottom-3 left-3 text-xs tracking-widest uppercase text-foreground/30">
          {label}
        </span>
      )}
    </div>
  );
}
