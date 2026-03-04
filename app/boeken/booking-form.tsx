"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { CalEmbed } from "@/components/booking/cal-embed";
import { cn } from "@/lib/utils";

const treatments = [
  { id: "microblading", name: "Microblading", price: "€350" },
  { id: "powder-brows", name: "Powder Brows", price: "€375" },
  { id: "combi-brows", name: "Combi Brows", price: "€395" },
  { id: "consult", name: "Consult", price: "Gratis" },
];

export function BookingFormSection() {
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(
    null
  );

  return (
    <Section variant="default" padding="lg">
      <div className="text-center mb-16">
        <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
          Volg Deze Stappen
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
          Boek Jouw Behandeling
        </h2>
      </div>

      {/* Step 1: Choose treatment */}
      <div className="mb-16">
        <h3 className="font-display text-xl font-light mb-2">
          <span className="text-accent mr-2">1.</span> Kies Je Behandeling
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-6">
          Selecteer de behandeling die bij je past.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {treatments.map((treatment) => (
            <button
              key={treatment.id}
              onClick={() => setSelectedTreatment(treatment.id)}
              className={cn(
                "rounded-[var(--radius-lg)] border p-5 text-left transition-all duration-300",
                selectedTreatment === treatment.id
                  ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                  : "border-border/50 bg-background hover:border-accent/30"
              )}
            >
              <span className="block font-display text-base mb-1">
                {treatment.name}
              </span>
              <span className="block font-body text-sm text-muted-foreground">
                {treatment.price}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Cal.com embed or placeholder */}
      <div className="mb-16">
        <h3 className="font-display text-xl font-light mb-2">
          <span className="text-accent mr-2">2.</span> Kies Datum & Tijd
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-6">
          Selecteer een beschikbaar moment in de agenda.
        </p>

        {selectedTreatment ? (
          <>
            <div className="min-h-[500px]">
              <CalEmbed calLink="" />
            </div>
            <p className="text-center mt-6">
              <a
                href={
                  process.env.NEXT_PUBLIC_TREATWELL_URL ??
                  "https://www.treatwell.nl/salon/gwyneth-pmu/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-body text-muted-foreground hover:text-accent transition-colors underline underline-offset-4"
              >
                Liever boeken via Treatwell?
              </a>
            </p>
          </>
        ) : (
          <p className="font-body text-sm text-muted-foreground italic">
            Selecteer eerst een behandeling om de agenda te zien.
          </p>
        )}
      </div>
    </Section>
  );
}
