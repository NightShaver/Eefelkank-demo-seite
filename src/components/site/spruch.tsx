import Image from "next/image";
import { mitBasis } from "@/lib/utils";
import { site } from "@/lib/data/site";
import { Reveal } from "@/components/site/motion-primitives";

/**
 * Der Vereinsspruch in Öcher Platt.
 *
 * Hinterlegt mit dem Gruppenfoto des Vereins. Damit die Mundart lesbar
 * bleibt, liegt über dem Bild eine kräftige Pflaume-Schicht plus ein
 * Verlauf von oben und unten, das Foto trägt die Stimmung, der Text
 * bleibt der Held.
 */
export function Spruch() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative isolate">
        <Image
          src={mitBasis("/bilder/vereinsfoto.jpg")}
          alt="Die Mitglieder der KG Eefelkank Eschweiler-Hastenrath"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Lesbarkeit: dunkle Grundschicht + weiche Ränder */}
        <div
          aria-hidden
          className="absolute inset-0 bg-pflaume/85 mix-blend-multiply"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,16,22,0.75),rgba(61,15,51,0.55)_45%,rgba(28,16,22,0.8))]"
        />
        <div aria-hidden className="muster-punkte absolute inset-0 text-creme/10" />

        <div className="relative mx-auto max-w-[84rem] px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <blockquote className="mx-auto max-w-3xl text-center">
              <p className="font-display text-[clamp(1.4rem,3.1vw,2.35rem)] font-bold leading-[1.45] text-creme [text-shadow:0_2px_18px_rgba(28,16,22,0.65)]">
                {site.spruch.map((zeile) => (
                  <span key={zeile} className="block">
                    {zeile}
                  </span>
                ))}
              </p>
              <footer className="mt-7">
                <span className="inline-block rounded-full bg-gold-2 px-4 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-tinte">
                  Vereinsspruch der KG Eefelkank
                </span>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
