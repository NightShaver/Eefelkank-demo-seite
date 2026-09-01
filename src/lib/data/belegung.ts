/**
 * Belegung des Vereinsheims.
 *
 * Beispieldaten für die Demo. Der bisherige Auftritt pflegt die Belegung in
 * einem Kalender-Plugin; später kann diese Liste aus demselben Kalender
 * kommen (iCal-Feed, CMS oder Tabelle). Die Form bleibt gleich, deshalb
 * muss dafür an der Oberfläche nichts geändert werden.
 *
 * `gebucht`    fest vergeben, nicht mehr anfragbar
 * `reserviert` vorgemerkt, Anfrage nur auf Warteliste
 */
export type Belegungsstatus = "gebucht" | "reserviert";

export type Belegung = {
  /** Tag im Format JJJJ-MM-TT */
  datum: string;
  status: Belegungsstatus;
  /** Kurzer Hinweis, erscheint als Titel am Tag */
  anlass?: string;
};

export const belegung: Belegung[] = [
  { datum: "2026-09-12", status: "gebucht", anlass: "Geburtstag" },
  { datum: "2026-09-19", status: "gebucht", anlass: "Hochzeit" },
  { datum: "2026-09-20", status: "gebucht", anlass: "Hochzeit" },
  { datum: "2026-09-26", status: "reserviert", anlass: "Firmenfeier" },
  { datum: "2026-10-03", status: "gebucht", anlass: "Taufe" },
  { datum: "2026-10-10", status: "reserviert" },
  { datum: "2026-10-17", status: "gebucht", anlass: "Geburtstag" },
  { datum: "2026-10-31", status: "gebucht", anlass: "Vereinsabend" },
  { datum: "2026-11-07", status: "gebucht", anlass: "Kommunionsfeier" },
  { datum: "2026-11-11", status: "gebucht", anlass: "Sessionseröffnung" },
  { datum: "2026-11-21", status: "reserviert" },
  { datum: "2026-11-28", status: "gebucht", anlass: "Weihnachtsfeier" },
  { datum: "2026-12-05", status: "gebucht", anlass: "Weihnachtsfeier" },
  { datum: "2026-12-12", status: "gebucht", anlass: "Weihnachtsfeier" },
  { datum: "2026-12-19", status: "reserviert", anlass: "Firmenfeier" },
  { datum: "2026-12-31", status: "gebucht", anlass: "Silvester" },
  { datum: "2027-01-14", status: "gebucht", anlass: "Damensitzung" },
  { datum: "2027-01-23", status: "gebucht", anlass: "Erste Große Sitzung" },
  { datum: "2027-01-24", status: "gebucht", anlass: "Hastenrather Nachmittag" },
  { datum: "2027-01-30", status: "gebucht", anlass: "Kindersitzung" },
  { datum: "2027-01-31", status: "gebucht", anlass: "Frühschoppen" },
  { datum: "2027-02-06", status: "gebucht", anlass: "Zweite Große Sitzung" },
  { datum: "2027-02-09", status: "gebucht", anlass: "Karnevalsausklang" },
  { datum: "2027-02-20", status: "reserviert" },
  { datum: "2027-03-13", status: "gebucht", anlass: "Geburtstag" },
  { datum: "2027-03-27", status: "reserviert", anlass: "Hochzeit" },
];

/** Belegung eines Tages, sonst `undefined`. */
export function belegungAm(datum: string) {
  return belegung.find((e) => e.datum === datum);
}
