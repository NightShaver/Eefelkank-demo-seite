/**
 * Das Korporalschaften-Portal.
 *
 * `verified: true`  -> Text stammt von eefelkank.de bzw. offiziellen Kanaelen.
 * `verified: false` -> realistischer Entwurf, den die Gruppe selbst ersetzt.
 *
 * Fotos: Alle Bilder unter /public/bilder stammen aus der Mediathek von
 * eefelkank.de, gehoeren also dem Verein. Sie sind nach Bildinhalt (Garde,
 * Elferrat, Aufbau, Kinder) auf die Gruppen verteilt, welche Gruppe genau
 * auf welchem Foto zu sehen ist, weiss nur der Verein. Die Zuordnung laesst
 * sich hier in einer Zeile korrigieren, ohne den Code anzufassen.
 */

export type Kind = "Korporalschaft" | "Garde" | "Musik" | "Führung";

export type Person = { name: string; role: string };

export type Training = {
  day: string;
  time: string;
  place: string;
  note?: string;
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

const g = (
  id: string,
  caption: string,
  src: string,
  span: GalleryItem["span"] = "sm"
): GalleryItem => ({ id, caption, src: `/bilder/${src}.jpg`, span });

export const korporalschaften: Korporalschaft[] = [
  {
    slug: "siebte-korporalschaft",
    number: 7,
    name: "7te Korporalschaft",
    shortName: "7te Korporalschaft",
    kind: "Korporalschaft",
    founded: 2016,
    members: 24,
    motto: "Einer für alle, alle für den Karneval",
    farbe: "#d5122a",
    farbeText: "#fbf5ea",
    lead:
      "Die 7. Korporalschaft verbindet Humor, Freundschaft und echte Vereinsliebe. Traditionsbewusst, trinkfest, und auf uns ist Verlass, im Karneval und darüber hinaus.",
    story: [
      "Was als lockere Runde am Tresen begann, ist heute eine der aktivsten Gruppen der Eefelkank. Wir stellen Mann für Mann bei jedem Umzug, jeder Sitzung und jedem Aufbau, und wir bleiben, bis die letzte Bank wieder im Lager steht.",
      "Zwischen den Sessionen halten Kegelturnier, Brauereitour nach Köln, Grillabend und Zockernacht die Truppe zusammen. Wer bei uns mitmacht, bekommt keine Mitgliedskarte, sondern eine zweite Familie.",
    ],
    facts: [
      { label: "Gegründet", value: "2016" },
      { label: "Stärke", value: "24 Jecken" },
      { label: "Heimat", value: "Dorfgemeinschaftshalle" },
      { label: "Motto", value: "Einer für alle" },
    ],
    people: [
      { name: "N. N.", role: "Korporal" },
      { name: "N. N.", role: "Kassierer" },
    ],
    training: {
      day: "Jeden ersten Freitag im Monat",
      time: "20:11 Uhr",
      place: "Dorfgemeinschaftshalle Hastenrath",
      note: "Stammtisch, offen für alle, die reinschnuppern wollen.",
    },
    agenda: [
      { title: "Sessionseröffnung", date: "2026-11-11", time: "19:11 Uhr", place: "Dorfgemeinschaftshalle", kind: "Auftritt" },
      { title: "Erste Große Sitzung", date: "2027-01-23", time: "19:11 Uhr", place: "Dorfgemeinschaftshalle", kind: "Auftritt" },
      { title: "Kegelturnier", date: "2027-03-13", time: "18:00 Uhr", place: "Kegelbahn Hastenrath", kind: "Termin" },
    ],
    gallery: [
      g("k7-1", "Vier Jecken, ein Abend", "jecken-vier", "big"),
      g("k7-2", "In Reih und Glied", "reihe-buehne"),
      g("k7-3", "Aufmarsch auf der Bühne", "korporalschaft-buehne", "tall"),
      g("k7-4", "Krawall im Saal", "publikum-krawall", "wide"),
      g("k7-5", "Der Präsident mit Zepter", "zepter"),
      g("k7-6", "Stimmung bis in die Nacht", "publikum-rot"),
    ],
    video: {
      youtube: "l5w3J6LoCSs",
      titel: "Veedelszoch der KG Eefelkank",
      vorschau: "/bilder/korporalschaft-buehne.jpg",
    },
    verified: true,
  },
  {
    slug: "trompeterkorps",
    name: "Trompeterkorps Eefelkank e.V.",
    shortName: "Trompeterkorps",
    kind: "Musik",
    founded: 1971,
    members: 38,
    motto: "Big-Band-Musik über Grenzen hinaus",
    farbe: "#c8912c",
    farbeText: "#1c1016",
    lead:
      "Blech, Bass und Big-Band-Sound: Das Trompeterkorps ist die Stimme der Eefelkank, auf jedem Umzug hörbar, weit über Hastenrath hinaus.",
    story: [
      "Vom kleinen Spielmannszug zum Klangkörper mit Big-Band-Repertoire: Das Trompeterkorps spielt längst nicht mehr nur Karnevalsmärsche, sondern Sätze, die auch außerhalb der Session tragen.",
      "Ausbildung wird bei uns großgeschrieben. Wer ein Instrument lernen will, bekommt Unterricht im Verein, vom ersten Ton bis zum ersten Auftritt im Zug.",
    ],
    facts: [
      { label: "Gegründet", value: "1971" },
      { label: "Register", value: "Trompete, Posaune, Bass, Drums" },
      { label: "Musiker", value: "38" },
      { label: "Nachwuchs", value: "Ausbildung im Verein" },
    ],
    people: [
      { name: "N. N.", role: "Musikalische Leitung" },
      { name: "N. N.", role: "Vorstand Musik" },
    ],
    training: {
      day: "Donnerstag",
      time: "19:30 – 21:30 Uhr",
      place: "Probenraum, Dorfgemeinschaftshalle",
      note: "Registerproben nach Absprache.",
    },
    agenda: [
      { title: "Gesamtprobe", date: "2026-11-05", time: "19:30 Uhr", place: "Probenraum", kind: "Training" },
      { title: "Messe in Rot & Weiß", date: "2027-01-31", time: "09:00 Uhr", place: "St. Wendelinus", kind: "Auftritt" },
      { title: "Rosenmontagszug", date: "2027-02-08", time: "11:11 Uhr", place: "Eschweiler", kind: "Auftritt" },
    ],
    gallery: [
      g("tk-1", "Bühne mit Fontänen", "buehne-fontaenen", "big"),
      g("tk-2", "Voller Saal", "saal-publikum", "wide"),
      g("tk-3", "Auftritt am Abend", "damensitzung-saal", "tall"),
      g("tk-4", "Applaus im Publikum", "publikum-rot"),
      g("tk-5", "Bühnenkulisse", "kulisse-jeck"),
    ],
    video: {
      youtube: "27mbEj7DE8k",
      titel: "Karnevalsumzug in Eschweiler-Hastenrath",
      vorschau: "/bilder/buehne-fontaenen.jpg",
    },
    verified: true,
  },
  {
    slug: "erste-korporalschaft",
    number: 1,
    name: "1. Korporalschaft",
    shortName: "1. Korporalschaft",
    kind: "Korporalschaft",
    founded: 1938,
    members: 21,
    motto: "Wo alles begann",
    farbe: "#a80f21",
    farbeText: "#fbf5ea",
    lead:
      "Die Älteste im Bunde. Wer wissen will, wie Hastenrath Karneval feiert, schaut sich an, wie die Erste es macht.",
    story: [
      "Die 1. Korporalschaft trägt die Gründungsgeschichte des Vereins. Ihre Ordnung, ihre Lieder und ihr Auftreten prägen bis heute, wie die Eefelkank in den Saal einzieht.",
      "Erfahrung heißt bei uns nicht Stillstand: Wir bilden aus, geben weiter und holen jedes Jahr neue Jecken in die Reihen.",
    ],
    facts: [
      { label: "Gegründet", value: "1938" },
      { label: "Stärke", value: "21 Jecken" },
      { label: "Rolle", value: "Einzug & Zeremoniell" },
      { label: "Motto", value: "Wo alles begann" },
    ],
    people: [{ name: "N. N.", role: "Korporal" }],
    training: {
      day: "Zweiter Freitag im Monat",
      time: "20:00 Uhr",
      place: "Vereinsheim Hastenrath",
    },
    agenda: [
      { title: "Sessionseröffnung", date: "2026-11-11", time: "19:11 Uhr", place: "Dorfgemeinschaftshalle", kind: "Auftritt" },
      { title: "Hastenrather Nachmittag", date: "2027-01-24", time: "14:00 Uhr", place: "Dorfgemeinschaftshalle", kind: "Auftritt" },
    ],
    gallery: [
      g("k1-1", "Ordensträger der Gesellschaft", "elferrat-orden", "big"),
      g("k1-2", "Einzug in den Saal", "jecken-vier", "tall"),
      g("k1-3", "Auf der Bühne", "korporalschaft-buehne", "wide"),
      g("k1-4", "Der Präsident", "praesident"),
      g("k1-5", "Volle Halle", "saal-publikum"),
    ],
    verified: false,
  },
  {
    slug: "zweite-korporalschaft",
    number: 2,
    name: "2. Korporalschaft",
    shortName: "2. Korporalschaft",
    kind: "Korporalschaft",
    founded: 1963,
    members: 19,
    motto: "Laut, loyal, immer zur Stelle",
    farbe: "#e2661f",
    farbeText: "#1c1016",
    lead:
      "Die Zweite ist die Gruppe für alle, die anpacken: Bühne, Technik, Theke, und danach als Erste auf der Tanzfläche.",
    story: [
      "Ohne die 2. Korporalschaft steht keine Bühne. Wir bauen auf, wir bauen ab, und dazwischen feiern wir mit voller Lautstärke mit.",
      "Unser Sommerfest im Juli ist inzwischen fester Bestandteil des Dorfkalenders, und der beste Einstieg für alle, die den Verein kennenlernen wollen.",
    ],
    facts: [
      { label: "Gegründet", value: "1963" },
      { label: "Stärke", value: "19 Jecken" },
      { label: "Spezialität", value: "Aufbau & Technik" },
      { label: "Sommerfest", value: "jedes Jahr im Juli" },
    ],
    people: [{ name: "N. N.", role: "Korporal" }],
    training: {
      day: "Freitag, 14-tägig",
      time: "20:11 Uhr",
      place: "Dorfgemeinschaftshalle",
    },
    agenda: [
      { title: "Hallenaufbau Session", date: "2027-01-22", time: "17:00 Uhr", place: "Dorfgemeinschaftshalle", kind: "Termin" },
      { title: "Zweite Große Sitzung", date: "2027-02-06", time: "19:11 Uhr", place: "Dorfgemeinschaftshalle", kind: "Auftritt" },
      { title: "Sommerfest", date: "2027-07-10", time: "15:00 Uhr", place: "Festplatz Hastenrath", kind: "Termin" },
    ],
    gallery: [
      g("k2-1", "Anpacken für die Halle", "aufbau-helme", "big"),
      g("k2-2", "Der Saal ist voll", "saal-publikum", "wide"),
      g("k2-3", "Krawall", "publikum-krawall", "tall"),
      g("k2-4", "Nach getaner Arbeit", "jecken-vier"),
      g("k2-5", "Bühne frei", "buehne-fontaenen"),
    ],
    verified: false,
  },
  {
    slug: "dritte-korporalschaft",
    number: 3,
    name: "3. Korporalschaft",
    shortName: "3. Korporalschaft",
    kind: "Korporalschaft",
    founded: 1974,
    members: 17,
    motto: "Drei Mal Alaaf und einmal mehr",
    farbe: "#1d6e5c",
    farbeText: "#fbf5ea",
    lead:
      "Die Dritte pflegt das Brauchtum: Ordensverleihung, Wagenbau und die alten Lieder gehören uns.",
    story: [
      "Jeder Orden, den die Eefelkank vergibt, geht durch unsere Hände. Wir entwerfen, wir prüfen, wir übergeben, und wir kennen die Geschichte hinter jedem Motiv.",
      "Im Herbst wird bei uns gebaut: Der Wagen für den Zug entsteht in Eigenregie, Woche für Woche, bis er steht.",
    ],
    facts: [
      { label: "Gegründet", value: "1974" },
      { label: "Stärke", value: "17 Jecken" },
      { label: "Spezialität", value: "Orden & Wagenbau" },
      { label: "Bauzeit", value: "September bis Februar" },
    ],
    people: [{ name: "N. N.", role: "Korporal" }],
    training: {
      day: "Mittwoch",
      time: "19:00 Uhr",
      place: "Wagenbauhalle",
      note: "In der Bauphase auch samstags.",
    },
    agenda: [
      { title: "Wagenbau", date: "2026-09-16", time: "19:00 Uhr", place: "Wagenbauhalle", kind: "Termin" },
      { title: "Ordensverleihung", date: "2027-01-23", time: "19:11 Uhr", place: "Dorfgemeinschaftshalle", kind: "Auftritt" },
    ],
    gallery: [
      g("k3-1", "Kulisse aus eigener Hand", "kulisse-jeck", "big"),
      g("k3-2", "Orden und Uniform", "elferrat-orden", "tall"),
      g("k3-3", "Zepter und Zeremonie", "zepter", "wide"),
      g("k3-4", "Auf der Bühne", "tanzmariechen-wagen"),
      g("k3-5", "Der Präsident", "praesident"),
    ],
    verified: false,
  },
  {
    slug: "damengarde",
    name: "Damengarde Rot-Weiß",
    shortName: "Damengarde",
    kind: "Garde",
    founded: 1989,
    members: 22,
    motto: "Präzision in Rot und Weiß",
    farbe: "#b3125a",
    farbeText: "#fbf5ea",
    lead:
      "Marschtanz, Showtanz, Gardetanz, die Damengarde bringt die Choreografie, die aus einer Sitzung ein Programm macht.",
    story: [
      "Zwischen September und Februar steht die Garde jede Woche in der Halle. Was auf der Bühne leicht aussieht, sind Monate Arbeit an Haltung, Timing und Ausdruck.",
      "Wir tanzen auf allen Sitzungen der Eefelkank und als Gastgarde in der ganzen Region, und wir freuen uns über jede, die neu dazukommt.",
    ],
    facts: [
      { label: "Gegründet", value: "1989" },
      { label: "Tänzerinnen", value: "22" },
      { label: "Disziplinen", value: "Marsch- & Showtanz" },
      { label: "Auftritte", value: "über 15 pro Session" },
    ],
    people: [
      { name: "N. N.", role: "Trainerin" },
      { name: "N. N.", role: "Gardeleitung" },
    ],
    training: {
      day: "Dienstag",
      time: "19:00 – 21:00 Uhr",
      place: "Dorfgemeinschaftshalle",
      note: "Ab September zusätzlich sonntags.",
    },
    agenda: [
      { title: "Training Showtanz", date: "2026-09-08", time: "19:00 Uhr", place: "Dorfgemeinschaftshalle", kind: "Training" },
      { title: "Damensitzung", date: "2027-01-14", time: "18:00 Uhr", place: "Dorfgemeinschaftshalle", kind: "Auftritt" },
      { title: "Erste Große Sitzung", date: "2027-01-23", time: "19:11 Uhr", place: "Dorfgemeinschaftshalle", kind: "Auftritt" },
    ],
    gallery: [
      g("dg-1", "Hebefigur im Finale", "garde-hebefigur", "big"),
      g("dg-2", "Formation auf der Bühne", "garde-formation", "wide"),
      g("dg-3", "Aufstellung", "garde-reihe", "tall"),
      g("dg-4", "Tanzpaar", "tanzpaar"),
      g("dg-5", "Die ganze Garde", "garde-gruppe"),
      g("dg-6", "Volle Kraft", "garde-aktion"),
    ],
    verified: false,
  },
  {
    slug: "kindertanzgruppe",
    name: "Kinder- & Jugendtanzgruppe",
    shortName: "Kindertanz",
    kind: "Garde",
    founded: 2004,
    members: 46,
    motto: "Hier fängt jede Karnevalskarriere an",
    farbe: "#21518c",
    farbeText: "#fbf5ea",
    lead:
      "Über 90 Kinder und Jugendliche sind bei der Eefelkank aktiv, die meisten von ihnen starten hier, in der Tanzgruppe.",
    story: [
      "Wir tanzen in drei Altersgruppen, von den Minis bis zur Jugendgarde. Der Anspruch ist ernst, die Stimmung bleibt kindgerecht: Es wird geübt, aber vor allem gelacht.",
      "Der große Moment ist die Kindersitzung Ende Januar, der erste Auftritt vor vollem Saal, an den sich hier jeder erinnert.",
    ],
    facts: [
      { label: "Gegründet", value: "2004" },
      { label: "Kinder", value: "46 in 3 Gruppen" },
      { label: "Alter", value: "4 bis 16 Jahre" },
      { label: "Höhepunkt", value: "Kindersitzung" },
    ],
    people: [
      { name: "N. N.", role: "Leitung Kindertanz" },
      { name: "N. N.", role: "Betreuung" },
    ],
    training: {
      day: "Samstag",
      time: "10:00 – 12:00 Uhr",
      place: "Dorfgemeinschaftshalle",
      note: "Minis 10:00 Uhr, Jugend 11:00 Uhr.",
    },
    agenda: [
      { title: "Training alle Gruppen", date: "2026-09-12", time: "10:00 Uhr", place: "Dorfgemeinschaftshalle", kind: "Training" },
      { title: "Kindersitzung", date: "2027-01-30", time: "14:00 Uhr", place: "Dorfgemeinschaftshalle", kind: "Auftritt" },
    ],
    gallery: [
      g("kt-1", "Die Kindergarde", "kindergarde", "big"),
      g("kt-2", "Tanzmariechen", "tanzmariechen", "tall"),
      g("kt-3", "Auftritt vor der Kulisse", "tanzmariechen-wagen", "wide"),
      g("kt-4", "Showtanz", "showtanz-damen"),
      g("kt-5", "Applaus", "publikum-rot"),
    ],
    verified: false,
  },
  {
    slug: "elferrat",
    name: "Elferrat",
    shortName: "Elferrat",
    kind: "Führung",
    founded: 1938,
    members: 11,
    motto: "Elf Sitze, ein Ton: Alaaf",
    farbe: "#3d0f33",
    farbeText: "#fbf5ea",
    lead:
      "Der Elferrat sitzt auf der Bühne, führt durch das Programm und hält die Ordnung der Sitzung, vom ersten Tusch bis zum letzten Lied.",
    story: [
      "Elf Mitglieder, ein Präsident, eine Aufgabe: den Abend tragen. Der Elferrat begrüßt die Gäste, verleiht die Orden und gibt jeder Sitzung ihren Rahmen.",
      "Der Sitz im Elferrat ist bei der Eefelkank eine Auszeichnung, und eine Verpflichtung über die ganze Session hinweg.",
    ],
    facts: [
      { label: "Gegründet", value: "1938" },
      { label: "Sitze", value: "11" },
      { label: "Aufgabe", value: "Sitzungsleitung" },
      { label: "Präsident", value: "Michael Schümmer" },
    ],
    people: [
      { name: "Michael Schümmer", role: "1. Präsident" },
      { name: "Christian Wolny", role: "1. Vorsitzender" },
    ],
    training: {
      day: "Monatliche Sitzung",
      time: "20:11 Uhr",
      place: "Vereinsheim Hastenrath",
      note: "In der Session wöchentliche Abstimmung.",
    },
    agenda: [
      { title: "Sessionsplanung", date: "2026-10-09", time: "20:11 Uhr", place: "Vereinsheim", kind: "Termin" },
      { title: "Erste Große Sitzung", date: "2027-01-23", time: "19:11 Uhr", place: "Dorfgemeinschaftshalle", kind: "Auftritt" },
      { title: "Karnevalsausklang", date: "2027-02-09", time: "19:11 Uhr", place: "Dorfgemeinschaftshalle", kind: "Auftritt" },
    ],
    gallery: [
      g("er-1", "Elferrat mit Orden", "elferrat-orden", "big"),
      g("er-2", "Der Präsident", "praesident", "tall"),
      g("er-3", "Zepter und Zeremonie", "zepter", "wide"),
      g("er-4", "Auf der Bühne", "korporalschaft-buehne"),
      g("er-5", "Jecken unter sich", "jecken-vier"),
    ],
    verified: false,
  },
];

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
