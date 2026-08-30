"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/site/photo";
import { Konfetti, Siegel, Sticker, ZickZack } from "@/components/site/ornament";
import { site } from "@/lib/data/site";
import { nextEvent } from "@/lib/data/events";
import { formatDate, formatWeekday } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero als Sessionsplakat: rote Vollflaeche, Konfetti, riesige Schrift und
 * zwei aufgeklebte Fotos. Der naechste Termin steht direkt darunter, die
 * Frage, mit der die meisten Besucher kommen, wird sofort beantwortet.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const upcoming = nextEvent();

  return (
    <section className="relative overflow-hidden bg-rot pb-0 pt-[calc(var(--nav-h)+3.5rem)] text-creme sm:pt-[calc(var(--nav-h)+5rem)]">
      <div aria-hidden className="muster-punkte absolute inset-0 text-creme/15" />
      <Konfetti
        count={16}
        colors={["#fbf5ea", "#eabc51", "#3d0f33"]}
        className="opacity-80"
      />

      <div className="relative mx-auto grid max-w-[84rem] gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="eyebrow inline-flex items-center gap-3 rounded-full bg-creme/15 px-4 py-2 text-creme"
          >
            <span className="size-2 rotate-45 bg-gold-2" />
            {site.session} · {site.town}
          </motion.p>

          <h1 className="mt-6 font-display leading-[0.82] tracking-[-0.03em]">
            <span className="sr-only">
              Eefelkank, Karneval aus Eschweiler-Hastenrath. Hastenrath Alaaf.
            </span>
            <span aria-hidden className="block">
              <Line delay={0.2} className="text-[clamp(3.6rem,13vw,10rem)] font-black">
                Eefelkank
              </Line>
              <Line
                delay={0.34}
                className="text-[clamp(2.1rem,7.6vw,6rem)] font-bold text-gold-2"
              >
                Hastenrath Alaaf
              </Line>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-creme/90"
          >
            Über 400 Mitglieder, sieben Korporalschaften, Garden und ein
            Trompeterkorps, das man drei Dörfer weiter hört. Seit Generationen
            feiern wir den Eischwiele Fastelovend so, wie er sein soll: laut,
            herzlich und für alle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" variant="gold">
              <Link href="/#veranstaltungen">
                Sessionsprogramm
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outlineHell">
              <Link href="/korporalschaften">Korporalschaften</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
            className="mt-10"
          >
            <NextUp
              title={upcoming.title}
              date={upcoming.date}
              time={upcoming.time}
              venue={upcoming.venue}
              soldOut={upcoming.soldOut}
            />
          </motion.div>
        </div>

        {/* Fotostapel, leicht schief aufgeklebt wie im Sessionsalbum */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: reduced ? 0 : -4 }}
          animate={{ opacity: 1, y: 0, rotate: reduced ? 0 : -2.2 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="relative mx-auto w-full max-w-lg pb-16 lg:max-w-none lg:pb-24"
        >
          <div className="relative rounded-[1.75rem] border-[6px] border-creme bg-creme shadow-[0_30px_70px_-30px_rgba(28,16,22,0.7)]">
            <Photo
              src="/bilder/garde-hebefigur.jpg"
              alt="Tänzerinnen der Garde bei einer Hebefigur auf der Bühne"
              eager
              sizes="(max-width: 1024px) 90vw, 44vw"
              className="aspect-[4/5] w-full rounded-[1.25rem] sm:aspect-[4/3] lg:aspect-[4/5]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: reduced ? 0 : 6 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            className="absolute -bottom-2 -left-4 w-40 rounded-2xl border-[5px] border-creme bg-creme shadow-[0_20px_50px_-24px_rgba(28,16,22,0.8)] sm:-left-8 sm:w-52 lg:-left-12 lg:w-56"
          >
            <Photo
              src="/bilder/buehne-fontaenen.jpg"
              alt="Bühne mit Feuerfontänen während einer Sitzung"
              eager
              sizes="220px"
              className="aspect-[4/3] w-full rounded-xl"
            />
          </motion.div>

          <Siegel className="absolute -right-3 -top-10 size-28 sm:-right-8 sm:size-36 lg:-top-14" />

          <Sticker
            ton="creme"
            rotate={9}
            className="absolute -bottom-4 right-2 sm:right-6"
          >
            seit 1938
          </Sticker>
        </motion.div>
      </div>

      <ZickZack flip className="relative mt-4 text-creme" />
    </section>
  );
}

function Line({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "106%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Der naechste Termin, als Streifen unter dem Titel. */
function NextUp({
  title,
  date,
  time,
  venue,
  soldOut,
}: {
  title: string;
  date: string;
  time: string;
  venue: string;
  soldOut?: boolean;
}) {
  return (
    <Link
      href="/#veranstaltungen"
      className="group flex flex-col gap-4 rounded-3xl bg-creme p-5 text-tinte transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 sm:flex-row sm:items-center sm:gap-6"
    >
      <span className="flex size-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-rot text-creme">
        <span className="font-display text-xl font-bold leading-none">
          {new Date(date).getDate()}
        </span>
        <span className="mt-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.14em]">
          {new Intl.DateTimeFormat("de-DE", { month: "short" })
            .format(new Date(date))
            .replace(".", "")}
        </span>
      </span>

      <span className="min-w-0 flex-1">
        <span className="eyebrow text-rot">
          Als Nächstes{soldOut ? " · ausverkauft" : ""}
        </span>
        <span className="mt-1 block font-display text-2xl font-bold">{title}</span>
        <span className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-tinte-3">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4 text-rot" aria-hidden />
            {formatWeekday(date)}, {formatDate(date)} · {time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4 text-rot" aria-hidden />
            {venue}
          </span>
        </span>
      </span>

      <ArrowRight
        className="hidden size-5 shrink-0 text-rot transition-transform duration-500 group-hover:translate-x-1 sm:block"
        aria-hidden
      />
    </Link>
  );
}
