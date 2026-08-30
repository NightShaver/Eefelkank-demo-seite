import Image from "next/image";
import { cn, mitBasis } from "@/lib/utils";

/**
 * Bildflaeche.
 *
 * Duenne Huelle um `next/image` im fill-Modus: die Kachel bestimmt das
 * Format, das Bild fuellt sie. `tone` legt eine leichte Farbflaeche in der
 * Gruppenfarbe darueber, damit Fotos aus verschiedenen Sessionen und
 * Kameras trotzdem wie eine Serie wirken.
 *
 * Ohne `src` bleibt eine gestaltete Farbflaeche stehen, so bricht nichts,
 * wenn eine Gruppe noch kein Foto geliefert hat.
 */
export function Photo({
  src,
  alt,
  farbe = "#d5122a",
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  eager = false,
  tone = 0,
  flaeche = "bg-tinte",
}: {
  src?: string;
  alt: string;
  farbe?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  /**
   * Bild sofort laden, für alles über der Falz. Ersetzt das in Next 16
   * abgekündigte `priority`.
   */
  eager?: boolean;
  /** 0 = unveraendert, 0.35 = deutlich eingefaerbt */
  tone?: number;
  /** Grundfläche hinter dem Bild, solange es lädt */
  flaeche?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", flaeche, className)}
      style={!src ? { backgroundColor: farbe } : undefined}
    >
      {src ? (
        <>
          <Image
            src={mitBasis(src)}
            alt={alt}
            fill
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            className={cn("object-cover", imgClassName)}
          />
          {tone > 0 && (
            <span
              aria-hidden
              className="absolute inset-0 mix-blend-multiply"
              style={{ backgroundColor: farbe, opacity: tone }}
            />
          )}
        </>
      ) : (
        <span
          aria-hidden
          className="muster-raute absolute inset-0 text-white/10"
        />
      )}
    </div>
  );
}
