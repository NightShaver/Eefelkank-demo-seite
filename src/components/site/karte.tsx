"use client";

import * as React from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Google Maps mit Einwilligung.
 *
 * Die Karte wird erst nach einem ausdrücklichen Klick geladen. Vorher geht
 * keine Anfrage an Google, danach steht in der Fußzeile, was passiert ist.
 * Ohne Klick bleibt eine gezeichnete Fläche mit Adresse stehen, damit die
 * Seite nicht leer wirkt.
 */
export function Karte({
  adresse,
  titel = "Anfahrt",
}: {
  adresse: string;
  titel?: string;
}) {
  const [geladen, setGeladen] = React.useState(false);
  const suche = encodeURIComponent(adresse);

  return (
    <div className="overflow-hidden rounded-[1.5rem] border-2 border-tinte/10 bg-creme-2">
      <div className="relative aspect-[16/10] sm:aspect-[21/9]">
        {geladen ? (
          <iframe
            title={`${titel}: ${adresse}`}
            src={`https://www.google.com/maps?q=${suche}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div
              aria-hidden
              className="muster-raute absolute inset-0 text-tinte/[0.05]"
            />
            <div className="relative max-w-md">
              <MapPin className="mx-auto size-7 text-rot" aria-hidden />
              <p className="mt-4 font-display text-xl font-bold text-tinte">
                {adresse}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-tinte-2">
                Die Karte wird erst geladen, wenn du zustimmst. Dabei wird deine
                IP-Adresse an Google übertragen.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button size="md" onClick={() => setGeladen(true)}>
                  Karte laden
                </Button>
                <Button asChild size="md" variant="outline">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${suche}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    In Google Maps öffnen
                    <ExternalLink aria-hidden />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {geladen && (
        <p className="border-t-2 border-tinte/10 px-5 py-3 text-xs text-tinte-3">
          Karte von Google Maps geladen. Es besteht eine Verbindung zu Google.
        </p>
      )}
    </div>
  );
}
