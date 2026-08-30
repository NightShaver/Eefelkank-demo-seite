import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { VereinIntro } from "@/components/site/verein-intro";
import { Spruch } from "@/components/site/spruch";
import { Vorstand } from "@/components/site/vorstand";
import { Galerie } from "@/components/site/galerie";
import { Join } from "@/components/site/join";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Der Verein",
  description:
    "Die KG Eefelkank Eschweiler-Hastenrath von 1938 e.V.: Geschichte, Zahlen, Vorstand und der Vereinsspruch in Öcher Platt.",
};

export default function VereinPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Seit ${site.founded}`}
        titel="Der Verein"
        lead="Über 400 Mitglieder, acht Gruppen und ein Dorf, das jedes Jahr gemeinsam die Halle füllt. Hier steht, wer wir sind und wer den Laden zusammenhält."
        ton="rot"
      />
      <VereinIntro />
      <Spruch />
      <Vorstand />
      <Galerie
        eyebrow="Vereinsleben"
        titel="Momente, die bleiben."
        ton="pflaume"
      />
      <Join kanteOben="creme" />
    </>
  );
}
