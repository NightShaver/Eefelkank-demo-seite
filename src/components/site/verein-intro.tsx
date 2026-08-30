import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/data/site";
import { Reveal, WordReveal, Counter } from "@/components/site/motion-primitives";
import { Photo } from "@/components/site/photo";
import { RundSticker, Wappen } from "@/components/site/ornament";

/**
 * Vorstellung des Vereins.
 *
 * `kompakt` ist die Fassung für die Startseite: Text, Zahlen, Collage und
 * ein Verweis auf die Vereinsseite. Ohne das Flag entfällt der Verweis,
 * weil man dann schon dort ist.
 */
export function VereinIntro({ kompakt = false }: { kompakt?: boolean }) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-rot">Der Verein · seit 1938</p>
            </Reveal>
            <WordReveal
              as="h2"
              text="Ein Dorf, das seit Generationen zusammen feiert."
              className="mt-5 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[0.98] text-tinte"
            />
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-tinte-2">
                Die Eefelkank ist in Hastenrath tief verwurzelt. Gegründet, um
                Freude und Zusammenhalt in der Gemeinde zu fördern, ist aus einer
                Handvoll Jecken eine bunte Truppe geworden, die Tradition und
                Spaß miteinander vereint, von den ersten schüchternen
                Auftritten bis zu Sitzungen vor vollem Haus.
              </p>
            </Reveal>

            {kompakt && (
              <Reveal delay={0.2}>
                <Link
                  href="/verein"
                  className="group mt-8 inline-flex items-center gap-2 font-semibold text-rot"
                >
                  <span className="link-wisch">Mehr über den Verein</span>
                  <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            )}

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8">
              {site.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.07}>
                  <div className="border-t-2 border-tinte/10 pt-4">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-[clamp(2rem,3.6vw,3rem)] font-black leading-none text-rot">
                        <Counter to={stat.value} suffix={stat.suffix} />
                      </span>
                      <span className="mt-2.5 block text-sm font-semibold text-tinte">
                        {stat.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-tinte-3">
                        {stat.hint}
                      </span>
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          {/* Fotocollage: drei Formate, damit die Seite nicht in Kacheln erstarrt */}
          <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
            <RundSticker
              oben="Alaaf!"
              unten="Hastenrath"
              ton="rot"
              rotate={-14}
              className="absolute -left-4 top-40 z-10 hidden size-24 sm:grid lg:-left-10 lg:size-28"
            />

            <Reveal className="col-span-2">
              <figure className="overflow-hidden rounded-[1.75rem] border-[6px] border-creme-2 bg-creme-2">
                <Photo
                  src="/bilder/saal-publikum.jpg"
                  alt="Voll besetzte Dorfgemeinschaftshalle während einer Sitzung"
                  eager
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="aspect-[16/10] w-full rounded-[1.25rem]"
                />
              </figure>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="overflow-hidden rounded-[1.5rem] border-[6px] border-creme-2 bg-creme-2">
                <Photo
                  src="/bilder/garde-gruppe.jpg"
                  alt="Nachwuchsgarde in Rot und Weiß auf der Bühne"
                  sizes="(max-width: 1024px) 50vw, 26vw"
                  className="aspect-[4/5] w-full rounded-[1rem]"
                />
              </figure>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex h-full flex-col gap-4 sm:gap-5">
                <figure className="overflow-hidden rounded-[1.5rem] border-[6px] border-creme-2 bg-creme-2">
                  <Photo
                    src="/bilder/elferrat-orden.jpg"
                    alt="Mitglieder des Elferrats mit Sessionsorden"
                    sizes="(max-width: 1024px) 50vw, 26vw"
                    className="aspect-square w-full rounded-[1rem]"
                  />
                </figure>
                <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-[1.5rem] bg-pflaume p-5 text-creme">
                  <Wappen
                    size={140}
                    className="absolute -bottom-4 -right-5 w-28 opacity-20"
                  />
                  <p className="relative font-display text-2xl font-bold leading-tight">
                    „{site.greeting}“
                  </p>
                  <p className="relative mt-2 text-sm text-creme/75">
                    Unser Gruß, zugleich die kürzeste Zusammenfassung des Vereins.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
