"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#lab", label: "3D Lab" },
  { href: "#about", label: "About" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header-wrapper">
      <div className="site-header-glass">
        <div className="header-inner">
          <Link href="#top" className="brand" aria-label={`${siteConfig.name}, home`} onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">
              <span className="brand-dot" />
              HB
            </span>
            <span className="brand-info">
              <span className="brand-name">{siteConfig.name}</span>
              <span className="brand-role">SYS.DEV</span>
            </span>
          </Link>

          <nav className={`desktop-nav ${menuOpen ? "mobile-nav-open" : ""}`} aria-label="Main navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a className="nav-cta" href={siteConfig.github} target="_blank" rel="noreferrer">
              <Sparkles size={13} />
              <span>GitHub</span>
              <ArrowUpRight size={13} strokeWidth={2} />
            </a>
          </nav>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
