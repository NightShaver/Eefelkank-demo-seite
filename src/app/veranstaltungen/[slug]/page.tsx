import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import { events, getEvent } from "@/lib/data/events";
import { site } from "@/lib/data/site";
import hinweise from "@/lib/data/generated/hinweise.json";
import { Photo } from "@/components/site/photo";
import { Reveal, WordReveal } from "@/components/site/motion-primitives";
import { Konfetti, Sticker, Wappen, ZickZack } from "@/components/site/ornament";
import { Button } from "@/components/ui/button";
import { formatDate, formatWeekday, splitDate } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return events.map((e) => ({ slug: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Nicht gefunden" };

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: `${event.title} · ${formatDate(event.date)}`,
      description: event.description,
      images: [event.image],
    },
  };
}

export default async function VeranstaltungPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const weitere = events.filter((e) => e.id !== event.id).slice(0, 3);

  return (
    <>
      {/* Kopf */}
      <section className="relative overflow-hidden bg-pflaume pt-[calc(var(--nav-h)+4rem)] text-creme sm:pt-[calc(var(--nav-h)+5.5rem)]">
        <div aria-hidden className="muster-punkte absolute inset-0 opacity-15" />
        <Konfetti count={10} colors={["#eabc51", "#d5122a", "#fbf5ea"]} />
        <Wappen
          size={480}
          className="pointer-events-none absolute -right-10 bottom-0 hidden w-64 opacity-[0.12] lg:block"
        />

        <div className="relative mx-auto max-w-[84rem] px-4 pb-14 sm:px-6">
          <Link
            href="/veranstaltungen"
            className="group inline-flex items-center gap-2 text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
          >
            <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />
            Ganzes Sessionsprogramm
          </Link>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <Marke>{event.category}</Marke>
            <Marke>{formatWeekday(event.date)}</Marke>
            {event.soldOut && <Marke>Ausverkauft</Marke>}
            {event.highlight && !event.soldOut && <Marke>Höhepunkt</Marke>}
          </div>

          <WordReveal
            as="h1"
            text={event.title}
            className="mt-6 max-w-4xl text-[clamp(2.4rem,7vw,5.5rem)] font-black leading-[0.92] tracking-[-0.03em]"
          />

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-creme/85">
              {event.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bild + Eckdaten */}
      <section className="bg-creme pb-16 pt-0 sm:pb-24">
        <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
          <Reveal>
            <figure className="-mt-10 overflow-hidden rounded-[1.75rem] border-[6px] border-creme bg-creme-2 shadow-[0_30px_70px_-40px_rgba(28,16,22,0.6)] sm:-mt-16">
              <Photo
                src={event.image}
                alt={`Eindruck von der Veranstaltung ${event.title}`}
                eager
                sizes="100vw"
                className="aspect-[4/3] w-full rounded-[1.25rem] sm:aspect-[21/9]"
              />
            </figure>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <Reveal>
                <p className="eyebrow text-rot">Eckdaten</p>
              </Reveal>

              <dl className="mt-6 divide-y-2 divide-tinte/10 border-y-2 border-tinte/10">
                <Zeile
                  icon={<CalendarDays className="size-4" />}
                  label="Datum"
                  wert={`${formatWeekday(event.date)}, ${formatDate(event.date)}`}
                />
                <Zeile
                  icon={<Clock className="size-4" />}
                  label="Beginn"
                  wert={event.time}
                />
                <Zeile
                  icon={<MapPin className="size-4" />}
                  label="Ort"
                  wert={event.venue}
                />
                <Zeile
                  icon={<Ticket className="size-4" />}
                  label="Karten"
                  wert={
                    event.soldOut
                      ? "Ausverkauft, Warteliste per Mail"
                      : "Vorverkauf über den Vorstand"
                  }
                />
              </dl>

              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <a
                      href={`mailto:info@eefelkank.de?subject=${encodeURIComponent(
                        `${event.soldOut ? "Warteliste" : "Karten"}: ${event.title}`
                      )}`}
                    >
                      {event.soldOut ? "Auf die Warteliste" : "Karten anfragen"}
                      <ArrowRight aria-hidden />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/halle">Anfahrt & Halle</Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <div className="relative overflow-hidden rounded-[1.5rem] bg-creme-2 p-7 sm:p-9">
                  <div
                    aria-hidden
                    className="muster-raute absolute inset-0 text-tinte/[0.04]"
                  />
                  <div className="relative">
                    <p className="eyebrow text-rot">Gut zu wissen</p>
                    <ul className="mt-5 space-y-4 text-tinte-2">
                      {hinweise.map((hinweis) => (
                        <li key={hinweis}>{hinweis}</li>
                      ))}
                    </ul>

                    <div className="mt-7">
                      <Sticker ton="rot" rotate={-5}>
                        {site.greeting}
                      </Sticker>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Weitere Termine */}
      <section className="relative bg-pflaume text-creme">
        <ZickZack className="text-creme" />
        <div className="mx-auto max-w-[84rem] px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <p className="eyebrow text-gold-2">Weiter in der Session</p>
          </Reveal>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-bold">
            Diese Termine kommen auch noch
          </h2>

          <ul className="mt-9 grid gap-5 sm:grid-cols-3">
            {weitere.map((e, i) => {
              const d = splitDate(e.date);
              return (
                <Reveal as="li" key={e.id} delay={i * 0.07}>
                  <Link
                    href={`/veranstaltungen/${e.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-creme/5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
                  >
                    <Photo
                      src={e.image}
                      alt={`Eindruck von der Veranstaltung ${e.title}`}
                      sizes="(max-width: 640px) 90vw, 30vw"
                      className="aspect-[16/10] w-full"
                      imgClassName="transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-2">
                        {d.day}. {d.month} {d.year}
                      </span>
                      <span className="mt-2 font-display text-xl font-bold">
                        {e.title}
                      </span>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-2">
                        Details
                        <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
        <ZickZack flip className="text-creme" />
      </section>
    </>
  );
}

function Marke({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-creme/15 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em]">
      {children}
    </span>
  );
}

function Zeile({
  icon,
  label,
  wert,
}: {
  icon: React.ReactNode;
  label: string;
  wert: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-4">
      <dt className="flex items-center gap-2.5 text-sm font-semibold text-tinte-3">
        <span className="text-rot">{icon}</span>
        {label}
      </dt>
      <dd className="text-right font-display text-lg font-bold text-tinte">
        {wert}
      </dd>
    </div>
  );
}
