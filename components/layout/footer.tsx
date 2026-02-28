import Link from "next/link";
import { Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";
import { footerNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream dark:bg-dark">
      {/* Main footer content */}
      <Container>
        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-display text-xl tracking-wide">
                Gwyneth PMU
              </span>
              <span className="mx-1.5 text-gold">&#183;</span>
              <span className="font-display text-xl tracking-wide">
                Microblading
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              {siteConfig.description}
            </p>
          </div>

          {/* Behandelingen column */}
          <div>
            <h3 className="mb-4 font-display text-lg">Behandelingen</h3>
            <ul className="space-y-2.5">
              {footerNav.treatments.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informatie column */}
          <div>
            <h3 className="mb-4 font-display text-lg">Informatie</h3>
            <ul className="space-y-2.5">
              {footerNav.info.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="mb-4 font-display text-lg">Contact</h3>
            <ul className="space-y-2.5">
              {footerNav.contact.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-sm text-cream/70 transition hover:text-cream"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 text-sm text-cream/70 transition hover:text-cream"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-cream/70 transition hover:text-cream"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-cream/70 transition hover:text-cream"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <Separator className="bg-cream/15" />
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-cream/50">
            &copy; 2026 Gwyneth PMU Microblading. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-4">
            {footerNav.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-cream/50 transition hover:text-cream"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
