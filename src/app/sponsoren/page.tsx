import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { Sponsoren } from "@/components/site/sponsoren";

export const metadata: Metadata = {
  title: "Sponsoren",
  description:
    "Die Betriebe aus Hastenrath und der Region, die den Karneval der KG Eefelkank möglich machen.",
};

export default function SponsorenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Danke"
        titel="Unsere Sponsoren"
        lead="Wagen, Orden, Technik, Nachwuchsarbeit: Vieles davon tragen Betriebe aus Hastenrath und der Region mit. Wir empfehlen sie gerne weiter."
        ton="tinte"
      />
      <Sponsoren />
    </>
  );
}
