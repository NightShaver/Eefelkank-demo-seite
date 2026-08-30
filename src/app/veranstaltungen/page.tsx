import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { Events } from "@/components/site/events";
import { Join } from "@/components/site/join";
import { ZickZack } from "@/components/site/ornament";
import { events } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Sessionsprogramm",
  description:
    "Alle Termine der Session 2026/2027 der KG Eefelkank: Damensitzung, Große Sitzungen, Kindersitzung, Hastenrather Nachmittag, Messe in Rot & Weiß und Karnevalsausklang.",
};

export default function VeranstaltungenPage() {
  const ausverkauft = events.filter((e) => e.soldOut).length;

  return (
    <>
      <PageHeader
        eyebrow="Session 2026 / 2027"
        titel="Sessionsprogramm"
        lead="Sieben Termine in der Dorfgemeinschaftshalle und in St. Wendelinus. Jeder Termin hat seine eigene Seite mit allen Angaben."
        ton="rot"
      >
        <dl className="mt-9 grid max-w-lg grid-cols-3 gap-6 border-t border-creme/25 pt-7">
          <Zahl wert={String(events.length)} label="Termine" />
          <Zahl wert="19:11" label="Uhr Beginn" />
          <Zahl wert={String(ausverkauft)} label="ausverkauft" />
        </dl>
      </PageHeader>

      <section className="relative bg-pflaume text-creme">
        <div className="py-20 sm:py-24">
          <Events />
        </div>
        <ZickZack flip className="text-creme" />
      </section>

      <Join kanteOben="creme" />
    </>
  );
}

function Zahl({ wert, label }: { wert: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block font-display text-3xl font-black leading-none text-gold-2 sm:text-4xl">
          {wert}
        </span>
        <span className="mt-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.18em] opacity-70">
          {label}
        </span>
      </dd>
    </div>
  );
}
