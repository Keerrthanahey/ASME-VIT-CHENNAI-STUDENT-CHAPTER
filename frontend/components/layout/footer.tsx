import Link from "next/link";
import {
  Share2,
  Link2,
  Code,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-asme-navy/50">
      <div className="absolute inset-0 blueprint-grid opacity-30" aria-hidden="true" />
      <div className="container-custom relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-asme-blue to-asme-cyan">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <div>
                <p className="font-bold text-foreground">{SITE_CONFIG.name}</p>
                <p className="text-xs text-muted-foreground">Student Chapter</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-3">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted-foreground transition-all hover:bg-asme-blue/20 hover:text-asme-cyan"
                aria-label="Instagram"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted-foreground transition-all hover:bg-asme-blue/20 hover:text-asme-cyan"
                aria-label="LinkedIn"
              >
                <Link2 className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted-foreground transition-all hover:bg-asme-blue/20 hover:text-asme-cyan"
                aria-label="GitHub"
              >
                <Code className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted-foreground transition-all hover:bg-asme-blue/20 hover:text-asme-cyan"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-asme-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-sm text-muted-foreground transition-colors hover:text-asme-cyan">
                  Technical Resources
                </Link>
              </li>
              <li>
                <Link href="/tools/calculator" className="text-sm text-muted-foreground transition-colors hover:text-asme-cyan">
                  Engineering Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/converter" className="text-sm text-muted-foreground transition-colors hover:text-asme-cyan">
                  Unit Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/formulas" className="text-sm text-muted-foreground transition-colors hover:text-asme-cyan">
                  Formula Library
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-sm text-muted-foreground transition-colors hover:text-asme-cyan">
                  Certificate Verification
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-asme-cyan" />
                {SITE_CONFIG.address}
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-asme-cyan"
                >
                  <Mail className="h-4 w-4 text-asme-cyan" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.asmeInternational}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-asme-cyan"
                >
                  <ExternalLink className="h-4 w-4 text-asme-cyan" />
                  ASME International
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {SITE_CONFIG.fullName}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-asme-cyan">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-asme-cyan">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
