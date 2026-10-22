"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RotateCw, Compass, Eye, Waves } from "lucide-react";

function createHoloPanel(
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
  panel.rotation.set(-0.04, x > 0 ? -0.25 : 0.25, 0);

  // Dark obsidian surface with subtle transmission
  const glassMat = new THREE_NS.MeshPhysicalMaterial({
    color: 0x0d120d,
    roughness: 0.18,
    metalness: 0.82,
    transmission: 0.65,
    ior: 1.52,
    transparent: true,
    opacity: 0.85,
    clearcoat: 0.9,
    clearcoatRoughness: 0.08,
  });

  const body = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(1.45, 0.9, 0.03), glassMat);
  panel.add(body);

  // Subtle border hairline
  const edgeGeo = new THREE_NS.EdgesGeometry(new THREE_NS.BoxGeometry(1.45, 0.9, 0.03));
  const edgeMat = new THREE_NS.LineBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: 0.65,
  });
  const edges = new THREE_NS.LineSegments(edgeGeo, edgeMat);
  panel.add(edges);

  // Top header status bar
  const headerMat = new THREE_NS.MeshBasicMaterial({ color: accentColor });
  const headerBar = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.35, 0.025, 0.005), headerMat);
  headerBar.position.set(-0.45, 0.33, 0.02);
  panel.add(headerBar);

  const dimMat = new THREE_NS.MeshBasicMaterial({ color: 0x263326 });
  const subBar = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.42, 0.012, 0.005), dimMat);
  subBar.position.set(-0.04, 0.33, 0.02);
  panel.add(subBar);

  if (type === "telemetry") {
    // Waveform curve
    const points = [
      new THREE_NS.Vector3(-0.58, -0.12, 0.025),
      new THREE_NS.Vector3(-0.38, 0.12, 0.025),
      new THREE_NS.Vector3(-0.18, -0.15, 0.025),
      new THREE_NS.Vector3(0.05, 0.22, 0.025),
      new THREE_NS.Vector3(0.28, -0.06, 0.025),
      new THREE_NS.Vector3(0.48, 0.16, 0.025),
      new THREE_NS.Vector3(0.62, 0.02, 0.025),
    ];
    const curve = new THREE_NS.CatmullRomCurve3(points);
    const tubeGeo = new THREE_NS.TubeGeometry(curve, 36, 0.015, 8, false);
    const tubeMat = new THREE_NS.MeshBasicMaterial({ color: accentColor });
    panel.add(new THREE_NS.Mesh(tubeGeo, tubeMat));

    for (let i = 0; i < 4; i++) {
      const gridLine = new THREE_NS.Mesh(
        new THREE_NS.BoxGeometry(1.2, 0.004, 0.004),
        new THREE_NS.MeshBasicMaterial({ color: 0x263326, transparent: true, opacity: 0.5 }),
      );
      gridLine.position.set(0, -0.22 + i * 0.12, 0.02);
      panel.add(gridLine);
    }
  } else if (type === "inventory") {
    const heights = [0.18, 0.32, 0.46, 0.24, 0.38, 0.54, 0.34, 0.22];
    heights.forEach((h, i) => {
      const barGeo = new THREE_NS.BoxGeometry(0.065, h, 0.015);
      const barMat = new THREE_NS.MeshBasicMaterial({
        color: i === 5 ? accentColor : 0x7cff8a,
        transparent: true,
        opacity: 0.85,
      });
      const bar = new THREE_NS.Mesh(barGeo, barMat);
      bar.position.set(-0.48 + i * 0.14, -0.18 + h / 2, 0.025);
      panel.add(bar);
    });
  } else {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        const dot = new THREE_NS.Mesh(
          new THREE_NS.SphereGeometry(0.022, 8, 8),
          new THREE_NS.MeshBasicMaterial({
            color: r === 1 && c === 2 ? accentColor : 0x56e39f,
            transparent: true,
            opacity: 0.8,
          }),
        );
        dot.position.set(-0.42 + c * 0.21, 0.12 - r * 0.18, 0.025);
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
  const [wireframeMode, setWireframeMode] = useState(false);
  const [gridWaveBoost, setGridWaveBoost] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const wireframeRef = useRef(wireframeMode);
  const gridWaveBoostRef = useRef(gridWaveBoost);

  useEffect(() => {
    wireframeRef.current = wireframeMode;
  }, [wireframeMode]);

  useEffect(() => {
    gridWaveBoostRef.current = gridWaveBoost;
  }, [gridWaveBoost]);

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

    // DPR clamped to 1.5 for performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.className = "observatory-canvas";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050705, 0.045);

    const camera = new THREE.PerspectiveCamera(38, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 100);
    camera.position.set(0, 2.6, 7.6);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controls.enableZoom = true;
    controls.minDistance = 3.6;
    controls.maxDistance = 14;
    controls.enablePan = false;
    controls.target.set(0, 1.2, 0);
    controls.maxPolarAngle = Math.PI / 2 + 0.06;
    controls.minPolarAngle = 0.2;

    controls.addEventListener("start", () => setIsInteracting(true));
    controls.addEventListener("end", () => setIsInteracting(false));

    // =========================================================================
    // PHYSICAL STUDIO LIGHTING (Brief Section 6)
    // 1. Key light: acid lime #C6FF00, intensity ~3.0
    // 2. Rim light: neon mint #7CFF8A, intensity ~4.0, behind/side
    // 3. Fill light: forest green #304B36, intensity ~0.8
    // 4. Low ambient fill
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x050705, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xc6ff00, 2.8);
    keyLight.position.set(5, 8, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7cff8a, 4.2);
    rimLight.position.set(-6, 5, -5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x304b36, 0.9);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Subtle pointer light
    const pointerLight = new THREE.PointLight(0xc6ff00, 14, 7, 2);
    pointerLight.position.set(0, 2, 4);
    scene.add(pointerLight);

    const world = new THREE.Group();
    scene.add(world);

    // =========================================================================
    // 1. 3D CYBER GRID (Obsidian Ground Plane with Acid Lime Wireframe)
    // =========================================================================
    const gridSegmentsX = 40;
    const gridSegmentsY = 40;
    const gridPlaneGeo = new THREE.PlaneGeometry(10.5, 10.5, gridSegmentsX, gridSegmentsY);
    gridPlaneGeo.rotateX(-Math.PI / 2);

    const posAttr = gridPlaneGeo.attributes.position;
    const originalPositions = new Float32Array(posAttr.array);

    const gridMaterial = new THREE.MeshStandardMaterial({
      color: 0x151d16,
      emissive: 0xc6ff00,
      emissiveIntensity: 0.22,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });

    const gridMesh = new THREE.Mesh(gridPlaneGeo, gridMaterial);
    gridMesh.position.y = -0.05;
    world.add(gridMesh);

    // Central Hexagonal Metallic Dais
    const daisMat = new THREE.MeshStandardMaterial({
      color: 0x0d120d,
      roughness: 0.22,
      metalness: 0.85,
    });

    const daisGeo = new THREE.CylinderGeometry(2.2, 2.5, 0.16, 6);
    const dais = new THREE.Mesh(daisGeo, daisMat);
    dais.position.y = 0.08;
    world.add(dais);

    const daisEdgeGeo = new THREE.EdgesGeometry(daisGeo);
    const daisEdgeMat = new THREE.LineBasicMaterial({ color: 0xc6ff00, transparent: true, opacity: 0.6 });
    const daisEdges = new THREE.LineSegments(daisEdgeGeo, daisEdgeMat);
    dais.add(daisEdges);

    // Inner Rim on Dais
    const innerRimGeo = new THREE.TorusGeometry(1.9, 0.016, 16, 80);
    const innerRimMat = new THREE.MeshStandardMaterial({
      color: 0x7cff8a,
      emissive: 0x7cff8a,
      emissiveIntensity: 0.5,
    });
    const innerRim = new THREE.Mesh(innerRimGeo, innerRimMat);
    innerRim.rotation.x = Math.PI / 2;
    innerRim.position.y = 0.18;
    world.add(innerRim);

    // =========================================================================
    // 2. SIGNATURE MONOLITHIC SCULPTURE: METALLIC GEOMETRIC CORE
    // =========================================================================
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 1.55, 0);
    world.add(coreGroup);

    // Dark Metallic Faceted Outer Shell
    const metallicMat = new THREE.MeshStandardMaterial({
      color: 0x0d120d,
      metalness: 0.88,
      roughness: 0.2,
      wireframe: false,
    });

    const outerCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.86, 2), metallicMat);
    coreGroup.add(outerCore);

    // Hairline acid lime wireframe edge highlight on core
    const coreEdgeGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.865, 2));
    const coreEdgeMat = new THREE.LineBasicMaterial({ color: 0xc6ff00, transparent: true, opacity: 0.75 });
    const coreEdges = new THREE.LineSegments(coreEdgeGeo, coreEdgeMat);
    outerCore.add(coreEdges);

    // Inner Glowing Acid Lime Energy Lattice
    const glowCoreMat = new THREE.MeshBasicMaterial({
      color: 0xc6ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.56, 1), glowCoreMat);
    coreGroup.add(innerCore);

    // Singularity Core Point
    const singularity = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 20, 20),
      new THREE.MeshStandardMaterial({
        color: 0xc6ff00,
        emissive: 0xc6ff00,
        emissiveIntensity: 0.9,
      }),
    );
    coreGroup.add(singularity);

    // Multi-Axis Orbital Rings
    const ringGroup = new THREE.Group();
    ringGroup.position.copy(coreGroup.position);
    world.add(ringGroup);

    const glyphRings: THREE.Mesh[] = [];
    const ringConfigs = [
      { r: 1.32, tube: 0.014, color: 0xc6ff00, rx: 0.65, ry: 0.2, rz: 0.1 },
      { r: 1.62, tube: 0.012, color: 0x7cff8a, rx: 1.25, ry: -0.4, rz: -0.3 },
      { r: 1.94, tube: 0.01, color: 0x56e39f, rx: 0.45, ry: 0.8, rz: 0.5 },
    ];

    ringConfigs.forEach((cfg) => {
      const ringMesh = new THREE.Mesh(
        new THREE.TorusGeometry(cfg.r, cfg.tube, 16, 120),
        new THREE.MeshStandardMaterial({
          color: cfg.color,
          emissive: cfg.color,
          emissiveIntensity: 0.45,
          roughness: 0.2,
          metalness: 0.85,
        }),
      );
      ringMesh.rotation.set(cfg.rx, cfg.ry, cfg.rz);
      ringGroup.add(ringMesh);
      glyphRings.push(ringMesh);
    });

    // Orbiting Satellite Probes
    const satellitesGroup = new THREE.Group();
    ringGroup.add(satellitesGroup);

    const satellites = [
      { radius: 1.32, angle: 0, speed: 0.75, color: 0xc6ff00, size: 0.07 },
      { radius: 1.62, angle: 2.2, speed: -0.55, color: 0x7cff8a, size: 0.06 },
      { radius: 1.94, angle: 4.3, speed: 0.45, color: 0x56e39f, size: 0.05 },
    ];

    const satelliteMeshes: { mesh: THREE.Group; config: (typeof satellites)[0] }[] = [];
    satellites.forEach((sat) => {
      const probeGroup = new THREE.Group();
      const sMesh = new THREE.Mesh(
        new THREE.SphereGeometry(sat.size, 16, 16),
        new THREE.MeshStandardMaterial({
          color: sat.color,
          emissive: sat.color,
          emissiveIntensity: 0.8,
          metalness: 0.6,
          roughness: 0.2,
        }),
      );
      probeGroup.add(sMesh);

      const wingGeo = new THREE.BoxGeometry(0.16, 0.01, 0.05);
      const wingMat = new THREE.MeshStandardMaterial({
        color: 0x151d16,
        metalness: 0.8,
        roughness: 0.2,
      });
      const wings = new THREE.Mesh(wingGeo, wingMat);
      probeGroup.add(wings);

      satellitesGroup.add(probeGroup);
      satelliteMeshes.push({ mesh: probeGroup, config: sat });
    });

    // =========================================================================
    // 3. FLOATING HOLOGRAPHIC PANELS & CONDUITS
    // =========================================================================
    const panelLeft = createHoloPanel(THREE, world, -2.15, 1.65, 0.2, 0xc6ff00, "inventory");
    const panelRight = createHoloPanel(THREE, world, 2.1, 1.85, -0.2, 0x7cff8a, "telemetry");
    const panelBack = createHoloPanel(THREE, world, 0.15, 2.75, -1.3, 0x56e39f, "security");
    panelBack.scale.setScalar(0.78);

    // Glowing Fiber-Optic Splines
    const makeConduit = (points: THREE.Vector3[], color: number) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 44, 0.012, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 });
      world.add(new THREE.Mesh(tubeGeo, tubeMat));

      const pulseMarker = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xc6ff00 }),
      );
      world.add(pulseMarker);
      return { curve, marker: pulseMarker };
    };

    const conduits = [
      makeConduit(
        [new THREE.Vector3(-1.55, 1.65, 0.2), new THREE.Vector3(-0.8, 1.75, 0.4), new THREE.Vector3(-0.35, 1.55, 0.3)],
        0xc6ff00,
      ),
      makeConduit(
        [new THREE.Vector3(1.5, 1.85, -0.1), new THREE.Vector3(0.85, 1.65, 0.35), new THREE.Vector3(0.4, 1.55, 0.3)],
        0x7cff8a,
      ),
    ];

    // Restrained Ambient Stardust
    const starCount = 200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 14;
      starPositions[i * 3 + 1] = Math.random() * 7 - 0.5;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x7cff8a,
      size: 0.02,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });
    const starField = new THREE.Points(starGeo, starMat);
    world.add(starField);

    let mouseNormX = 0;
    let mouseNormY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      mouseNormX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseNormY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      pointerLight.position.x = mouseNormX * 3.6;
      pointerLight.position.y = 1.6 + mouseNormY * 2.4;
      pointerLight.position.z = 3.6;
    };
    host.addEventListener("pointermove", onPointerMove, { passive: true });

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = width < 560 ? 9.6 : width < 860 ? 8.4 : 7.6;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    // =========================================================================
    // 4. ANIMATION LOOP
    // =========================================================================
    const clock = new THREE.Clock();

    const render = () => {
      if (isDisposed) return;
      animationFrame = window.requestAnimationFrame(render);
      if (document.hidden) return;

      const elapsed = clock.getElapsedTime();

      controls.update();

      metallicMat.wireframe = wireframeRef.current;
      daisMat.wireframe = wireframeRef.current;

      // Grid Wave Dynamics
      const pos = gridMesh.geometry.attributes.position;
      const waveSpeedMultiplier = gridWaveBoostRef.current ? 2.5 : 1.3;
      const waveAmpMultiplier = gridWaveBoostRef.current ? 0.32 : 0.18;

      for (let i = 0; i < pos.count; i++) {
        const u = originalPositions[i * 3];
        const v = originalPositions[i * 3 + 2];
        const distFromCenter = Math.sqrt(u * u + v * v);

        const wave1 = Math.sin(u * 0.75 + elapsed * waveSpeedMultiplier) * Math.cos(v * 0.75 + elapsed * (waveSpeedMultiplier * 0.8));
        const wave2 = Math.sin(distFromCenter * 1.5 - elapsed * (waveSpeedMultiplier * 1.2)) * 0.4;

        const mouseDist = Math.sqrt((u - mouseNormX * 3) ** 2 + (v - mouseNormY * 2) ** 2);
        const mouseRipple = Math.sin(mouseDist * 2.5 - elapsed * 3.5) * Math.max(0, 1 - mouseDist / 2.5) * 0.2;

        pos.setY(i, (wave1 + wave2 + mouseRipple) * waveAmpMultiplier);
      }
      pos.needsUpdate = true;

      // Rotate Sculptural Core
      coreGroup.rotation.y = elapsed * 0.2;
      outerCore.rotation.x = Math.sin(elapsed * 0.25) * 0.12;
      innerCore.rotation.y = -elapsed * 0.35;
      singularity.scale.setScalar(1 + Math.sin(elapsed * 3) * 0.06);

      // Rotate Rings
      glyphRings[0].rotation.z = elapsed * 0.16;
      glyphRings[1].rotation.x = 1.25 + Math.sin(elapsed * 0.22) * 0.12;
      glyphRings[2].rotation.y = elapsed * 0.2;

      // Orbit Satellites
      satelliteMeshes.forEach(({ mesh, config }) => {
        const curAngle = config.angle + elapsed * config.speed;
        mesh.position.set(
          Math.cos(curAngle) * config.radius,
          Math.sin(curAngle) * (config.radius * 0.45),
          Math.sin(curAngle * 0.8) * 0.35,
        );
        mesh.rotation.y = curAngle + Math.PI / 2;
      });

      // Subtle float on panels
      panelLeft.position.y = 1.65 + Math.sin(elapsed * 0.7) * 0.04;
      panelRight.position.y = 1.85 + Math.sin(elapsed * 0.65 + 1.2) * 0.045;
      panelBack.position.y = 2.75 + Math.sin(elapsed * 0.6 + 2.4) * 0.035;

      // Conduits
      conduits.forEach((c, idx) => {
        const t = (elapsed * 0.3 + idx * 0.5) % 1;
        c.marker.position.copy(c.curve.getPoint(t));
      });

      starField.rotation.y = elapsed * 0.01;

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

  const handleToggleWireframe = () => {
    setWireframeMode((prev) => !prev);
  };

  const handleToggleWaveBoost = () => {
    setGridWaveBoost((prev) => !prev);
  };

  return (
    <div className="hero-scene-container">
      <div
        ref={hostRef}
        className="hero-scene"
        aria-label="3D metallic sculpture with acid lime rim light representing interconnected systems"
        role="img"
      />

      <div className="scene-glass-controls" aria-label="3D scene controls">
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
            className={`scene-tool-btn ${gridWaveBoost ? "active" : ""}`}
            onClick={handleToggleWaveBoost}
            title={gridWaveBoost ? "Normal Grid Wave" : "Boost Grid Waves"}
            aria-label="Toggle wave boost"
          >
            <Waves size={13} />
            <span>Wave</span>
          </button>

          <button
            type="button"
            className={`scene-tool-btn ${wireframeMode ? "active" : ""}`}
            onClick={handleToggleWireframe}
            title={wireframeMode ? "Switch to Solid Shading" : "Inspect Wireframe Geometry"}
            aria-label="Toggle wireframe mode"
          >
            <Eye size={13} />
            <span>Wireframe</span>
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
