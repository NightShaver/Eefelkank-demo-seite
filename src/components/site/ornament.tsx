import Image from "next/image";
import { cn, mitBasis } from "@/lib/utils";

/**
 * Dekor-Bausteine des Vereins.
 *
 * Zentral ist das echte Vereinswappen: der Nachtwächter mit Hellebarde und
 * Laterne vor den Tannen. Es steckt als freigestelltes PNG in
 * /public/bilder/wappen.png (aus dem offiziellen Logo des Vereins
 * herausgelöst) und ersetzt überall generische Sterne oder Orden.
 */

/**
 * Das Vereinswappen als Bild.
 *
 * Breite und Höhe sind die echten Maße der Datei (900 x 867). Die
 * Anzeigegröße kommt ausschließlich aus der Klasse, dazu `h-auto`. Würde
 * man gerundete Wunschmaße als Attribute setzen, weicht das Verhältnis
 * minimal ab und Next meldet ein verzerrtes Bild.
 */
export function Wappen({
  className,
  size = 120,
  eager = true,
}: {
  className?: string;
  /** Nur ein Hinweis für die Bildauswahl, nicht die Anzeigegröße */
  size?: number;
  /**
   * Standardmäßig sofort laden: Das Wappen ist klein, steht auf jeder
   * Seite weit oben und taucht mehrfach auf. Eine einzige lazy geladene
   * Fassung würde sonst als langsamster Bildaufbau gemeldet.
   */
  eager?: boolean;
}) {
  return (
    <Image
      src={mitBasis("/bilder/wappen.png")}
      alt=""
      aria-hidden
      width={900}
      height={867}
      sizes={`${size}px`}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={cn("h-auto w-full select-none object-contain", className)}
    />
  );
}

/** Wappen in einer runden Fläche, für Navigation und Fußzeile. */
export function WappenBadge({
  className,
  ring = "bg-creme",
  size = 30,
}: {
  className?: string;
  ring?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full",
        ring,
        className
      )}
    >
      <Wappen size={size} className="w-[74%] translate-y-[3%]" />
    </span>
  );
}

/**
 * Drehendes Siegel: Wappen in der Mitte, Vereinsname als Kreistext außen.
 * Ersetzt die frühere „Sonne“, der Text macht aus dem Dekor eine echte
 * Marke.
 */
export function Siegel({
  className,
  text = "KG EEFELKANK · ESCHWEILER-HASTENRATH · VON 1938 · ",
  farbe = "var(--color-tinte)",
  flaeche = "var(--color-gold-2)",
}: {
  className?: string;
  text?: string;
  farbe?: string;
  flaeche?: string;
}) {
  return (
    <span className={cn("relative inline-grid place-items-center", className)}>
      <span
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: flaeche }}
      />
      <svg viewBox="0 0 200 200" aria-hidden className="absolute size-full animate-spin-slow">
        <defs>
          <path
            id="siegel-kreis"
            d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
            fill="none"
          />
        </defs>
        <text
          fill={farbe}
          style={{
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {/* textLength = Umfang des Kreises (2πr, r = 76): so läuft der
              Text exakt einmal herum, ohne Lücke und ohne Überlappung. */}
          <textPath
            href="#siegel-kreis"
            startOffset="0"
            textLength={2 * Math.PI * 76}
            lengthAdjust="spacingAndGlyphs"
          >
            {text}
          </textPath>
        </text>
      </svg>
      <Wappen size={110} className="relative w-[52%]" />
    </span>
  );
}

/**
 * Aufkleber. Ersetzt das früher überall gleiche Laufband: kleine, schräg
 * geklebte Marken, die über die Seite verteilt sind.
 */
export function Sticker({
  children,
  ton = "rot",
  className,
  rotate = -8,
  form = "rund",
}: {
  children: React.ReactNode;
  ton?: "rot" | "gold" | "creme" | "pflaume" | "gruen";
  className?: string;
  rotate?: number;
  form?: "rund" | "kante";
}) {
  const toene: Record<string, string> = {
    rot: "bg-rot text-creme",
    gold: "bg-gold-2 text-tinte",
    creme: "bg-creme text-tinte",
    pflaume: "bg-pflaume text-creme",
    gruen: "bg-[color:var(--color-jeck-gruen)] text-creme",
  };

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex select-none items-center justify-center px-4 py-2 text-center font-display text-sm font-black leading-tight shadow-[0_8px_20px_-12px_rgba(28,16,22,0.7)] sm:text-base",
        form === "rund" ? "rounded-full" : "rounded-xl",
        toene[ton],
        className
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      {children}
    </span>
  );
}

