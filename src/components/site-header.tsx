"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { siteConfig } from "@/data/site";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#lab", label: "3D Lab" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function useIsDark() {
  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("storage", callback);
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", callback);
    };
  };

  return useSyncExternalStore(
    subscribe,
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
    () => false,
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mounted = useMounted();
  const isDark = useIsDark();

  const toggleTheme = () => {
    const nextDark = !isDark;
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 pointer-events-none">
      <div className="container-inexa max-w-6xl mx-auto flex items-center justify-between p-2 sm:p-2.5 header-glass pointer-events-auto">
        {/* Brand identity */}
        <Link
          href="#top"
          className="flex items-center gap-3 pl-2 sm:pl-3 py-1 group focus-visible:rounded-full"
          aria-label={`${siteConfig.name}, return to top`}
          onClick={() => setMenuOpen(false)}
        >
          <span className="w-9 h-9 rounded-full bg-[var(--accent-primary)] text-white font-bold text-xs flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm">
            {siteConfig.initials}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[var(--text-primary)] leading-tight tracking-tight">
              {siteConfig.name}
            </span>
            <span className="text-[11px] font-medium text-[var(--text-secondary)] leading-tight">
              {siteConfig.role}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-[var(--text-secondary)]" aria-label="Main Navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full transition-colors hover:text-[var(--text-primary)] hover:bg-[var(--accent-light)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side controls: Theme toggle & CTA */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-light)] transition-colors border border-[var(--border-subtle)]"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}

          <a
            href="#contact"
            className="hidden sm:inline-flex btn-inexa-primary text-xs py-2 px-4"
          >
            Get in touch
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--accent-light)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-[72px] z-40 bg-[var(--bg-page)]/95 backdrop-blur-md md:hidden pointer-events-auto flex flex-col p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col gap-2 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold text-[var(--text-primary)] py-3 px-2 border-b border-[var(--border-subtle)] hover:text-[var(--accent-primary)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-inexa-primary w-full py-3 text-center justify-center text-sm font-semibold"
            >
              Get in touch
            </a>
            {siteConfig.github && (
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="btn-inexa-outline w-full py-3 text-center justify-center text-sm font-semibold"
              >
                View GitHub <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
