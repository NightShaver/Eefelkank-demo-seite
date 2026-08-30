"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { GalleryItem } from "@/lib/data/korporalschaften";
import { Photo } from "@/components/site/photo";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const SPAN: Record<GalleryItem["span"], string> = {
  sm: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  big: "col-span-2 row-span-2",
};

/**
 * Bento-Galerie mit Lightbox.
 *
 * Feste Rasterplaetze (klein / breit / hoch / gross) statt Masonry, dadurch
 * wirkt die Wand komponiert und nicht zufaellig. Blaettern per Klick oder
 * Pfeiltasten, schliessen mit Escape (Radix Dialog).
 */
export function BentoGallery({
  items,
  farbe,
  groupName,
}: {
  items: GalleryItem[];
  farbe: string;
  groupName: string;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const open = openIndex !== null;

  const go = React.useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) =>
        i === null ? i : (i + dir + items.length) % items.length
      ),
    [items.length]
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const current = openIndex === null ? null : items[openIndex];

  return (
    <>
      <div className="grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[11.5rem] sm:gap-4 md:grid-cols-4">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 6) * 0.05 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border-[5px] border-creme-2 bg-creme-2 text-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1",
              SPAN[item.span]
            )}
            aria-label={`${item.caption}, Bild ${i + 1} von ${items.length} vergrößern`}
          >
            <Photo
              src={item.src}
              alt={item.caption}
              farbe={farbe}
              className="size-full rounded-xl"
              imgClassName="transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />

            <span className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-tinte/85 via-tinte/25 to-transparent p-4 pt-10">
              <span className="flex items-end justify-between gap-2">
                <span className="text-xs font-medium leading-snug text-creme sm:text-sm">
                  {item.caption}
                </span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-creme/20 text-creme opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                  <Maximize2 className="size-3.5" aria-hidden />
                </span>
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={(v) => !v && setOpenIndex(null)}>
        <AnimatePresence>
          {open && current && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="fixed inset-0 z-[70] bg-tinte/95 backdrop-blur-md"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="fixed inset-0 z-[71] flex flex-col items-center justify-center p-4 sm:p-10"
                >
                  <Dialog.Title className="sr-only">
                    {groupName}: {current.caption}
                  </Dialog.Title>

                  <div className="w-full max-w-5xl">
                    <Photo
                      src={current.src}
                      alt={current.caption}
                      farbe={farbe}
                      className="aspect-[3/2] w-full rounded-2xl"
                      imgClassName="object-contain"
                      sizes="90vw"
                      eager
                    />
                  </div>

                  <div className="mt-5 flex w-full max-w-5xl flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-creme/70">
                      <span className="font-semibold tabular-nums text-creme">
                        {String((openIndex ?? 0) + 1).padStart(2, "0")}
                      </span>
                      <span className="mx-2 text-creme/40">/</span>
                      <span className="tabular-nums text-creme/50">
                        {String(items.length).padStart(2, "0")}
                      </span>
                      <span className="ml-4 text-creme">{current.caption}</span>
                    </p>

                    <div className="flex gap-2">
                      <LightboxButton onClick={() => go(-1)} label="Vorheriges Bild">
                        <ChevronLeft className="size-5" />
                      </LightboxButton>
                      <LightboxButton onClick={() => go(1)} label="Nächstes Bild">
                        <ChevronRight className="size-5" />
                      </LightboxButton>
                    </div>
                  </div>

                  <Dialog.Close asChild>
                    <button
                      aria-label="Galerie schließen"
                      className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border-2 border-creme/30 text-creme transition-colors hover:bg-creme hover:text-tinte sm:right-8 sm:top-8"
                    >
                      <X className="size-5" />
                    </button>
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}

function LightboxButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border-2 border-creme/30 text-creme transition-all duration-300 hover:border-gold-2 hover:bg-gold-2 hover:text-tinte"
    >
      {children}
    </button>
  );
}
