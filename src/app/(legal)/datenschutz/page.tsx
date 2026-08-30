import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
};

/**
 * Platzhalter, die bestehende Datenschutzerklaerung des Vereins wird hier
 * eingesetzt. Die neue Seite laedt keine externen Dienste, kein Tracking und
 * keine Fremd-Fonts: Inter und Instrument Serif werden ueber next/font lokal
 * ausgeliefert, es werden keine Cookies gesetzt.
 */
export default function DatenschutzPage() {
  return (
    <>
      <h1>Datenschutz</h1>
      <p>
        Die vollständige Datenschutzerklärung wird vor dem Livegang aus dem
        bestehenden Auftritt übernommen. Für die technische Umsetzung dieser
        Seite gilt bereits:
      </p>

      <h2>Keine Cookies, kein Tracking</h2>
      <p>
        Diese Seite setzt keine Cookies, bindet keine Analyse- oder
        Werbedienste ein und überträgt keine Daten an Dritte.
      </p>

      <h2>Schriftarten</h2>
      <p>
        Die Schriften Inter und Instrument Serif werden zur Buildzeit
        heruntergeladen und vom eigenen Server ausgeliefert. Es entsteht keine
        Verbindung zu Google Fonts im Browser der Besucher.
      </p>

      <h2>Kontaktaufnahme</h2>
      <p>
        Anfragen über die E-Mail-Links auf dieser Seite laufen direkt über das
        E-Mail-Programm der Besucher. Es gibt kein serverseitiges
        Kontaktformular, das Daten speichert.
      </p>
    </>
  );
}
