import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, WordReveal } from "@/components/site/motion-primitives";
import { Button } from "@/components/ui/button";
import { Konfetti, ZickZack } from "@/components/site/ornament";

/**
 * Aufruf zum Mitmachen. Rote Vollfläche mit Zickzack-Kanten, der Block
 * schließt jede Seite ab, auf der er steht.
 */
export function Join({
  kanteOben = "creme-2",
}: {
  /** Farbe der oberen Zickzack-Kante: muss zur Sektion darüber passen. */
  kanteOben?: "creme" | "creme-2";
}) {
  return (
    <section id="mitglied" className="relative scroll-mt-28">
      <div className="relative overflow-hidden bg-rot text-creme">
        <ZickZack
          className={kanteOben === "creme" ? "text-creme" : "text-creme-2"}
        />
        <div aria-hidden className="muster-streifen absolute inset-0 text-creme/10" />
        <Konfetti count={14} colors={["#fbf5ea", "#eabc51"]} className="opacity-70" />

        <div className="relative mx-auto max-w-[84rem] px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="eyebrow text-gold-2">Mitmachen</p>
            </Reveal>
            <WordReveal
              as="h2"
              text="Karneval lebt davon, dass jemand mitmacht."
              className="mt-5 text-[clamp(2.4rem,6vw,4.6rem)] font-black leading-[0.94]"
            />
            <Reveal delay={0.12}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-creme/90">
                Ob tanzen, spielen, bauen, helfen oder einfach dabei sein: Bei
                der Eefelkank ist jeder willkommen, jung oder alt, mit oder
                ohne Karnevalserfahrung. Such dir eine Gruppe aus und komm
                vorbei.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" variant="gold">
                  <a href="mailto:info@eefelkank.de?subject=Mitgliedschaft">
                    Mitglied werden
                    <ArrowRight aria-hidden />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outlineHell">
                  <Link href="/korporalschaften">Gruppen ansehen</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <ZickZack flip className="text-creme" />
      </div>
    </section>
  );
}
