"use client";

import * as React from "react";

/**
 * Konfetti-Salut beim Öffnen der Seite.
 *
 * Gleiche Idee wie beim Karnevals-Komitee Eschweiler (dort ein
 * WordPress-Plugin über canvas-confetti): ein kurzer Knall beim Laden, hier
 * in den Vereinsfarben und über die ganze Fläche.
 *
 * Läuft bei jedem Seitenaufruf, nicht bei Klicks in der Navigation. Bei
 * `prefers-reduced-motion` bleibt alles ruhig, Konfetti ist Dekor und kein
 * Inhalt. Die Bibliothek wird dynamisch nachgeladen, damit sie den ersten
 * Aufbau der Seite nicht ausbremst.
 */
const FARBEN = ["#d5122a", "#eabc51", "#fbf5ea", "#c8912c", "#21518c"];

export function KonfettiStart() {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let abgebrochen = false;
    const timer: number[] = [];

    const start = async () => {
      const { default: confetti } = await import("canvas-confetti");
      if (abgebrochen) return;

      const gemeinsam = {
        colors: FARBEN,
        // Über allem, auch über Navigation und Papierkorn
        zIndex: 200,
        disableForReducedMotion: true,
      };

      // Der Knall: eine breite Ladung aus der Mitte …
      confetti({
        ...gemeinsam,
        particleCount: 140,
        spread: 110,
        startVelocity: 58,
        decay: 0.92,
        scalar: 1.1,
        origin: { x: 0.5, y: 0.58 },
      });


      // … zwei Kanonen von links und rechts …
      timer.push(
        window.setTimeout(() => {
          if (abgebrochen) return;
          confetti({
            ...gemeinsam,
            particleCount: 70,
            angle: 58,
            spread: 68,
            startVelocity: 62,
            origin: { x: 0, y: 0.78 },
          });
          confetti({
            ...gemeinsam,
            particleCount: 70,
            angle: 122,
            spread: 68,
            startVelocity: 62,
            origin: { x: 1, y: 0.78 },
          });
        }, 260)
      );

      // … und danach rieselt es kurz über die ganze Breite nach.
      timer.push(
        window.setTimeout(() => {
          if (abgebrochen) return;
          const ende = Date.now() + 900;

          const rieseln = () => {
            if (abgebrochen || Date.now() > ende) return;
            confetti({
              ...gemeinsam,
              particleCount: 12,
              spread: 90,
              startVelocity: 24,
              gravity: 0.9,
              scalar: 0.9,
              ticks: 220,
              origin: { x: Math.random(), y: -0.1 },
            });
            requestAnimationFrame(rieseln);
          };

          rieseln();
        }, 520)
      );
    };

    timer.push(window.setTimeout(start, 250));

    return () => {
      abgebrochen = true;
      timer.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}
