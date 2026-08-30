import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sponsoren } from "@/lib/data/site";
import { Reveal } from "@/components/site/motion-primitives";
import { Sticker } from "@/components/site/ornament";
import { cn, mitBasis } from "@/lib/utils";

/**
 * Kurzer Hinweis auf die Sponsoren.
 *
 * Auf der Startseite steht bewusst nicht dieselbe Wand wie auf der
 * Sponsorenseite: eine Zeile Logos, ein Satz, ein Link.
 *
 * Heller Grund mit weißen Karten, wie auf der Sponsorenseite. Auf dunklem
 * Grund müssten farbige Logos umgefärbt werden, und alles mit weißem
 * Bildhintergrund würde dabei zum weißen Klotz.
 */
export function SponsorenTeaser() {
  const auswahl = sponsoren.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-creme-2 py-16 sm:py-20">
      <div aria-hidden className="muster-punkte absolute inset-0 text-tinte/[0.05]" />

      <div className="relative mx-auto max-w-[84rem] px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal>
            <div className="flex items-center gap-5">
              <Sticker ton="rot" rotate={-8} className="hidden shrink-0 sm:inline-flex">
                Danke!
              </Sticker>
              <p className="max-w-md font-display text-xl font-bold leading-snug text-tinte sm:text-2xl">
                {sponsoren.length} Betriebe aus Hastenrath und der Region halten
                den Karneval mit am Laufen.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              href="/sponsoren"
              className="group inline-flex items-center gap-3 rounded-full bg-tinte px-6 py-3.5 text-sm font-semibold text-creme transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
            >
              Alle Sponsoren ansehen
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ul className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
            {auswahl.map((s) => (
              <li key={s.file}>
                <div className="relative h-20 rounded-2xl bg-creme sm:h-24">
                  {/* fill: die Logos haben sehr verschiedene Seitenverhältnisse */}
                  <Image
                    src={mitBasis(`/sponsoren/${s.file}`)}
                    alt={s.name}
                    fill
                    sizes="(max-width: 640px) 30vw, 180px"
                    className={cn(
                      "object-contain p-4 opacity-75 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0",
                      s.invert && "invert"
                    )}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
