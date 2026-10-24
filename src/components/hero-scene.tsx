"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Rotate3D } from "lucide-react";

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    let animationFrame = 0;
    let isDisposed = false;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      host.classList.add("scene-fallback");
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // =========================================================================
    // DUAL-ACCENT STUDIO LIGHTING (Emerald Green & Crimson Red on Obsidian)
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Primary Emerald Green directional key light
    const greenLight = new THREE.DirectionalLight(0x00e599, 4.5);
    greenLight.position.set(4, 5, 3);
    scene.add(greenLight);

    // Contrasting Crimson Red directional rim light
    const redLight = new THREE.DirectionalLight(0xef4444, 4.0);
    redLight.position.set(-4, -3, -3);
    scene.add(redLight);

    // Subtle cool fill light
    const fillLight = new THREE.DirectionalLight(0x16201a, 1.0);
    fillLight.position.set(0, -4, 2);
    scene.add(fillLight);

    // Root Group for interactive rotation
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // =========================================================================
    // 1 SINGLE CENTERPIECE: OBSIDIAN DUAL-ORBITAL GYROSPHERE
    // =========================================================================
    // Central Obsidian Chrome Sphere
    const sphereGeo = new THREE.SphereGeometry(1.2, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x090c0a,
      metalness: 0.95,
      roughness: 0.14,
      clearcoat: 0.92,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    rootGroup.add(sphereMesh);

    // Titanium Equator Gimbal Ring
    const ringEquatorGeo = new THREE.TorusGeometry(1.5, 0.012, 16, 96);
    const ringEquatorMat = new THREE.MeshStandardMaterial({
      color: 0x222c26,
      metalness: 0.9,
      roughness: 0.3,
    });
    const ringEquator = new THREE.Mesh(ringEquatorGeo, ringEquatorMat);
    ringEquator.rotation.x = Math.PI / 2;
    rootGroup.add(ringEquator);

    // Orbital Ring 1: Vibrant Emerald Green
    const ringGreenGeo = new THREE.TorusGeometry(1.82, 0.016, 16, 120);
    const ringGreenMat = new THREE.MeshStandardMaterial({
      color: 0x00e599,
      emissive: 0x00e599,
      emissiveIntensity: 0.65,
      metalness: 0.85,
      roughness: 0.2,
    });
    const ringGreen = new THREE.Mesh(ringGreenGeo, ringGreenMat);
    ringGreen.rotation.x = Math.PI / 3;
    rootGroup.add(ringGreen);

    // Orbiting Emerald Satellite Node
    const nodeGreenGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const nodeGreenMat = new THREE.MeshBasicMaterial({ color: 0x00e599 });
    const nodeGreen = new THREE.Mesh(nodeGreenGeo, nodeGreenMat);
    ringGreen.add(nodeGreen);
    nodeGreen.position.set(1.82, 0, 0);

    // Orbital Ring 2: Vibrant Crimson Red
    const ringRedGeo = new THREE.TorusGeometry(1.98, 0.014, 16, 120);
    const ringRedMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xef4444,
      emissiveIntensity: 0.65,
      metalness: 0.85,
      roughness: 0.2,
    });
    const ringRed = new THREE.Mesh(ringRedGeo, ringRedMat);
    ringRed.rotation.y = Math.PI / 3.5;
    rootGroup.add(ringRed);

    // Orbiting Crimson Satellite Node
    const nodeRedGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const nodeRedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const nodeRed = new THREE.Mesh(nodeRedGeo, nodeRedMat);
    ringRed.add(nodeRed);
    nodeRed.position.set(1.98, 0, 0);

    // Inner Floating Refractive Core
    const coreGeo = new THREE.OctahedronGeometry(0.36, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00e599,
      emissive: 0x00e599,
      emissiveIntensity: 0.85,
      metalness: 0.9,
      roughness: 0.15,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // Subtle Particle Aura in Dual Green & Red
    const particleCount = 60;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 6;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      // Half emerald green, half crimson red
      if (i % 2 === 0) {
        pColors[i * 3] = 0.0;
        pColors[i * 3 + 1] = 0.9;
        pColors[i * 3 + 2] = 0.6;
      } else {
        pColors[i * 3] = 0.94;
        pColors[i * 3 + 1] = 0.27;
        pColors[i * 3 + 2] = 0.27;
      }
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // =========================================================================
    // INTERACTION & DRAG-TO-ORBIT
    // =========================================================================
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    const dragRotation = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const mouseHover = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      host.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseHover.targetX = normX * 0.35;
      mouseHover.targetY = normY * 0.35;

      if (isDragging) {
        const deltaX = e.clientX - prevPointerX;
        const deltaY = e.clientY - prevPointerY;
        dragRotation.targetY += deltaX * 0.008;
        dragRotation.targetX += deltaY * 0.008;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      host.style.cursor = "grab";
    };

    host.style.cursor = "grab";
    host.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);

    const handleResize = () => {
      if (!host || isDisposed) return;
      const w = host.clientWidth;
      const h = host.clientHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrame = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Smooth damping
      dragRotation.x += (dragRotation.targetX - dragRotation.x) * 0.08;
      dragRotation.y += (dragRotation.targetY - dragRotation.y) * 0.08;
      mouseHover.x += (mouseHover.targetX - mouseHover.x) * 0.05;
      mouseHover.y += (mouseHover.targetY - mouseHover.y) * 0.05;

      rootGroup.rotation.y = dragRotation.y + mouseHover.x;
      rootGroup.rotation.x = dragRotation.x + mouseHover.y;

      if (!prefersReducedMotion) {
        sphereMesh.rotation.y = elapsed * 0.2;
        sphereMesh.rotation.x = Math.sin(elapsed * 0.3) * 0.1;

        // Counter-rotating rings
        ringGreen.rotation.z = elapsed * 0.45;
        ringGreen.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.5) * 0.15;

        ringRed.rotation.z = -elapsed * 0.35;
        ringRed.rotation.y = Math.PI / 3.5 + Math.cos(elapsed * 0.4) * 0.15;

        ringEquator.rotation.z = elapsed * 0.15;

        coreMesh.rotation.y = -elapsed * 0.7;
        coreMesh.rotation.x = elapsed * 0.5;

        rootGroup.position.y = Math.sin(elapsed * 0.8) * 0.08;
        particles.rotation.y = elapsed * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrame);
      host.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);

      sphereGeo.dispose();
      sphereMat.dispose();
      ringEquatorGeo.dispose();
      ringEquatorMat.dispose();
      ringGreenGeo.dispose();
      ringGreenMat.dispose();
      nodeGreenGeo.dispose();
      nodeGreenMat.dispose();
      ringRedGeo.dispose();
      ringRedMat.dispose();
      nodeRedGeo.dispose();
      nodeRedMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      pGeo.dispose();
      pMat.dispose();

      renderer.dispose();
      if (host && renderer.domElement && host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* Top Floating Badge */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between text-[11px] font-medium text-[var(--text-muted)] pointer-events-none">
        <span className="badge-neutral py-1 px-2.5 backdrop-blur-md bg-[var(--bg-card)]/80 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          <span className="text-[var(--text-primary)] font-semibold">Dual-Orbital Core</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 badge-neutral py-1 px-2.5 backdrop-blur-md bg-[var(--bg-card)]/80">
          <Rotate3D size={11} className="text-[var(--accent-primary)]" />
          <span>Drag to inspect</span>
        </span>
      </div>

      {/* Main Three.js Viewport */}
      <div
        ref={hostRef}
        className="w-full h-full min-h-[320px] sm:min-h-[400px] flex items-center justify-center select-none touch-none"
        aria-label="3D Dual-Orbital GyroSphere in Black, Emerald Green and Crimson Red."
      />

      {/* Bottom Subtle Status Line */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e599]" />
          <span>Active Engine</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
          <span>CPCB Telemetry</span>
        </span>
      </div>
    </div>
  );
}
