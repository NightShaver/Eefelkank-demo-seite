import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DATE_FMT = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Berlin",
});

const WEEKDAY_FMT = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  timeZone: "Europe/Berlin",
});

/** "23. Januar 2027" */
export function formatDate(iso: string) {
  return DATE_FMT.format(new Date(iso));
}

/** "Samstag" */
export function formatWeekday(iso: string) {
  return WEEKDAY_FMT.format(new Date(iso));
}

/** { day: "23", month: "Jan" } fuer die Datums-Kacheln */
export function splitDate(iso: string) {
  const d = new Date(iso);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: new Intl.DateTimeFormat("de-DE", { month: "short", timeZone: "Europe/Berlin" })
      .format(d)
      .replace(".", ""),
    year: String(d.getFullYear()),
  };
}

/**
 * Stellt einem Pfad aus /public den Unterpfad der Seite voran.
 *
 * Auf GitHub Pages liegt ein Projekt-Repository unter /name-des-repos.
 * Next setzt diesen Pfad bei Links und eigenen Skripten selbst davor, bei
 * Bildern mit `unoptimized` jedoch nicht. Deshalb laufen alle Bildquellen
 * durch diese Funktion.
 */
export function mitBasis(pfad: string) {
  const basis = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  if (!basis || !pfad.startsWith("/")) return pfad;
  return `${basis}${pfad}`;
}
