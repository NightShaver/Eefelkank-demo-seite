import Image from "next/image";
import Link from "next/link";
import { sponsoren } from "@/lib/data/site";
import { Reveal, WordReveal } from "@/components/site/motion-primitives";
import { Button } from "@/components/ui/button";
import { Sticker } from "@/components/site/ornament";
import { cn, mitBasis } from "@/lib/utils";

/**
 * Sponsorenwand.
 *
 * Die Logos liegen als Schwarzweiß-Dateien in der Mediathek des Vereins und
 * werden hier auf weißen Karten gezeigt, so wirken sie trotz sehr
 * unterschiedlicher Formate wie eine Reihe.
 */
export function Sponsoren({
  limit,
  kompakt = false,
}: { limit?: number; kompakt?: boolean } = {}) {
  const liste = limit ? sponsoren.slice(0, limit) : sponsoren;
  return (
    <section className="relative overflow-hidden bg-creme-2 py-20 sm:py-28">
      <div aria-hidden className="muster-raute absolute inset-0 text-tinte/[0.03]" />

      <div className="relative mx-auto max-w-[84rem] px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow text-rot">Sponsoren</p>
            </Reveal>
            <WordReveal
              as="h2"
              text="Ohne sie wäre die Halle leer."
              className="mt-5 text-[clamp(2.2rem,4.6vw,3.6rem)] font-bold leading-[0.98] text-tinte"
            />
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-tinte-2">
                Wagen, Orden, Technik, Nachwuchsarbeit: Vieles davon tragen
                Betriebe aus Hastenrath und der Region mit. Dafür sagen wir
                Danke, und empfehlen sie gerne weiter.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="flex items-center gap-4">
              <Sticker ton="rot" rotate={-7} className="hidden sm:inline-flex">
                Danke!
              </Sticker>
              {kompakt ? (
                <Button asChild size="lg">
                  <Link href="/sponsoren">Alle Sponsoren</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" size="lg">
                  <a href="mailto:info@eefelkank.de?subject=Sponsoring">
                    Sponsor werden
                  </a>
                </Button>
              )}
            </div>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {liste.map((s, i) => (
            <Reveal as="li" key={s.file} delay={Math.min(i, 8) * 0.04}>
              <div className="group relative h-28 rounded-2xl bg-creme transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 sm:h-32">
                {/* fill statt fester Maße: die Logos haben sehr verschiedene
                    Seitenverhältnisse, erfundene Maße meldet Next als verzerrt. */}
                <Image
                  src={mitBasis(`/sponsoren/${s.file}`)}
                  alt={s.name}
                  fill
                  sizes="(max-width: 640px) 45vw, 220px"
                  className={cn(
                    "object-contain p-5 opacity-75 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0",
                    /* Logos, die nur als weiße Fassung vorliegen, werden
                       umgekehrt, sonst wären sie auf hellem Grund unsichtbar. */
                    s.invert && "invert group-hover:invert"
                  )}
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
