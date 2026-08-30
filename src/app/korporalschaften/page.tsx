import type { Metadata } from "next";
import { KorpsGrid } from "@/components/korps/korps-grid";
import { Reveal, WordReveal } from "@/components/site/motion-primitives";
import {
  Konfetti,
  Luftballons,
  Luftschlangen,
  RundSticker,
  Sticker,
  Wappen,
  ZickZack,
} from "@/components/site/ornament";
import { korporalschaften } from "@/lib/data/korporalschaften";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Korporalschaften",
  description:
    "Alle Gruppen der KG Eefelkank e.V. auf einen Blick: Korporalschaften, Damengarde, Kindertanz, Trompeterkorps und Elferrat, mit Geschichte, Terminen und Galerie.",
};

export default function KorporalschaftenPage() {
  const total = korporalschaften.reduce((sum, k) => sum + k.members, 0);

  return (
    <>
      <section className="relative overflow-hidden bg-pflaume pt-[calc(var(--nav-h)+5rem)] text-creme sm:pt-[calc(var(--nav-h)+6.5rem)]">
        <div aria-hidden className="muster-punkte absolute inset-0 text-creme/12" />
        <Konfetti count={12} colors={["#eabc51", "#d5122a", "#fbf5ea"]} />
        <Wappen
          size={520}
          className="pointer-events-none absolute -right-12 -bottom-10 hidden w-80 opacity-[0.12] lg:block"
        />

        <div className="relative mx-auto max-w-[84rem] px-4 pb-14 sm:px-6">
          <Reveal>
            <p className="eyebrow text-gold-2">Das Portal</p>
          </Reveal>
          <WordReveal
            as="h1"
            text="Korporalschaften"
            className="mt-4 text-[clamp(2.8rem,10.5vw,9rem)] font-black leading-[0.86] tracking-[-0.03em]"
          />

          <div className="mt-9 grid gap-8 border-t border-creme/20 pt-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-lg leading-relaxed text-creme/85">
                Der Verein ist keine Masse, sondern viele kleine Truppen. Jede
                Korporalschaft, jede Garde und das Trompeterkorps haben eine
                eigene Geschichte, eigene Trainingszeiten und eigene Auftritte.
                Hier bekommt jede Gruppe ihren eigenen Bereich.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="grid grid-cols-3 gap-6">
                <Stat value={String(korporalschaften.length)} label="Gruppen" />
                <Stat value={String(total)} label="Aktive" />
                <Stat value={String(site.founded)} label="seit" />
              </dl>
            </Reveal>
          </div>
        </div>

        <ZickZack flip className="text-creme" />
      </section>

      {/* Leinwand: Karnevalsmotive im Hintergrund, Karten als Aufkleber darauf */}
      <section className="relative overflow-hidden bg-creme-2 py-14 sm:py-20">
        <div aria-hidden className="muster-raute absolute inset-0 text-tinte/[0.035]" />
        <Luftschlangen className="top-6 h-24 opacity-50 sm:h-32" />
        <Luftballons count={6} className="opacity-35" />
        <Konfetti
          count={18}
          className="opacity-50"
          colors={["var(--color-rot)", "var(--color-gold-2)", "var(--color-jeck-blau)", "var(--color-jeck-gruen)"]}
        />
        <Wappen
          size={520}
          className="pointer-events-none absolute -left-16 top-1/3 hidden w-64 opacity-[0.06] lg:block"
        />
        {/* Aufkleber statt Laufband: sie sitzen an unterschiedlichen Stellen
            und wiederholen sich nicht auf jeder Seite gleich. */}
        <RundSticker
          oben={site.greeting}
          unten="seit 1938"
          ton="rot"
          rotate={-13}
          className="absolute left-4 top-6 z-10 hidden size-28 xl:grid"
        />
        <Sticker
          ton="gold"
          rotate={9}
          className="absolute right-6 top-24 z-10 hidden xl:inline-flex"
        >
          Rot &amp; Weiß
        </Sticker>

        <div className="relative mx-auto max-w-[84rem] px-4 sm:px-6">
          <KorpsGrid />
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block font-display text-3xl font-black leading-none text-gold-2 sm:text-4xl">
          {value}
        </span>
        <span className="mt-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-creme/60">
          {label}
        </span>
      </dd>
    </div>
  );
}
