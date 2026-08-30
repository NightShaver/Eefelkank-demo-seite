import { Hero } from "@/components/site/hero";
import { VereinIntro } from "@/components/site/verein-intro";
import { KorpsPreview } from "@/components/site/korps-preview";
import { Events } from "@/components/site/events";
import { Galerie } from "@/components/site/galerie";
import { Teaser } from "@/components/site/teaser";
import { SponsorenTeaser } from "@/components/site/sponsoren-teaser";
import { Join } from "@/components/site/join";
import { ZickZack } from "@/components/site/ornament";
import { site } from "@/lib/data/site";
import { events } from "@/lib/data/events";

/**
 * Startseite.
 *
 * Überblick über alle Bereiche. Inhalte, die eine eigene Seite haben,
 * stehen hier nur als kurzer Verweis: Die Tiefe liegt auf den Unterseiten,
 * die Startseite bleibt die Einladung.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <VereinIntro kompakt />
      <KorpsPreview />

      <section className="relative bg-pflaume text-creme">
        <ZickZack className="text-creme-2" />
        <div className="py-20 sm:py-24">
          <Events kompakt anzahl={3} />
        </div>
        <ZickZack flip className="text-creme" />
      </section>

      <Galerie eyebrow="Aus dem Vereinsarchiv" titel="Das ist Eefelkank." />

      <Teaser
        eyebrow="Vermietung"
        titel="Feiern, auch ohne Karneval."
        text="Geburtstag, Kommunion, Hochzeit oder Firmenfeier: Unser Vereinsheim lässt sich das ganze Jahr mieten. Saal, Küche und Theke sind da, die Deko bringst du mit."
        href="/vermietung"
        cta="Vereinsheim ansehen"
        bild="/bilder/vereinsheim/saal.jpg"
        bildAlt="Der Saal des Vereinsheims, festlich eingedeckt"
        aufkleber="Ganzjährig"
        seite="rechts"
        hintergrund="creme-2"
      />

      <SponsorenTeaser />
      <Join kanteOben="creme" />
      <StructuredData />
    </>
  );
}

/** Events als schema.org-Daten, direkt sichtbar in der Google-Suche. */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: site.longName,
        url: site.url,
        foundingDate: String(site.founded),
        address: {
          "@type": "PostalAddress",
          addressLocality: site.town,
          addressCountry: "DE",
        },
      },
      ...events.map((e) => ({
        "@type": "Event",
        name: e.title,
        url: `${site.url}/veranstaltungen/${e.id}`,
        startDate: e.date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        description: e.description,
        image: `${site.url}${e.image}`,
        location: {
          "@type": "Place",
          name: e.venue,
          address: {
            "@type": "PostalAddress",
            addressLocality: site.town,
            addressCountry: "DE",
          },
        },
        organizer: { "@type": "Organization", name: site.longName, url: site.url },
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
