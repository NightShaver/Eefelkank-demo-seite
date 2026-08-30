import Link from "next/link";
import {
  ArrowRight,
  CakeSlice,
  CalendarCheck,
  MapPin,
  Phone,
  Utensils,
  Users,
  Sparkles,
} from "lucide-react";
import { vereinsheim } from "@/lib/data/site";
import { Reveal, WordReveal } from "@/components/site/motion-primitives";
import { Photo } from "@/components/site/photo";
import { Button } from "@/components/ui/button";
import { Luftballons, Sticker, Wappen } from "@/components/site/ornament";

const ausstattung = [
  {
    icon: Users,
    titel: "Saal mit Bestuhlung",
    text: "Lange Tafel, runde Tische oder Reihen: Der Raum lässt sich frei stellen.",
  },
  {
    icon: Utensils,
    titel: "Küche und Theke",
    text: "Voll ausgestattete Küche, eigene Theke, Caterer nach Wahl.",
  },
  {
    icon: Sparkles,
    titel: "Platz für Deko",
    text: "Weiße Hussen, Blumen, Ballons: Der Raum nimmt jede Farbe an.",
  },
  {
    icon: CalendarCheck,
    titel: "Termin sichern",
    text: "Belegung erfragen, Mietvertrag unterschreiben, fertig.",
  },
];

/**
 * Vermietung des Vereinsheims.
 *
 * Bewusst nicht nur als Karnevalsort erzählt: Der Raum wird das ganze Jahr
 * für Geburtstage, Kommunion, Hochzeiten und Feiern im Ort gemietet. Die
 * Bilder stammen aus dem bisherigen Auftritt vereinsheim.eefelkank.de.
 */
