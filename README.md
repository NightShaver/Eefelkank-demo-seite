# KG Eefelkank e.V., Relaunch

Neuentwurf des Webauftritts der Karnevalsgesellschaft Eefelkank
Eschweiler-Hastenrath von 1938 e.V., inklusive des neuen
**Korporalschaften-Portals**.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 (Design Tokens in `src/app/globals.css`)
- Motion (`motion/react`) für Scroll- und Übergangsanimationen
- Radix UI (Dialog) für die Lightbox, Komponenten im Shadcn-Schema
- canvas-confetti für den Konfetti-Salut beim Öffnen der Seite
- Schriften: Fraunces (Display) und Inter (Text) über `next/font`, lokal
  ausgeliefert, keine Verbindung zu Google Fonts im Browser

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Seitenstruktur

Jeder Menüpunkt ist eine eigene Seite, wie in der alten Struktur des
Vereins. Die Startseite bleibt der Überblick und verweist in die Bereiche,
statt deren Inhalte zu wiederholen.

| Seite | Inhalt |
| --- | --- |
| `/` | Hero, Kurzvorstellung, Gruppen-Pinnwand, nächste drei Termine, Galerie, Verweis auf Vermietung und Sponsoren |
| `/verein` | Vorstellung, Zahlen, Vereinsspruch, Vorstand, Galerie |
| `/korporalschaften` | Übersicht aller acht Gruppen mit Filter |
| `/korporalschaften/[slug]` | Gruppenseite: Geschichte, Termine, Video, Bento-Galerie |
| `/veranstaltungen` | Sessionsprogramm mit Filter |
| `/veranstaltungen/[slug]` | Einzelner Termin mit Eckdaten und Hinweisen |
| `/vermietung` | Vereinsheim mieten, Ausstattung, Buchung |
| `/sponsoren` | Sponsorenwand |
| `/kontakt` | Kontaktkarten und Karte (Google Maps auf Klick) |
| `/impressum`, `/datenschutz` | Pflichtseiten (Platzhalter) |

Kontaktangaben stehen bewusst nur auf `/kontakt` und in der Fußzeile, nicht
auf jeder Seite.

## Gestaltung

Leitbild ist das gedruckte **Sessionsplakat**, nicht das Software-Dashboard.

| Element | Entscheidung |
| --- | --- |
| Grundfläche | Creme `#fbf5ea`, Papier statt Bildschirm |
| Vereinsfarben | Rot `#d5122a`, Ordensgold `#c8912c` / `#eabc51` |
| Abendsektion | Pflaume `#3d0f33` für Sessionsprogramm und Portal-Kopf |
| Gruppenfarben | jede Korporalschaft hat eine eigene Leitfarbe |
| Schrift | Fraunces (warme Display-Serife) + Inter |
| Dekor | Vereinswappen, Aufkleber, Luftschlangen, Luftballons, Zickzack-Kanten, Konfetti |

### Das Wappen

`public/bilder/wappen.png` ist der **Nachtwächter mit Hellebarde und
Laterne** aus dem offiziellen Vereinslogo, freigestellt aus `Header.png` der
Mediathek. Es steckt in Navigation, Fußzeile, Seitenköpfen, den
Sessionsporträts und im drehenden Siegel des Heros.

### Aufkleber auf der Leinwand

Die Gruppenübersicht ist als Pinnwand gebaut: Rautenmuster, Luftschlangen,
Luftballons und Konfetti im Hintergrund, darauf die Karten als Aufkleber mit
weißem Stanzrand, Schlagschatten, leichter Neigung und teils einem Streifen
Klebeband (`Aufkleber` in `components/korps`).

### Sechs Kartenformen

`KorpsCard` kennt `kante`, `bogen`, `rund`, `polaroid`, `welle` und `band`.
Im Raster wechseln fünf Formen samt Höhenversatz und Neigung durch, die
sechste (`band`, volle Breite) schließt die Liste ab. Ergebnis: eine
Pinnwand statt eines Rasters, ohne Löcher beim Filtern.

### Konfetti beim Öffnen

`KonfettiStart` feuert bei jedem Seitenaufruf: eine breite Ladung aus der
Mitte, zwei Kanonen von den Seiten, danach knapp eine Sekunde Rieseln über
die ganze Breite. Bei `prefers-reduced-motion` passiert nichts. Die
Bibliothek wird dynamisch nachgeladen.