/** Runder Aufkleber mit Kreistext, die „Marke“ unter den Stickern. */
export function RundSticker({
  oben,
  unten,
  ton = "gold",
  className,
  rotate = -10,
}: {
  oben: string;
  unten?: string;
  ton?: "rot" | "gold" | "creme" | "pflaume";
  className?: string;
  rotate?: number;
}) {
  const toene: Record<string, string> = {
    rot: "bg-rot text-creme",
    gold: "bg-gold-2 text-tinte",
    creme: "bg-creme text-tinte",
    pflaume: "bg-pflaume text-creme",
  };

  return (
    <span
      aria-hidden
      className={cn(
        "grid aspect-square place-items-center rounded-full text-center shadow-[0_10px_26px_-14px_rgba(28,16,22,0.8)]",
        toene[ton],
        className
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      <span className="px-3">
        <span className="block font-display text-lg font-black leading-none sm:text-2xl">
          {oben}
        </span>
        {unten && (
          <span className="mt-1 block text-[0.5rem] font-bold uppercase tracking-[0.16em] opacity-80 sm:text-[0.625rem]">
            {unten}
          </span>
        )}
      </span>
    </span>
  );
}

/** Luftschlangen: geschwungene Bänder, die über eine Fläche laufen. */
export function Luftschlangen({
  className,
  farben = ["var(--color-rot)", "var(--color-gold-2)", "var(--color-jeck-gruen)"],
}: {
  className?: string;
  farben?: string[];
}) {
  const bahnen = [
    "M0,45 C90,-15 180,105 270,35 S450,5 540,70",
    "M0,105 C80,175 170,15 260,90 S440,140 540,55",
    "M0,150 C100,95 190,195 280,130 S460,165 540,120",
  ];

  return (
    <svg
      viewBox="0 0 540 180"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("pointer-events-none absolute inset-x-0 w-full", className)}
    >
      {bahnen.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={farben[i % farben.length]}
          strokeWidth={i === 1 ? 9 : 7}
          strokeLinecap="round"
          strokeDasharray={i === 2 ? "26 16" : undefined}
          opacity={0.7}
        />
      ))}
    </svg>
  );
}

/** Zickzack-Kante, die zwei Farbflächen trennt, wie eine Wimpelkette. */
export function ZickZack({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("block h-4 w-full fill-current sm:h-6", className)}
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      <path d="M0 0h1200v4L1175 24 1150 4 1125 24 1100 4 1075 24 1050 4 1025 24 1000 4 975 24 950 4 925 24 900 4 875 24 850 4 825 24 800 4 775 24 750 4 725 24 700 4 675 24 650 4 625 24 600 4 575 24 550 4 525 24 500 4 475 24 450 4 425 24 400 4 375 24 350 4 325 24 300 4 275 24 250 4 225 24 200 4 175 24 150 4 125 24 100 4 75 24 50 4 25 24 0 4Z" />
    </svg>
  );
}

/** Gestreute Konfetti-Schnipsel als reines Dekor. */
export function Konfetti({
  count = 18,
  className,
  colors = ["var(--color-rot)", "var(--color-gold-2)", "var(--color-creme)"],
}: {
  count?: number;
  className?: string;
  colors?: string[];
}) {
  const pieces = Array.from({ length: count }, (_, i) => {
    const s = i * 2654435761;
    return {
      left: `${(s % 97) + 1}%`,
      top: `${((s >> 4) % 92) + 3}%`,
      rotate: `${(s >> 7) % 360}deg`,
      size: 5 + ((s >> 9) % 7),
      color: colors[i % colors.length],
      delay: `${((s >> 11) % 40) / 10}s`,
      round: i % 3 === 0,
    };
  });

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {pieces.map((p, i) => (
        <span
          key={i}
          className={cn("absolute animate-float", p.round ? "rounded-full" : "rounded-[1px]")}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.round ? p.size : p.size * 1.9,
            backgroundColor: p.color,
            rotate: p.rotate,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Luftballons als Dekor. Steigen langsam auf und ab, damit eine Fläche
 * lebendig wirkt, ohne vom Inhalt abzulenken.
 */
export function Luftballons({
  className,
  count = 5,
  farben = [
    "var(--color-rot)",
    "var(--color-gold-2)",
    "var(--color-jeck-blau)",
    "var(--color-jeck-gruen)",
    "var(--color-creme)",
  ],
}: {
  className?: string;
  count?: number;
  farben?: string[];
}) {
  const ballons = Array.from({ length: count }, (_, i) => {
    const s = (i + 1) * 1103515245;
    return {
      left: `${6 + ((s >> 3) % 88)}%`,
      top: `${4 + ((s >> 7) % 70)}%`,
      groesse: 34 + ((s >> 11) % 30),
      farbe: farben[i % farben.length],
      delay: `${((s >> 5) % 50) / 10}s`,
      kippen: ((s >> 9) % 16) - 8,
    };
  });

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {ballons.map((b, i) => (
        <span
          key={i}
          className="absolute animate-float"
          style={{
            left: b.left,
            top: b.top,
            width: b.groesse,
            animationDelay: b.delay,
            rotate: `${b.kippen}deg`,
          }}
        >
          <svg viewBox="0 0 40 62" className="w-full">
            <ellipse cx="20" cy="21" rx="17" ry="21" fill={b.farbe} />
            <ellipse cx="14" cy="14" rx="5" ry="7" fill="#ffffff" opacity="0.35" />
            <path d="M20 42 l-3 4 h6 z" fill={b.farbe} />
            <path
              d="M20 46 c6 5 -6 8 0 14"
              fill="none"
              stroke={b.farbe}
              strokeWidth="1.4"
              opacity="0.7"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