export function VereinsheimMieten() {
  return (
    <>
      {/* Der Raum */}
      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <div className="relative">
                <figure className="overflow-hidden rounded-[1.75rem] border-[6px] border-creme-2 bg-creme-2">
                  <Photo
                    src="/bilder/vereinsheim/saal.jpg"
                    alt="Der Saal des Vereinsheims, festlich eingedeckt für eine Feier"
                    eager
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="aspect-[4/3] w-full rounded-[1.25rem]"
                  />
                </figure>

                <figure className="absolute -bottom-8 -right-3 w-36 overflow-hidden rounded-2xl border-[5px] border-creme bg-creme shadow-[0_20px_50px_-26px_rgba(28,16,22,0.8)] sm:-right-6 sm:w-48">
                  <Photo
                    src="/bilder/vereinsheim/aussen.jpg"
                    alt="Das Vereinsheim von außen"
                    sizes="200px"
                    className="aspect-[4/3] w-full rounded-xl"
                  />
                </figure>
              </div>
            </Reveal>

            <div className="mt-10 lg:mt-0">
              <Reveal>
                <p className="eyebrow text-rot">Der Raum</p>
              </Reveal>
              <WordReveal
                as="h2"
                text="Nicht nur für Karneval."
                className="mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[0.98] text-tinte"
              />
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-tinte-2">
                  Das Vereinsheim ist das ganze Jahr über gebucht: runde
                  Geburtstage, Kommunion, Hochzeiten, Firmenfeiern und ruhige
                  Anlässe wie eine Trauerfeier. Wer keine eigenen Räume hat,
                  findet hier einen Saal, der sich einrichten lässt, wie man
                  ihn braucht.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {vereinsheim.anlaesse.map((anlass, i) => (
                    <li key={anlass}>
                      <span
                        className="inline-flex items-center rounded-full border-2 border-tinte/10 bg-creme-2 px-4 py-2 text-sm font-medium text-tinte-2"
                        style={{ rotate: `${i % 2 === 0 ? -1.5 : 1.5}deg` }}
                      >
                        {anlass}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="mt-8 flex items-start gap-2.5 text-sm text-tinte-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-rot" aria-hidden />
                  <span>
                    {vereinsheim.strasse}, {vereinsheim.plz} {vereinsheim.ort}
                  </span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Ausstattung */}
      <section className="bg-creme-2 py-20 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <p className="eyebrow text-rot">Ausstattung</p>
              </Reveal>
              <WordReveal
                as="h2"
                text="Alles da, was eine Feier braucht."
                className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1] text-tinte"
              />

              <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                {ausstattung.map((f, i) => (
                  <Reveal as="li" key={f.titel} delay={0.06 * i}>
                    <div className="h-full rounded-2xl bg-creme p-5">
                      <f.icon className="size-5 text-rot" aria-hidden />
                      <h3 className="mt-4 text-sm font-bold text-tinte">
                        {f.titel}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-tinte-3">
                        {f.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <figure className="col-span-2 overflow-hidden rounded-[1.5rem] border-[5px] border-creme bg-creme">
                  <Photo
                    src="/bilder/vereinsheim/tafel.jpg"
                    alt="Lange Tafel im Vereinsheim, festlich eingedeckt"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="aspect-[16/9] w-full rounded-[1.1rem]"
                  />
                </figure>
                <figure className="overflow-hidden rounded-[1.25rem] border-[5px] border-creme bg-creme">
                  <Photo
                    src="/bilder/vereinsheim/kueche.jpg"
                    alt="Die Küche des Vereinsheims"
                    sizes="(max-width: 1024px) 45vw, 20vw"
                    className="aspect-[16/10] w-full rounded-lg"
                  />
                </figure>
                <figure className="overflow-hidden rounded-[1.25rem] border-[5px] border-creme bg-creme">
                  <Photo
                    src="/bilder/vereinsheim/tischdeko.jpg"
                    alt="Tischdekoration mit Blumen und Kerzen"
                    sizes="(max-width: 1024px) 45vw, 20vw"
                    className="aspect-[16/10] w-full rounded-lg"
                  />
                </figure>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Buchung */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <Luftballons count={4} className="opacity-30" />

        <div className="relative mx-auto max-w-[84rem] px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-rot p-8 text-creme sm:p-12">
            <div aria-hidden className="muster-punkte absolute inset-0 opacity-20" />
            <Wappen
              size={420}
              className="pointer-events-none absolute -bottom-10 -right-8 hidden w-56 opacity-15 sm:block"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <p className="eyebrow text-gold-2">Buchung</p>
                <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1]">
                  Termin frei? Kurz anrufen, wir schauen nach.
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed text-creme/90">
                  Die Vermietung läuft über zwei feste Ansprechpartner. Sag uns
                  Wunschtermin, Anlass und ungefähre Gästezahl, dann klären wir
                  Belegung und Mietvertrag.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" variant="gold">
                    <a href={`tel:${vereinsheim.telefonLink}`}>
                      <Phone aria-hidden />
                      {vereinsheim.telefon}
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outlineHell">
                    <a href="mailto:info@eefelkank.de?subject=Anfrage%20Vereinsheim">
                      Anfrage per Mail
                      <ArrowRight aria-hidden />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl bg-creme p-6 text-tinte">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-tinte-3">
                  Ansprechpartner
                </p>
                <ul className="mt-4 space-y-3">
                  {vereinsheim.ansprechpartner.map((name) => (
                    <li
                      key={name}
                      className="flex items-center gap-3 border-b-2 border-tinte/10 pb-3 last:border-0 last:pb-0"
                    >
                      <CakeSlice className="size-4 shrink-0 text-rot" aria-hidden />
                      <span className="font-display text-lg font-bold">{name}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm leading-relaxed text-tinte-3">
                  {vereinsheim.strasse}
                  <br />
                  {vereinsheim.plz} {vereinsheim.ort}
                </p>

                <div className="mt-5">
                  <Sticker ton="gold" rotate={-4}>
                    Förderkreis Vereinsheim
                  </Sticker>
                  <p className="mt-3 text-sm leading-relaxed text-tinte-3">
                    Wer den Erhalt unterstützen möchte, kann dem Förderkreis
                    beitreten. Details gibt es auf Anfrage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Reveal delay={0.1}>
            <p className="mt-8 text-center text-sm text-tinte-3">
              Fragen zur Halle bei großen Sitzungen?{" "}
              <Link href="/veranstaltungen" className="font-semibold text-rot">
                <span className="link-wisch">Zum Sessionsprogramm</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
