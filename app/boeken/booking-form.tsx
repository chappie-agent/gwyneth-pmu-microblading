"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

const treatments = [
  { id: "microblading", name: "Microblading", price: "\u20AC350" },
  { id: "powder-brows", name: "Powder Brows", price: "\u20AC375" },
  { id: "combi-brows", name: "Combi Brows", price: "\u20AC395" },
  { id: "consult", name: "Consult", price: "Gratis" },
];

const placeholderDates = [
  "Ma 3 Mrt",
  "Di 4 Mrt",
  "Wo 5 Mrt",
  "Do 6 Mrt",
  "Vr 7 Mrt",
  "Za 8 Mrt",
];

export function BookingFormSection() {
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <Section variant="default" padding="lg">
      <div className="text-center mb-16">
        <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
          Volg Deze Stappen
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
          Boek Nu In Drie Stappen
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

      {/* Step 2: Select date */}
      <div className="mb-16">
        <h3 className="font-display text-xl font-light mb-2">
          <span className="text-accent mr-2">2.</span> Selecteer Datum & Tijd
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-6">
          Kies een beschikbare datum voor je afspraak.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {placeholderDates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "rounded-[var(--radius-md)] border px-4 py-3 text-center transition-all duration-300",
                selectedDate === date
                  ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                  : "border-border/50 bg-background hover:border-accent/30"
              )}
            >
              <CalendarDays className="size-4 mx-auto mb-1 text-muted-foreground" />
              <span className="block font-body text-sm">{date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Your details */}
      <div className="mb-12">
        <h3 className="font-display text-xl font-light mb-2">
          <span className="text-accent mr-2">3.</span> Jouw Gegevens
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-6">
          Vul je gegevens in zodat we contact met je kunnen opnemen.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
          <div>
            <label
              htmlFor="boeken-voornaam"
              className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2"
            >
              Voornaam
            </label>
            <input
              id="boeken-voornaam"
              type="text"
              placeholder="Jouw voornaam"
              className="w-full rounded-[var(--radius-md)] border border-border bg-transparent px-4 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="boeken-achternaam"
              className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2"
            >
              Achternaam
            </label>
            <input
              id="boeken-achternaam"
              type="text"
              placeholder="Jouw achternaam"
              className="w-full rounded-[var(--radius-md)] border border-border bg-transparent px-4 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="boeken-email"
              className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2"
            >
              E-mailadres
            </label>
            <input
              id="boeken-email"
              type="email"
              placeholder="jouw@email.nl"
              className="w-full rounded-[var(--radius-md)] border border-border bg-transparent px-4 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="boeken-telefoon"
              className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2"
            >
              Telefoonnummer
            </label>
            <input
              id="boeken-telefoon"
              type="tel"
              placeholder="+31 6 12 34 56 78"
              className="w-full rounded-[var(--radius-md)] border border-border bg-transparent px-4 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="boeken-opmerkingen"
              className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2"
            >
              Opmerkingen
            </label>
            <textarea
              id="boeken-opmerkingen"
              rows={4}
              placeholder="Heb je nog iets dat je wilt delen? (optioneel)"
              className="w-full resize-none rounded-[var(--radius-md)] border border-border bg-transparent px-4 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <Button
          size="lg"
          className="w-full sm:w-auto px-12"
          onClick={(e) => e.preventDefault()}
        >
          Boek Nu
        </Button>
        <p className="font-body text-xs text-muted-foreground mt-4">
          Wat te verwachten: Je ontvangt een bevestigings-e-mail en eventueel een
          herinneringsbericht voor je afspraak.
        </p>
      </div>
    </Section>
  );
}
