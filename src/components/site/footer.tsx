import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/lib/data/site";
import { korporalschaften } from "@/lib/data/korporalschaften";
import { Konfetti, Wappen, WappenBadge } from "@/components/site/ornament";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-tinte text-creme">
      <div className="relative mx-auto max-w-[84rem] px-4 pt-16 sm:px-6 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <WappenBadge size={38} ring="size-12 bg-creme" />
              <span className="font-display text-2xl font-bold">Eefelkank</span>
            </div>
            <p className="mt-6 max-w-sm font-display text-2xl font-bold leading-tight sm:text-3xl">
              Karneval ist kein Termin. Karneval ist ein Dorf.
            </p>
            <div className="mt-7 flex gap-3">
              <SocialLink
                href="https://www.facebook.com/www.eefelkank.de"
                label="Facebook"
              >
                <FacebookGlyph />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/" label="Instagram">
                <InstagramGlyph />
              </SocialLink>
              <SocialLink href="mailto:info@eefelkank.de" label="E-Mail">
                <Mail className="size-4" />
              </SocialLink>
            </div>
          </div>

          <FooterCol title="Verein">
            <FooterLink href="/verein">Über uns</FooterLink>
            <FooterLink href="/verein#vorstand">Vorstand</FooterLink>
            <FooterLink href="/veranstaltungen">Sessionsprogramm</FooterLink>
            <FooterLink href="/vermietung">Vereinsheim mieten</FooterLink>
            <FooterLink href="/sponsoren">Sponsoren</FooterLink>
          </FooterCol>

          <FooterCol title="Korporalschaften">
            {korporalschaften.slice(0, 4).map((k) => (
              <FooterLink key={k.slug} href={`/korporalschaften/${k.slug}`}>
                {k.shortName}
              </FooterLink>
            ))}
            <FooterLink href="/korporalschaften">Alle ansehen</FooterLink>
          </FooterCol>

          <FooterCol title="Kontakt">
            <li className="text-sm text-creme/70">
              {site.hall}
              <br />
              {site.town}
            </li>
            <FooterLink href="mailto:info@eefelkank.de">
              info@eefelkank.de
            </FooterLink>
            <FooterLink href="/kontakt">Kontaktseite</FooterLink>
          </FooterCol>
        </div>

        {/* Wortmarken-Abschluss: als SVG gesetzt, damit die Zeile in jeder
            Fensterbreite exakt passt. Verlauf, Konturschrift und Wappen
            machen daraus den Schlusspunkt der Seite. */}
        <div className="relative mt-16 select-none sm:mt-20">
          <Konfetti
            count={14}
            className="opacity-70"
            colors={["var(--color-rot)", "var(--color-gold-2)", "var(--color-creme)"]}
          />
          <Wappen
            size={320}
            className="pointer-events-none absolute left-1/2 top-1/2 w-20 -translate-x-1/2 -translate-y-1/2 opacity-20 sm:w-28"
          />

          <svg viewBox="0 0 1000 150" className="relative w-full" role="presentation" aria-hidden>
            <defs>
              <linearGradient id="wortmarke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-gold-2)" />
                <stop offset="45%" stopColor="var(--color-creme)" />
                <stop offset="100%" stopColor="var(--color-rot)" />
              </linearGradient>
            </defs>

            {/* Konturschrift als Schatten, leicht versetzt */}
            <text
              x="502"
              y="108"
              textAnchor="middle"
              textLength="960"
              lengthAdjust="spacingAndGlyphs"
              fill="none"
              stroke="var(--color-gold-2)"
              strokeWidth="1.5"
              opacity="0.35"
              style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "120px", fontWeight: 900 }}
            >
              Hastenrath Alaaf
            </text>

            <text
              x="500"
              y="104"
              textAnchor="middle"
              textLength="960"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#wortmarke)"
              opacity="0.9"
              style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "120px", fontWeight: 900 }}
            >
              Hastenrath Alaaf
            </text>
          </svg>

          <p className="relative -mt-2 text-center text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-creme/45 sm:tracking-[0.45em]">
            seit 1938 · elf mal elf
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-creme/15 py-7 text-xs text-creme/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.longName} · {site.town}
          </p>
          <div className="flex gap-6">
            <Link className="transition-colors hover:text-creme" href="/impressum">
              Impressum
            </Link>
            <Link className="transition-colors hover:text-creme" href="/datenschutz">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-sans text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-gold-2">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center text-sm text-creme/70 transition-colors duration-300 hover:text-creme"
      >
        <span className="mr-0 w-0 overflow-hidden text-gold-2 transition-all duration-300 group-hover:mr-2 group-hover:w-3">
          ›
        </span>
        {children}
      </Link>
    </li>
  );
}

/* Markenglyphen als Inline-SVG, lucide-react liefert seit v1 keine
   Brand-Icons mehr aus. */
function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.29-.04-1.27-.12-2.4-.12-2.38 0-4 1.45-4 4.12v2.3H7.6V13h2.7v8h3.2Z" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="size-4"
      aria-hidden
    >
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer noopener"
      className="grid size-10 place-items-center rounded-full border border-creme/25 text-creme/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-2 hover:text-gold-2"
    >
      {children}
    </a>
  );
}
