import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import "./tarteaucitron-utb.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pose de terrasses sur pilotis et Pergolas en bois | Univers Terrasses Bois",
    template: "%s | Univers Terrasses Bois",
  },
  description:
    "Construction de terrasses et Pergolas en bois raffiné et de qualité pour les particuliers, entreprises et collectivités. Alpes-Maritimes (06) et Var (83).",
  metadataBase: new URL("https://www.universterrassesbois.fr"),
  robots: { index: false, follow: false },
  openGraph: {
    siteName: "Univers Terrasses Bois",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-creme text-noir-bois antialiased">
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <CookieConsent />
        <Nav />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
