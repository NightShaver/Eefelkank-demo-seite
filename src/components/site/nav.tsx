"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { WappenBadge, Konfetti } from "@/components/site/ornament";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /** Aktiv ist der Bereich, in dem man gerade steht, inklusive Detailseiten. */
  const istAktiv = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-tinte focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-creme"
      >
        Zum Inhalt springen
      </a>

      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
        <nav
          aria-label="Hauptnavigation"
          className="mx-auto max-w-[84rem] px-3 sm:px-6"
        >
          <div
            /* Die Leiste bleibt immer eine helle Kachel: sie liegt über roten,
               pflaumefarbenen und cremefarbenen Sektionen und muss überall
               lesbar sein. Beim Scrollen wird nur der Schatten kräftiger. */
            className={cn(
              "flex items-center justify-between gap-3 rounded-full border-2 border-tinte/10 bg-creme/95 px-3 py-2 backdrop-blur-xl transition-shadow duration-500 sm:px-4",
              scrolled
                ? "shadow-[0_14px_44px_-22px_rgba(28,16,22,0.85)]"
                : "shadow-[0_10px_30px_-24px_rgba(28,16,22,0.5)]"
            )}
          >
            <Link
              href="/"
              className="group flex items-center gap-2.5 pl-1"
              aria-label={`${site.name}, Startseite`}
            >
              <WappenBadge
                size={34}
                ring="size-11 bg-creme-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold tracking-tight text-tinte">
                  Eefelkank
                </span>
                <span className="mt-1 text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-rot">
                  Hastenrath · 1938
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-0.5 xl:flex">
              {site.nav.map((item) => {
                const on = istAktiv(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300",
                      on ? "text-creme" : "text-tinte/70 hover:text-tinte"
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-rot"
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <a href="mailto:info@eefelkank.de?subject=Kartenvorverkauf">
                  Karten sichern
                </a>
              </Button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Menü schließen" : "Menü öffnen"}
                className="grid size-11 place-items-center rounded-full border-2 border-tinte/20 bg-creme text-tinte transition-colors hover:border-tinte xl:hidden"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-rot" />
            <div
              aria-hidden
              className="muster-punkte absolute inset-0 text-creme/25"
            />
            <Konfetti count={10} colors={["#fbf5ea", "#eabc51"]} />

            <motion.ul
              className="relative flex h-full flex-col justify-center gap-0.5 overflow-y-auto px-8 py-24"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
                hidden: { transition: { staggerChildren: 0.02 } },
              }}
            >
              {site.nav.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-creme/25 py-3.5 font-display text-3xl font-bold text-creme sm:text-4xl"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.55, ease: EASE }}
                className="mt-7"
              >
                <Button asChild size="lg" variant="gold" className="w-full">
                  <a href="mailto:info@eefelkank.de?subject=Kartenvorverkauf">
                    Karten sichern
                  </a>
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
