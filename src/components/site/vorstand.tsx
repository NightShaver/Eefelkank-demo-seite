import { site } from "@/lib/data/site";
import { Reveal } from "@/components/site/motion-primitives";
import { Photo } from "@/components/site/photo";
import { Luftschlangen, Sticker, Wappen } from "@/components/site/ornament";

const TOENE = [
  { bg: "var(--color-rot)", fg: "#fbf5ea" },
  { bg: "var(--color-pflaume)", fg: "#fbf5ea" },
  { bg: "var(--color-gold)", fg: "#1c1016" },
  { bg: "var(--color-jeck-gruen)", fg: "#fbf5ea" },
];

const KIPPEN = [-2.5, 1.8, -1.4, 2.2];

export function Vorstand() {
  const ohneFoto = site.vorstand.filter((p) => !p.foto).length;

  return (
    <section id="vorstand" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-rot">Der Vorstand</p>
              <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-tight text-tinte">
                Die Gesichter hinter der Session
              </h2>
            </div>
            <p className="max-w-sm text-sm text-tinte-3">
              Vier Ämter, ein Ziel: dass in Hastenrath jedes Jahr die Halle voll
              wird.
            </p>
          </div>
        </Reveal>

        {/* Luftschlangen laufen über die volle Breite quer über die Porträts */}
        <div className="relative mt-10 h-16 sm:h-24">
          <Luftschlangen className="inset-y-0 h-full w-full" />
        </div>

        <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
          {site.vorstand.map((person, i) => (
            <Reveal as="li" key={person.name} delay={i * 0.08}>
              <Portrait
                name={person.name}
                role={person.role}
                initialen={person.initialen}
                foto={person.foto}
                index={i}
              />
            </Reveal>
          ))}
        </ul>

        {ohneFoto > 0 && (
          <Reveal delay={0.2}>
            <p className="mt-8 text-xs text-tinte-3">
              {ohneFoto === 1
                ? "Ein Porträtfoto fehlt noch, bis dahin steht dort das Wappen."
                : `${ohneFoto} Porträtfotos fehlen noch, bis dahin steht dort das Wappen.`}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/**
 * Sessionsporträt: Rundbogen wie ein gerahmtes Bild im Vereinsheim,
 * darunter Name und Amt. Liegt ein Foto vor, füllt es den Bogen; sonst
 * übernimmt das Wappen mit den Initialen, bewusst als Gestaltung, nicht
 * als graue Lücke.
 */
function Portrait({
  name,
  role,
  initialen,
  foto,
  index,
}: {
  name: string;
  role: string;
  initialen: string;
  foto?: string;
  index: number;
}) {
  const ton = TOENE[index % TOENE.length];

  return (
    <figure
      className="group flex h-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
      style={{ rotate: `${KIPPEN[index % KIPPEN.length]}deg` }}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-2xl border-[5px] border-creme-2"
        style={{ backgroundColor: ton.bg, color: ton.fg }}
      >
        {foto ? (
          <Photo
            src={foto}
            alt={`${name}, ${role} der KG Eefelkank`}
            sizes="(max-width: 640px) 45vw, 22vw"
            className="size-full"
            imgClassName="transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
        ) : (
          <>
            <div aria-hidden className="muster-punkte absolute inset-0 opacity-25" />
            <Wappen
              size={220}
              className="absolute inset-x-0 bottom-0 mx-auto w-[78%] translate-y-[6%] drop-shadow-[0_10px_20px_rgba(28,16,22,0.35)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <span
              className="absolute left-1/2 top-6 -translate-x-1/2 font-display text-3xl font-black opacity-45 sm:text-4xl"
              aria-hidden
            >
              {initialen}
            </span>
          </>
        )}
      </div>

      <figcaption className="mt-4 text-center">
        <span className="block font-display text-lg font-bold leading-tight text-tinte sm:text-xl">
          {name}
        </span>
        <span className="mt-1.5 inline-block">
          <Sticker
            ton="creme"
            rotate={index % 2 === 0 ? -3 : 3}
            className="px-3 py-1 text-[0.625rem] uppercase tracking-[0.12em]"
          >
            {role}
          </Sticker>
        </span>
      </figcaption>
    </figure>
  );
}
