import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { TreatmentsSection } from "@/components/sections/treatments-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ResultsSection } from "@/components/sections/results-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { Section } from "@/components/layout/section";
import { treatments, comparisonLabels } from "@/data/treatments";
import { behandelingenFAQ } from "@/data/faq";

export const metadata: Metadata = {
  title: "Behandelingen — Gwyneth PMU",
  description:
    "Drie gespecialiseerde PMU technieken: Microblading, Powder Brows, en Combi Brows.",
};

function ComparisonTable() {
  const keys = Object.keys(comparisonLabels) as string[];

  return (
    <Section variant="light" padding="lg">
      <div className="text-center mb-16">
        <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
          Vergelijking
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
          Welke Techniek Past Bij Jou?
        </h2>
      </div>

      <div className="-mx-5 sm:mx-0 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-accent/30 bg-accent/[0.04]">
              <th className="px-4 py-5 text-xs font-body uppercase tracking-[0.2em] text-muted-foreground font-normal">
                Kenmerk
              </th>
              {treatments.map((t) => (
                <th
                  key={t.slug}
                  className="px-4 py-5 font-display text-lg font-light tracking-wide"
                >
                  {t.name}
                  {t.featured && (
                    <span className="ml-2 inline-block text-[10px] font-body uppercase tracking-[0.15em] text-accent font-medium align-middle">
                      {t.featuredLabel}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key} className="border-b border-border/50">
                <td className="px-4 py-4 text-sm font-body font-medium text-foreground">
                  {comparisonLabels[key]}
                </td>
                {treatments.map((t) => (
                  <td
                    key={t.slug}
                    className="px-4 py-4 text-sm font-body text-muted-foreground"
                  >
                    {t.comparison[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

export default function BehandelingenPage() {
  return (
    <>
      <HeroSection
        variant="static"
        breadcrumb
        title="Permanente Make-up Behandelingen"
        description="Drie gespecialiseerde technieken voor jouw perfecte look. Ontdek het verschil en kies wat bij jou past."
      />
      <TreatmentsSection />
      <ComparisonTable />
      <ProcessSection variant="default" padding="lg" />
      <ResultsSection variant="dark" padding="lg" />
      <FAQSection
        items={behandelingenFAQ}
        variant="default"
        layout="narrow"
        padding="lg"
      />
      <CTASection
        variant="accent"
        padding="md"
        title="Laten We Jouw Perfecte Look Cre\u00EBren"
        description="Boek een vrijblijvend consult en ontdek welke techniek het beste bij jou past."
        cta={{ label: "Plan Jouw Intake", href: "/boeken" }}
      />
    </>
  );
}