### Video

Gruppen können optional ein Video zeigen:

- `video: { youtube, titel, vorschau }` rendert eine Einbettung mit
  Vorschaltbild. Vor dem Klick geht keine Anfrage an YouTube, der Hinweis
  darauf steht unter dem Video.
- `kopfVideo: "/…mp4"` ersetzt das Titelbild durch ein stummes Video, das
  beim Scrollen läuft und pausiert, sobald es aus dem Bild ist.

Ohne Eintrag erscheint schlicht kein Video. Aktuell hinterlegt sind zwei
öffentliche Aufnahmen der Eefelkank auf YouTube (Veedelszoch 2024,
Karnevalsumzug 2019).

## Inhalte und Datenquellen

Alle Inhalte liegen als typisierte Daten in `src/lib/data/`, kein Text im
JSX. Das ist die Andockstelle für ein späteres CMS.

| Datei | Inhalt | Stand |
| --- | --- | --- |
| `site.ts` | Vereinsdaten, Navigation, Vorstand, Kennzahlen, Sponsoren, Vereinsheim | eefelkank.de, vereinsheim.eefelkank.de, Vereinslogo |
| `events.ts` | Sessionsprogramm 2026/2027 inkl. Bild pro Termin | Termine 1:1 von eefelkank.de |
| `korporalschaften.ts` | die acht Gruppen | siehe unten |

Belegt aus dem Vereinslogo: Gründungsjahr **1938**, der vollständige Name
und der Vereinsspruch in Öcher Platt. Vom bisherigen Vereinsheim-Auftritt
übernommen: Anschrift Bohler Str. 96, 52249 Eschweiler, Ansprechpartner
Jürgen Engelhardt und Bernd Schneider, Telefon 0160 96711327.

### Was noch vom Verein kommen muss

- **Bildrechte der Vorstandsporträts:** Die drei Porträts wurden vom
  Auftraggeber beigesteuert und stammen aus Netzquellen. Vor dem Livegang
  ist zu klären, ob Verein oder Fotograf die Rechte halten.
- **Gruppen mit `verified: false`** (1., 2., 3. Korporalschaft, Damengarde,
  Kindertanz, Elferrat): Geschichte, Trainingszeiten und Ansprechpartner
  sind realistische Entwürfe, auf der Seite als „Entwurf“ gekennzeichnet.
- **Fotozuordnung:** Die Bilder in `public/bilder/` stammen aus der
  Mediathek von eefelkank.de. Welche Gruppe genau auf welchem Foto zu sehen
  ist, weiß nur der Verein; die Zuordnung erfolgt pro Zeile in
  `korporalschaften.ts`.
- **Porträtfoto Jürgen Engelhardt** fehlt, dort steht das Wappen.
- **Sponsorennamen** sind aus den Dateinamen abgeleitet und sollten
  gegengelesen werden; Links auf die Firmenseiten fehlen noch.
- **Impressum und Datenschutz** sind Platzhalter. Erfundene Adressdaten
  stehen dort nicht.
- **Kartenvorverkauf und Belegungskalender:** alle Buttons führen auf eine
  vorbereitete E-Mail; ein Ticketsystem oder der Belegungsplan des
  Vereinsheims lässt sich an derselben Stelle anbinden.

## Datenschutz

- Kein Tracking, keine Cookies, keine externen Requests beim Laden.
- **YouTube** wird erst nach Klick auf das Vorschaubild geladen.
- **Google Maps** auf `/kontakt` erst nach ausdrücklicher Zustimmung, mit
  Hinweis auf die Übertragung der IP-Adresse. Ohne Klick steht dort die
  Anschrift plus Link zu Google Maps.

## Schreibweise

Kein Gedankenstrich als Einschub. Statt `—` steht Komma, Punkt oder
Doppelpunkt. Das gilt für Texte, Daten und Kommentare.

## Struktur

```
src/
  app/                      eine Route pro Menüpunkt (siehe Tabelle oben)
  components/
    site/    Hero, Verein, Vorstand, Spruch, Programm, Galerie, Vermietung,
             Sponsoren, Kontakt, Karte, Video, Navigation, Fuß, Dekor
    korps/   Karte (sechs Formen), Raster, Bento-Galerie mit Lightbox
    ui/      Button (Shadcn-Schema)
  lib/data/  sämtliche Inhalte
public/
  bilder/            Fotos und Wappen aus der Vereinsmediathek
  bilder/vorstand/   Porträts
  bilder/vereinsheim/ Aufnahmen des Vereinsheims
  sponsoren/         Sponsorenlogos (farbig, wo vorhanden; weiße per `invert`)
```

