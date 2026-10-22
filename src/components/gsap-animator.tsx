"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GsapAnimator() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. HERO ENTRANCE TIMELINE
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-copy .eyebrow", {
        y: -18,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-copy h1",
          {
            y: 35,
            opacity: 0,
            duration: 1.0,
            ease: "power4.out",
          },
          "-=0.5",
        )
        .from(
          ".hero-lede",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6",
        )
        .from(
          ".hero-actions .button",
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.5)",
          },
          "-=0.5",
        )
        .from(
          ".hero-presence",
          {
            opacity: 0,
            y: 12,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".hero-art-wrap",
          {
            scale: 0.94,
            opacity: 0,
            duration: 1.2,
          },
          0.2,
        )
        .from(
          ".scene-float-label",
          {
            scale: 0.85,
            opacity: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.8)",
          },
          "-=0.6",
        );

      // 2. CONTINUOUS FLOATING BREATHING MOTION FOR LABELS
      gsap.to(".float-label-left", {
        y: "-=8",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".float-label-right", {
        y: "+=10",
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      gsap.to(".float-label-bottom", {
        y: "-=6",
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // 3. SCROLL-TRIGGERED SECTION REVEALS
      if (document.querySelector(".specs-grid")) {
        gsap.from(".spec-card", {
          scrollTrigger: {
            trigger: ".specs-grid",
            start: "top 85%",
          },
          y: 35,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
        });
      }

      if (document.querySelector(".project-grid")) {
        gsap.from(".project-card", {
          scrollTrigger: {
            trigger: ".project-grid",
            start: "top 80%",
          },
          y: 45,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (document.querySelector(".toolkit-grid")) {
        gsap.from(".toolkit-card", {
          scrollTrigger: {
            trigger: ".toolkit-grid",
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
        });
      }

      if (document.querySelector(".approach-steps")) {
        gsap.from(".approach-step", {
          scrollTrigger: {
            trigger: ".approach-steps",
            start: "top 85%",
          },
          x: 25,
          opacity: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      if (document.querySelector(".principles-strip")) {
        gsap.from(".principle-item", {
          scrollTrigger: {
            trigger: ".principles-strip",
            start: "top 85%",
          },
          y: 25,
          opacity: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}

