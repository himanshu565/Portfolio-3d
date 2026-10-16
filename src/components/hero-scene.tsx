"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RotateCw, Compass } from "lucide-react";

function createGlassPanel(
  THREE_NS: typeof THREE,
  parent: THREE.Group,
  x: number,
  y: number,
  z: number,
  accentColor: number,
  type: "telemetry" | "inventory" | "security",
) {
  const panel = new THREE_NS.Group();
  panel.position.set(x, y, z);
  panel.rotation.set(-0.04, x > 0 ? -0.22 : 0.22, 0);

  // Translucent frosted white glass backing (Apple Light Glass)
  const glassMat = new THREE_NS.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.12,
    metalness: 0.05,
    transmission: 0.88,
    ior: 1.52,
    transparent: true,
    opacity: 0.85,
    reflectivity: 0.7,
    clearcoat: 1.0,
  });

  const body = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(1.4, 0.85, 0.04), glassMat);
  panel.add(body);

  // Subtle frosted edge highlight
  const edgeGeo = new THREE_NS.EdgesGeometry(new THREE_NS.BoxGeometry(1.4, 0.85, 0.04));
  const edgeMat = new THREE_NS.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.6 });
  const edges = new THREE_NS.LineSegments(edgeGeo, edgeMat);
  panel.add(edges);

  // Luminous header bar
  const headerMat = new THREE_NS.MeshBasicMaterial({ color: accentColor });
  const headerBar = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.3, 0.03, 0.005), headerMat);
  headerBar.position.set(-0.45, 0.3, 0.025);
  panel.add(headerBar);

  const dimMat = new THREE_NS.MeshBasicMaterial({ color: 0x94a3b8 });
  const subBar = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.4, 0.015, 0.005), dimMat);
  subBar.position.set(-0.05, 0.3, 0.025);
  panel.add(subBar);

  if (type === "telemetry") {
    // Dynamic waveform curve
    const points = [
      new THREE_NS.Vector3(-0.55, -0.15, 0.03),
      new THREE_NS.Vector3(-0.35, 0.05, 0.03),
      new THREE_NS.Vector3(-0.15, -0.1, 0.03),
      new THREE_NS.Vector3(0.05, 0.18, 0.03),
      new THREE_NS.Vector3(0.25, -0.05, 0.03),
      new THREE_NS.Vector3(0.45, 0.12, 0.03),
      new THREE_NS.Vector3(0.58, 0.02, 0.03),
    ];
    const curve = new THREE_NS.CatmullRomCurve3(points);
    const tubeGeo = new THREE_NS.TubeGeometry(curve, 32, 0.014, 6, false);
    const tubeMat = new THREE_NS.MeshBasicMaterial({ color: accentColor });
    panel.add(new THREE_NS.Mesh(tubeGeo, tubeMat));
  } else if (type === "inventory") {
    // Holographic bars
    const heights = [0.15, 0.28, 0.42, 0.22, 0.36, 0.5, 0.32];
    heights.forEach((h, i) => {
      const barGeo = new THREE_NS.BoxGeometry(0.06, h, 0.01);
      const barMat = new THREE_NS.MeshBasicMaterial({ color: i === 5 ? accentColor : 0x0284c7 });
      const bar = new THREE_NS.Mesh(barGeo, barMat);
      bar.position.set(-0.45 + i * 0.15, -0.15 + h / 2, 0.03);
      panel.add(bar);
    });
  } else {
    // Grid nodes
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const dot = new THREE_NS.Mesh(
          new THREE_NS.SphereGeometry(0.022, 8, 8),
          new THREE_NS.MeshBasicMaterial({ color: r === 1 && c === 2 ? accentColor : 0x94a3b8 }),
        );
        dot.position.set(-0.35 + c * 0.24, 0.12 - r * 0.18, 0.03);
        panel.add(dot);
      }
    }
  }

  parent.add(panel);
  return panel;
}

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

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
      host.classList.add("scene-fallback");
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.className = "observatory-canvas";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 100);
    camera.position.set(0, 2.4, 7.8);

    // OrbitControls for true full 3D interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.1;
    controls.enableZoom = true;
    controls.minDistance = 3.6;
    controls.maxDistance = 14.0;
    controls.enablePan = false;
    controls.target.set(0, 1.2, 0);
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.minPolarAngle = 0.2;

    controls.addEventListener("start", () => setIsInteracting(true));
    controls.addEventListener("end", () => setIsInteracting(false));

    // Dynamic Studio Lighting for Light Theme
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(6, 9, 6);
    scene.add(keyLight);

    const cyanLight = new THREE.PointLight(0x0071e3, 25, 12, 1.8);
    cyanLight.position.set(3.5, 3.2, 2.5);
    scene.add(cyanLight);

    const crimsonLight = new THREE.PointLight(0xff2a55, 22, 10, 1.8);
    crimsonLight.position.set(-3.5, 2.2, -1.5);
    scene.add(crimsonLight);

    // Interactive cursor tracking light
    const pointerLight = new THREE.PointLight(0xffffff, 15, 8, 2);
    pointerLight.position.set(0, 2, 4);
    scene.add(pointerLight);

    // Master Observatory World
    const world = new THREE.Group();
    scene.add(world);

    // Materials: Apple/Nothing Light Glass & Polished Silver Chrome
    const silverPedestalMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.22,
      metalness: 0.45,
    });

    const opticGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.08,
      transmission: 0.92,
      ior: 1.54,
      transparent: true,
      opacity: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.8,
    });

    const glowCoreMat = new THREE.MeshBasicMaterial({
      color: 0x0071e3,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const redAccentMat = new THREE.MeshStandardMaterial({
      color: 0xff2a55,
      emissive: 0xff2a55,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.3,
    });

    // 1. Stepped silver-white pedestal with glowing glass rim
    const base1 = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.45, 0.18, 64), silverPedestalMat);
    base1.position.y = 0.05;
    world.add(base1);

    const base2 = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.95, 0.14, 64), silverPedestalMat);
    base2.position.y = 0.2;
    world.add(base2);

    const rimGeo = new THREE.TorusGeometry(2.28, 0.02, 16, 100);
    const rimMat = new THREE.MeshBasicMaterial({ color: 0x0071e3 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.16;
    world.add(rim);

    // 2. Central Quantum Glass Core
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 1.55, 0);
    world.add(coreGroup);

    const outerCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.82, 3), opticGlassMat);
    coreGroup.add(outerCore);

    const innerCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), glowCoreMat);
    coreGroup.add(innerCore);

    const centerPoint = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 20, 20),
      new THREE.MeshStandardMaterial({
        color: 0xff2a55,
        emissive: 0xff2a55,
        emissiveIntensity: 0.85,
      }),
    );
    coreGroup.add(centerPoint);

    // 3. Nothing Glyph Concentric Rings
    const ringGroup = new THREE.Group();
    ringGroup.position.copy(coreGroup.position);
    world.add(ringGroup);

    const glyphRings: THREE.Mesh[] = [];
    const ringConfigs = [
      { r: 1.25, tube: 0.016, color: 0xff2a55, rx: 0.65, ry: 0.2, rz: 0.1 },
      { r: 1.55, tube: 0.012, color: 0x0071e3, rx: 1.25, ry: -0.4, rz: -0.3 },
      { r: 1.85, tube: 0.01, color: 0x94a3b8, rx: 0.45, ry: 0.8, rz: 0.5 },
    ];

    ringConfigs.forEach((cfg) => {
      const ringMesh = new THREE.Mesh(
        new THREE.TorusGeometry(cfg.r, cfg.tube, 16, 120),
        new THREE.MeshStandardMaterial({
          color: cfg.color,
          emissive: cfg.color,
          emissiveIntensity: 0.4,
          roughness: 0.2,
          metalness: 0.6,
        }),
      );
      ringMesh.rotation.set(cfg.rx, cfg.ry, cfg.rz);
      ringGroup.add(ringMesh);
      glyphRings.push(ringMesh);
    });

    // 4. Orbiting Data Satellites
    const satellitesGroup = new THREE.Group();
    ringGroup.add(satellitesGroup);

    const satellites = [
      { radius: 1.25, angle: 0, speed: 0.8, color: 0xff2a55, size: 0.08 },
      { radius: 1.55, angle: 2.1, speed: -0.65, color: 0x0071e3, size: 0.07 },
      { radius: 1.85, angle: 4.2, speed: 0.5, color: 0x059669, size: 0.06 },
    ];

    const satelliteMeshes: { mesh: THREE.Mesh; config: (typeof satellites)[0] }[] = [];
    satellites.forEach((sat) => {
      const sMesh = new THREE.Mesh(
        new THREE.SphereGeometry(sat.size, 16, 16),
        new THREE.MeshStandardMaterial({
          color: sat.color,
          emissive: sat.color,
          emissiveIntensity: 0.75,
          metalness: 0.3,
          roughness: 0.1,
        }),
      );
      satellitesGroup.add(sMesh);
      satelliteMeshes.push({ mesh: sMesh, config: sat });
    });

    // 5. Floating Glass Panels
    const panelLeft = createGlassPanel(THREE, world, -2.1, 1.6, 0.2, 0x059669, "inventory");
    const panelRight = createGlassPanel(THREE, world, 2.0, 1.8, -0.2, 0xff2a55, "telemetry");
    const panelBack = createGlassPanel(THREE, world, 0.15, 2.65, -1.3, 0x0071e3, "security");
    panelBack.scale.setScalar(0.75);

    // 6. Glowing Light Conduits
    const makeConduit = (points: THREE.Vector3[], color: number) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 48, 0.012, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.75 });
      world.add(new THREE.Mesh(tubeGeo, tubeMat));

      const pulseMarker = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
      world.add(pulseMarker);
      return { curve, marker: pulseMarker };
    };

    const conduits = [
      makeConduit(
        [new THREE.Vector3(-1.5, 1.6, 0.2), new THREE.Vector3(-0.8, 1.7, 0.4), new THREE.Vector3(-0.35, 1.55, 0.3)],
        0x059669,
      ),
      makeConduit(
        [new THREE.Vector3(1.4, 1.8, -0.1), new THREE.Vector3(0.85, 1.6, 0.35), new THREE.Vector3(0.4, 1.55, 0.3)],
        0xff2a55,
      ),
    ];

    // 7. Tech Nodes / Micro Cylinders
    const nodeCoords = [
      { x: -1.15, z: 0.65, color: 0x059669 },
      { x: 1.15, z: 0.45, color: 0x0071e3 },
      { x: 0.35, z: -1.15, color: 0xff2a55 },
    ];
    nodeCoords.forEach((nc) => {
      const nodeMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.2, 24), silverPedestalMat);
      nodeMesh.position.set(nc.x, 0.35, nc.z);
      world.add(nodeMesh);

      const nodeCap = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), redAccentMat);
      nodeCap.position.set(nc.x, 0.48, nc.z);
      world.add(nodeCap);
    });

    // 8. Cyber Floating Starfield in Light Theme
    const starCount = window.innerWidth < 768 ? 260 : 500;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 12;
      starPositions[i * 3 + 1] = Math.random() * 6 - 0.5;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x64748b,
      size: 0.02,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });
    const starField = new THREE.Points(starGeo, starMat);
    world.add(starField);

    // Mouse Tracking for dynamic lighting
    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      pointerLight.position.x = nx * 3.5;
      pointerLight.position.y = 1.5 + ny * 2.5;
      pointerLight.position.z = 3.5;
    };
    host.addEventListener("pointermove", onPointerMove, { passive: true });

    // Resize handling
    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = width < 560 ? 9.8 : width < 860 ? 8.6 : 7.8;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    // Animation Loop
    const clock = new THREE.Clock();
    const render = () => {
      if (isDisposed) return;
      animationFrame = window.requestAnimationFrame(render);
      if (document.hidden) return;

      const elapsed = clock.getElapsedTime();

      // Update controls
      controls.update();

      // Animate core and glyph rings
      coreGroup.rotation.y = elapsed * 0.22;
      outerCore.rotation.x = Math.sin(elapsed * 0.4) * 0.15;
      innerCore.rotation.y = -elapsed * 0.35;

      glyphRings[0].rotation.z = elapsed * 0.15;
      glyphRings[1].rotation.x = 1.25 + Math.sin(elapsed * 0.25) * 0.1;
      glyphRings[2].rotation.y = elapsed * 0.2;

      // Animate satellites
      satelliteMeshes.forEach(({ mesh, config }) => {
        const curAngle = config.angle + elapsed * config.speed;
        mesh.position.set(Math.cos(curAngle) * config.radius, Math.sin(curAngle) * (config.radius * 0.45), Math.sin(curAngle * 0.8) * 0.4);
      });

      // Subtle float on glass panels
      panelLeft.position.y = 1.6 + Math.sin(elapsed * 0.8) * 0.045;
      panelRight.position.y = 1.8 + Math.sin(elapsed * 0.7 + 1.2) * 0.05;
      panelBack.position.y = 2.65 + Math.sin(elapsed * 0.65 + 2.4) * 0.04;

      // Conduit pulse traveling
      conduits.forEach((c, idx) => {
        const t = (elapsed * 0.3 + idx * 0.5) % 1;
        c.marker.position.copy(c.curve.getPoint(t));
      });

      // Slow starfield spin
      starField.rotation.y = elapsed * 0.015;

      renderer.render(scene, camera);
    };
    render();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(animationFrame);
      host.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
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

  const handleToggleAutoRotate = () => {
    if (controlsRef.current) {
      const next = !autoRotate;
      controlsRef.current.autoRotate = next;
      setAutoRotate(next);
    }
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.target.set(0, 1.2, 0);
    }
  };

  return (
    <div className="hero-scene-container">
      <div
        ref={hostRef}
        className="hero-scene"
        aria-label="Interactive 3D illustration of connected software systems and environmental telemetry"
        role="img"
      />

      {/* Apple/Nothing Light Glass Control Pill Overlay */}
      <div className="scene-glass-controls" aria-label="3D controls">
        <div className={`scene-mode-pill ${isInteracting ? "active" : ""}`}>
          <span className="live-dot" />
          <span>{isInteracting ? "3D ORBIT ACTIVE" : "DRAG TO ORBIT 360°"}</span>
        </div>

        <div className="scene-control-actions">
          <button
            type="button"
            className={`scene-tool-btn ${autoRotate ? "active" : ""}`}
            onClick={handleToggleAutoRotate}
            title={autoRotate ? "Pause Auto-Orbit" : "Resume Auto-Orbit"}
            aria-label="Toggle auto rotation"
          >
            <RotateCw size={13} className={autoRotate ? "spin-icon" : ""} />
            <span>Auto</span>
          </button>

          <button
            type="button"
            className="scene-tool-btn"
            onClick={handleResetCamera}
            title="Reset Camera View"
            aria-label="Reset camera view"
          >
            <Compass size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
