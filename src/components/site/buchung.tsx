"use client";

import * as React from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mail,
  Phone,
} from "lucide-react";
import { belegungAm, type Belegungsstatus } from "@/lib/data/belegung";
import { vereinsheim } from "@/lib/data/site";
import { Reveal, WordReveal } from "@/components/site/motion-primitives";
import { Button } from "@/components/ui/button";
import { Sticker } from "@/components/site/ornament";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ Hilfen */

const WOCHENTAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const MONAT_FORMAT = new Intl.DateTimeFormat("de-DE", {
  month: "long",
  year: "numeric",
});

const TAG_FORMAT = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
});

/** Tag als JJJJ-MM-TT, ohne Zeitzonen-Verschiebung. */
function zuIso(d: Date) {
  const monat = String(d.getMonth() + 1).padStart(2, "0");
  const tag = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${monat}-${tag}`;
}

function monatsAnfang(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function monatVerschieben(d: Date, schritte: number) {
  return new Date(d.getFullYear(), d.getMonth() + schritte, 1);
}

/**
 * Alle Zellen eines Monats, beginnend am Montag. Führende Leerzellen sorgen
 * dafür, dass der Erste unter dem richtigen Wochentag steht.
 */
function monatsRaster(monat: Date) {
  const erster = monatsAnfang(monat);
  const tageImMonat = new Date(
    monat.getFullYear(),
    monat.getMonth() + 1,
    0,
  ).getDate();

  // getDay(): 0 = Sonntag. Wir wollen Montag = 0.
  const versatz = (erster.getDay() + 6) % 7;

  const zellen: (Date | null)[] = Array.from({ length: versatz }, () => null);
  for (let tag = 1; tag <= tageImMonat; tag++) {
    zellen.push(new Date(monat.getFullYear(), monat.getMonth(), tag));
  }
  return zellen;
}

type Tagesstatus = Belegungsstatus | "frei" | "vergangen";

/* ------------------------------------------------------------- Hauptteil */

/**
 * Buchungsbereich für das Vereinsheim.
 *
 * Zwei Teile: ein Belegungskalender wie auf dem bisherigen Auftritt und ein
 * Anfrageformular. Beides läuft rein im Browser, es wird nichts gespeichert
 * und nichts an einen Server geschickt. Abgeschickt wird die Anfrage über
 * das E-Mail-Programm, alternativ lässt sie sich kopieren.
 */
export function Buchung() {
  const heute = React.useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);

  const [monat, setMonat] = React.useState(() => monatsAnfang(heute));
  const [gewaehlt, setGewaehlt] = React.useState<string | null>(null);

  /* Zeitraum: vom laufenden Monat bis 18 Monate voraus */
  const erlaubterAnfang = monatsAnfang(heute);
  const erlaubtesEnde = monatVerschieben(erlaubterAnfang, 17);
  const kannZurueck = monat > erlaubterAnfang;
  const kannVor = monat < erlaubtesEnde;

  const statusVon = React.useCallback(
    (tag: Date): Tagesstatus => {
      if (tag < heute) return "vergangen";
      return belegungAm(zuIso(tag))?.status ?? "frei";
    },
    [heute],
  );

  const gewaehlterTag = gewaehlt ? new Date(`${gewaehlt}T12:00:00`) : null;
  const gewaehlterStatus = gewaehlt
    ? (belegungAm(gewaehlt)?.status ?? "frei")
    : null;

  return (
    <section
      id="buchung"
      className="relative scroll-mt-28 overflow-hidden bg-creme-2 py-20 sm:py-24"
    >
      <div aria-hidden className="muster-punkte absolute inset-0 text-tinte/[0.05]" />

      <div className="relative mx-auto max-w-[84rem] px-4 sm:px-6">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-rot">Belegung und Anfrage</p>
          </Reveal>
          <WordReveal
            as="h2"
            text="Wann ist noch frei?"
            className="mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[0.98] text-tinte"
          />
          <Reveal delay={0.12}>
            <p className="mt-6 text-lg leading-relaxed text-tinte-2">
              Such dir im Kalender einen freien Tag aus und schick uns die
              Anfrage. Wir melden uns mit einer Zusage und dem Mietvertrag
              zurück. Verbindlich wird die Buchung erst mit unserer Antwort.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <Reveal>
            <Kalender
              monat={monat}
              heute={heute}
              gewaehlt={gewaehlt}
              statusVon={statusVon}
              kannZurueck={kannZurueck}
              kannVor={kannVor}
              onMonat={setMonat}
              onTag={setGewaehlt}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Formular
              tag={gewaehlterTag}
              status={gewaehlterStatus}
              onZuruecksetzen={() => setGewaehlt(null)}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Kalender */

function Kalender({
  monat,
  heute,
  gewaehlt,
  statusVon,
  kannZurueck,
  kannVor,
  onMonat,
  onTag,
}: {
  monat: Date;
  heute: Date;
  gewaehlt: string | null;
  statusVon: (tag: Date) => Tagesstatus;
  kannZurueck: boolean;
  kannVor: boolean;
  onMonat: (d: Date) => void;
  onTag: (iso: string) => void;
}) {
  const zellen = monatsRaster(monat);

  return (
    <div className="rounded-[1.5rem] bg-creme p-5 shadow-[0_20px_45px_-30px_rgba(28,16,22,0.5)] sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-xl font-bold text-tinte sm:text-2xl">
          {MONAT_FORMAT.format(monat)}
        </h3>

        <div className="flex gap-2">
          <MonatsKnopf
            label="Vorheriger Monat"
            disabled={!kannZurueck}
            onClick={() => onMonat(monatVerschieben(monat, -1))}
          >
            <ChevronLeft className="size-5" />
          </MonatsKnopf>
          <MonatsKnopf
            label="Nächster Monat"
            disabled={!kannVor}
            onClick={() => onMonat(monatVerschieben(monat, 1))}
          >
            <ChevronRight className="size-5" />
          </MonatsKnopf>
        </div>
      </div>

      <table className="mt-6 w-full border-separate border-spacing-1">
        <caption className="sr-only">
          Belegung des Vereinsheims im {MONAT_FORMAT.format(monat)}
        </caption>
        <thead>
          <tr>
            {WOCHENTAGE.map((tag) => (
              <th
                key={tag}
                scope="col"
                className="pb-2 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-tinte-3"
              >
                {tag}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(zellen.length / 7) }, (_, woche) => (
            <tr key={woche}>
              {zellen.slice(woche * 7, woche * 7 + 7).map((tag, i) => (
                <td key={i} className="p-0">
                  {tag ? (
                    <Tag
                      tag={tag}
                      status={statusVon(tag)}
                      istHeute={zuIso(tag) === zuIso(heute)}
                      istGewaehlt={zuIso(tag) === gewaehlt}
                      onClick={() => onTag(zuIso(tag))}
                    />
                  ) : (
                    <span className="block" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t-2 border-tinte/10 pt-5 text-xs text-tinte-2">
        <Legende klasse="bg-creme-2 ring-2 ring-inset ring-tinte/15">Frei</Legende>
        <Legende klasse="bg-gold-2">Reserviert</Legende>
        <Legende klasse="bg-rot">Gebucht</Legende>
      </ul>

      <p className="mt-4 text-xs text-tinte-3">
        Beispielbelegung für die Demo. Im Betrieb kommen die Tage aus dem
        Kalender des Vereins.
      </p>
    </div>
  );
}

function MonatsKnopf({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full border-2 border-tinte/15 text-tinte transition-colors duration-300 hover:border-rot hover:bg-rot hover:text-creme disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function Tag({
  tag,
  status,
  istHeute,
  istGewaehlt,
  onClick,
}: {
  tag: Date;
  status: Tagesstatus;
  istHeute: boolean;
  istGewaehlt: boolean;
  onClick: () => void;
}) {
  const eintrag = belegungAm(zuIso(tag));
  const gesperrt = status === "gebucht" || status === "vergangen";

  const beschriftung = [
    TAG_FORMAT.format(tag),
    status === "frei" ? "frei" : undefined,
    status === "reserviert" ? "reserviert" : undefined,
    status === "gebucht" ? "gebucht" : undefined,
    status === "vergangen" ? "vergangen" : undefined,
    eintrag?.anlass,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={gesperrt}
      aria-label={beschriftung}
      aria-pressed={istGewaehlt}
      title={eintrag?.anlass}
      className={cn(
        "relative grid aspect-square w-full place-items-center rounded-xl text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        status === "frei" &&
          "bg-creme-2 text-tinte ring-2 ring-inset ring-tinte/10 hover:-translate-y-0.5 hover:ring-rot",
        status === "reserviert" &&
          "bg-gold-2 text-tinte hover:-translate-y-0.5 hover:ring-2 hover:ring-inset hover:ring-tinte/30",
        status === "gebucht" && "bg-rot text-creme opacity-90",
        status === "vergangen" && "text-tinte-3/40",
        gesperrt && "pointer-events-none",
        istGewaehlt && "ring-[3px] ring-tinte ring-offset-1 ring-offset-creme",
      )}
    >
      {tag.getDate()}
      {istHeute && (
        <span
          aria-hidden
          className="absolute bottom-1 size-1 rounded-full bg-current opacity-70"
        />
      )}
    </button>
  );
}

function Legende({
  children,
  klasse,
}: {
  children: React.ReactNode;
  klasse: string;
}) {
  return (
    <li className="flex items-center gap-2">
      <span aria-hidden className={cn("size-4 rounded-md", klasse)} />
      {children}
    </li>
  );
}

/* -------------------------------------------------------------- Formular */

type Felder = {
  anlass: string;
  gaeste: string;
  name: string;
  mail: string;
  telefon: string;
  nachricht: string;
};

const LEER: Felder = {
  anlass: "",
  gaeste: "",
  name: "",
  mail: "",
  telefon: "",
  nachricht: "",
};

function Formular({
  tag,
  status,
  onZuruecksetzen,
}: {
  tag: Date | null;
  status: Belegungsstatus | "frei" | null;
  onZuruecksetzen: () => void;
}) {
  const [felder, setFelder] = React.useState<Felder>(LEER);
  const [fehler, setFehler] = React.useState<Partial<Record<keyof Felder | "tag", string>>>({});
  const [gesendet, setGesendet] = React.useState(false);
  const [kopiert, setKopiert] = React.useState(false);

  const setzen = (feld: keyof Felder) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFelder((f) => ({ ...f, [feld]: e.target.value }));
    setFehler((f) => ({ ...f, [feld]: undefined }));
  };

  const pruefen = () => {
    const neu: Partial<Record<keyof Felder | "tag", string>> = {};
    if (!tag) neu.tag = "Bitte im Kalender einen Tag auswählen.";
    if (!felder.anlass) neu.anlass = "Bitte einen Anlass wählen.";
    if (!felder.name.trim()) neu.name = "Bitte deinen Namen angeben.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(felder.mail))
      neu.mail = "Bitte eine gültige E-Mail-Adresse angeben.";
    const zahl = Number(felder.gaeste);
    if (!felder.gaeste || Number.isNaN(zahl) || zahl < 1 || zahl > 300)
      neu.gaeste = "Bitte eine Zahl zwischen 1 und 300 angeben.";
    setFehler(neu);
    return Object.keys(neu).length === 0;
  };

  const anfrageText = () =>
    [
      `Wunschtermin: ${tag ? TAG_FORMAT.format(tag) : "offen"}`,
      status === "reserviert"
        ? "Hinweis: Der Tag ist vorgemerkt, Anfrage für die Warteliste."
        : null,
      `Anlass: ${felder.anlass}`,
      `Gäste: ${felder.gaeste}`,
      "",
      `Name: ${felder.name}`,
      `E-Mail: ${felder.mail}`,
      felder.telefon ? `Telefon: ${felder.telefon}` : null,
      felder.nachricht ? `\nNachricht:\n${felder.nachricht}` : null,
    ]
      .filter((z) => z !== null)
      .join("\n");

  const absenden = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pruefen()) return;

    const betreff = `Anfrage Vereinsheim: ${tag ? TAG_FORMAT.format(tag) : ""}`;
    window.location.href = `mailto:info@eefelkank.de?subject=${encodeURIComponent(
      betreff,
    )}&body=${encodeURIComponent(anfrageText())}`;
    setGesendet(true);
  };

  const kopieren = async () => {
    try {
      await navigator.clipboard.writeText(anfrageText());
      setKopiert(true);
      window.setTimeout(() => setKopiert(false), 2500);
    } catch {
      /* Zwischenablage gesperrt, dann bleibt der Mail-Knopf */
    }
  };

  if (gesendet) {
    return (
      <div className="flex h-full flex-col justify-center rounded-[1.5rem] bg-rot p-7 text-creme sm:p-9">
        <span className="grid size-12 place-items-center rounded-full bg-creme text-rot">
          <Check className="size-6" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
          Anfrage steht bereit
        </h3>
        <p className="mt-3 leading-relaxed text-creme/90">
          Dein E-Mail-Programm sollte sich mit der fertigen Anfrage geöffnet
          haben. Falls nicht, kopier den Text und schick ihn an{" "}
          <span className="font-semibold">info@eefelkank.de</span> oder ruf
          kurz an.
        </p>

        <pre className="mt-5 max-h-48 overflow-auto whitespace-pre-wrap rounded-2xl bg-rot-3/40 p-4 text-sm">
          {anfrageText()}
        </pre>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" variant="gold" onClick={kopieren}>
            {kopiert ? <Check aria-hidden /> : <Copy aria-hidden />}
            {kopiert ? "Kopiert" : "Text kopieren"}
          </Button>
          <Button asChild variant="outlineHell">
            <a href={`tel:${vereinsheim.telefonLink}`}>
              <Phone aria-hidden />
              {vereinsheim.telefon}
            </a>
          </Button>
          <Button
            type="button"
            variant="outlineHell"
            onClick={() => {
              setGesendet(false);
              setFelder(LEER);
              onZuruecksetzen();
            }}
          >
            Neue Anfrage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={absenden}
      noValidate
      className="relative h-full rounded-[1.5rem] bg-creme p-5 shadow-[0_20px_45px_-30px_rgba(28,16,22,0.5)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-rot">Anfrage</p>
          <p className="mt-2 font-display text-xl font-bold text-tinte">
            {tag ? TAG_FORMAT.format(tag) : "Noch kein Tag gewählt"}
          </p>
          {status === "reserviert" && (
            <p className="mt-1 text-sm text-tinte-2">
              Dieser Tag ist vorgemerkt. Die Anfrage läuft auf die Warteliste.
            </p>
          )}
          {fehler.tag && (
            <p className="mt-1 text-sm font-semibold text-rot">{fehler.tag}</p>
          )}
        </div>
        <Sticker ton="gold" rotate={6} className="hidden shrink-0 sm:inline-flex">
          Demo
        </Sticker>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Feld label="Anlass" fehler={fehler.anlass}>
          <select
            value={felder.anlass}
            onChange={setzen("anlass")}
            className="w-full rounded-xl border-2 border-tinte/15 bg-creme-2 px-4 py-3 text-sm text-tinte outline-none transition-colors focus:border-rot"
          >
            <option value="">Bitte wählen</option>
            {vereinsheim.anlaesse.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
            <option value="Anderer Anlass">Anderer Anlass</option>
          </select>
        </Feld>

        <Feld label="Gäste" fehler={fehler.gaeste}>
          <input
            type="number"
            min={1}
            max={300}
            inputMode="numeric"
            value={felder.gaeste}
            onChange={setzen("gaeste")}
            placeholder="z. B. 60"
            className="w-full rounded-xl border-2 border-tinte/15 bg-creme-2 px-4 py-3 text-sm text-tinte outline-none transition-colors placeholder:text-tinte-3/70 focus:border-rot"
          />
        </Feld>

        <Feld label="Name" fehler={fehler.name}>
          <input
            type="text"
            autoComplete="name"
            value={felder.name}
            onChange={setzen("name")}
            className="w-full rounded-xl border-2 border-tinte/15 bg-creme-2 px-4 py-3 text-sm text-tinte outline-none transition-colors focus:border-rot"
          />
        </Feld>

        <Feld label="E-Mail" fehler={fehler.mail}>
          <input
            type="email"
            autoComplete="email"
            value={felder.mail}
            onChange={setzen("mail")}
            className="w-full rounded-xl border-2 border-tinte/15 bg-creme-2 px-4 py-3 text-sm text-tinte outline-none transition-colors focus:border-rot"
          />
        </Feld>

        <Feld label="Telefon (freiwillig)" className="sm:col-span-2">
          <input
            type="tel"
            autoComplete="tel"
            value={felder.telefon}
            onChange={setzen("telefon")}
            className="w-full rounded-xl border-2 border-tinte/15 bg-creme-2 px-4 py-3 text-sm text-tinte outline-none transition-colors focus:border-rot"
          />
        </Feld>

        <Feld label="Nachricht (freiwillig)" className="sm:col-span-2">
          <textarea
            rows={3}
            value={felder.nachricht}
            onChange={setzen("nachricht")}
            placeholder="Uhrzeit, Aufbau am Vortag, Fragen zur Küche …"
            className="w-full resize-y rounded-xl border-2 border-tinte/15 bg-creme-2 px-4 py-3 text-sm text-tinte outline-none transition-colors placeholder:text-tinte-3/70 focus:border-rot"
          />
        </Feld>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg">
          <Mail aria-hidden />
          Anfrage senden
          <ArrowRight aria-hidden />
        </Button>
        <Button type="button" variant="outline" onClick={kopieren}>
          {kopiert ? <Check aria-hidden /> : <Copy aria-hidden />}
          {kopiert ? "Kopiert" : "Text kopieren"}
        </Button>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-tinte-3">
        Die Anfrage wird nicht gespeichert und nirgends hochgeladen. Der Knopf
        öffnet dein E-Mail-Programm mit dem fertigen Text. Verbindlich wird
        eine Buchung erst mit unserer Rückmeldung und dem Mietvertrag.
      </p>
    </form>
  );
}

function Feld({
  label,
  children,
  fehler,
  className,
}: {
  label: string;
  children: React.ReactNode;
  fehler?: string;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-tinte-3">
        {label}
      </span>
      {children}
      {fehler && (
        <span className="mt-1.5 block text-sm font-semibold text-rot">
          {fehler}
        </span>
      )}
    </label>
  );
}

