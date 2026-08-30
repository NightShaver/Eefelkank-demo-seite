"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  korporalschaften,
  korpsKinds,
  type KorpsFilter,
} from "@/lib/data/korporalschaften";
import { KorpsCard, type KartenForm } from "@/components/korps/korps-card";
import { Aufkleber } from "@/components/korps/aufkleber";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Master-View des Portals.
 *
 * Kein gleichförmiges Raster: Form (Kachel, Rundbogen, Kreis), Höhe und
 * Neigung wechseln nach einem festen Muster durch. Das Muster hängt an der
 * Position in der gefilterten Liste, damit die Wand nach jedem Filterklick
 * wieder sauber aufgeht.
 */
/**
 * Fünf Formen wechseln im Raster durch. Die sechste Form () braucht
 * die volle Breite und steht deshalb oberhalb des Rasters als Blickfang,
 * nicht in der Spaltenfolge: sonst risse sie eine Lücke ins Raster.
 */
const FORMEN: KartenForm[] = [
  "kante",
  "bogen",
  "rund",
  "polaroid",
  "welle",
  "kante",
  "bogen",
  "rund",
];

const VERSATZ = [
  "",
  "lg:mt-16",
  "lg:mt-6",
  "lg:mt-20",
  "",
  "lg:mt-12",
  "lg:mt-16",
  "lg:mt-4",
];

const KIPPEN = [-1.4, 1.6, -2, 1.2, -1.8, 2.2, -1, 1.5];

export function KorpsGrid() {
  const [filter, setFilter] = React.useState<KorpsFilter>("Alle");

  const list = React.useMemo(
    () =>
      filter === "Alle"
        ? korporalschaften
        : korporalschaften.filter((k) => k.kind === filter),
    [filter]
  );

  const counts = React.useMemo(() => {
    const map = new Map<string, number>([["Alle", korporalschaften.length]]);
    for (const k of korporalschaften) {
      map.set(k.kind, (map.get(k.kind) ?? 0) + 1);
    }
    return map;
  }, []);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Gruppen filtern"
        className="sticky top-24 z-30 mx-auto flex w-max max-w-full gap-1 overflow-x-auto rounded-full border-2 border-tinte/10 bg-creme/95 p-1 shadow-[0_14px_40px_-22px_rgba(28,16,22,0.7)] backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {korpsKinds.map((kind) => {
          const active = filter === kind;
          const count = counts.get(kind) ?? 0;
          if (count === 0) return null;
          return (
            <button
              key={kind}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(kind)}
              className={cn(
                "relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                active ? "text-creme" : "text-tinte/70 hover:text-tinte"
              )}
            >
              {active && (
                <motion.span
                  layoutId="korps-filter"
                  className="absolute inset-0 rounded-full bg-rot"
                  transition={{ duration: 0.45, ease: EASE }}
                />
              )}
              <span className="relative">
                {kind}
                <span
                  className={cn(
                    "ml-2 text-[0.6875rem] tabular-nums",
                    active ? "text-creme/60" : "text-tinte-3"
                  )}
                >
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="mt-14 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((korps, i) => {
            // Die letzte Karte läuft als breites Band über die volle Zeile.
            const letzte = i === list.length - 1 && list.length > 3;
            return (
            <motion.div
              key={korps.slug}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: Math.min(i, 6) * 0.04,
              }}
              className={cn(
                VERSATZ[i % VERSATZ.length],
                letzte && "sm:col-span-2 lg:col-span-3"
              )}
            >
              <Aufkleber
                form={letzte ? "band" : FORMEN[i % FORMEN.length]}
                kippen={letzte ? -0.6 : KIPPEN[i % KIPPEN.length]}
                klebeband={!letzte && i % 3 === 1}
              >
                <KorpsCard
                  korps={korps}
                  index={i}
                  form={letzte ? "band" : FORMEN[i % FORMEN.length]}
                />
              </Aufkleber>
            </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <p className="mt-16 text-center text-sm text-tinte-3">
          Für diesen Filter gibt es noch keine Gruppe.
        </p>
      )}
    </div>
  );
}
