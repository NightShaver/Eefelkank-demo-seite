import type { NextConfig } from "next";

/**
 * Der Auftritt wird als statische Seite ausgeliefert (GitHub Pages).
 *
 * `NEXT_PUBLIC_BASE_PATH` setzt den Unterpfad, unter dem die Seite liegt.
 * Bei einem Projekt-Repository ist das `/name-des-repos`, bei einer
 * Benutzerseite (`name.github.io`) bleibt es leer. Der Workflow füllt die
 * Variable automatisch, lokal ist sie leer und alles läuft unter `/`.
 */
const rohPfad = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rohPfad === "/" ? "" : rohPfad.replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  /* Erzeugt /verein/index.html statt /verein.html, damit die Adressen auch
     ohne Server-Rewrites funktionieren. */
  trailingSlash: true,
  images: {
    /* GitHub Pages hat keinen Bildoptimierer. Die Dateien in /public sind
       dafür bereits auf sinnvolle Maße gebracht. */
    unoptimized: true,
  },
};

export default nextConfig;
