"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RadioTower, Database, Boxes, Rotate3D, Activity } from "lucide-react";

type LabMode = "telemetry" | "backend" | "inventory";

const modes: { id: LabMode; label: string; icon: typeof RadioTower; desc: string }[] = [
  {
    id: "telemetry",
    label: "IoT Sensor Node",
    icon: RadioTower,
    desc: "Simulated CPCB analyzer telemetry orb with radial signal beams and live data packet broadcast.",
  },
  {
    id: "backend",
    label: "Transactional Engine",
    icon: Database,
    desc: "ACID transaction matrix with row-locking relays and idempotent webhook queues.",
  },
  {
    id: "inventory",
    label: "Spatial Warehouse Matrix",
    icon: Boxes,
    desc: "Multi-rack serialized item storage grid with dynamic stock allocation voxels.",
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
    controls.autoRotateSpeed = 1.4;
    controls.enableZoom = true;
    controls.minDistance = 3.2;
    controls.maxDistance = 10;
    controls.target.set(0, 0.4, 0);

    // Studio Lights for Cyber Obsidian Mode
    const ambLight = new THREE.AmbientLight(0x0f172a, 2.2);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 8, 4);
    scene.add(dirLight);

    const redLight = new THREE.PointLight(0xff2a55, 28, 12);
    redLight.position.set(-3, 2, 2);
    scene.add(redLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 32, 12);
    cyanLight.position.set(3, 2, -2);
    scene.add(cyanLight);

    // Dynamic model container
    const modeGroup = new THREE.Group();
    scene.add(modeGroup);

    // Build sub-scenes
    const telemetryGroup = new THREE.Group();
    const backendGroup = new THREE.Group();
    const inventoryGroup = new THREE.Group();

    modeGroup.add(telemetryGroup);
    modeGroup.add(backendGroup);
    modeGroup.add(inventoryGroup);

    // --- 1. TELEMETRY NODE (Light Glass) ---
    const globeGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const globeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      transparent: true,
      opacity: 0.85,
      clearcoat: 1.0,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    telemetryGroup.add(globe);

    const wireGlobe = new THREE.Mesh(
      new THREE.SphereGeometry(1.18, 18, 18),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.45 }),
    );
    telemetryGroup.add(wireGlobe);

    // Latitude & Longitude rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.42, 0.015, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0xff2a55 }),
    );
    ring1.rotation.x = Math.PI / 3;
    telemetryGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.01, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff }),
    );
    ring2.rotation.y = Math.PI / 4;
    telemetryGroup.add(ring2);

    // Sensor beacons
    const beaconCount = 8;
    const beacons: THREE.Mesh[] = [];
    for (let i = 0; i < beaconCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / beaconCount);
      const theta = Math.sqrt(beaconCount * Math.PI) * phi;
      const bMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 12, 12),
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0xff2a55 : 0x059669,
          emissive: i % 2 === 0 ? 0xff2a55 : 0x059669,
          emissiveIntensity: 0.8,
        }),
      );
      bMesh.position.setFromSphericalCoords(1.22, phi, theta);
      telemetryGroup.add(bMesh);
      beacons.push(bMesh);
    }

    // --- 2. BACKEND / DATABASE ENGINE (Light Anodized Silver) ---
    const tierCount = 4;
    const tiers: THREE.Mesh[] = [];
    for (let t = 0; t < tierCount; t++) {
      const tierGeo = new THREE.CylinderGeometry(1.2 - t * 0.12, 1.25 - t * 0.12, 0.28, 36);
      const tierMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.75,
        roughness: 0.2,
      });
      const tierMesh = new THREE.Mesh(tierGeo, tierMat);
      tierMesh.position.y = -0.5 + t * 0.48;
      backendGroup.add(tierMesh);
      tiers.push(tierMesh);

      // Status indicator ring
      const statusRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.22 - t * 0.12, 0.018, 12, 60),
        new THREE.MeshBasicMaterial({ color: t === 1 ? 0xff2a55 : 0x00f0ff }),
      );
      statusRing.rotation.x = Math.PI / 2;
      statusRing.position.y = tierMesh.position.y;
      backendGroup.add(statusRing);
    }

    // Floating transaction blocks
    const txBlocks: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const bGeo = new THREE.BoxGeometry(0.24, 0.18, 0.12);
      const bMat = new THREE.MeshStandardMaterial({
        color: 0x059669,
        emissive: 0x059669,
        emissiveIntensity: 0.6,
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      backendGroup.add(bMesh);
      txBlocks.push(bMesh);
    }

    // --- 3. INVENTORY NEURAL MATRIX (Light Frosted Voxel Glass) ---
    const voxels: THREE.Mesh[] = [];
    const spacing = 0.58;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          const vGeo = new THREE.BoxGeometry(0.38, 0.38, 0.38);
          const isAccent = (x + y + z) % 3 === 0;
          const vMat = new THREE.MeshPhysicalMaterial({
            color: isAccent ? 0xff2a55 : 0x0284c7,
            transmission: 0.8,
            roughness: 0.1,
            metalness: 0.1,
            transparent: true,
            opacity: 0.88,
            emissive: isAccent ? 0xff2a55 : 0x0284c7,
            emissiveIntensity: 0.35,
          });
          const vMesh = new THREE.Mesh(vGeo, vMat);
          vMesh.position.set(x * spacing, y * spacing + 0.4, z * spacing);
          inventoryGroup.add(vMesh);
          voxels.push(vMesh);
        }
      }
    }

    // Star dust (Light Theme slate-blue)
    const dustCount = 180;
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
      new THREE.PointsMaterial({ color: 0x64748b, size: 0.02, transparent: true, opacity: 0.35 }),
    );
    scene.add(dustPoints);

    // Resize observer
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
        wireGlobe.rotation.y = elapsed * 0.25;
        ring1.rotation.z = elapsed * 0.4;
        ring2.rotation.x = elapsed * 0.35;
        beacons.forEach((b, idx) => {
          const s = 1 + Math.sin(elapsed * 4 + idx) * 0.25;
          b.scale.set(s, s, s);
        });
      } else if (curMode === "backend") {
        txBlocks.forEach((b, i) => {
          const angle = elapsed * 1.2 + (i * Math.PI * 2) / txBlocks.length;
          b.position.set(Math.cos(angle) * 1.55, Math.sin(elapsed * 2 + i) * 0.4, Math.sin(angle) * 1.55);
          b.rotation.y = angle;
        });
      } else if (curMode === "inventory") {
        voxels.forEach((v, idx) => {
          v.rotation.x = Math.sin(elapsed * 0.8 + idx * 0.3) * 0.15;
          v.rotation.y = Math.cos(elapsed * 0.8 + idx * 0.3) * 0.15;
        });
      }

      dustPoints.rotation.y = elapsed * 0.02;
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
    <div className="lab-card-shell">
      <div className="lab-header">
        <div className="lab-title-wrap">
          <div className="glyph-badge">
            <span className="live-dot" />
            <span>3D SYSTEM INSPECTOR // REAL-TIME WEBGL</span>
          </div>
          <h3>Interactive Architecture Visualizer</h3>
          <p>
            Explore live 3D models representing telemetry pipelines, transactional database workflows, and spatial
            inventory structures. Drag to orbit 360°, zoom in to inspect details.
          </p>
        </div>

        <div className="lab-tabs" role="tablist">
          {modes.map((m) => {
            const Icon = m.icon;
            const isActive = activeMode === m.id;
            return (
              <button
                key={m.id}
                role="tab"
                aria-selected={isActive}
                className={`lab-tab-btn ${isActive ? "active" : ""}`}
                onClick={() => setActiveMode(m.id)}
              >
                <Icon size={14} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lab-viewport-wrap">
        <div ref={hostRef} className="lab-canvas" />

        {/* Technical HUD Overlay in Light Mode */}
        <div className="lab-hud-overlay">
          <div className="hud-corner-tl">
            <span className="hud-bracket">[</span>
            <span>MODEL: {activeMode.toUpperCase()}</span>
          </div>

          <div className="hud-corner-tr">
            <Activity size={12} className="spin-slow" />
            <span>60 FPS · DYNAMIC SHADER</span>
          </div>

          <div className="hud-bottom-bar">
            <span className="hud-hint">
              <Rotate3D size={13} /> CLICK & DRAG TO ORBIT 360° · SCROLL TO ZOOM
            </span>
            <span className="hud-metric">ACTIVE NODE ID // 0{activeMode === "telemetry" ? "1" : activeMode === "backend" ? "2" : "3"}</span>
          </div>
        </div>
      </div>

      <div className="lab-footer-desc">
        <span className="desc-mark">↳</span>
        <p>{modes.find((m) => m.id === activeMode)?.desc}</p>
      </div>
    </div>
  );
}
