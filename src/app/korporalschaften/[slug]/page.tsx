import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import {
  getKorporalschaft,
  korporalschaften,
  type GroupEvent,
} from "@/lib/data/korporalschaften";
import { Photo } from "@/components/site/photo";
import { BentoGallery } from "@/components/korps/bento-gallery";
import { ScrollVideo, YoutubeVideo } from "@/components/site/video";
import { Reveal, WordReveal } from "@/components/site/motion-primitives";
import { Button } from "@/components/ui/button";
import { formatDate, formatWeekday, splitDate, cn } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return korporalschaften.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const korps = getKorporalschaft(slug);
  if (!korps) return { title: "Nicht gefunden" };

  return {
    title: korps.name,
    description: korps.lead,
    openGraph: {
      title: korps.name,
      description: korps.lead,
      images: korps.gallery[0]?.src ? [korps.gallery[0].src] : undefined,
    },
  };
}

export default async function KorpsDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const korps = getKorporalschaft(slug);
  if (!korps) notFound();

  const index = korporalschaften.findIndex((k) => k.slug === slug);
  const prev =
    korporalschaften[(index - 1 + korporalschaften.length) % korporalschaften.length];
  const next = korporalschaften[(index + 1) % korporalschaften.length];

  const auftritte = korps.agenda.filter((a) => a.kind === "Auftritt");
  const sonstige = korps.agenda.filter((a) => a.kind !== "Auftritt");

  /**
   * Foto im Terminkasten. Die Gruppe kann im CMS eines auswaehlen; ohne Angabe
   * bleibt es beim zweiten Galeriebild, wie es vor der CMS-Anbindung war.
   */
  const terminbild = korps.training.bild
    ? { src: korps.training.bild, alt: `${korps.name}, fester Termin` }
    : korps.gallery[1]
      ? { src: korps.gallery[1].src, alt: korps.gallery[1].caption }
      : undefined;

  return (
    <>
      {/* ---------------------------------------------- Kopf in Gruppenfarbe */}
      <section
        className="relative overflow-hidden pt-[calc(var(--nav-h)+4rem)] sm:pt-[calc(var(--nav-h)+5.5rem)]"
        style={{ backgroundColor: korps.farbe, color: korps.farbeText }}
      >
        <div aria-hidden className="muster-punkte absolute inset-0 opacity-15" />

        <div className="relative mx-auto max-w-[84rem] px-4 pb-24 sm:px-6 sm:pb-28">
          <Link
            href="/korporalschaften"
            className="group inline-flex items-center gap-2 text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
          >
            <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />
            Alle Korporalschaften
          </Link>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <Chip flaeche={korps.farbeText} schrift={korps.farbe}>
              {korps.kind}
            </Chip>
            <Chip flaeche={korps.farbeText} schrift={korps.farbe}>
              seit {korps.founded}
            </Chip>
            <Chip flaeche={korps.farbeText} schrift={korps.farbe}>
              <Users className="mr-1.5 inline size-3.5" aria-hidden />
              {korps.members} Aktive
            </Chip>
            {!korps.verified && (
              <Chip flaeche={korps.farbeText} schrift={korps.farbe}>
                Text folgt vom Verein
              </Chip>
            )}
          </div>

          <WordReveal
            as="h1"
            text={korps.name}
            className="mt-6 max-w-5xl text-[clamp(2.6rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.03em]"
          />

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-3xl font-display text-2xl font-bold sm:text-3xl">
              „{korps.motto}“
            </p>
          </Reveal>
        </div>

      </section>

      {/* Grosses Titelbild, ragt in die Farbflaeche hinein */}
      <div className="relative bg-creme">
        <div className="mx-auto -mt-10 max-w-[84rem] px-4 sm:-mt-16 sm:px-6">
          <Reveal>
            <figure className="overflow-hidden rounded-[1.75rem] border-[6px] border-creme bg-creme-2 shadow-[0_30px_70px_-40px_rgba(28,16,22,0.6)]">
              {korps.kopfVideo ? (
                /* Liegt ein Video vor, läuft es stumm, sobald es im Bild ist */
                <div className="aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] sm:aspect-[21/9]">
                  <ScrollVideo
                    src={korps.kopfVideo}
                    poster={korps.gallery[0]?.src}
                    titel={`${korps.name} in Bewegung`}
                  />
                </div>
              ) : (
                <Photo
                  src={korps.gallery[0]?.src}
                  alt={`${korps.name}: ${korps.gallery[0]?.caption ?? "Gruppenbild"}`}
                  farbe={korps.farbe}
                  eager
                  sizes="100vw"
                  className="aspect-[4/3] w-full rounded-[1.25rem] sm:aspect-[21/9]"
                />
              )}
            </figure>
          </Reveal>
        </div>
      </div>

      {/* ---------------------------------------------- Wer wir sind */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <p className="eyebrow text-rot">Wer wir sind</p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 font-display text-2xl font-bold leading-snug text-tinte sm:text-3xl">
                  {korps.lead}
                </p>
              </Reveal>

              <dl className="mt-9 grid grid-cols-2 gap-3">
                {korps.facts.map((fact) => (
                  <div key={fact.label} className="rounded-2xl bg-creme-2 p-5">
                    <dt className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-tinte-3">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 font-display text-lg font-bold text-tinte">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <Reveal>
                <div className="space-y-6 text-lg leading-relaxed text-tinte-2">
                  {korps.story.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>

              {korps.people.length > 0 && (
                <div className="mt-12">
                  <h2 className="eyebrow text-rot">Ansprechpartner</h2>
                  <ul className="mt-5 border-t-2 border-tinte/10">
                    {korps.people.map((person, i) => (
                      <Reveal as="li" key={`${person.name}-${i}`} delay={i * 0.06}>
                        <div className="flex items-center justify-between gap-6 border-b-2 border-tinte/10 py-5">
                          <span className="font-display text-xl font-bold text-tinte sm:text-2xl">
                            {person.name}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-tinte-3">
                            {person.role}
                          </span>
                        </div>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Termine */}
      <section className="bg-creme-2 py-16 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow text-rot">Training & Auftritte</p>
          </Reveal>
          <WordReveal
            as="h2"
            text="Wann wir üben. Wo wir auftreten."
            className="mt-5 max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[0.98] text-tinte"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <Reveal className="h-full">
              <div
                className="relative h-full overflow-hidden rounded-[1.5rem] p-7 sm:p-9"
                style={{ backgroundColor: korps.farbe, color: korps.farbeText }}
              >
                <div
                  aria-hidden
                  className="muster-streifen absolute inset-0 opacity-10"
                />
                <div className="relative">
                  <p className="eyebrow opacity-80">Fester Termin</p>
                  <p className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
                    {korps.training.day}
                  </p>

                  <ul className="mt-7 space-y-4 text-sm">
                    <InfoRow icon={<Clock className="size-4" />}>
                      {korps.training.time}
                    </InfoRow>
                    <InfoRow icon={<MapPin className="size-4" />}>
                      {korps.training.place}
                    </InfoRow>
                    {korps.training.note && (
                      <InfoRow icon={<CalendarDays className="size-4" />}>
                        {korps.training.note}
                      </InfoRow>
                    )}
                  </ul>

                  <a
                    href={`mailto:info@eefelkank.de?subject=${encodeURIComponent(
                      `Mitmachen bei: ${korps.name}`
                    )}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-creme px-6 py-3.5 text-sm font-semibold text-tinte transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
                  >
                    Mitmachen
                    <ArrowRight className="size-4" aria-hidden />
                  </a>

                  {/* Foto im Terminkasten. Die Gruppe kann im CMS ein eigenes
                      waehlen; ohne Angabe bleibt es wie bisher das zweite
                      Galeriebild. */}
                  {terminbild && (
                    <figure className="mt-8 overflow-hidden rounded-2xl border-[4px] border-current/20">
                      <Photo
                        src={terminbild.src}
                        alt={terminbild.alt}
                        farbe={korps.farbe}
                        sizes="(max-width: 1024px) 90vw, 30vw"
                        className="aspect-[16/9] w-full"
                      />
                    </figure>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Auf grossen Bildschirmen begrenzt, damit der farbige Kasten
                links nicht mit der Liste mitwaechst. Ab etwa sechs Eintraegen
                wird gescrollt statt gestreckt. */}
            <div className="space-y-10 lg:max-h-[38rem] lg:overflow-y-auto lg:pr-4">
              <AgendaList title="Auftritte" items={auftritte} farbe={korps.farbe} />
              <AgendaList
                title="Weitere Termine"
                items={sonstige}
                farbe={korps.farbe}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Video */}
      {korps.video && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
              <div>
                <Reveal>
                  <p className="eyebrow text-rot">Bewegtbild</p>
                </Reveal>
                <WordReveal
                  as="h2"
                  text="Sieh es dir an."
                  className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight text-tinte"
                />
                <Reveal delay={0.1}>
                  <p className="mt-5 max-w-md leading-relaxed text-tinte-2">
                    Wie sich das anfühlt, lässt sich schlecht beschreiben. Das
                    Video startet erst auf Klick, vorher geht nichts an YouTube.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.1}>
                <YoutubeVideo
                  id={korps.video.youtube}
                  titel={korps.video.titel}
                  vorschau={korps.video.vorschau ?? korps.gallery[0]?.src}
                />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------- Galerie */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow text-rot">Galerie</p>
              </Reveal>
              <WordReveal
                as="h2"
                text="Bilder aus unserer Session"
                className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight text-tinte"
              />
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-sm text-tinte-3">
                Klick auf ein Bild für die Großansicht. Die Fotos stammen aus dem
                Archiv des Vereins.
              </p>
            </Reveal>
          </div>

          <div className="mt-10">
            <BentoGallery
              items={korps.gallery}
              farbe={korps.farbe}
              groupName={korps.name}
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Weiter */}
      <section className="border-t-2 border-tinte/10">
        <div className="mx-auto grid max-w-[84rem] sm:grid-cols-2">
          <NeighbourLink
            korpsSlug={prev.slug}
            name={prev.shortName}
            farbe={prev.farbe}
            direction="prev"
          />
          <NeighbourLink
            korpsSlug={next.slug}
            name={next.shortName}
            farbe={next.farbe}
            direction="next"
          />
        </div>
      </section>
    </>
  );
}

/**
 * Marke im Seitenkopf. Volle Fläche in der Kontrastfarbe der Gruppe: auf
 * Gold, Rot oder Pflaume bleibt die Schrift dadurch immer gut lesbar.
 */
function Chip({
  flaeche,
  schrift,
  children,
}: {
  flaeche: string;
  schrift: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className="rounded-full px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em]"
      style={{ backgroundColor: flaeche, color: schrift }}
    >
      {children}
    </span>
  );
}

function InfoRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 opacity-90">
      <span className="mt-0.5">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

function AgendaList({
  title,
  items,
  farbe,
}: {
  title: string;
  items: GroupEvent[];
  farbe: string;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-tinte-3">
        {title}
      </h3>
      <ul className="mt-4 border-t-2 border-tinte/10">
        {items.map((item, i) => {
          const d = splitDate(item.date);
          return (
            <Reveal as="li" key={`${item.title}-${i}`} delay={i * 0.06}>
              <div className="flex items-center gap-5 border-b-2 border-tinte/10 py-5">
                <span
                  className="grid size-14 shrink-0 place-items-center rounded-xl text-center text-creme sm:size-16"
                  style={{ backgroundColor: farbe }}
                >
                  <span className="block font-display text-xl font-bold leading-none">
                    {d.day}
                  </span>
                  <span className="mt-1 block text-[0.5625rem] font-semibold uppercase tracking-[0.14em] opacity-85">
                    {d.month}
                  </span>
                </span>

                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-bold text-tinte sm:text-xl">
                    {item.title}
                  </p>
                  <p className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-tinte-3">
                    <span>{formatWeekday(item.date)}</span>
                    <span className="font-semibold text-tinte-2">{item.time}</span>
                    <span>{item.place}</span>
                  </p>
                </div>

                <time
                  dateTime={item.date}
                  className="hidden shrink-0 text-xs text-tinte-3 sm:block"
                >
                  {formatDate(item.date)}
                </time>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}

function NeighbourLink({
  korpsSlug,
  name,
  farbe,
  direction,
}: {
  korpsSlug: string;
  name: string;
  farbe: string;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/korporalschaften/${korpsSlug}`}
      className={cn(
        "group relative flex flex-col gap-3 overflow-hidden px-6 py-12 transition-colors duration-500 sm:px-10 sm:py-16",
        isNext && "sm:items-end sm:text-right"
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
        style={{ backgroundColor: farbe }}
      />
      <span className="relative text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-tinte-3 transition-colors duration-500 group-hover:text-creme/80">
        {isNext ? "Nächste Gruppe" : "Vorherige Gruppe"}
      </span>
      <span
        className={cn(
          "relative flex items-center gap-3 font-display text-2xl font-bold text-tinte transition-colors duration-500 group-hover:text-creme sm:text-3xl",
          isNext && "sm:flex-row-reverse"
        )}
      >
        <ArrowLeft
          className={cn(
            "size-5 transition-transform duration-500",
            isNext
              ? "rotate-180 group-hover:translate-x-1"
              : "group-hover:-translate-x-1"
          )}
          aria-hidden
        />
        {name}
      </span>
    </Link>
  );
}
