"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Magnet, Waves, Play } from "lucide-react";

type MotionState = "idle" | "attract" | "ripple";

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [activeState, setActiveState] = useState<MotionState>("attract");
  const activeStateRef = useRef<MotionState>(activeState);

  useEffect(() => {
    activeStateRef.current = activeState;
  }, [activeState]);

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
    renderer.toneMappingExposure = 1.15;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 100);
    camera.position.set(0, 0, 6.2);

    // =========================================================================
    // STUDIO LIGHTING (Electric Lavender #A66BFF & Lemon #FFF21A on Charcoal #171717)
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Primary Electric Lavender directional key light
    const lavenderLight = new THREE.DirectionalLight(0xa66bff, 5.0);
    lavenderLight.position.set(4.5, 4.0, 3.5);
    scene.add(lavenderLight);

    // Contrasting Lemon Yellow directional rim light
    const lemonLight = new THREE.DirectionalLight(0xfff21a, 4.5);
    lemonLight.position.set(-4.5, -3.5, -3.0);
    scene.add(lemonLight);

    // Cool subtle fill light from above
    const fillLight = new THREE.DirectionalLight(0x28233a, 1.2);
    fillLight.position.set(0, 5, 2);
    scene.add(fillLight);

    // Root Group for interactive rotation
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // =========================================================================
    // 1. CENTRAL TRANSLUCENT CHARCOAL GLASS SPHERE
    // =========================================================================
    const glassGeo = new THREE.SphereGeometry(1.28, 48, 48);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x171717,
      metalness: 0.15,
      roughness: 0.08,
      transmission: 0.62,
      transparent: true,
      opacity: 0.32,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
      depthWrite: false,
    });
    const glassSphere = new THREE.Mesh(glassGeo, glassMat);
    rootGroup.add(glassSphere);

    // =========================================================================
    // 2. INNER WAVE-RIPPLE PARTICLE CORE (Lavender & Lemon Harmonics)
    // =========================================================================
    const coreParticleCount = 1800;
    const corePositions = new Float32Array(coreParticleCount * 3);
    const coreBasePositions = new Float32Array(coreParticleCount * 3);
    const coreColors = new Float32Array(coreParticleCount * 3);
    const corePhaseOffsets = new Float32Array(coreParticleCount);

    // Stratified Fibonacci Sphere generation
    const phiAngle = Math.PI * (Math.sqrt(5) - 1);
    for (let i = 0; i < coreParticleCount; i++) {
      const y = 1 - (i / (coreParticleCount - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phiAngle * i;

      // Concentric internal radii from 0.45 to 1.18
      const radiusFactor = 0.45 + (i % 6) * 0.14;
      const x = Math.cos(theta) * radiusAtY * radiusFactor;
      const z = Math.sin(theta) * radiusAtY * radiusFactor;
      const finalY = y * radiusFactor;

      corePositions[i * 3] = x;
      corePositions[i * 3 + 1] = finalY;
      corePositions[i * 3 + 2] = z;

      coreBasePositions[i * 3] = x;
      coreBasePositions[i * 3 + 1] = finalY;
      coreBasePositions[i * 3 + 2] = z;

      corePhaseOffsets[i] = Math.atan2(z, x) + finalY * 2.5;

      // Palette: 65% Electric Lavender (#A66BFF), 25% Lemon Yellow (#FFF21A), 10% Radiant White
      if (i % 4 === 0) {
        // Lemon Yellow highlights
        coreColors[i * 3] = 1.0;
        coreColors[i * 3 + 1] = 0.95;
        coreColors[i * 3 + 2] = 0.1;
      } else if (i % 9 === 0) {
        // Radiant White crests
        coreColors[i * 3] = 1.0;
        coreColors[i * 3 + 1] = 1.0;
        coreColors[i * 3 + 2] = 1.0;
      } else {
        // Electric Lavender core
        coreColors[i * 3] = 0.65;
        coreColors[i * 3 + 1] = 0.42;
        coreColors[i * 3 + 2] = 1.0;
      }
    }

    const coreGeo = new THREE.BufferGeometry();
    coreGeo.setAttribute("position", new THREE.BufferAttribute(corePositions, 3));
    coreGeo.setAttribute("color", new THREE.BufferAttribute(coreColors, 3));

    const coreMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
    });
    const coreParticles = new THREE.Points(coreGeo, coreMat);
    rootGroup.add(coreParticles);

    // =========================================================================
    // 3. NESTED ORBITAL THREAD RINGS (Spirograph Gimbal Orbits)
    // =========================================================================
    const ringGroup = new THREE.Group();
    rootGroup.add(ringGroup);

    interface RingConfig {
      mesh: THREE.LineLoop;
      radius: number;
      speed: number;
      euler: THREE.Euler;
    }

    const rings: RingConfig[] = [];
    const ringRadii = [1.45, 1.62, 1.78, 1.95, 2.12, 2.28];
    const ringSegments = 96;

    ringRadii.forEach((r, idx) => {
      const ringPts: THREE.Vector3[] = [];
      for (let s = 0; s <= ringSegments; s++) {
        const angle = (s / ringSegments) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0));
      }
      const rGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
      const isLemonAccent = idx === 1 || idx === 4;
      const rMat = new THREE.LineBasicMaterial({
        color: isLemonAccent ? 0xfff21a : 0xa66bff,
        transparent: true,
        opacity: isLemonAccent ? 0.32 : 0.26,
      });
      const rMesh = new THREE.LineLoop(rGeo, rMat);

      // Varying initial 3D inclinations
      const euler = new THREE.Euler(
        (idx * Math.PI) / 5 + 0.2,
        (idx * Math.PI) / 4 + 0.3,
        (idx * Math.PI) / 7,
      );
      rMesh.rotation.copy(euler);
      ringGroup.add(rMesh);

      rings.push({
        mesh: rMesh,
        radius: r,
        speed: (idx % 2 === 0 ? 1 : -1) * (0.15 + (idx * 0.03)),
        euler,
      });
    });

    // =========================================================================
    // 4. METALLIC BEAD NODES (Threaded Pearls Orbiting Along the Rings)
    // =========================================================================
    const beadsGroup = new THREE.Group();
    rootGroup.add(beadsGroup);

    interface BeadNode {
      mesh: THREE.Mesh;
      ringIndex: number;
      angle: number;
      speed: number;
      radius: number;
      basePos: THREE.Vector3;
      currentPos: THREE.Vector3;
    }

    const beadNodes: BeadNode[] = [];
    const beadCount = 38;
    const beadGeo = new THREE.SphereGeometry(1, 16, 16);
    const beadMatChrome = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      metalness: 0.95,
      roughness: 0.12,
    });
    const beadMatLavender = new THREE.MeshStandardMaterial({
      color: 0xa66bff,
      emissive: 0xa66bff,
      emissiveIntensity: 0.6,
      metalness: 0.85,
      roughness: 0.2,
    });
    const beadMatLemon = new THREE.MeshStandardMaterial({
      color: 0xfff21a,
      emissive: 0xfff21a,
      emissiveIntensity: 0.6,
      metalness: 0.85,
      roughness: 0.2,
    });

    for (let i = 0; i < beadCount; i++) {
      const ringIdx = i % rings.length;
      const chosenRing = rings[ringIdx];
      const scale = 0.045 + (i % 4) * 0.016;

      const mat =
        i % 7 === 0 ? beadMatLemon : i % 3 === 0 ? beadMatLavender : beadMatChrome;

      const bMesh = new THREE.Mesh(beadGeo, mat);
      bMesh.scale.setScalar(scale);
      beadsGroup.add(bMesh);

      beadNodes.push({
        mesh: bMesh,
        ringIndex: ringIdx,
        angle: (i / beadCount) * Math.PI * 2 * 3,
        speed: chosenRing.speed * 0.8,
        radius: chosenRing.radius,
        basePos: new THREE.Vector3(),
        currentPos: new THREE.Vector3(),
      });
    }

    // =========================================================================
    // 5. MAGNETIC ATTRACTION FILAMENTS (Elastic Streamers Pulling Toward Cursor)
    // =========================================================================
    const filamentCount = 42;
    const segmentsPerFilament = 14;
    const totalFilamentVertices = filamentCount * segmentsPerFilament;

    const filamentPositions = new Float32Array(totalFilamentVertices * 3);
    const filamentColors = new Float32Array(totalFilamentVertices * 3);

    const filamentAnchors: THREE.Vector3[] = [];
    const filamentCurrentHeads: THREE.Vector3[] = [];
    const filamentTargetHeads: THREE.Vector3[] = [];

    for (let f = 0; f < filamentCount; f++) {
      const phi = Math.acos(1 - (2 * (f + 0.5)) / filamentCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * f;
      const anchor = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * 1.15,
        Math.cos(phi) * 1.15,
        Math.sin(phi) * Math.sin(theta) * 1.15,
      );
      filamentAnchors.push(anchor);
      filamentCurrentHeads.push(anchor.clone().multiplyScalar(1.2));
      filamentTargetHeads.push(anchor.clone().multiplyScalar(1.2));

      // Color gradient: Electric Lavender base flowing into Lemon Yellow tip
      for (let s = 0; s < segmentsPerFilament; s++) {
        const idx = (f * segmentsPerFilament + s) * 3;
        const progress = s / (segmentsPerFilament - 1);

        if (f % 4 === 0) {
          // Lemon streamers
          filamentColors[idx] = THREE.MathUtils.lerp(1.0, 1.0, progress);
          filamentColors[idx + 1] = THREE.MathUtils.lerp(0.85, 0.98, progress);
          filamentColors[idx + 2] = THREE.MathUtils.lerp(0.1, 0.6, progress);
        } else {
          // Lavender to Lemon gradient
          filamentColors[idx] = THREE.MathUtils.lerp(0.65, 1.0, progress);
          filamentColors[idx + 1] = THREE.MathUtils.lerp(0.42, 0.95, progress);
          filamentColors[idx + 2] = THREE.MathUtils.lerp(1.0, 0.1, progress);
        }
      }
    }

    const filamentGeo = new THREE.BufferGeometry();
    filamentGeo.setAttribute("position", new THREE.BufferAttribute(filamentPositions, 3));
    filamentGeo.setAttribute("color", new THREE.BufferAttribute(filamentColors, 3));

    const filamentMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
    });

    const filamentIndices: number[] = [];
    for (let f = 0; f < filamentCount; f++) {
      for (let s = 0; s < segmentsPerFilament - 1; s++) {
        const start = f * segmentsPerFilament + s;
        filamentIndices.push(start, start + 1);
      }
    }
    filamentGeo.setIndex(filamentIndices);

    const filamentLines = new THREE.LineSegments(filamentGeo, filamentMat);
    rootGroup.add(filamentLines);

    // =========================================================================
    // 6. INTERACTIVE CURSOR TRACKING & ELASTIC PHYSICS
    // =========================================================================
    const mouseNdc = new THREE.Vector2(0, 0);
    const targetNdc = new THREE.Vector2(0, 0);
    const pointerWorld = new THREE.Vector3(2.0, 0.5, 0.0);
    const targetPointerWorld = new THREE.Vector3(2.0, 0.5, 0.0);
    let isHovering = false;
    let isDragging = false;
    let prevClientX = 0;
    let prevClientY = 0;
    const dragRotation = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const raycaster = new THREE.Raycaster();
    const planeZ0 = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();

    const updatePointerWorld = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);
      targetNdc.set(nx, ny);

      raycaster.setFromCamera(targetNdc, camera);
      if (raycaster.ray.intersectPlane(planeZ0, intersectPoint)) {
        targetPointerWorld.copy(intersectPoint);
        targetPointerWorld.clampLength(0.2, 2.9);
      }
    };

    const onPointerEnter = (e: PointerEvent) => {
      isHovering = true;
      updatePointerWorld(e.clientX, e.clientY);
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointerWorld(e.clientX, e.clientY);

      if (isDragging) {
        const deltaX = e.clientX - prevClientX;
        const deltaY = e.clientY - prevClientY;
        dragRotation.targetY += deltaX * 0.008;
        dragRotation.targetX += deltaY * 0.008;
        prevClientX = e.clientX;
        prevClientY = e.clientY;
      }
    };

    const onPointerLeave = () => {
      isHovering = false;
      isDragging = false;
      host.style.cursor = "grab";
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevClientX = e.clientX;
      prevClientY = e.clientY;
      host.style.cursor = "grabbing";
    };

    const onPointerUp = () => {
      isDragging = false;
      host.style.cursor = "grab";
    };

    host.style.cursor = "grab";
    host.addEventListener("pointerenter", onPointerEnter);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    host.addEventListener("pointerdown", onPointerDown);
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
    // 7. ANIMATION LOOP WITH MAGNETIC PHYSICS & WAVE RIPPLES
    // =========================================================================
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrame = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const currentMode = activeStateRef.current;

      // Smooth pointer interpolation
      mouseNdc.lerp(targetNdc, 0.08);
      pointerWorld.lerp(targetPointerWorld, 0.1);

      // Smooth drag orbit damping
      dragRotation.x += (dragRotation.targetX - dragRotation.x) * 0.08;
      dragRotation.y += (dragRotation.targetY - dragRotation.y) * 0.08;

      rootGroup.rotation.y = dragRotation.y + mouseNdc.x * 0.25;
      rootGroup.rotation.x = dragRotation.x - mouseNdc.y * 0.25;

      if (!prefersReducedMotion) {
        // --- A. INNER WAVE RIPPLE (Harmonic Waves Through Core) ---
        const corePosAttr = coreGeo.attributes.position as THREE.BufferAttribute;
        const posArray = corePosAttr.array as Float32Array;

        const isRippleMode = currentMode === "ripple";
        const waveSpeed = isRippleMode ? 4.2 : isHovering ? 2.8 : 1.6;
        const waveAmp = isRippleMode ? 0.16 : isHovering ? 0.09 : 0.05;

        for (let i = 0; i < coreParticleCount; i++) {
          const bx = coreBasePositions[i * 3];
          const by = coreBasePositions[i * 3 + 1];
          const bz = coreBasePositions[i * 3 + 2];
          const phase = corePhaseOffsets[i];

          const wave =
            Math.sin(phase * 3.0 + elapsed * waveSpeed) *
            Math.cos(by * 4.0 + elapsed * 1.8);

          const factor = 1.0 + wave * waveAmp;

          posArray[i * 3] = bx * factor;
          posArray[i * 3 + 1] = by * factor;
          posArray[i * 3 + 2] = bz * factor;
        }
        corePosAttr.needsUpdate = true;
        coreParticles.rotation.y = elapsed * 0.12;

        // --- B. ORBITAL RINGS ROTATION ---
        rings.forEach((r) => {
          r.mesh.rotation.z = r.euler.z + elapsed * r.speed;
        });

        // --- C. METALLIC BEAD NODES WITH ELASTIC MAGNETIC PULL ---
        const isAttractMode = currentMode === "attract" || isHovering;
        const attractStrength = isAttractMode ? 0.55 : 0.1;

        beadNodes.forEach((b) => {
          b.angle += b.speed * 0.02;
          const r = rings[b.ringIndex];

          const cosA = Math.cos(b.angle) * b.radius;
          const sinA = Math.sin(b.angle) * b.radius;
          const localPos = new THREE.Vector3(cosA, sinA, 0);
          localPos.applyEuler(r.mesh.rotation);
          b.basePos.copy(localPos);

          if (isAttractMode) {
            const dist = b.basePos.distanceTo(pointerWorld);
            if (dist < 2.6) {
              const pullFactor = Math.pow(Math.max(0, 1 - dist / 2.6), 1.8) * attractStrength;
              b.currentPos.lerpVectors(b.basePos, pointerWorld, pullFactor);
            } else {
              b.currentPos.lerp(b.basePos, 0.12);
            }
          } else {
            b.currentPos.lerp(b.basePos, 0.12);
          }

          b.mesh.position.copy(b.currentPos);
        });

        // --- D. MAGNETIC ATTRACTION FILAMENTS ---
        const filPosAttr = filamentGeo.attributes.position as THREE.BufferAttribute;
        const filArray = filPosAttr.array as Float32Array;

        for (let f = 0; f < filamentCount; f++) {
          const anchor = filamentAnchors[f];
          const currHead = filamentCurrentHeads[f];
          const targetHead = filamentTargetHeads[f];

          if (isAttractMode) {
            const distToCursor = anchor.distanceTo(pointerWorld);
            if (distToCursor < 3.2) {
              const pullWeight = Math.pow(Math.max(0, 1 - distToCursor / 3.2), 1.4);
              targetHead.copy(pointerWorld).add(
                new THREE.Vector3(
                  Math.sin(elapsed * 3 + f) * 0.12,
                  Math.cos(elapsed * 2.5 + f) * 0.12,
                  Math.sin(elapsed * 2 + f) * 0.12,
                ),
              );
              currHead.lerp(targetHead, 0.12 * pullWeight + 0.04);
            } else {
              targetHead.copy(anchor).multiplyScalar(1.25);
              currHead.lerp(targetHead, 0.08);
            }
          } else {
            const breath = 1.2 + Math.sin(elapsed * 1.5 + f) * 0.1;
            targetHead.copy(anchor).multiplyScalar(breath);
            currHead.lerp(targetHead, 0.06);
          }

          const midPoint = new THREE.Vector3()
            .addVectors(anchor, currHead)
            .multiplyScalar(0.5)
            .normalize()
            .multiplyScalar(1.35 + Math.sin(elapsed * 2 + f) * 0.08);

          for (let s = 0; s < segmentsPerFilament; s++) {
            const t = s / (segmentsPerFilament - 1);
            const invT = 1 - t;
            const px = invT * invT * anchor.x + 2 * invT * t * midPoint.x + t * t * currHead.x;
            const py = invT * invT * anchor.y + 2 * invT * t * midPoint.y + t * t * currHead.y;
            const pz = invT * invT * anchor.z + 2 * invT * t * midPoint.z + t * t * currHead.z;

            const idx = (f * segmentsPerFilament + s) * 3;
            filArray[idx] = px;
            filArray[idx + 1] = py;
            filArray[idx + 2] = pz;
          }
        }
        filPosAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrame);
      host.removeEventListener("pointerenter", onPointerEnter);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);

      glassGeo.dispose();
      glassMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      rings.forEach((r) => {
        r.mesh.geometry.dispose();
        (r.mesh.material as THREE.Material).dispose();
      });
      beadGeo.dispose();
      beadMatChrome.dispose();
      beadMatLavender.dispose();
      beadMatLemon.dispose();
      filamentGeo.dispose();
      filamentMat.dispose();

      renderer.dispose();
      if (host && renderer.domElement && host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 sm:p-4 select-none">
      {/* Top Header Card matching the Reference */}
      <div className="relative z-20 flex flex-col items-start gap-1 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[var(--accent-primary)] tracking-widest">
            01
          </span>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
            MAGNETIC ATTRACTION &amp; WAVE RIPPLE
          </span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-[var(--text-secondary)] leading-snug max-w-xs sm:max-w-sm m-0">
          Cursor gently pulls outer particle nodes with elastic physics, while hovering creates harmonic wave ripples through the core.
        </p>
      </div>

      {/* Main Three.js Viewport */}
      <div
        ref={hostRef}
        className="w-full h-full min-h-[300px] sm:min-h-[380px] flex items-center justify-center touch-none my-1"
        aria-label="3D Magnetic Attraction & Wave Ripple Structure in Lemon, Charcoal Black and Electric Lavender."
      />

      {/* Bottom Interactive State Mode Switchers matching the 3 cards in the Reference */}
      <div className="relative z-20 grid grid-cols-3 gap-1.5 sm:gap-2 pt-2 border-t border-[var(--border-subtle)]">
        <button
          type="button"
          onClick={() => setActiveState("idle")}
          className={`flex flex-col items-start p-1.5 sm:p-2 rounded-xl text-left transition-all duration-200 border ${
            activeState === "idle"
              ? "bg-[var(--bg-card)] border-[var(--accent-secondary)] shadow-[0_0_12px_rgba(166,107,255,0.25)]"
              : "bg-[var(--bg-subtle)]/60 border-[var(--border-subtle)] hover:border-[var(--border-main)] hover:bg-[var(--bg-card)]"
          }`}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <Play size={10} className={activeState === "idle" ? "text-[var(--accent-secondary)]" : "text-[var(--text-muted)]"} />
            <span className="text-[10px] sm:text-[11px] font-bold text-[var(--text-primary)] leading-none">
              Idle State
            </span>
          </div>
          <span className="text-[8.5px] sm:text-[9.5px] text-[var(--text-muted)] leading-tight">
            Calm orbital motion
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveState("attract")}
          className={`flex flex-col items-start p-1.5 sm:p-2 rounded-xl text-left transition-all duration-200 border ${
            activeState === "attract"
              ? "bg-[var(--bg-card)] border-[var(--accent-primary)] shadow-[0_0_12px_rgba(255,242,26,0.3)]"
              : "bg-[var(--bg-subtle)]/60 border-[var(--border-subtle)] hover:border-[var(--border-main)] hover:bg-[var(--bg-card)]"
          }`}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <Magnet size={10} className={activeState === "attract" ? "text-[var(--accent-primary)]" : "text-[var(--text-muted)]"} />
            <span className="text-[10px] sm:text-[11px] font-bold text-[var(--text-primary)] leading-none">
              Cursor Attraction
            </span>
          </div>
          <span className="text-[8.5px] sm:text-[9.5px] text-[var(--text-muted)] leading-tight">
            Elastic particle pull
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveState("ripple")}
          className={`flex flex-col items-start p-1.5 sm:p-2 rounded-xl text-left transition-all duration-200 border ${
            activeState === "ripple"
              ? "bg-[var(--bg-card)] border-[var(--accent-secondary)] shadow-[0_0_12px_rgba(166,107,255,0.3)]"
              : "bg-[var(--bg-subtle)]/60 border-[var(--border-subtle)] hover:border-[var(--border-main)] hover:bg-[var(--bg-card)]"
          }`}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <Waves size={10} className={activeState === "ripple" ? "text-[var(--accent-secondary)]" : "text-[var(--text-muted)]"} />
            <span className="text-[10px] sm:text-[11px] font-bold text-[var(--text-primary)] leading-none">
              Wave Ripple
            </span>
          </div>
          <span className="text-[8.5px] sm:text-[9.5px] text-[var(--text-muted)] leading-tight">
            Harmonic core waves
          </span>
        </button>
      </div>
    </div>
  );
}
