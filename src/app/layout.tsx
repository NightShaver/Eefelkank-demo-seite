import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { KonfettiStart } from "@/components/site/konfetti-start";
import { site } from "@/lib/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.claim}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Karnevalsgesellschaft Eefelkank e.V. aus Eschweiler-Hastenrath: über 400 Mitglieder, sieben Korporalschaften, Garden und Trompeterkorps. Alle Sitzungen der Session 2026/2027 auf einen Blick.",
  keywords: [
    "Karneval",
    "Eschweiler",
    "Hastenrath",
    "Eefelkank",
    "Korporalschaft",
    "Sitzung",
    "Fastelovend",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: `${site.name} · ${site.claim}`,
    description:
      "Sieben Korporalschaften, Garden, Trompeterkorps. Die Session 2026/2027 in Eschweiler-Hastenrath.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#d5122a",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      /* Sagt Next, dass das weiche Scrollen Absicht ist, damit es bei
         Seitenwechseln trotzdem hart nach oben springen darf. */
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <body className="grain antialiased">
        <KonfettiStart />
        <Nav />
        <main id="inhalt">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
