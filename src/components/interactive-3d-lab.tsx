"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RadioTower, Database, Boxes, Rotate3D } from "lucide-react";

type LabMode = "telemetry" | "backend" | "inventory";

const modes: { id: LabMode; label: string; icon: typeof RadioTower; desc: string }[] = [
  {
    id: "telemetry",
    label: "IoT Telemetry Node",
    icon: RadioTower,
    desc: "A spatial representation of sensor node data ingestion with dual-stream dispatch and packet transmission rings.",
  },
  {
    id: "backend",
    label: "Transactional Engine",
    icon: Database,
    desc: "Visualizing row-locking concurrency control, atomic transactions, and idempotent webhook queuing.",
  },
  {
    id: "inventory",
    label: "Warehouse Matrix",
    icon: Boxes,
    desc: "Multi-location serialized item tracking with audited stock allocation voxels.",
  },
];

export function Interactive3DLab() {
  const [activeMode, setActiveMode] = useState<LabMode>("telemetry");
  const hostRef = useRef<HTMLDivElement>(null);
  const activeModeRef = useRef<LabMode>(activeMode);

  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

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
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 100);
    camera.position.set(0, 1.8, 5.8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.enableZoom = true;
    controls.minDistance = 3.0;
    controls.maxDistance = 9;
    controls.target.set(0, 0.3, 0);

    // Studio Lighting in Black & Off-White
    const ambLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xfafafa, 3.4);
    dirLight.position.set(5, 7, 4);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xe4e4e7, 2.5);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x27272a, 0.9);
    fillLight.position.set(0, -3, 2);
    scene.add(fillLight);

    // Dynamic model container
    const modeGroup = new THREE.Group();
    scene.add(modeGroup);

    // Sub-scenes
    const telemetryGroup = new THREE.Group();
    const backendGroup = new THREE.Group();
    const inventoryGroup = new THREE.Group();

    modeGroup.add(telemetryGroup);
    modeGroup.add(backendGroup);
    modeGroup.add(inventoryGroup);

    // 1. TELEMETRY NODE (Glass + Off-White / Silver Accents)
    const globeGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const globeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.1,
      transmission: 0.88,
      ior: 1.5,
      transparent: true,
      opacity: 0.9,
      clearcoat: 1.0,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    telemetryGroup.add(globe);

    const wireGlobe = new THREE.Mesh(
      new THREE.SphereGeometry(1.18, 18, 18),
      new THREE.MeshBasicMaterial({ color: 0xd4d4d8, wireframe: true, transparent: true, opacity: 0.25 }),
    );
    telemetryGroup.add(wireGlobe);

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.42, 0.015, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0xf5f5f0 }),
    );
    ring1.rotation.x = Math.PI / 3;
    telemetryGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.01, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0xd4d4d8 }),
    );
    ring2.rotation.y = Math.PI / 4;
    telemetryGroup.add(ring2);

    const beaconCount = 8;
    const beacons: THREE.Mesh[] = [];
    for (let i = 0; i < beaconCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / beaconCount);
      const theta = Math.sqrt(beaconCount * Math.PI) * phi;
      const bMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 12, 12),
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0xf5f5f0 : 0xa1a1aa,
          emissive: i % 2 === 0 ? 0x222225 : 0x111114,
          emissiveIntensity: 0.8,
        }),
      );
      bMesh.position.setFromSphericalCoords(1.22, phi, theta);
      telemetryGroup.add(bMesh);
      beacons.push(bMesh);
    }

    // 2. BACKEND / DATABASE ENGINE (Obsidian Metallic Tiers + Off-White Relays)
    const tierCount = 4;
    for (let t = 0; t < tierCount; t++) {
      const tierGeo = new THREE.CylinderGeometry(1.2 - t * 0.12, 1.25 - t * 0.12, 0.28, 36);
      const tierMat = new THREE.MeshStandardMaterial({
        color: 0x18181c,
        metalness: 0.9,
        roughness: 0.2,
      });
      const tierMesh = new THREE.Mesh(tierGeo, tierMat);
      tierMesh.position.y = -0.5 + t * 0.48;
      backendGroup.add(tierMesh);

      const statusRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.22 - t * 0.12, 0.018, 12, 60),
        new THREE.MeshBasicMaterial({ color: t === 1 ? 0xf5f5f0 : 0x71717a }),
      );
      statusRing.rotation.x = Math.PI / 2;
      statusRing.position.y = tierMesh.position.y;
      backendGroup.add(statusRing);
    }

    const txBlocks: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const bGeo = new THREE.BoxGeometry(0.24, 0.18, 0.12);
      const bMat = new THREE.MeshStandardMaterial({
        color: 0xf5f5f0,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x222225,
        emissiveIntensity: 0.5,
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      backendGroup.add(bMesh);
      txBlocks.push(bMesh);
    }

    // 3. INVENTORY NEURAL MATRIX (Frosted Glass Cubes + Obsidian Nodes)
    const spacing = 0.58;
    const voxels: THREE.Mesh[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          const vGeo = new THREE.BoxGeometry(0.38, 0.38, 0.38);
          const isAccent = (x + y + z) % 3 === 0;
          const vMat = new THREE.MeshPhysicalMaterial({
            color: isAccent ? 0xf5f5f0 : 0x18181b,
            transmission: 0.8,
            roughness: 0.15,
            metalness: 0.15,
            transparent: true,
            opacity: 0.85,
            emissive: isAccent ? 0x222225 : 0x000000,
            emissiveIntensity: isAccent ? 0.3 : 0,
          });
          const vMesh = new THREE.Mesh(vGeo, vMat);
          vMesh.position.set(x * spacing, y * spacing + 0.4, z * spacing);
          inventoryGroup.add(vMesh);
          voxels.push(vMesh);
        }
      }
    }

    // Gentle ambient dust in soft silver
    const dustCount = 100;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 8;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustPoints = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: 0xd4d4d8, size: 0.02, transparent: true, opacity: 0.35 }),
    );
    scene.add(dustPoints);

    const handleResize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(host);

    const clock = new THREE.Clock();
    const animate = () => {
      if (isDisposed) return;
      animationFrame = window.requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsed = clock.getElapsedTime();
      controls.update();

      const curMode = activeModeRef.current;
      telemetryGroup.visible = curMode === "telemetry";
      backendGroup.visible = curMode === "backend";
      inventoryGroup.visible = curMode === "inventory";

      if (curMode === "telemetry") {
        wireGlobe.rotation.y = elapsed * 0.2;
        ring1.rotation.z = elapsed * 0.3;
        ring2.rotation.x = elapsed * 0.25;
        beacons.forEach((b, idx) => {
          const s = 1 + Math.sin(elapsed * 3.5 + idx) * 0.2;
          b.scale.set(s, s, s);
        });
      } else if (curMode === "backend") {
        txBlocks.forEach((b, i) => {
          const angle = elapsed * 1.0 + (i * Math.PI * 2) / txBlocks.length;
          b.position.set(Math.cos(angle) * 1.55, Math.sin(elapsed * 1.8 + i) * 0.35, Math.sin(angle) * 1.55);
          b.rotation.y = angle;
        });
      } else if (curMode === "inventory") {
        voxels.forEach((v, idx) => {
          v.rotation.x = Math.sin(elapsed * 0.6 + idx * 0.3) * 0.12;
          v.rotation.y = Math.cos(elapsed * 0.6 + idx * 0.3) * 0.12;
        });
      }

      dustPoints.rotation.y = elapsed * 0.015;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(animationFrame);
      ro.disconnect();
      controls.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[var(--shadow-card)]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="badge-inexa mb-3">
            <span>3D System Inspector</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            Interactive Architecture Visualizer
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            Live procedural WebGL models depicting full-stack architectural concepts.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-2xl" role="tablist">
          {modes.map((m) => {
            const Icon = m.icon;
            const isActive = activeMode === m.id;
            return (
              <button
                key={m.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveMode(m.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[var(--bg-card)] text-[var(--accent-primary)] shadow-sm border border-[var(--border-main)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon size={15} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Viewport */}
      <div className="relative mt-6 rounded-2xl overflow-hidden bg-[var(--bg-subtle)] border border-[var(--border-subtle)] h-[380px] sm:h-[450px]">
        <div ref={hostRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating helper badge */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="badge-neutral text-xs backdrop-blur-md bg-[var(--bg-card)]/90 py-1.5 px-3">
            <Rotate3D size={13} className="text-[var(--accent-primary)]" />
            <span>Drag to rotate · Scroll to zoom</span>
          </span>
          <span className="badge-inexa text-xs backdrop-blur-md bg-[var(--bg-card)]/90 py-1.5 px-3">
            <span>WebGL 60fps</span>
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mt-5 flex items-start gap-3 p-4 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-2xl text-sm text-[var(--text-secondary)]">
        <span className="text-[var(--accent-primary)] font-bold text-base leading-none">↳</span>
        <p className="m-0 leading-relaxed">{modes.find((m) => m.id === activeMode)?.desc}</p>
      </div>
    </div>
  );
}
