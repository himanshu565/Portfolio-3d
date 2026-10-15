"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="#top" className="brand" aria-label={`${siteConfig.name}, home`} onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">HB<span>.</span></span>
          <span className="brand-name">{siteConfig.name}</span>
        </Link>

        <nav className={`desktop-nav ${menuOpen ? "mobile-nav-open" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a className="nav-cta" href={siteConfig.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={14} strokeWidth={1.8} />
          </a>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
