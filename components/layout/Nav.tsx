"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { label: "Terrasses en bois", href: "/services/terrasses-en-bois" },
  { label: "Terrasses sur pilotis", href: "/services/terrasses-sur-pilotis" },
  { label: "Terrasses piscines & jardins", href: "/services/terrasses-piscines-jardins" },
  { label: "Pergolas", href: "/services/pergolas" },
  { label: "Aménagements extérieurs", href: "/services/amenagements-exterieurs" },
  { label: "Abris de voiture", href: "/services/abris-de-voiture" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || reducedMotion) return;

    let lastY = 0;
    const st = ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        const currentY = self.scroll();
        if (currentY > lastY && currentY > 80) {
          gsap.to(nav, { yPercent: -100, duration: 0.3, ease: "power2.inOut" });
        } else {
          gsap.to(nav, { yPercent: 0, duration: 0.3, ease: "power2.inOut" });
        }
        lastY = currentY;
      },
    });

    return () => st.kill();
  }, [reducedMotion]);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Fermer le dropdown au clic extérieur
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Navigation principale"
      className="fixed top-0 left-0 right-0 z-50 bg-creme/95 backdrop-blur-sm border-b border-beige-card"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="relative block shrink-0" aria-label="Univers Terrasses Bois — Accueil">
          <Image
            src="/images/logo/logo-utb.png"
            alt="Univers Terrasses Bois"
            width={200}
            height={88}
            priority
            className="h-12 md:h-14 w-auto"
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8" role="menubar">
          {/* Services dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="label-upper text-muted hover:text-brun transition-colors flex items-center gap-1"
              onMouseEnter={() => {
                if (closeTimer.current) clearTimeout(closeTimer.current);
                setServicesOpen(true);
              }}
              onMouseLeave={() => {
                closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
              }}
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              aria-controls="services-dropdown"
            >
              Services
              <svg
                width="10" height="6" viewBox="0 0 10 6" fill="none"
                aria-hidden="true"
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {servicesOpen && (
              <div
                id="services-dropdown"
                role="menu"
                className="absolute top-full left-0 mt-2 w-64 bg-creme border border-beige-card shadow-lg rounded-sm py-2"
                onMouseEnter={() => {
                  if (closeTimer.current) clearTimeout(closeTimer.current);
                }}
                onMouseLeave={() => {
                  closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
                }}
              >
                {SERVICES.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    role="menuitem"
                    className="block px-4 py-2.5 text-xs text-noir-bois hover:bg-beige hover:text-brun transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/realisations" className="label-upper text-muted hover:text-brun transition-colors">
            Réalisations
          </Link>
          <Link href="/actualites-bois" className="label-upper text-muted hover:text-brun transition-colors">
            Actualités
          </Link>
          <Link href="/a-propos" className="label-upper text-muted hover:text-brun transition-colors">
            À propos
          </Link>

          <Link
            href="/contact"
            className="bg-brun text-creme label-upper px-5 py-2.5 hover:bg-brun-dark transition-colors"
          >
            Devis gratuit
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span aria-hidden="true" className={`block w-5 h-px bg-noir-bois transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span aria-hidden="true" className={`block w-5 h-px bg-noir-bois transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span aria-hidden="true" className={`block w-5 h-px bg-noir-bois transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-creme border-t border-beige-card px-6 py-4 flex flex-col gap-4"
          role="navigation"
          aria-label="Menu mobile"
        >
          <div className="flex flex-col gap-2">
            <span className="label-upper text-dore text-[9px]" aria-hidden="true">Services</span>
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="text-sm text-noir-bois hover:text-brun pl-2">
                {s.label}
              </Link>
            ))}
          </div>
          <Link href="/realisations" className="label-upper text-noir-bois hover:text-brun">Réalisations</Link>
          <Link href="/actualites-bois" className="label-upper text-noir-bois hover:text-brun">Actualités</Link>
          <Link href="/a-propos" className="label-upper text-noir-bois hover:text-brun">À propos</Link>
          <Link href="/contact" className="bg-brun text-creme label-upper px-5 py-3 text-center">
            Devis gratuit
          </Link>
        </div>
      )}
    </nav>
  );
}
