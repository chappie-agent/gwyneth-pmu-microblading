import { Section } from "@/components/layout/section";

export function MapSection() {
  return (
    <Section variant="light" padding="none" className="lg:hidden">
      <div className="relative w-full h-[400px] overflow-hidden rounded-[var(--radius-lg)] border border-border/50">
        {/* Monochrome + warm tint filter overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply bg-accent/[0.08]" />
        <iframe
          title="Locatie Gwyneth PMU"
          src="https://maps.google.com/maps?q=Hekendorpstraat+54,+2729+BC+Zoetermeer,+Nederland&hl=nl&z=17&output=embed"
          className="absolute -inset-x-0 -top-4 -bottom-10 w-full h-[calc(100%+56px)] border-0 grayscale contrast-[1.1] sepia-[0.3] dark:invert dark:hue-rotate-180 dark:brightness-95 dark:contrast-[0.9]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Section>
  );
}
