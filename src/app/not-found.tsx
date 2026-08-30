import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Konfetti } from "@/components/site/ornament";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden bg-rot px-4 py-32 text-creme">
      <div aria-hidden className="muster-punkte absolute inset-0 text-creme/15" />
      <Konfetti count={14} colors={["#fbf5ea", "#eabc51"]} />

      <div className="relative text-center">
        <p className="eyebrow text-gold-2">Fehler 404</p>
        <h1 className="mt-5 font-display text-[clamp(3rem,10vw,7rem)] font-black leading-none">
          Hier ist keiner
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-creme/85">
          Diese Seite gibt es nicht, vielleicht ist sie noch beim Aufbau in der
          Halle. Zurück zum Programm?
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="gold">
            <Link href="/">Zur Startseite</Link>
          </Button>
          <Button asChild size="lg" variant="outlineHell">
            <Link href="/korporalschaften">Korporalschaften</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
