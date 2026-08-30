import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { korporalschaften } from "@/lib/data/korporalschaften";
import { KorpsCard } from "@/components/korps/korps-card";
import { Aufkleber } from "@/components/korps/aufkleber";
import { Reveal, WordReveal } from "@/components/site/motion-primitives";
import {
  Konfetti,
  Luftballons,
  RundSticker,
  Sticker,
} from "@/components/site/ornament";

/**
 * Vorschau auf das Portal.
 *
 * Statt eines gleichmäßigen Rasters stehen hier drei unterschiedlich
 * geformte Karten auf verschiedenen Höhen, Kachel, Rundbogen, Kreis.
 * Das liest sich wie eine Pinnwand und nicht wie eine Tabelle.
 */
export function KorpsPreview() {
  const [ersteKarte, zweiteKarte, dritteKarte] = korporalschaften.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-creme-2 py-20 sm:py-28">
      <div aria-hidden className="muster-raute absolute inset-0 text-tinte/[0.035]" />
      <Luftballons count={4} className="opacity-30" />
      <Konfetti count={12} className="opacity-50" />

      <div className="relative mx-auto max-w-[84rem] px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow text-rot">Das Herz des Vereins</p>
            </Reveal>
            <WordReveal
              as="h2"
              text="Acht Gruppen. Ein Verein."
              className="mt-5 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[0.98] text-tinte"
            />
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-tinte-2">
                Korporalschaften, Garden, Musik und Elferrat, jede Gruppe hat
                ihre eigene Geschichte, ihre eigenen Termine und ihre eigenen
                Bilder. Ab jetzt auch ihren eigenen Bereich.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <Link
              href="/korporalschaften"
              className="group inline-flex items-center gap-3 rounded-full bg-tinte px-6 py-3.5 text-sm font-semibold text-creme transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
            >
              Alle acht ansehen
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="relative mt-14">
          <RundSticker
            oben="11.11"
            unten="Sessionsstart"
            ton="pflaume"
            rotate={12}
            className="absolute -right-4 -top-14 z-20 hidden size-24 lg:grid"
          />

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-7">
            <div className="lg:w-[50%]">
              <Reveal>
                <Aufkleber kippen={-1.4} klebeband>
                  <KorpsCard korps={ersteKarte} index={0} gross />
                </Aufkleber>
              </Reveal>
            </div>

            <div className="lg:mt-14 lg:w-[29%]">
              <Reveal delay={0.1}>
                <Aufkleber form="bogen" kippen={1.8}>
                  <KorpsCard korps={zweiteKarte} form="bogen" />
                </Aufkleber>
              </Reveal>
            </div>

            <div className="lg:mt-4 lg:w-[21%]">
              <Reveal delay={0.18}>
                <Aufkleber form="rund" kippen={-2.2}>
                  <KorpsCard korps={dritteKarte} form="rund" index={2} />
                </Aufkleber>
              </Reveal>
              <Reveal delay={0.26}>
                <div className="mt-8 hidden justify-center lg:flex">
                  <Sticker ton="gold" rotate={-6}>
                    + fünf weitere
                  </Sticker>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
