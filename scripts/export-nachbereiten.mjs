import { readdirSync, statSync, copyFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Nacharbeit für den statischen Export.
 *
 * Next legt die Vorablade-Daten für Seitenwechsel in Ordnern ab
 * (`verein/__next.verein/__PAGE__.txt`), der Browser fragt sie aber mit
 * Punkt getrennt an (`verein/__next.verein.__PAGE__.txt`). Auf einem
 * Server mit Rewrites fällt das nicht auf, auf GitHub Pages schon: Jede
 * Vorablade-Anfrage liefe ins Leere.
 *
 * Deshalb legen wir die Dateien zusätzlich flach daneben. Kostet ein paar
 * Kilobyte und macht die Navigation ohne Nachladen der ganzen Seite
 * möglich.
 */
const wurzel = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

let kopiert = 0;

function flachLegen(ordner) {
  for (const eintrag of readdirSync(ordner)) {
    const pfad = join(ordner, eintrag);
    if (!statSync(pfad).isDirectory()) continue;

    if (eintrag.startsWith("__next.")) {
      for (const datei of alleDateien(pfad)) {
        const relativ = datei.slice(pfad.length + 1).split(/[\\/]/).join(".");
        copyFileSync(datei, join(ordner, `${eintrag}.${relativ}`));
        kopiert++;
      }
    }

    flachLegen(pfad);
  }
}

function alleDateien(ordner) {
  const treffer = [];
  for (const eintrag of readdirSync(ordner)) {
    const pfad = join(ordner, eintrag);
    if (statSync(pfad).isDirectory()) treffer.push(...alleDateien(pfad));
    else treffer.push(pfad);
  }
  return treffer;
}

flachLegen(wurzel);
console.log(`Export nachbereitet: ${kopiert} Vorablade-Dateien flach abgelegt.`);
