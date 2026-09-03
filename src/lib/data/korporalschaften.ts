/**
 * Das Korporalschaften-Portal.
 *
 * Die Inhalte kommen aus dem CMS. Das Skript scripts/cms-holen.mjs laedt sie
 * vor jedem Bau herunter und legt sie unter generated/ ab, die Bilder unter
 * public/bilder/cms. Diese Datei beschreibt nur noch die Form der Daten und
 * reicht sie weiter - deshalb koennen alle Bauteile sie unveraendert
 * verwenden, auch die im Browser laufenden.
 *
 * Die erzeugte Datei liegt bewusst in der Versionsverwaltung: dadurch laesst
 * sich der Auftritt auch dann bauen, wenn das CMS gerade nicht erreichbar ist.
 */

import daten from "./generated/korporalschaften.json";

export type Kind = "Korporalschaft" | "Garde" | "Musik" | "Führung";

export type Person = { name: string; role: string };

export type Training = {
  day: string;
  time: string;
  place: string;
  note?: string;
  /** Eigenes Bild fuer den Terminkasten. Ohne Angabe nimmt die Seite gallery[1]. */
  bild?: string;
};

export type GroupEvent = {
  title: string;
  date: string;
  time: string;
  place: string;
  kind: "Training" | "Auftritt" | "Termin";
};

/**
 * Video einer Gruppe. Ohne Eintrag erscheint auf der Seite kein Video,
 * die Gruppen entscheiden also selbst, ob sie eins zeigen.
 */
export type GruppenVideo = {
  /** YouTube-Kennung */
  youtube: string;
  titel: string;
  /** Eigenes Vorschaubild aus /public/bilder */
  vorschau?: string;
};

export type GalleryItem = {
  id: string;
  caption: string;
  /** Bento-Grid: wie viele Spalten/Zeilen die Kachel einnimmt */
  span: "sm" | "wide" | "tall" | "big";
  src: string;
};

export type Korporalschaft = {
  slug: string;
  number?: number;
  name: string;
  shortName: string;
  kind: Kind;
  founded: number;
  members: number;
  motto: string;
  /** Leitfarbe der Gruppe: Flaeche und Kontrastfarbe darauf */
  farbe: string;
  farbeText: string;
  lead: string;
  story: string[];
  facts: { label: string; value: string }[];
  people: Person[];
  training: Training;
  agenda: GroupEvent[];
  gallery: GalleryItem[];
  /** Optional: Video im Kopf der Gruppenseite */
  video?: GruppenVideo;
  /** Optional: stummes Video, das im Titelbild beim Scrollen läuft */
  kopfVideo?: string;
  verified: boolean;
};

export const korporalschaften = daten as Korporalschaft[];

export function getKorporalschaft(slug: string) {
  return korporalschaften.find((k) => k.slug === slug);
}

export const korpsKinds = [
  "Alle",
  "Korporalschaft",
  "Garde",
  "Musik",
  "Führung",
] as const;

export type KorpsFilter = (typeof korpsKinds)[number];
