"use client";

import { motion } from "framer-motion";
import {
  Section,
  type SectionVariant,
  type SectionLayout,
  type SectionPadding,
  type PresetKey,
} from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/data/site";

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface ContactSectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  className?: string;
  id?: string;
}

export function ContactSection({
  variant = "default",
  layout = "split",
  padding = "lg",
  preset,
  className,
  id,
}: ContactSectionProps) {
  return (
    <Section
      variant={variant}
      layout={layout}
      padding={padding}
      preset={preset}
      stagger
      className={className}
      id={id}
    >
      {/* Left: Contact info */}
      <motion.div variants={staggerItem} className="flex flex-col justify-center">
        <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
          Contact
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-8">
          Laten We Kennismaken
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Address */}
          <div className="flex items-start gap-4">
            <MapPin className="size-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-body text-sm">{siteConfig.contact.address.street}</p>
              <p className="font-body text-sm text-muted-foreground">
                {siteConfig.contact.address.postalCode} {siteConfig.contact.address.city}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <Phone className="size-5 text-accent shrink-0" />
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="font-body text-sm hover:text-accent transition-colors"
            >
              {siteConfig.contact.phone}
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <Mail className="size-5 text-accent shrink-0" />
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-body text-sm hover:text-accent transition-colors"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-4">
            <Clock className="size-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-body text-sm">{siteConfig.hours.weekdays}</p>
              <p className="font-body text-sm text-muted-foreground">
                {siteConfig.hours.saturday}
              </p>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4 mb-2">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            {/* Instagram icon inline */}
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            Instagram
          </a>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-accent transition-colors"
            aria-label="Facebook"
          >
            {/* Facebook icon inline */}
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            Facebook
          </a>
        </div>

        {/* Map — desktop only, below contact info */}
        <div className="relative mt-6 hidden lg:block w-full h-[300px] overflow-hidden rounded-[var(--radius-lg)] border border-border/50">
          <div className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply bg-accent/[0.08]" />
          <iframe
            title="Locatie Gwyneth PMU"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2452.5!2d4.4732!3d52.0570!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDAzJzI1LjIiTiA0wrAyOCcyMy41IkU!5e0!3m2!1snl!2snl!4v1709100000000!5m2!1snl!2snl&q=Hekendorpstraat+54,+Zoetermeer,+Nederland"
            className="absolute -inset-x-0 -top-4 -bottom-10 w-full h-[calc(100%+56px)] border-0 grayscale contrast-[1.1] sepia-[0.3] dark:invert dark:hue-rotate-180 dark:brightness-95 dark:contrast-[0.9]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </motion.div>

      {/* Right: Contact form */}
      <motion.div variants={staggerItem}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-5 rounded-[var(--radius-lg)] border border-border/50 bg-background/50 p-8"
        >
          {/* Naam */}
          <div>
            <label htmlFor="contact-naam" className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">
              Naam
            </label>
            <input
              id="contact-naam"
              type="text"
              placeholder="Jouw naam"
              className="w-full rounded-[var(--radius-md)] border border-border bg-transparent px-4 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
          </div>

          {/* Telefoon */}
          <div>
            <label htmlFor="contact-telefoon" className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">
              Telefoon
            </label>
            <input
              id="contact-telefoon"
              type="tel"
              placeholder="+31 6 12 34 56 78"
              className="w-full rounded-[var(--radius-md)] border border-border bg-transparent px-4 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
          </div>

          {/* E-mail */}
          <div>
            <label htmlFor="contact-email" className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">
              E-mail
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="jouw@email.nl"
              className="w-full rounded-[var(--radius-md)] border border-border bg-transparent px-4 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
          </div>

          {/* Behandeling */}
          <div>
            <label htmlFor="contact-behandeling" className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">
              Behandeling
            </label>
            <select
              id="contact-behandeling"
              defaultValue=""
              className="w-full rounded-[var(--radius-md)] border border-border bg-transparent px-4 py-3 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors appearance-none"
            >
              <option value="" disabled>
                Kies een behandeling
              </option>
              <option value="microblading">Microblading</option>
              <option value="powder-brows">Powder Brows</option>
              <option value="combi-brows">Combi Brows</option>
              <option value="consult">Vrijblijvend Consult</option>
            </select>
          </div>

          {/* Bericht */}
          <div>
            <label htmlFor="contact-bericht" className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">
              Bericht
            </label>
            <textarea
              id="contact-bericht"
              rows={4}
              placeholder="Vertel iets over je wensen..."
              className="w-full resize-none rounded-[var(--radius-md)] border border-border bg-transparent px-4 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Verstuur Bericht
          </Button>
        </form>
      </motion.div>
    </Section>
  );
}
