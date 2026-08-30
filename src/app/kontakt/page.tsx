import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { Kontakt } from "@/components/site/kontakt";
import { Karte } from "@/components/site/karte";
import { Join } from "@/components/site/join";
import { vereinsheim } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Karten, Vereinsheim, Mitgliedschaft oder Sponsoring: So erreichst du die KG Eefelkank Eschweiler-Hastenrath.",
};

export default function KontaktPage() {
  const adresse = `${vereinsheim.strasse}, ${vereinsheim.plz} ${vereinsheim.ort}`;

  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        titel="Schreib uns"
        lead="Für Karten, das Vereinsheim, eine Mitgliedschaft oder ein Sponsoring genügt eine Mail. Wir leiten sie an die richtige Stelle weiter."
        ton="pflaume"
      />
      <Kontakt />

      <section className="bg-creme pb-20 sm:pb-24">
        <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold text-tinte">
            So findest du uns
          </h2>
          <p className="mt-3 max-w-xl text-tinte-2">
            Das Vereinsheim liegt in der {vereinsheim.strasse} in{" "}
            {vereinsheim.ort}. Die Sitzungen finden in der
            Dorfgemeinschaftshalle in Hastenrath statt.
          </p>
          <div className="mt-8">
            <Karte adresse={adresse} />
          </div>
        </div>
      </section>

      <Join kanteOben="creme" />
    </>
  );
}
