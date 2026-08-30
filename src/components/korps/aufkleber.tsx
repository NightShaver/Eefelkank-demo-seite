import type { KartenForm } from "@/components/korps/korps-card";
import { cn } from "@/lib/utils";

/**
 * Aufkleber-Hülle um eine Gruppenkarte.
 *
 * Weißer Stanzrand, Schlagschatten und leichte Neigung: Die Karten wirken
 * dadurch wie Sticker, die jemand auf eine Leinwand geklebt hat. Wer mag,
 * bekommt oben noch einen Streifen Klebeband.
 */
export function Aufkleber({
  children,
  form = "kante",
  kippen = 0,
  klebeband = false,
  className,
}: {
  children: React.ReactNode;
  form?: KartenForm;
  kippen?: number;
  klebeband?: boolean;
  className?: string;
}) {
  // Das Polaroid bringt seinen weißen Rand schon mit, es braucht keinen zweiten.
  const eigenerRand = form === "polaroid";

  return (
    <div
      className={cn("group/aufkleber relative", className)}
      style={{ rotate: `${kippen}deg` }}
    >
      {klebeband && (
        <span
          aria-hidden
          className="absolute -top-3 left-1/2 z-20 h-6 w-24 -translate-x-1/2 -rotate-3 rounded-[2px] bg-gold-2/70 shadow-[0_2px_6px_-2px_rgba(28,16,22,0.4)]"
        />
      )}

      <div
        className={cn(
          "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2",
          !eigenerRand && "bg-creme p-2 shadow-[0_20px_45px_-24px_rgba(28,16,22,0.65)]",
          !eigenerRand && (form === "rund" ? "rounded-full" : "rounded-[1.7rem]"),
          eigenerRand && "drop-shadow-[0_20px_30px_rgba(28,16,22,0.28)]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