## Veröffentlichen auf GitHub Pages

Die Seite wird als statischer Export ausgeliefert, es läuft kein Server.

```bash
npm run build:pages   # erzeugt out/
npm run vorschau      # out/ lokal ansehen
```

Einmalige Schritte:

1. Repository auf GitHub anlegen und den Ordner `eefelkank` hineinschieben.
2. Im Repository unter **Settings, Pages** bei **Source** den Punkt
   **GitHub Actions** wählen.
3. Auf `main` pushen. Der Workflow `.github/workflows/deploy.yml` baut den
   Export und veröffentlicht ihn.

Der Unterpfad wird nicht von Hand gesetzt: `actions/configure-pages` gibt ihn
aus, der Workflow reicht ihn als `NEXT_PUBLIC_BASE_PATH` an den Build weiter.
Ein Projekt-Repository landet damit unter `https://name.github.io/repo/`, eine
Benutzerseite unter `https://name.github.io/`.

Was für den Export nötig war:

- `output: "export"` und `trailingSlash: true` in `next.config.ts`, damit jede
  Route als `ordner/index.html` herauskommt. GitHub Pages kann keine
  Rewrites.
- `images.unoptimized`, weil GitHub Pages keinen Bildoptimierer hat. Die
  Dateien in `public` sind dafür auf sinnvolle Maße gebracht, rund 5 MB statt
  20 MB.
- `mitBasis()` aus `lib/utils` vor jeder Bildquelle: Links und eigene Skripte
  bekommen den Unterpfad von Next automatisch, Bilder mit `unoptimized` nicht.
- `scripts/export-nachbereiten.mjs`: legt die Vorablade-Dateien zusätzlich
  flach ab. Next schreibt sie in Ordner (`verein/__next.verein/__PAGE__.txt`),
  der Browser fragt sie mit Punkt getrennt an
  (`verein/__next.verein.__PAGE__.txt`). Ohne diesen Schritt liefe jede
  Vorabladung auf 404 und jeder Klick würde die ganze Seite neu laden.

Da der Export keinen Server hat, gibt es kein `npm run start` mehr. Zum
Ansehen dient `npm run vorschau`.

## Bekannte Fallstricke

- Die Papierstruktur liegt als gekacheltes Hintergrundbild auf dem Body.
  Als fixe Vollbildschicht mit `mix-blend-mode: multiply` zwang sie die
  ganze Seite in eine Compositing-Ebene: Beim Vergrößern des Fensters
  blieben so lange weiße Flächen stehen, bis Chrome alles neu gerastert
  hatte.
- `overflow-x: clip` statt `hidden` auf `html` und `body`, das erzeugt
  keinen eigenen Scroll-Container.
- **Bilder über der Falz** brauchen in Next 16 `loading="eager"`. Das frühere
  `priority` ist abgekündigt; `Photo` und `Wappen` haben dafür die Eigenschaft
  `eager`.
- **Feste `width`/`height` an `next/image`** nur mit den echten Maßen der
  Datei. Erfundene Werte melden im Dev-Modus ein verzerrtes Bild. Die
  Sponsorenlogos laufen deshalb über `fill` in einer Box mit `object-contain`.
- Die **LCP-Warnung** im Dev-Modus vergleicht pro Bildadresse. Steht dieselbe
  Datei zusätzlich weiter unten auf der Seite (lazy), meldet Next sie auch
  dann, wenn die Fassung über der Falz `eager` lädt. Betrifft nur den
  Dev-Modus, im Build erscheint nichts.

## Umgesetzte Details

- Alle Gruppen- und Terminseiten werden zur Buildzeit statisch erzeugt.
- `schema.org`-Daten für Organisation und alle Termine.
- Tastaturbedienung: Skip-Link, sichtbarer Fokusring, Lightbox mit
  Pfeiltasten und Escape, `aria`-Rollen an Filtern und Navigation.
- `prefers-reduced-motion` schaltet Animationen, Konfetti und den
  automatischen Bildwechsel der Galerie ab.
