import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal, WordReveal } from "@/components/site/motion-primitives";
import { Konfetti, Wappen, ZickZack } from "@/components/site/ornament";
import { cn } from "@/lib/utils";

type Ton = "rot" | "pflaume" | "gold" | "tinte";

const TOENE: Record<Ton, { flaeche: string; text: string; eyebrow: string; kante: string }> = {
  rot: {
    flaeche: "bg-rot",
    text: "text-creme",
    eyebrow: "text-gold-2",
    kante: "text-creme",
  },
  pflaume: {
    flaeche: "bg-pflaume",
    text: "text-creme",
    eyebrow: "text-gold-2",
    kante: "text-creme",
  },
  gold: {
    flaeche: "bg-gold",
    text: "text-tinte",
    eyebrow: "text-rot",
    kante: "text-creme",
  },
  tinte: {
    flaeche: "bg-tinte",
    text: "text-creme",
    eyebrow: "text-gold-2",
    kante: "text-creme",
  },
};

/**
 * Gemeinsamer Seitenkopf aller Unterseiten.
 *
 * Farbfläche, Konfetti, Wappen als Wasserzeichen und eine Zickzack-Kante
 * zum nächsten Abschnitt, damit alle Bereiche als eine Seite gelesen
 * werden und nicht wie einzelne Landingpages wirken.
 */
export function PageHeader({
  eyebrow,
  titel,
  lead,
  ton = "rot",
  zurueck,
  children,
}: {
  eyebrow: string;
  titel: string;
  lead?: string;
  ton?: Ton;
  zurueck?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  const t = TOENE[ton];

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-[calc(var(--nav-h)+4.5rem)] sm:pt-[calc(var(--nav-h)+6rem)]",
        t.flaeche,
        t.text
      )}
    >
      <div aria-hidden className="muster-punkte absolute inset-0 opacity-15" />
      <Konfetti count={10} colors={["#fbf5ea", "#eabc51"]} className="opacity-70" />
      <Wappen
        size={520}
        eager
        className="pointer-events-none absolute -bottom-12 -right-10 hidden w-72 opacity-[0.13] lg:block"
      />

      <div className="relative mx-auto max-w-[84rem] px-4 pb-12 sm:px-6">
        {zurueck && (
          <Link
            href={zurueck.href}
            className="group inline-flex items-center gap-2 text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
          >
            <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />
            {zurueck.label}
          </Link>
        )}

        <Reveal>
          <p className={cn("eyebrow", zurueck && "mt-7", t.eyebrow)}>{eyebrow}</p>
        </Reveal>

        <WordReveal
          as="h1"
          text={titel}
          className="mt-4 max-w-5xl text-[clamp(2.6rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.03em]"
        />

        {lead && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-85">
              {lead}
            </p>
          </Reveal>
        )}

        {children}
      </div>

      <ZickZack flip className={t.kante} />
    </section>
  );
}
