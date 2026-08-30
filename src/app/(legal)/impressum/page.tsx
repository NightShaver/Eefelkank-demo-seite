import type { Metadata } from "next";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

/**
 * Platzhalter.
 *
 * Die Pflichtangaben nach Paragraf 5 DDG (Vereinsanschrift, Vertretungs-
 * berechtigte, Registergericht, Registernummer, Kontakt) muessen vor dem
 * Livegang aus dem bestehenden Impressum uebernommen werden. Bewusst
 * nicht erfunden.
 */
export default function ImpressumPage() {
  return (
    <>
      <h1>Impressum</h1>
      <p>
        Angaben gemäß § 5 DDG. Diese Seite ist im Redesign noch nicht befüllt.
        Die rechtsverbindlichen Angaben werden unverändert aus dem bestehenden
        Impressum von {site.url} übernommen.
      </p>

      <h2>Anbieter</h2>
      <p>
        {site.longName}
        <br />
        {site.town}
        <br />
        [Straße und Hausnummer ergänzen]
      </p>

      <h2>Vertreten durch</h2>
      <p>
        {site.vorstand[0].name}, {site.vorstand[0].role}
        <br />
        {site.vorstand[1].name}, {site.vorstand[1].role}
      </p>

      <h2>Register</h2>
      <p>[Registergericht und Registernummer ergänzen]</p>

      <h2>Kontakt</h2>
      <p>info@eefelkank.de</p>
    </>
  );
}
