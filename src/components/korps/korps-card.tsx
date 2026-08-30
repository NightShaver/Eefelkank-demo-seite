import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import type { Korporalschaft } from "@/lib/data/korporalschaften";
import { Photo } from "@/components/site/photo";
import { cn } from "@/lib/utils";

export type KartenForm =
  | "kante"
  | "bogen"
  | "rund"
  | "polaroid"
  | "welle"
  | "band";

/**
 * Karte einer Gruppe, in sechs Formen.
 *
 * `kante` Kachel · `bogen` Rundbogen · `rund` Kreis · `polaroid` Sofortbild
 * mit handschriftlicher Anmutung · `welle` organisch gerundet · `band`
 * breite Zeile mit Bild und Text nebeneinander.
 *
 * Die Übersicht mischt die Formen und kippt die Karten leicht, damit sie
 * wie aufgeklebte Fotos wirken und nicht wie ein Raster aus dem Baukasten.
 */
export function KorpsCard({
  korps,
  index,
  gross = false,
  form = "kante",
  kippen = 0,
}: {
  korps: Korporalschaft;
  index?: number;
  gross?: boolean;
  form?: KartenForm;
  kippen?: number;
}) {
  const bild = (
    <Photo
      src={korps.gallery[0]?.src}
      alt={`${korps.name}: ${korps.gallery[0]?.caption ?? "Gruppenbild"}`}
      farbe={korps.farbe}
      sizes={
        gross || form === "band"
          ? "(max-width: 768px) 100vw, 60vw"
          : "(max-width: 768px) 90vw, 32vw"
      }
      className="size-full"
      imgClassName="transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
    />
  );

  /**
   * Bei Rundbogen und Welle sitzen die Marken unten mittig: oben würde die
   * Rundung sie anschneiden.
   */
  const markenPosition =
    form === "bogen" || form === "welle"
      ? "bottom-4 left-1/2 -translate-x-1/2 justify-center"
      : "left-4 top-4";

  const marken = (
    <div
      className={cn(
        "absolute z-10 flex flex-wrap items-center gap-2",
        markenPosition
      )}
    >
      <span
        className="rounded-full px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em]"
        style={{ backgroundColor: korps.farbe, color: korps.farbeText }}
      >
        {korps.kind}
      </span>
      {!korps.verified && (
        <span
          title="Text ist ein Entwurf und wird vom Verein ergänzt"
          className="rounded-full bg-creme/90 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-tinte"
        >
          Entwurf
        </span>
      )}
    </div>
  );

  const meta = (
    <span className="flex items-center gap-4 text-xs font-medium opacity-90">
      <span className="inline-flex items-center gap-1.5">
        <Users className="size-3.5" aria-hidden />
        {korps.members}
      </span>
      <span>seit {korps.founded}</span>
    </span>
  );

  const chips = (
    <span className="flex flex-wrap items-center gap-2 text-[0.625rem] font-bold uppercase tracking-[0.14em]">
      <span
        className="rounded-full px-2.5 py-1"
        style={{ backgroundColor: korps.farbe, color: korps.farbeText }}
      >
        {korps.kind}
      </span>
      {!korps.verified && (
        <span className="rounded-full bg-creme-2 px-2.5 py-1 text-tinte-3">
          Entwurf
        </span>
      )}
    </span>
  );

  /* Das Anheben beim Überfahren übernimmt die Aufkleber-Hülle. */
  const huelle = "group flex h-full flex-col";
  const href = `/korporalschaften/${korps.slug}`;

  /* ---------------------------------------------------------------- rund */
  if (form === "rund") {
    return (
      <Link
        href={href}
        className={cn(huelle, "items-center text-center")}
        style={{ rotate: `${kippen}deg` }}
      >
        <div
          className="relative aspect-square w-full overflow-hidden rounded-full border-[6px]"
          style={{ borderColor: korps.farbe }}
        >
          {bild}
        </div>
        <h3 className="mt-5 font-display text-xl font-bold leading-tight text-tinte sm:text-2xl">
          {korps.name}
        </h3>
        <p className="mt-1.5 text-sm text-tinte-3">„{korps.motto}“</p>
        <span className="mt-2 flex justify-center">{chips}</span>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-rot">
          Ansehen
          <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
        </span>
      </Link>
    );
  }

  /* ------------------------------------------------------------ polaroid */
  if (form === "polaroid") {
    return (
      <Link
        href={href}
        className={cn(huelle)}
        style={{ rotate: `${kippen}deg` }}
      >
        <div className="flex h-full flex-col rounded-sm bg-creme p-3 pb-5 shadow-[0_18px_40px_-24px_rgba(28,16,22,0.7)]">
          <div className="relative aspect-square overflow-hidden bg-creme-2">
            {marken}
            {bild}
          </div>
          <div className="mt-4 px-1">
            <h3 className="font-display text-xl font-bold leading-tight text-tinte">
              {korps.name}
            </h3>
            <p className="mt-1 text-sm text-tinte-3">„{korps.motto}“</p>
            <div className="mt-4 flex items-center justify-between gap-4 border-t-2 border-dashed border-tinte/15 pt-3 text-tinte-3">
              {meta}
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rot">
                Ansehen
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  /* --------------------------------------------------------------- welle */
  if (form === "welle") {
    return (
      <Link
        href={href}
        className={cn(huelle)}
        style={{ rotate: `${kippen}deg` }}
      >
        <div
          className="relative aspect-[5/6] overflow-hidden border-[6px] [border-radius:58%_42%_45%_55%/48%_54%_46%_52%]"
          style={{ borderColor: korps.farbe }}
        >
          {marken}
          {bild}
        </div>
        <div className="mt-5">
          <h3 className="font-display text-xl font-bold leading-tight text-tinte sm:text-2xl">
            {korps.name}
          </h3>
          <p className="mt-1.5 text-sm text-tinte-3">„{korps.motto}“</p>
          <div className="mt-4 flex items-center justify-between gap-4 text-tinte-3">
            {meta}
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rot">
              Ansehen
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  /* ---------------------------------------------------------------- band */
  if (form === "band") {
    return (
      <Link
        href={href}
        className={cn(
          "group grid h-full overflow-hidden rounded-[1.3rem] sm:grid-cols-[1.1fr_1fr]"
        )}
        style={{ backgroundColor: korps.farbe, color: korps.farbeText, rotate: `${kippen}deg` }}
      >
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto">
          {marken}
          {bild}
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
            {korps.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed opacity-85">
            „{korps.motto}“
          </p>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed opacity-75">
            {korps.lead}
          </p>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-current/25 pt-4">
            {meta}
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
              Ansehen
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  /* --------------------------------------------------------------- bogen */
  if (form === "bogen") {
    return (
      <Link href={href} className={huelle} style={{ rotate: `${kippen}deg` }}>
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-2xl border-[6px]"
          style={{ borderColor: korps.farbe }}
        >
          {marken}
          {bild}
        </div>
        <div
          className="rounded-b-2xl px-5 py-4"
          style={{ backgroundColor: korps.farbe, color: korps.farbeText }}
        >
          <h3 className="font-display text-xl font-bold leading-tight">
            {korps.name}
          </h3>
          <p className="mt-1 text-sm opacity-85">„{korps.motto}“</p>
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-current/25 pt-3">
            {meta}
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
              Ansehen
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  /* --------------------------------------------------------------- kante */
  return (
    <Link
      href={href}
      className={cn(huelle, "overflow-hidden rounded-[1.3rem] bg-creme-2")}
      style={{ rotate: `${kippen}deg` }}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          gross ? "aspect-[16/11]" : "aspect-[4/3]"
        )}
      >
        {marken}
        {bild}
        {typeof index === "number" && (
          <span className="absolute right-4 top-3 font-display text-4xl font-black leading-none text-creme/80 drop-shadow-[0_2px_8px_rgba(28,16,22,0.6)]">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div
        className="flex flex-1 flex-col p-5 sm:p-6"
        style={{ backgroundColor: korps.farbe, color: korps.farbeText }}
      >
        <h3
          className={cn(
            "font-display font-bold leading-tight",
            gross ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          )}
        >
          {korps.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed opacity-85">„{korps.motto}“</p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-current/25 pt-4">
          {meta}
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
            Ansehen
            <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
