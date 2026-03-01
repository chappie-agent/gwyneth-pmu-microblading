import { Section } from "@/components/layout/section";

export function MapSection() {
  return (
    <Section variant="light" padding="none" className="lg:hidden">
      <div className="relative w-full h-[400px] overflow-hidden rounded-[var(--radius-lg)] border border-border/50">
        {/* Monochrome + warm tint filter overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply bg-accent/[0.08]" />
        <iframe
          title="Locatie Gwyneth PMU"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2452.5!2d4.4732!3d52.0570!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDAzJzI1LjIiTiA0wrAyOCcyMy41IkU!5e0!3m2!1snl!2snl!4v1709100000000!5m2!1snl!2snl&q=Hekendorpstraat+54,+Zoetermeer,+Nederland"
          className="absolute -inset-x-0 -top-4 -bottom-10 w-full h-[calc(100%+56px)] border-0 grayscale contrast-[1.1] sepia-[0.3] dark:invert dark:hue-rotate-180 dark:brightness-95 dark:contrast-[0.9]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Section>
  );
}
