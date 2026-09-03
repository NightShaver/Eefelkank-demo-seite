"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import { events, eventCategories, type ClubEvent } from "@/lib/data/events";
import { splitDate, formatWeekday, cn } from "@/lib/utils";
import { Reveal, WordReveal } from "@/components/site/motion-primitives";
import { Photo } from "@/components/site/photo";
import { RundSticker } from "@/components/site/ornament";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Terminliste.
 *
 * `kompakt` ist die Fassung für die Startseite: die nächsten drei Termine
 * ohne Filter, mit Verweis auf das vollständige Sessionsprogramm. Jeder
 * Termin führt auf seine eigene Unterseite.
 */
export function Events({
  kompakt = false,
  anzahl = 3,
}: {
  kompakt?: boolean;
  anzahl?: number;
}) {
  const [filter, setFilter] = React.useState<string>("Alle");

  const list = React.useMemo(() => {
    if (kompakt) return events.slice(0, anzahl);
    return filter === "Alle"
      ? events
      : events.filter((e) => e.category === filter);
  }, [filter, kompakt, anzahl]);

  return (
    <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal>
            <p className="eyebrow text-gold-2">
              {kompakt ? "Als Nächstes" : "Sessionsprogramm 2026 / 2027"}
            </p>
          </Reveal>
          <WordReveal
            as="h2"
            text={
              kompakt
                ? "Die nächsten Termine."
                : "Sieben Termine, an denen Hastenrath nicht schläft."
            }
            className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[0.98]"
          />
        </div>

        {kompakt ? (
          <Reveal delay={0.15}>
            <Link
              href="/veranstaltungen"
              className="group inline-flex items-center gap-3 rounded-full bg-gold-2 px-6 py-3.5 text-sm font-semibold text-tinte transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
            >
              Ganzes Sessionsprogramm
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        ) : (
          <Reveal delay={0.15}>
            <div
              role="tablist"
              aria-label="Veranstaltungen filtern"
              className="flex flex-wrap gap-1 rounded-full border-2 border-creme/20 p-1"
            >
              {eventCategories.map((cat) => {
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      active
                        ? "text-pflaume"
                        : "text-creme/70 hover:text-creme",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="event-filter"
                        className="absolute inset-0 rounded-full bg-gold-2"
                        transition={{ duration: 0.45, ease: EASE }}
                      />
                    )}
                    <span className="relative">{cat}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}
      </div>

      {/* Ab etwa acht Terminen scrollt die Liste in sich, statt die Seite
          endlos zu strecken. Der Kompakt-Modus auf der Startseite zeigt
          ohnehin nur die naechsten und braucht das nicht.

          Der Aufkleber sitzt bewusst ausserhalb der Liste, in derselben
          Position wie zuvor: unten rechts. Laege er innerhalb, ragte er durch
          sein -bottom-16 aus dem Scrollbereich und erzeugte einen
          waagerechten Balken. */}
      <div className="relative">
        <ul
          className={cn(
            "relative mt-12 border-t border-creme/20",
            !kompakt &&
              "leiste leiste-gold max-h-[46rem] overflow-x-hidden overflow-y-auto pr-3",
          )}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((event) => (
              <motion.li
                key={event.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="border-b border-creme/20"
              >
                <EventZeile event={event} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {!kompakt && (
          <RundSticker
            oben="19:11"
            unten="Uhr geht's los"
            ton="gold"
            rotate={-12}
            className="absolute -bottom-16 right-0 z-10 hidden size-24 lg:grid"
          />
        )}
      </div>

      {!kompakt && (
        <Reveal delay={0.1}>
          <p className="mt-8 text-sm text-creme/55">
            Kartenvorverkauf über den Vorstand und an den bekannten
            Vorverkaufsstellen in Hastenrath. Alle Angaben ohne Gewähr.
          </p>
        </Reveal>
      )}
    </div>
  );
}

function EventZeile({ event }: { event: ClubEvent }) {
  const d = splitDate(event.date);

  return (
    /*
     * Die ganze Zeile ist der Link, nicht nur die Überschrift. Vorher lag
     * eine unsichtbare Klickfläche der Überschrift hinter Text und Knopf,
     * beides fing die Klicks ab. Der Knopf „Details“ bleibt reine Optik.
     */
    <article className="group">
      <Link
        href={`/veranstaltungen/${event.id}`}
        className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-4 py-7 sm:grid-cols-[auto_auto_1fr_auto] sm:items-center sm:gap-x-7 sm:py-8"
      >
        <div className="flex flex-col items-start">
          <span className="font-display text-4xl font-black leading-none text-gold-2 sm:text-5xl">
            {d.day}
          </span>
          <span className="mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-creme/70">
            {d.month} {d.year}
          </span>
        </div>

        {/* Bild aus dem Archiv, gibt jedem Termin ein Gesicht */}
        <div className="col-start-2 row-start-1 w-28 shrink-0 overflow-hidden rounded-xl border-[3px] border-creme/25 sm:col-start-2 sm:w-40">
          <Photo
            src={event.image}
            alt={`Eindruck von der Veranstaltung ${event.title}`}
            sizes="180px"
            className="aspect-[3/2] w-full"
            imgClassName="transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
          />
        </div>

        <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-3">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl font-bold transition-colors duration-300 group-hover:text-gold-2 sm:text-3xl">
              {event.title}
            </h3>
            {event.soldOut && (
              <span className="rounded-full bg-creme/15 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-creme">
                Ausverkauft
              </span>
            )}
            {event.highlight && !event.soldOut && (
              <span className="rounded-full bg-gold-2 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-pflaume">
                Höhepunkt
              </span>
            )}
          </div>
          <p className="mt-2.5 max-w-2xl leading-relaxed text-creme/80">
            {event.description}
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-creme/60">
            <span>{formatWeekday(event.date)}</span>
            <span className="font-semibold text-creme/90">{event.time}</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-gold-2" aria-hidden />
              {event.venue}
            </span>
          </p>
        </div>

        <span
          aria-hidden
          className="col-span-2 inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-gold-2 px-5 py-3 text-sm font-semibold text-gold-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:bg-gold-2 group-hover:text-pflaume sm:col-span-1 sm:col-start-4"
        >
          Details
          <ArrowRight className="size-4" />
        </span>
      </Link>
    </article>
  );
}
