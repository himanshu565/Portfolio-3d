"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GsapAnimator() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Honor reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (document.querySelector(".hero-content-wrap")) {
        tl.from(".hero-badge", {
          y: -14,
          opacity: 0,
          duration: 0.6,
        })
          .from(
            ".hero-title",
            {
              y: 28,
              opacity: 0,
              duration: 0.9,
              ease: "power4.out",
            },
            "-=0.4",
          )
          .from(
            ".hero-description",
            {
              y: 18,
              opacity: 0,
              duration: 0.7,
            },
            "-=0.6",
          )
          .from(
            ".hero-actions",
            {
              y: 16,
              opacity: 0,
              duration: 0.6,
            },
            "-=0.4",
          )
          .from(
            ".hero-visual-wrap",
            {
              scale: 0.94,
              opacity: 0,
              duration: 1.0,
              ease: "power2.out",
            },
            0.2,
          );
      }

      // 2. Project Cards Reveal
      if (document.querySelector(".projects-grid")) {
        gsap.from(".project-card-inexa", {
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 82%",
          },
          y: 35,
          opacity: 0,
          stagger: 0.15,
          duration: 0.75,
          ease: "power2.out",
        });
      }

      // 3. Capabilities Cards Reveal
      if (document.querySelector(".capabilities-grid")) {
        gsap.from(".capability-card", {
          scrollTrigger: {
            trigger: ".capabilities-grid",
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.65,
          ease: "power2.out",
        });
      }

      // 4. Principles Reveal
      if (document.querySelector(".principles-grid")) {
        gsap.from(".principle-card", {
          scrollTrigger: {
            trigger: ".principles-grid",
            start: "top 85%",
          },
          y: 25,
          opacity: 0,
          stagger: 0.12,
          duration: 0.65,
          ease: "power2.out",
        });
      }

      // 5. Process Steps Reveal
      if (document.querySelector(".process-grid")) {
        gsap.from(".process-step", {
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 85%",
          },
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
