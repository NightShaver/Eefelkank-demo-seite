"use client";

import * as React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn, mitBasis } from "@/lib/utils";

/**
 * YouTube-Einbettung mit Vorschaltbild.
 *
 * Vor dem Klick wird nichts von YouTube geladen: Es liegt nur ein eigenes
 * Vorschaubild auf der Seite. Erst der Klick startet die Verbindung zu
 * YouTube, worauf der Hinweis unter dem Bild ausdrücklich hinweist.
 * Danach läuft das Video eingebettet auf der Seite.
 */
export function YoutubeVideo({
  id,
  titel,
  vorschau,
  className,
}: {
  id: string;
  titel: string;
  /** Eigenes Vorschaubild; ohne Angabe steht die Fläche in Vereinsfarbe */
  vorschau?: string;
  className?: string;
}) {
  const [geladen, setGeladen] = React.useState(false);

  return (
    <figure className={cn("group", className)}>
      <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-tinte">
        {geladen ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={titel}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setGeladen(true)}
            className="absolute inset-0 size-full cursor-pointer"
            aria-label={`Video abspielen: ${titel}. Dabei wird eine Verbindung zu YouTube hergestellt.`}
          >
            {vorschau && (
              <Image
                src={mitBasis(vorschau)}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover opacity-70 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            )}
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,16,22,0.85),rgba(28,16,22,0.25))]"
            />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-rot text-creme shadow-[0_10px_30px_-12px_rgba(28,16,22,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 sm:size-20">
                <Play className="size-7 translate-x-0.5 fill-current sm:size-9" />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5 text-left">
              <span className="block font-display text-lg font-bold text-creme sm:text-xl">
                {titel}
              </span>
            </span>
          </button>
        )}
      </div>

      <figcaption className="mt-3 text-xs text-tinte-3">
        Beim Abspielen wird eine Verbindung zu YouTube hergestellt. Dabei wird
        deine IP-Adresse an YouTube übertragen.
      </figcaption>
    </figure>
  );
}

/**
 * Video, das beim Scrollen läuft.
 *
 * Stummgeschaltete Schleife, die startet, sobald der Ausschnitt sichtbar
 * ist, und pausiert, sobald er das Bild verlässt. Bei
 * `prefers-reduced-motion` bleibt sie stehen und zeigt nur das Standbild.
 */
export function ScrollVideo({
  src,
  poster,
  titel,
  className,
}: {
  src: string;
  poster?: string;
  titel: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([eintrag]) => {
        if (eintrag.isIntersecting) {
          void el.play().catch(() => {
            /* Autoplay kann blockiert sein, dann bleibt das Standbild */
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={mitBasis(src)}
      poster={poster ? mitBasis(poster) : undefined}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={titel}
      className={cn("size-full object-cover", className)}
    />
  );
}
