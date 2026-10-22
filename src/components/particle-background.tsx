"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 160,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    // Track mouse coordinates for interactive particles.js hover effect
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // High-tech cyber neon color palette
    const colors = [
      "rgba(0, 240, 255, ",   // Electric Cyan
      "rgba(168, 85, 247, ",  // Cyber Violet
      "rgba(16, 185, 129, ",  // Signal Emerald
      "rgba(255, 42, 85, ",   // Neon Crimson
      "rgba(56, 189, 248, ",  // Sky Blue
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      // Calculate responsive density
      const count = Math.min(Math.floor((width * height) / 14000), 85);

      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 2 + 1.2;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius,
          baseRadius: radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.35,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    // Render loop
    const maxDistance = 140;
    const mouseMaxDistance = 170;
    let tick = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (document.hidden) return;

      tick++;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce or wrap edges
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Mouse interaction: soft push and connection
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseMaxDistance) {
            // Interactive connection line to cursor
            const mouseAlpha = (1 - dist / mouseMaxDistance) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${mouseAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Gentle repulsion
            const force = (mouseMaxDistance - dist) / mouseMaxDistance;
            p.x -= (dx / dist) * force * 1.2;
            p.y -= (dy / dist) * force * 1.2;
          }
        }

        // Connect nearby particles with subtle laser lines (classic particles.js)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Draw particle node with pulsing glow
        const currentAlpha = p.alpha + Math.sin(tick * p.pulseSpeed + p.pulsePhase) * 0.15;
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, currentAlpha * 0.25)})`;
        ctx.fill();

        // Inner core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, currentAlpha)})`;
        ctx.fill();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-background-canvas"
      aria-hidden="true"
    />
  );
}

