/**
 * Holt die Inhalte aus dem CMS und legt sie als Dateien im Projekt ab.
 *
 * Läuft vor jedem Bau. Danach ist die Seite vollständig eigenständig: alle
 * Texte liegen als JSON unter src/lib/data/generated, alle Bilder als Datei
 * unter public/bilder/cms. Der fertige Auftritt braucht das CMS nicht mehr -
 * er lädt kein Bild und keinen Text von dort nach.
 *
 * Das ist Absicht. Der Auftritt liegt als statischer Export auf GitHub Pages
 * und soll auch dann stehen, wenn der CMS-Server aus ist.
 *
 * Aufruf:
 *   npm run cms:holen
 *
 * Ohne CMS_API_KEY bricht das Skript nicht ab, sondern lässt die vorhandenen
 * Dateien stehen. So lässt sich das Projekt auch ohne Zugangsdaten bauen,
 * etwa für einen schnellen Test am Layout.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..");

/** .env.local einlesen, ohne eine zusätzliche Abhängigkeit dafür zu brauchen. */
function umgebungLaden() {
  const datei = join(wurzel, ".env.local");
  if (!existsSync(datei)) return;
  for (const zeile of readFileSync(datei, "utf8").split("\n")) {
    const treffer = zeile.match(/^([A-Z_]+)=(.*)$/);
    if (treffer && !process.env[treffer[1]]) process.env[treffer[1]] = treffer[2].trim();
  }
}

umgebungLaden();

const CMS = process.env.CMS_URL ?? "https://cms.rocket-six.com";
const KUNDE = process.env.CMS_KUNDE ?? "eefelkank";
const SCHLUESSEL = process.env.CMS_API_KEY;

const ZIEL_DATEN = join(wurzel, "src", "lib", "data", "generated");
const ZIEL_BILDER = join(wurzel, "public", "bilder", "cms");

if (!SCHLUESSEL) {
  console.log("CMS_API_KEY fehlt - vorhandene Inhalte bleiben unverändert.");
  process.exit(0);
}

mkdirSync(ZIEL_DATEN, { recursive: true });
mkdirSync(ZIEL_BILDER, { recursive: true });

/** Eine Sammlung abrufen, mit allen Einträgen und aufgelösten Verweisen. */
async function holen(sammlung, zusatz = "") {
  const adresse = `${CMS}/api/${sammlung}?limit=200&depth=2&where[tenant.slug][equals]=${KUNDE}${zusatz}`;
  const antwort = await fetch(adresse, {
    headers: { Authorization: `maschinenzugaenge API-Key ${SCHLUESSEL}` },
  });

  if (!antwort.ok) {
    throw new Error(`CMS antwortete mit ${antwort.status} auf ${sammlung}`);
  }

  const daten = await antwort.json();
  return daten.docs ?? [];
}

/**
 * Lädt ein Bild herunter und gibt den Pfad zurück, unter dem es auf der
 * fertigen Seite liegt. Bereits vorhandene Dateien werden übersprungen.
 */
const heruntergeladen = new Map();

async function bildHolen(bild) {
  if (!bild || typeof bild !== "object" || !bild.url) return undefined;
  if (heruntergeladen.has(bild.url)) return heruntergeladen.get(bild.url);

  const dateiname = String(bild.filename ?? bild.url.split("/").pop()).replace(/[^\w.-]/g, "_");
  const ziel = join(ZIEL_BILDER, dateiname);
  const webpfad = `/bilder/cms/${dateiname}`;

  if (!existsSync(ziel)) {
    const adresse = bild.url.startsWith("http") ? bild.url : `${CMS}${bild.url}`;
    const antwort = await fetch(adresse, {
      headers: { Authorization: `maschinenzugaenge API-Key ${SCHLUESSEL}` },
    });
    if (!antwort.ok) {
      throw new Error(`Bild ${dateiname} kam mit ${antwort.status} zurück`);
    }
    writeFileSync(ziel, Buffer.from(await antwort.arrayBuffer()));
  }

  heruntergeladen.set(bild.url, webpfad);
  return webpfad;
}

/**
 * Gesammelte Ergebnisse. Auf die Platte kommen sie erst, wenn alles geladen
 * ist.
 *
 * Der Grund: bricht der Abruf mittendrin ab, laege sonst ein halb ersetzter
 * Stand im Projekt - neue Gruppen, alte Termine. Lieber gar nichts anfassen
 * und mit dem eingecheckten Stand bauen.
 */
const auszuschreiben = new Map();

function schreiben(name, inhalt) {
  auszuschreiben.set(name, inhalt);
}

function allesSchreiben() {
  for (const [name, inhalt] of auszuschreiben) {
    const inhaltAlsText = JSON.stringify(inhalt, null, 2) + "\n";
    writeFileSync(join(ZIEL_DATEN, `${name}.json`), inhaltAlsText, "utf8");
  }
}

