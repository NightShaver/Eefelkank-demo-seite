/**
 * Zentrale Vereinsdaten.
 *
 * Quelle: eefelkank.de und das offizielle Vereinslogo („KG EEFELKANK
 * ESCHWEILER-HASTENRATH von 1938 e.V.“). Alles, was der Verein noch
 * bestätigen muss, ist im Code als solches gekennzeichnet.
 */

export const site = {
  name: "KG Eefelkank e.V.",
  longName: "KG Eefelkank Eschweiler-Hastenrath von 1938 e.V.",
  claim: "Eischwiele Fastelovend aus Hastenrath",
  town: "Eschweiler-Hastenrath",
  founded: 1938,
  session: "Session 2026 / 2027",
  url: "https://eefelkank.de",
  hall: "Dorfgemeinschaftshalle Hastenrath",
  church: "St. Wendelinus",
  greeting: "Hastenrath Alaaf!",

  /** Der Vereinsspruch in Öcher Platt, steht so auf dem Vereinslogo. */
  spruch: [
    "Denn glöcklisch es, der hee em Dörep jeboare",
    "on hät see Häts en Haasteroth verlore.",
    "Der bliev seng Heimat treu see Leave lang,",
    "et jarantiert dofür die Eefelkank.",
  ],

  stats: [
    { value: 400, suffix: "+", label: "Mitglieder", hint: "die den Verein tragen" },
    { value: 90, suffix: "+", label: "Kinder & Jugendliche", hint: "aktiv in den Gruppen" },
    { value: 3000, suffix: "+", label: "Gäste pro Session", hint: "in der Dorfgemeinschaftshalle" },
    { value: 7, suffix: "", label: "Korporalschaften", hint: "plus Musik und Garden" },
  ],

  /**
   * Navigation. `section` markiert Anker auf der Startseite, die
   * Navigation hebt beim Scrollen automatisch den aktiven Bereich hervor.
   */
  /**
   * Navigation. Jeder Eintrag ist eine eigene Seite, wie in der alten
   * Struktur des Vereins, nur neu gestaltet. Die Startseite bleibt der
   * Überblick und verlinkt in diese Bereiche.
   */
  nav: [
    { label: "Verein", href: "/verein" },
    { label: "Korporalschaften", href: "/korporalschaften" },
    { label: "Sessionsprogramm", href: "/veranstaltungen" },
    { label: "Vermietung", href: "/vermietung" },
    { label: "Sponsoren", href: "/sponsoren" },
    { label: "Kontakt", href: "/kontakt" },
  ],

  /**
   * Vorstand. `foto` ist optional, fehlt es, füllt das Wappen mit den
   * Initialen den Rahmen. Die drei vorhandenen Porträts hat der Verein
   * beigesteuert; die Bildrechte sind vor dem Livegang zu bestätigen.
   */
  vorstand: [
    {
      name: "Michael Schümmer",
      role: "1. Präsident",
      initialen: "MS",
      foto: "/bilder/vorstand/michael-schuemmer.jpg",
    },
    {
      name: "Christian Wolny",
      role: "1. Vorsitzender",
      initialen: "CW",
      foto: "/bilder/vorstand/christian-wolny.jpg",
    },
    { name: "Jürgen Engelhardt", role: "1. Kassierer", initialen: "JE" },
    {
      name: "Markus Breuer",
      role: "1. Geschäftsführer",
      initialen: "MB",
      foto: "/bilder/vorstand/markus-breuer.jpg",
    },
  ] as { name: string; role: string; initialen: string; foto?: string }[],
} as const;

/**
 * Sponsoren, Logos aus der Mediathek von eefelkank.de.
 *
 * Der Verein hat viele Logos nur als weiße Variante fuer dunkle Hintergruende
 * hinterlegt. Wo eine farbige Fassung existiert, wird sie genutzt; die
 * restlichen weißen Logos werden per `invert` dunkel dargestellt, damit die
 * Wand einheitlich aussieht. Firmennamen bitte vom Verein gegenlesen.
 */
export const sponsoren: { name: string; file: string; invert?: boolean }[] = [
  { name: "EASY Apotheke", file: "easy-apotheke.png", invert: true },
  { name: "Suthau", file: "suthau-farbe.jpg" },
  { name: "Feucht Röntgen", file: "feucht-roentgen-farbe.jpg" },
  { name: "Kanaldoctor", file: "kanaldoctor-farbe.png" },
  { name: "Peter Dederichs", file: "dederichs-farbe.png" },
  { name: "Niessen", file: "niessen.png", invert: true },
  { name: "Mock", file: "mock-farbe.png" },
  { name: "Kaussen", file: "kaussen.png", invert: true },
  { name: "Elmar Körfer", file: "koerfer-farbe.png" },
  { name: "Schreinerei Klinkenberg", file: "klinkenberg-farbe.jpg" },
  { name: "Privalor", file: "privalor.png", invert: true },
  { name: "Uwe Müller GmbH", file: "uwe-mueller.png" },
  { name: "Hyundai Sazma", file: "hyundai-sazma.png" },
  { name: "MKI Kloker", file: "mki-kloker.png" },
  { name: "Container Clermont", file: "clermont.jpg" },
  { name: "VMPK Koll", file: "vmpk-koll.png" },
];

/**
 * Vereinsheim der KG Eefelkank.
 *
 * Angaben aus dem bisherigen Auftritt vereinsheim.eefelkank.de: Anschrift,
 * Ansprechpartner und Telefonnummer für die Vermietung.
 */
export const vereinsheim = {
  name: "Vereinsheim der KG Eefelkank",
  strasse: "Bohler Str. 96",
  plz: "52249",
  ort: "Eschweiler",
  telefon: "0160 96711327",
  telefonLink: "+4916096711327",
  ansprechpartner: ["Jürgen Engelhardt", "Bernd Schneider"],
  anlaesse: [
    "Geburtstag",
    "Taufe und Kommunion",
    "Hochzeit",
    "Firmenfeier",
    "Vereinsabend",
    "Trauerfeier",
    "Jubiläum",
    "Weihnachtsfeier",
  ],
};
