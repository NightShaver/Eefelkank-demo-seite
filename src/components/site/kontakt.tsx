import { Mail, MapPin, Users } from "lucide-react";
import { site } from "@/lib/data/site";

/** Kontaktkarten. Stehen nur auf der Kontaktseite und in der Fußzeile. */
export function Kontakt() {
  return (
    <section className="bg-creme py-16 sm:py-20">
      <div className="mx-auto max-w-[84rem] px-4 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          <Kachel
            icon={<MapPin className="size-5" aria-hidden />}
            label="Wo wir feiern"
            wert={site.hall}
            hinweis={site.town}
          />
          <Kachel
            icon={<Mail className="size-5" aria-hidden />}
            label="Schreib uns"
            wert="info@eefelkank.de"
            href="mailto:info@eefelkank.de"
            hinweis="Antwort meist binnen weniger Tage"
          />
          <Kachel
            icon={<Users className="size-5" aria-hidden />}
            label="Vorstand"
            wert={site.vorstand[0].name}
            hinweis={site.vorstand[0].role}
          />
        </div>

      </div>
    </section>
  );
}

function Kachel({
  icon,
  label,
  wert,
  hinweis,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  wert: string;
  hinweis?: string;
  href?: string;
}) {
  const inhalt = (
    <div className="h-full rounded-2xl bg-creme-2 p-6 transition-colors duration-500 hover:bg-creme-3">
      <span className="text-rot">{icon}</span>
      <p className="mt-4 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-tinte-3">
        {label}
      </p>
      <p className="mt-1.5 font-display text-xl font-bold text-tinte">{wert}</p>
      {hinweis && <p className="mt-1 text-sm text-tinte-3">{hinweis}</p>}
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {inhalt}
    </a>
  ) : (
    inhalt
  );
}