try {
  await alleInhalteHolen();
} catch (fehler) {
  console.log(
    `CMS nicht erreichbar (${fehler.message}). ` +
      "Der Auftritt wird mit den eingecheckten Inhalten gebaut.",
  );
  process.exit(0);
}

allesSchreiben();

async function alleInhalteHolen() {
// ---------------------------------------------------------------------------
// Gruppenseiten
// ---------------------------------------------------------------------------
const gruppenRoh = await holen("korporalschaften", "&sort=id");
const gruppen = [];

for (const g of gruppenRoh) {
  const galerie = [];
  for (const [i, eintrag] of (g.gallery ?? []).entries()) {
    const src = await bildHolen(eintrag.bild);
    if (src) {
      galerie.push({
        id: `${g.slug}-${i + 1}`,
        caption: eintrag.caption,
        span: eintrag.span,
        src,
      });
    }
  }

  const video = g.video?.youtube
    ? {
        youtube: g.video.youtube,
        titel: g.video.titel ?? "",
        vorschau: await bildHolen(g.video.vorschau),
      }
    : undefined;

  gruppen.push({
    slug: g.slug,
    number: g.number ?? undefined,
    name: g.name,
    shortName: g.shortName,
    kind: g.kind,
    founded: g.founded ?? 0,
    members: g.members ?? 0,
    motto: g.motto ?? "",
    farbe: g.farbe ?? "#d5122a",
    farbeText: g.farbeText ?? "#fbf5ea",
    lead: g.lead ?? "",
    story: (g.story ?? []).map((s) => s.text),
    facts: (g.facts ?? []).map((f) => ({ label: f.label, value: f.value })),
    people: (g.people ?? []).map((p) => ({ name: p.name, role: p.role })),
    training: {
      day: g.training?.day ?? "",
      time: g.training?.time ?? "",
      place: g.training?.place ?? "",
      note: g.training?.note ?? undefined,
      bild: await bildHolen(g.training?.bild),
    },
    // Das CMS liefert einen vollen Zeitstempel, die Seite erwartet JJJJ-MM-TT.
    agenda: (g.agenda ?? []).map((a) => ({
      title: a.title,
      date: String(a.date ?? "").slice(0, 10),
      time: a.time,
      place: a.place,
      kind: a.kind,
    })),
    gallery: galerie,
    video,
    verified: true,
  });
}

schreiben("korporalschaften", gruppen);

// ---------------------------------------------------------------------------
// Sessionsprogramm
// ---------------------------------------------------------------------------
const termineRoh = await holen("veranstaltungen", "&sort=date");
const termine = [];

for (const t of termineRoh) {
  termine.push({
    id: t.slug,
    title: t.title,
    date: t.date,
    time: t.time,
    venue: t.venue,
    category: t.category,
    description: t.description,
    image: (await bildHolen(t.image)) ?? "",
    soldOut: t.soldOut || undefined,
    highlight: t.highlight || undefined,
  });
}

schreiben("events", termine);

// ---------------------------------------------------------------------------
// Startseite: Archivbilder und Vorstand
// ---------------------------------------------------------------------------
const startseiten = await holen("startseite");
const startseite = startseiten[0];

if (startseite) {
  const archiv = [];
  for (const b of startseite.archivbilder ?? []) {
    const src = await bildHolen(b.bild);
    if (src) {
      archiv.push({
        src,
        alt: b.bild?.alt ?? b.spruch,
        spruch: b.spruch,
        quelle: b.quelle,
      });
    }
  }

  const vorstand = [];
  for (const p of startseite.vorstand ?? []) {
    vorstand.push({
      name: p.name,
      role: p.role,
      // Initialen ergeben sich aus dem Namen, damit sie nie zum Namen
      // widersprüchlich werden.
      initialen: p.name
        .split(/\s+/)
        .filter(Boolean)
        .map((teil) => teil[0]?.toUpperCase() ?? "")
        .join("")
        .slice(0, 2),
      foto: await bildHolen(p.foto),
    });
  }

  schreiben("startseite", { archivbilder: archiv, vorstand });
}

// ---------------------------------------------------------------------------
// Hinweise auf den Terminseiten
// ---------------------------------------------------------------------------
// Bewusst nachsichtig: gibt es die Sammlung noch nicht, bleibt der bisherige
// Stand stehen, statt den ganzen Bau scheitern zu lassen.
let hinweise = [];
try {
  const eintraege = await holen("hinweise");
  hinweise = (eintraege[0]?.punkte ?? []).map((p) => p.text);
  if (hinweise.length > 0) schreiben("hinweise", hinweise);
} catch {
  console.log("Hinweise nicht abrufbar - vorhandener Stand bleibt.");
}

console.log(
  `CMS eingelesen: ${gruppen.length} Gruppen, ${termine.length} Termine, ` +
    `${hinweise.length} Hinweise, ${heruntergeladen.size} Bilder.`,
);
}
