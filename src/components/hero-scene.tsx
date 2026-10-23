"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Check reduced motion
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
    renderer.toneMappingExposure = 1.0;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 100);
    camera.position.set(0, 0, 5.6);

    // Studio Lighting in Black & Off-White
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfafafa, 3.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe4e4e7, 2.4);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const bottomFill = new THREE.DirectionalLight(0x27272a, 0.9);
    bottomFill.position.set(0, -4, 2);
    scene.add(bottomFill);

    // Root Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Continuous Sculptural Torus Knot (Obsidian Chrome)
    const knotGeo = new THREE.TorusKnotGeometry(1.15, 0.32, 140, 36, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x121216,
      metalness: 0.94,
      roughness: 0.14,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    group.add(knotMesh);

    // 2. Dual Gyroscopic Orbital Rings (Off-White & Silver)
    const ring1Geo = new THREE.TorusGeometry(1.82, 0.016, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f0,
      metalness: 0.95,
      roughness: 0.18,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.98, 0.012, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.22,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // 3. Floating Inner Silver Core
    const coreGeo = new THREE.OctahedronGeometry(0.38, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f0,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x222225,
      emissiveIntensity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Interactive mouse tracking with damping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.7;
      mouse.targetY = y * 0.7;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

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

      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (!prefersReducedMotion) {
        // Sculptural kinetic rotation
        knotMesh.rotation.y = elapsed * 0.28 + mouse.x * 0.4;
        knotMesh.rotation.x = Math.sin(elapsed * 0.2) * 0.2 + mouse.y * 0.35;
        group.position.y = Math.sin(elapsed * 0.9) * 0.06;

        // Counter-rotating gyroscopic rings
        ring1.rotation.z = elapsed * 0.35;
        ring1.rotation.x = Math.PI / 3 + mouse.y * 0.2;

        ring2.rotation.z = -elapsed * 0.25;
        ring2.rotation.y = Math.PI / 4 + mouse.x * 0.2;

        coreMesh.rotation.y = -elapsed * 0.6;
        coreMesh.rotation.x = elapsed * 0.4;
      } else {
        knotMesh.rotation.y = mouse.x * 0.3;
        knotMesh.rotation.x = mouse.y * 0.3;
      }

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      knotGeo.dispose();
      knotMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();

      if (host && renderer.domElement && host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="w-full h-full min-h-[340px] sm:min-h-[420px] flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    />
  );
}
