"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Rotate3D, Sparkles } from "lucide-react";

export type ModelType = "torus" | "fluid" | "helix" | "matrix";

interface ModelOption {
  id: ModelType;
  label: string;
  tagline: string;
}

const modelOptions: ModelOption[] = [
  { id: "torus", label: "Torus Knot", tagline: "Continuous Sculptural Monolith" },
  { id: "fluid", label: "Liquid Mesh", tagline: "Vertex-Displaced Chrome Wave" },
  { id: "helix", label: "Helix Lattice", tagline: "Architectural Pipeline Matrix" },
  { id: "matrix", label: "Cube Matrix", tagline: "Modular Quantum Relays" },
];

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<ModelType>("torus");
  const activeModelRef = useRef<ModelType>(activeModel);

  useEffect(() => {
    activeModelRef.current = activeModel;
  }, [activeModel]);

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
    camera.position.set(0, 0, 5.8);

    // Studio Lighting in Black & Off-White
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfafafa, 3.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe4e4e7, 2.6);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const bottomFill = new THREE.DirectionalLight(0x27272a, 0.9);
    bottomFill.position.set(0, -4, 2);
    scene.add(bottomFill);

    // Shared Root Group that receives mouse & drag rotation
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // =========================================================================
    // MODEL 1: SCULPTURAL TORUS KNOT (Obsidian Chrome + Gyroscopic Rings)
    // =========================================================================
    const torusGroup = new THREE.Group();
    rootGroup.add(torusGroup);

    const knotGeo = new THREE.TorusKnotGeometry(1.15, 0.32, 140, 36, 2, 3);
    const obsidianChromeMat = new THREE.MeshPhysicalMaterial({
      color: 0x121216,
      metalness: 0.94,
      roughness: 0.14,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
    });
    const knotMesh = new THREE.Mesh(knotGeo, obsidianChromeMat);
    torusGroup.add(knotMesh);

    const ring1Geo = new THREE.TorusGeometry(1.82, 0.016, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f0,
      metalness: 0.95,
      roughness: 0.18,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    torusGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.98, 0.012, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.22,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    torusGroup.add(ring2);

    const torusCoreGeo = new THREE.OctahedronGeometry(0.38, 0);
    const torusCoreMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f0,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x222225,
      emissiveIntensity: 0.4,
    });
    const torusCore = new THREE.Mesh(torusCoreGeo, torusCoreMat);
    torusGroup.add(torusCore);

    // =========================================================================
    // MODEL 2: LIQUID CHROME MESH (Dynamic Vertex-Displaced Organic Topology)
    // =========================================================================
    const fluidGroup = new THREE.Group();
    rootGroup.add(fluidGroup);

    const fluidGeo = new THREE.IcosahedronGeometry(1.28, 5);
    const originalPositions = new Float32Array(fluidGeo.attributes.position.array);

    const fluidMat = new THREE.MeshPhysicalMaterial({
      color: 0x141418,
      metalness: 0.96,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
    });
    const fluidMesh = new THREE.Mesh(fluidGeo, fluidMat);
    fluidGroup.add(fluidMesh);

    // Outer equatorial aura ring
    const fluidRingGeo = new THREE.TorusGeometry(1.8, 0.014, 16, 100);
    const fluidRingMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f0,
      metalness: 0.92,
      roughness: 0.15,
      transparent: true,
      opacity: 0.85,
    });
    const fluidRing = new THREE.Mesh(fluidRingGeo, fluidRingMat);
    fluidRing.rotation.x = Math.PI / 2.5;
    fluidGroup.add(fluidRing);

    // =========================================================================
    // MODEL 3: ARCHITECTURAL HELIX LATTICE (Algorithmic Distributed Strands)
    // =========================================================================
    const helixGroup = new THREE.Group();
    rootGroup.add(helixGroup);

    const helixSteps = 30;
    const strandRadius = 0.92;
    const helixHeight = 3.2;
    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f0,
      metalness: 0.95,
      roughness: 0.2,
    });

    for (let i = 0; i < helixSteps; i++) {
      const t = (i / (helixSteps - 1) - 0.5) * helixHeight;
      const angle = (i / helixSteps) * Math.PI * 4;

      const p1 = new THREE.Vector3(Math.cos(angle) * strandRadius, t, Math.sin(angle) * strandRadius);
      const p2 = new THREE.Vector3(-Math.cos(angle) * strandRadius, t, -Math.sin(angle) * strandRadius);

      // Node spheres at strand vertices
      const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const node1 = new THREE.Mesh(nodeGeo, obsidianChromeMat);
      node1.position.copy(p1);
      helixGroup.add(node1);

      const node2 = new THREE.Mesh(nodeGeo, silverMat);
      node2.position.copy(p2);
      helixGroup.add(node2);

      // Connecting rungs linking the two helices
      if (i % 2 === 0) {
        const rungDistance = p1.distanceTo(p2);
        const rungGeo = new THREE.CylinderGeometry(0.02, 0.02, rungDistance, 8);
        const rungMesh = new THREE.Mesh(rungGeo, silverMat);
        rungMesh.position.copy(p1).add(p2).multiplyScalar(0.5);
        rungMesh.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3().subVectors(p2, p1).normalize(),
        );
        helixGroup.add(rungMesh);
      }
    }

    // Outer framing coordinate rings
    const helixRingGeo = new THREE.TorusGeometry(1.65, 0.012, 16, 80);
    const helixRing = new THREE.Mesh(helixRingGeo, silverMat);
    helixRing.rotation.x = Math.PI / 2;
    helixGroup.add(helixRing);

    // =========================================================================
    // MODEL 4: QUANTUM MODULAR CUBE MATRIX (Subdivided Spatial Voxel Relays)
    // =========================================================================
    const matrixGroup = new THREE.Group();
    rootGroup.add(matrixGroup);

    // Central core obsidian cube
    const centerCubeGeo = new THREE.BoxGeometry(0.72, 0.72, 0.72);
    const centerCube = new THREE.Mesh(centerCubeGeo, obsidianChromeMat);
    matrixGroup.add(centerCube);

    // Center wireframe bezel
    const centerWireGeo = new THREE.BoxGeometry(0.75, 0.75, 0.75);
    const centerWireMat = new THREE.MeshBasicMaterial({
      color: 0xf5f5f0,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const centerWire = new THREE.Mesh(centerWireGeo, centerWireMat);
    matrixGroup.add(centerWire);

    // Satellite orbiting cubes
    const satelliteCubes: { mesh: THREE.Mesh; basePos: THREE.Vector3 }[] = [];
    const spacing = 1.05;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 2) continue; // Keep elegant cross/diamond silhouette

          const satGeo = new THREE.BoxGeometry(0.28, 0.28, 0.28);
          const isSilver = (x + y + z) % 2 === 0;
          const satMat = isSilver ? silverMat : obsidianChromeMat;
          const satMesh = new THREE.Mesh(satGeo, satMat);

          const basePos = new THREE.Vector3(x * spacing, y * spacing, z * spacing);
          satMesh.position.copy(basePos);
          matrixGroup.add(satMesh);
          satelliteCubes.push({ mesh: satMesh, basePos });
        }
      }
    }

    // Outer coordinate ring
    const matrixRingGeo = new THREE.TorusGeometry(1.88, 0.012, 16, 90);
    const matrixRing = new THREE.Mesh(matrixRingGeo, silverMat);
    matrixRing.rotation.x = Math.PI / 4;
    matrixGroup.add(matrixRing);

    // =========================================================================
    // INTERACTION & DRAG-TO-ORBIT CONTROLS
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
      mouseHover.targetX = normX * 0.4;
      mouseHover.targetY = normY * 0.4;

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

    // =========================================================================
    // ANIMATION & DISPLACEMENT LOOP
    // =========================================================================
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrame = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const current = activeModelRef.current;

      // Smooth model visibility fading
      torusGroup.visible = current === "torus";
      fluidGroup.visible = current === "fluid";
      helixGroup.visible = current === "helix";
      matrixGroup.visible = current === "matrix";

      // Smooth rotation interpolation
      dragRotation.x += (dragRotation.targetX - dragRotation.x) * 0.08;
      dragRotation.y += (dragRotation.targetY - dragRotation.y) * 0.08;
      mouseHover.x += (mouseHover.targetX - mouseHover.x) * 0.05;
      mouseHover.y += (mouseHover.targetY - mouseHover.y) * 0.05;

      // Combine ambient drift + mouse parallax + drag-to-orbit
      rootGroup.rotation.y = dragRotation.y + mouseHover.x;
      rootGroup.rotation.x = dragRotation.x + mouseHover.y;

      if (!prefersReducedMotion) {
        // 1. Torus Knot Animations
        if (current === "torus") {
          knotMesh.rotation.y = elapsed * 0.28;
          knotMesh.rotation.x = Math.sin(elapsed * 0.2) * 0.2;
          ring1.rotation.z = elapsed * 0.35;
          ring2.rotation.z = -elapsed * 0.25;
          torusCore.rotation.y = -elapsed * 0.6;
          torusGroup.position.y = Math.sin(elapsed * 0.9) * 0.06;
        }

        // 2. Liquid Chrome Mesh Vertex Displacement
        else if (current === "fluid") {
          const pos = fluidGeo.attributes.position;
          const v = new THREE.Vector3();
          for (let i = 0; i < pos.count; i++) {
            v.fromArray(originalPositions, i * 3);
            const r = v.length();
            const wave =
              Math.sin(v.x * 2.2 + elapsed * 2.4) *
              Math.cos(v.y * 2.2 + elapsed * 2.0) *
              Math.sin(v.z * 2.2 + elapsed * 1.8);
            v.normalize().multiplyScalar(r + wave * 0.16);
            pos.setXYZ(i, v.x, v.y, v.z);
          }
          pos.needsUpdate = true;
          fluidGeo.computeVertexNormals();

          fluidMesh.rotation.y = elapsed * 0.18;
          fluidMesh.rotation.z = Math.sin(elapsed * 0.3) * 0.12;
          fluidRing.rotation.z = elapsed * 0.22;
          fluidGroup.position.y = Math.sin(elapsed * 0.8) * 0.06;
        }

        // 3. Helix Lattice Animations
        else if (current === "helix") {
          helixGroup.rotation.y = elapsed * 0.35;
          helixRing.rotation.z = -elapsed * 0.15;
          helixGroup.position.y = Math.sin(elapsed * 0.7) * 0.08;
        }

        // 4. Cube Matrix Breathing Animations
        else if (current === "matrix") {
          centerCube.rotation.y = elapsed * 0.3;
          centerCube.rotation.x = elapsed * 0.2;
          centerWire.rotation.y = -elapsed * 0.25;

          const breathe = 1 + Math.sin(elapsed * 2.2) * 0.14;
          satelliteCubes.forEach(({ mesh, basePos }) => {
            mesh.position.set(basePos.x * breathe, basePos.y * breathe, basePos.z * breathe);
            mesh.rotation.y = elapsed * 0.5;
          });
          matrixRing.rotation.z = elapsed * 0.2;
          matrixGroup.position.y = Math.sin(elapsed * 0.9) * 0.05;
        }
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

      knotGeo.dispose();
      obsidianChromeMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      torusCoreGeo.dispose();
      torusCoreMat.dispose();

      fluidGeo.dispose();
      fluidMat.dispose();
      fluidRingGeo.dispose();
      fluidRingMat.dispose();

      silverMat.dispose();
      helixRingGeo.dispose();

      centerCubeGeo.dispose();
      centerWireGeo.dispose();
      centerWireMat.dispose();
      matrixRingGeo.dispose();

      renderer.dispose();
      if (host && renderer.domElement && host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeOption = modelOptions.find((m) => m.id === activeModel) || modelOptions[0];

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* Top Floating Badge */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between text-[11px] font-medium text-[var(--text-muted)] pointer-events-none">
        <span className="badge-neutral py-1 px-2.5 backdrop-blur-md bg-[var(--bg-card)]/80">
          <Sparkles size={11} className="text-[var(--text-primary)]" />
          <span>{activeOption.tagline}</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 badge-neutral py-1 px-2.5 backdrop-blur-md bg-[var(--bg-card)]/80">
          <Rotate3D size={11} className="text-[var(--text-primary)]" />
          <span>Drag 360°</span>
        </span>
      </div>

      {/* Main Three.js Viewport */}
      <div
        ref={hostRef}
        className="w-full h-full min-h-[300px] sm:min-h-[360px] flex items-center justify-center select-none touch-none"
        aria-label={`Interactive 3D model: ${activeOption.label}. Drag to orbit.`}
      />

      {/* Bottom Floating Model Switcher Pills */}
      <div className="absolute bottom-3 left-2 right-2 z-20 flex items-center justify-center">
        <div
          role="tablist"
          aria-label="3D Model Switcher"
          className="flex items-center gap-1 p-1 rounded-full bg-[var(--bg-card)]/90 backdrop-blur-lg border border-[var(--border-main)] shadow-lg shadow-black/20 max-w-full overflow-x-auto"
        >
          {modelOptions.map((opt) => {
            const isSelected = activeModel === opt.id;
            return (
              <button
                key={opt.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveModel(opt.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? "bg-[var(--text-primary)] text-[var(--bg-page)] shadow-sm scale-105"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-light)]"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
