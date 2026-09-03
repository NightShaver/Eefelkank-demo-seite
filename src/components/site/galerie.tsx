"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Photo } from "@/components/site/photo";
import { Luftballons, Konfetti } from "@/components/site/ornament";
import { cn } from "@/lib/utils";
import startseite from "@/lib/data/generated/startseite.json";

const EASE = [0.16, 1, 0.3, 1] as const;

type Bild = { src: string; alt: string; spruch: string; quelle: string };

/**
 * Bildergalerie mit wechselnden Sprüchen.
 *
 * Zu jedem Foto gehört ein Satz, der erklärt, was man sieht. Die Bilder
 * wechseln von selbst, lassen sich aber jederzeit anhalten und von Hand
 * weiterschalten. Bei `prefers-reduced-motion` läuft nichts automatisch.
 */
const BILDER = startseite.archivbilder as Bild[];

const WECHSEL = 5200;

export function Galerie({
  titel = "Bilder aus der Session",
  eyebrow = "Galerie",
  ton = "creme",
}: {
  titel?: string;
  eyebrow?: string;
  ton?: "creme" | "pflaume";
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [laeuft, setLaeuft] = React.useState(true);

  const weiter = React.useCallback(
    (richtung: 1 | -1) =>
      setIndex((i) => (i + richtung + BILDER.length) % BILDER.length),
    []
  );

  React.useEffect(() => {
    if (!laeuft || reduced) return;
    const t = window.setInterval(() => weiter(1), WECHSEL);
    return () => window.clearInterval(t);
  }, [laeuft, reduced, weiter]);

  const dunkel = ton === "pflaume";
  const aktuell = BILDER[index];

  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 sm:py-28",
        dunkel ? "bg-pflaume text-creme" : "bg-creme text-tinte"
      )}
    >
      <Luftballons
        count={5}
        className={dunkel ? "opacity-40" : "opacity-30"}
      />
      <Konfetti
        count={10}
        className={dunkel ? "opacity-50" : "opacity-40"}
        colors={["var(--color-rot)", "var(--color-gold-2)", "var(--color-jeck-blau)"]}
      />

      <div className="relative mx-auto max-w-[84rem] px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={cn("eyebrow", dunkel ? "text-gold-2" : "text-rot")}>
              {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-tight">
              {titel}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Knopf
              label="Vorheriges Bild"
              onClick={() => {
                setLaeuft(false);
                weiter(-1);
              }}
              dunkel={dunkel}
            >
              <ChevronLeft className="size-5" />
            </Knopf>
            <Knopf
              label={laeuft ? "Wechsel anhalten" : "Wechsel starten"}
              onClick={() => setLaeuft((v) => !v)}
              dunkel={dunkel}
            >
              {laeuft ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4 translate-x-0.5" />
              )}
            </Knopf>
            <Knopf
              label="Nächstes Bild"
              onClick={() => {
                setLaeuft(false);
                weiter(1);
              }}
              dunkel={dunkel}
            >
              <ChevronRight className="size-5" />
            </Knopf>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border-[6px] border-creme-2 bg-creme-2 sm:aspect-[16/10]">
            <AnimatePresence initial={false}>
              <motion.div
                key={aktuell.src}
                initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="absolute inset-0"
              >
                <Photo
                  src={aktuell.src}
                  alt={aktuell.alt}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  flaeche="bg-creme-2"
                  className="size-full rounded-[1.25rem]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <div>
              <motion.blockquote
                key={aktuell.spruch}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-[1.25]">
                  „{aktuell.spruch}“
                </p>
                <footer
                  className={cn(
                    "mt-4 text-sm",
                    dunkel ? "text-creme/70" : "text-tinte-3"
                  )}
                >
                  {aktuell.quelle}
                </footer>
              </motion.blockquote>
            </div>

            {/* Fortschritt: welches Bild von wie vielen */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {BILDER.map((b, i) => (
                <button
                  key={b.src}
                  type="button"
                  onClick={() => {
                    setLaeuft(false);
                    setIndex(i);
                  }}
                  aria-label={`Bild ${i + 1} von ${BILDER.length}: ${b.quelle}`}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    i === index
                      ? "w-10 bg-rot"
                      : dunkel
                        ? "w-2 bg-creme/35 hover:bg-creme/60"
                        : "w-2 bg-tinte/20 hover:bg-tinte/40"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Knopf({
  children,
  label,
  onClick,
  dunkel,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  dunkel: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "grid size-11 place-items-center rounded-full border-2 transition-colors duration-300",
        dunkel
          ? "border-creme/30 text-creme hover:border-gold-2 hover:bg-gold-2 hover:text-tinte"
          : "border-tinte/20 text-tinte hover:border-rot hover:bg-rot hover:text-creme"
      )}
    >
      {children}
    </button>
  );
}
