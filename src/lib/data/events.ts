/**
 * Sessionskalender.
 *
 * Termine und Titel stammen 1:1 aus dem Veranstaltungskalender von
 * eefelkank.de. Preise und Ticketstände sind bewusst als optionale
 * Felder gehalten, damit sie spaeter aus einem CMS kommen koennen.
 */

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

export const events: ClubEvent[] = [
  {
    id: "damensitzung",
    image: "/bilder/damensitzung-saal.jpg",
    title: "Damensitzung",
    date: "2027-01-14T18:00:00+01:00",
    time: "18:00 Uhr",
    venue: "Dorfgemeinschaftshalle",
    category: "Sitzung",
    description:
      "Die ganz besondere Atmosphäre, die es nur auf einer Sitzung von und für Damen gibt.",
    soldOut: true,
  },
  {
    id: "erste-grosse-sitzung",
    image: "/bilder/korporalschaft-buehne.jpg",
    title: "Erste Große Sitzung",
    date: "2027-01-23T19:11:00+01:00",
    time: "19:11 Uhr",
    venue: "Dorfgemeinschaftshalle",
    category: "Sitzung",
    description:
      "Mit der Ersten Großen Sitzung starten wir traditionell in den Sitzungskarneval.",
    highlight: true,
  },
  {
    id: "hastenrather-nachmittag",
    image: "/bilder/publikum-krawall.jpg",
    title: "Hastenrather Nachmittag",
    date: "2027-01-24T14:00:00+01:00",
    time: "14:00 Uhr",
    venue: "Dorfgemeinschaftshalle",
    category: "Familie",
    description:
      "Für Jung und Alt, für die ganze Familie. In guter Tradition gibt es in der Pause ein Stück Kuchen, bitte einen Teller mitbringen.",
  },
  {
    id: "kindersitzung",
    image: "/bilder/kindergarde.jpg",
    title: "Kindersitzung",
    date: "2027-01-30T14:00:00+01:00",
    time: "14:00 Uhr",
    venue: "Dorfgemeinschaftshalle",
    category: "Familie",
    description:
      "Ein buntes Fest für unsere Jüngsten, bei dem alle Kinder stolz ihre Kostüme präsentieren.",
  },
  {
    id: "fruehschoppen",
    image: "/bilder/jecken-vier.jpg",
    title: "Messe in Rot & Weiß + Frühschoppen",
    date: "2027-01-31T11:00:00+01:00",
    time: "ab 09:00 Uhr",
    venue: "St. Wendelinus & Dorfgemeinschaftshalle",
    category: "Brauchtum",
    description:
      "Messe in Rot und Weiß nach kölschem Gebetbuch, danach der karnevalistische Frühschoppen.",
  },
  {
    id: "zweite-grosse-sitzung",
    image: "/bilder/garde-hebefigur.jpg",
    title: "Zweite Große Sitzung",
    date: "2027-02-06T19:11:00+01:00",
    time: "19:11 Uhr",
    venue: "Dorfgemeinschaftshalle",
    category: "Sitzung",
    description:
      "Mit Vollgas ins Karnevalswochenende: Lachen, Schunkeln und vor allem Mitsingen.",
    highlight: true,
  },
  {
    id: "karnevalsausklang",
    image: "/bilder/publikum-rot.jpg",
    title: "Karnevalsausklang",
    date: "2027-02-09T19:11:00+01:00",
    time: "19:11 Uhr",
    venue: "Dorfgemeinschaftshalle",
    category: "Brauchtum",
    description:
      "Gemeinsam lassen wir die Session ausklingen, bis zum nächsten Elften im Elften.",
  },
];

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
