import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { VereinsheimMieten } from "@/components/site/vereinsheim";
import { Buchung } from "@/components/site/buchung";
import { vereinsheim } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Vereinsheim mieten",
  description:
    "Das Vereinsheim der KG Eefelkank in Eschweiler mieten: Saal, Küche und Theke für Geburtstag, Kommunion, Hochzeit, Firmenfeier oder Vereinsabend.",
};

export default function VermietungPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vermietung"
        titel="Vereinsheim mieten"
        lead={`Keine eigenen Räume für die Feier? Unser Vereinsheim in der ${vereinsheim.strasse} steht das ganze Jahr für private und öffentliche Anlässe zur Verfügung.`}
        ton="gold"
      />
      <VereinsheimMieten />
      <Buchung />
    </>
  );
}
