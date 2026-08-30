import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, WordReveal } from "@/components/site/motion-primitives";
import { Photo } from "@/components/site/photo";
import { Sticker } from "@/components/site/ornament";
import { cn } from "@/lib/utils";

/**
 * Kurzer Verweis auf einen eigenen Bereich.
 *
 * Wird auf der Startseite genutzt, damit dort nicht dieselben Inhalte
 * stehen wie auf den Unterseiten: ein Bild, drei Sätze, ein Link.
 */
export function Teaser({
  eyebrow,
  titel,
  text,
  href,
  cta,
  bild,
  bildAlt,
  aufkleber,
  seite = "links",
  hintergrund = "creme",
}: {
  eyebrow: string;
  titel: string;
  text: string;
  href: string;
  cta: string;
  bild: string;
  bildAlt: string;
  aufkleber?: string;
  /** Auf welcher Seite das Bild steht */
  seite?: "links" | "rechts";
  hintergrund?: "creme" | "creme-2";
}) {
  return (
    <section
      className={cn(
        "py-20 sm:py-24",
        hintergrund === "creme-2" ? "bg-creme-2" : "bg-creme"
      )}
    >
      <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className={seite === "rechts" ? "lg:order-2" : undefined}>
            <div className="relative">
              <figure
                className={cn(
                  "overflow-hidden rounded-[1.75rem] border-[6px]",
                  hintergrund === "creme-2"
                    ? "border-creme bg-creme"
                    : "border-creme-2 bg-creme-2"
                )}
              >
                <Photo
                  src={bild}
                  alt={bildAlt}
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="aspect-[4/3] w-full rounded-[1.25rem]"
                />
              </figure>

              {aufkleber && (
                <Sticker
                  ton="rot"
                  rotate={-9}
                  className="absolute -bottom-4 left-6"
                >
                  {aufkleber}
                </Sticker>
              )}
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-rot">{eyebrow}</p>
            </Reveal>
            <WordReveal
              as="h2"
              text={titel}
              className="mt-5 text-[clamp(2rem,4.2vw,3.2rem)] font-bold leading-[1] text-tinte"
            />
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-tinte-2">
                {text}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href={href}
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-tinte px-6 py-3.5 text-sm font-semibold text-creme transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
              >
                {cta}
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
