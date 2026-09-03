/**
 * Sessionskalender.
 *
 * Die Termine kommen aus dem CMS, siehe scripts/cms-holen.mjs. Diese Datei
 * beschreibt nur noch ihre Form und stellt die Helfer bereit.
 */

import daten from "./generated/events.json";


export type EventCategory =
  | "Sitzung"
  | "Familie"
  | "Umzug"
  | "Versammlung"
  | "Brauchtum";

export type ClubEvent = {
  id: string;
  title: string;
  /** ISO-Datum inkl. Uhrzeit, Zeitzone Europe/Berlin */
  date: string;
  /** Anzeige-Uhrzeit, weil im Karneval "19:11 Uhr" Teil der Marke ist */
  time: string;
  venue: string;
  category: EventCategory;
  description: string;
  /** Bild aus dem Vereinsarchiv, /public/bilder */
  image: string;
  soldOut?: boolean;
  highlight?: boolean;
};

export const events = daten as ClubEvent[];

export const eventCategories = [
  "Alle",
  "Sitzung",
  "Familie",
  "Brauchtum",
] as const;

/** Naechster Termin ab `now`, faellt auf den ersten Termin zurueck. */
export function nextEvent(now: Date = new Date()): ClubEvent {
  return (
    events.find((e) => new Date(e.date).getTime() > now.getTime()) ?? events[0]
  );
}

/** Einzelnen Termin über seine Kennung holen. */
export function getEvent(id: string) {
  return events.find((e) => e.id === id);
}
