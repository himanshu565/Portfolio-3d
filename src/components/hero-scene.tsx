"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function roundedPanel(
  THREE_NS: typeof THREE,
  group: THREE.Group,
  x: number,
  y: number,
  z: number,
  accent: THREE.ColorRepresentation,
  variant: "inventory" | "telemetry",
) {
  const panel = new THREE_NS.Group();
  panel.position.set(x, y, z);
  panel.rotation.set(-0.035, x > 0 ? -0.15 : 0.13, x > 0 ? -0.09 : 0.07);

  const shell = new THREE_NS.Mesh(
    new THREE_NS.BoxGeometry(1.34, 0.91, 0.075),
    new THREE_NS.MeshStandardMaterial({ color: 0x101923, roughness: 0.34, metalness: 0.38 }),
  );
  panel.add(shell);

  const screen = new THREE_NS.Mesh(
    new THREE_NS.PlaneGeometry(1.23, 0.8),
    new THREE_NS.MeshBasicMaterial({ color: variant === "inventory" ? 0x192b31 : 0x17202d }),
  );
  screen.position.z = 0.041;
  panel.add(screen);

  const barMaterial = new THREE_NS.MeshBasicMaterial({ color: 0x92a7ad });
  const dimMaterial = new THREE_NS.MeshBasicMaterial({ color: 0x40535f });
  const accentMaterial = new THREE_NS.MeshBasicMaterial({ color: accent });
  const makeBar = (bx: number, by: number, width: number, height: number, material: THREE.Material) => {
    const mesh = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(width, height, 0.008), material);
    mesh.position.set(bx, by, 0.05);
    panel.add(mesh);
    return mesh;
  };

  makeBar(-0.47, 0.31, 0.19, 0.025, accentMaterial);
  makeBar(-0.23, 0.31, 0.22, 0.018, dimMaterial);
  makeBar(0.24, 0.31, 0.23, 0.018, barMaterial);
  makeBar(-0.48, 0.19, 0.29, 0.013, dimMaterial);

  if (variant === "inventory") {
    const values = [0.19, 0.28, 0.13, 0.34, 0.25, 0.42, 0.32, 0.49, 0.37];
    values.forEach((height, index) => {
      const bar = new THREE_NS.Mesh(
        new THREE_NS.BoxGeometry(0.055, height, 0.008),
        new THREE_NS.MeshBasicMaterial({ color: index === 7 ? accent : 0x47717a }),
      );
      bar.position.set(-0.43 + index * 0.105, -0.17 + height / 2, 0.055);
      panel.add(bar);
    });
    for (let row = 0; row < 3; row += 1) {
      makeBar(0.24, -0.13 - row * 0.105, 0.32, 0.012, dimMaterial);
      makeBar(0.41, -0.13 - row * 0.105, 0.045, 0.027, row === 0 ? accentMaterial : barMaterial);
    }
  } else {
    const points = [
      new THREE_NS.Vector3(-0.49, -0.17, 0.059),
      new THREE_NS.Vector3(-0.35, -0.08, 0.059),
      new THREE_NS.Vector3(-0.2, -0.12, 0.059),
      new THREE_NS.Vector3(-0.05, 0.02, 0.059),
      new THREE_NS.Vector3(0.11, -0.04, 0.059),
      new THREE_NS.Vector3(0.26, 0.12, 0.059),
      new THREE_NS.Vector3(0.46, 0.09, 0.059),
    ];
    const curve = new THREE_NS.CatmullRomCurve3(points);
    panel.add(new THREE_NS.Mesh(
      new THREE_NS.TubeGeometry(curve, 44, 0.009, 5, false),
      new THREE_NS.MeshBasicMaterial({ color: accent }),
    ));
    for (let row = 0; row < 2; row += 1) {
      makeBar(-0.36 + row * 0.25, -0.3, 0.3, 0.015, dimMaterial);
    }
  }

  group.add(panel);
  return panel;
}

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    let animationFrame = 0;
    let isDisposed = false;
    let resizeObserver: ResizeObserver | undefined;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      host.classList.add("scene-fallback");
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.35 : 1.75));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.className = "observatory-canvas";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 100);
    camera.position.set(0.05, 3.15, 9.4);
    camera.lookAt(0, 1.15, 0);

    scene.add(new THREE.HemisphereLight(0xeaf6ff, 0x44344c, 2.0));
    const keyLight = new THREE.DirectionalLight(0xfff0df, 3.4);
    keyLight.position.set(-4, 7, 6);
    scene.add(keyLight);
    const blueLight = new THREE.PointLight(0x6579ff, 44, 13, 2);
    blueLight.position.set(3, 3.7, 2.8);
    scene.add(blueLight);
    const coralLight = new THREE.PointLight(0xff795e, 26, 9, 2);
    coralLight.position.set(-3, 2.6, -1);
    scene.add(coralLight);

    const world = new THREE.Group();
    scene.add(world);

    const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0xe5dfd5, roughness: 0.56, metalness: 0.08 });
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x17222d, roughness: 0.29, metalness: 0.52 });
    const blueMaterial = new THREE.MeshPhysicalMaterial({ color: 0x6071ff, metalness: 0.34, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.12 });
    const coralMaterial = new THREE.MeshPhysicalMaterial({ color: 0xf37c5a, metalness: 0.16, roughness: 0.24, clearcoat: 0.8 });
    const limeMaterial = new THREE.MeshStandardMaterial({ color: 0xc5f17a, roughness: 0.3, metalness: 0.15, emissive: 0x314c14, emissiveIntensity: 0.35 });

    // Layered circular terrain gives the model a physical, miniature-world silhouette.
    const base1 = new THREE.Mesh(new THREE.CylinderGeometry(2.42, 2.58, 0.22, 80), stoneMaterial);
    base1.position.y = 0.02;
    world.add(base1);
    const base2 = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.18, 0.16, 80), new THREE.MeshStandardMaterial({ color: 0xc6d1cb, roughness: 0.52, metalness: 0.12 }));
    base2.position.y = 0.205;
    world.add(base2);
    const base3 = new THREE.Mesh(new THREE.CylinderGeometry(1.62, 1.76, 0.15, 80), new THREE.MeshStandardMaterial({ color: 0x243944, roughness: 0.35, metalness: 0.3 }));
    base3.position.y = 0.34;
    world.add(base3);

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(2.37, 0.026, 8, 100),
      new THREE.MeshStandardMaterial({ color: 0xf2a88c, metalness: 0.3, roughness: 0.25, emissive: 0x4b1f1a, emissiveIntensity: 0.4 }),
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.17;
    world.add(rim);

    // Central data core: a gently irregular, glossy poly-sphere inside measured orbit lines.
    const coreGeometry = new THREE.IcosahedronGeometry(0.83, 5);
    const position = coreGeometry.attributes.position as THREE.BufferAttribute;
    for (let index = 0; index < position.count; index += 1) {
      const px = position.getX(index);
      const py = position.getY(index);
      const pz = position.getZ(index);
      const wave = 1 + 0.035 * Math.sin(px * 7.4 + py * 3.2) * Math.cos(pz * 6.6 - py * 2.1);
      position.setXYZ(index, px * wave, py * wave, pz * wave);
    }
    coreGeometry.computeVertexNormals();
    const core = new THREE.Mesh(coreGeometry, blueMaterial);
    core.position.set(0, 1.73, 0.12);
    world.add(core);

    const innerShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.91, 2),
      new THREE.MeshBasicMaterial({ color: 0x8ea1ff, wireframe: true, transparent: true, opacity: 0.22 }),
    );
    innerShell.position.copy(core.position);
    world.add(innerShell);

    const orbitGroup = new THREE.Group();
    orbitGroup.position.copy(core.position);
    world.add(orbitGroup);
    const orbitSpecs = [
      { radius: 1.18, tube: 0.013, color: 0xffa18a, rx: 0.55, ry: 0.14, rz: 0.2 },
      { radius: 1.42, tube: 0.009, color: 0xc4f17c, rx: 1.2, ry: -0.25, rz: -0.42 },
      { radius: 1.63, tube: 0.008, color: 0x9cacff, rx: 0.9, ry: 0.4, rz: 0.6 },
    ];
    orbitSpecs.forEach((spec) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(spec.radius, spec.tube, 8, 160),
        new THREE.MeshStandardMaterial({ color: spec.color, metalness: 0.45, roughness: 0.26, emissive: spec.color, emissiveIntensity: 0.32 }),
      );
      ring.rotation.set(spec.rx, spec.ry, spec.rz);
      orbitGroup.add(ring);
    });

    const satelliteGroup = new THREE.Group();
    orbitGroup.add(satelliteGroup);
    const satellites = [
      { angle: 0.55, radius: 1.18, yScale: 0.56, color: 0xf78d69, size: 0.11 },
      { angle: 2.8, radius: 1.42, yScale: 0.31, color: 0xc6f17a, size: 0.085 },
      { angle: 4.35, radius: 1.63, yScale: 0.42, color: 0x9aabff, size: 0.07 },
    ];
    satellites.forEach((item) => {
      const point = new THREE.Mesh(
        new THREE.SphereGeometry(item.size, 20, 20),
        new THREE.MeshStandardMaterial({ color: item.color, metalness: 0.24, roughness: 0.18, emissive: item.color, emissiveIntensity: 0.35 }),
      );
      point.position.set(Math.cos(item.angle) * item.radius, Math.sin(item.angle) * item.radius * item.yScale, 0.05);
      satelliteGroup.add(point);
    });

    const panelLeft = roundedPanel(THREE, world, -2.12, 1.55, 0.12, 0xc5f17a, "inventory");
    const panelRight = roundedPanel(THREE, world, 2.0, 1.88, -0.22, 0xf58b6a, "telemetry");
    const panelBack = roundedPanel(THREE, world, 0.12, 2.85, -1.25, 0x91a5ff, "telemetry");
    panelBack.scale.setScalar(0.7);
    panelBack.rotation.set(-0.18, 0.04, -0.02);

    // Fine connecting paths suggest data moving between products and services.
    const makeDataPath = (points: THREE.Vector3[], color: number) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const mesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 60, 0.012, 6, false),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.78 }),
      );
      world.add(mesh);
      const marker = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), new THREE.MeshBasicMaterial({ color }));
      world.add(marker);
      return { curve, marker };
    };
    const paths = [
      makeDataPath([new THREE.Vector3(-1.5, 1.75, 0.2), new THREE.Vector3(-0.9, 1.85, 0.55), new THREE.Vector3(-0.4, 1.75, 0.42)], 0xc5f17a),
      makeDataPath([new THREE.Vector3(1.4, 2.02, -0.1), new THREE.Vector3(0.96, 1.7, 0.48), new THREE.Vector3(0.55, 1.7, 0.42)], 0xf58b6a),
    ];

    // Tiny devices make the floating world feel connected to real hardware and operations.
    const devicePositions = [
      { x: -1.18, z: 0.56, color: 0xc5f17a },
      { x: 1.18, z: 0.38, color: 0x91a5ff },
      { x: 0.45, z: -1.18, color: 0xf58b6a },
      { x: -0.6, z: -1.05, color: 0xe2ded1 },
    ];
    devicePositions.forEach((device, index) => {
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.22, 20), darkMaterial);
      base.position.set(device.x, 0.56, device.z);
      world.add(base);
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 16), new THREE.MeshStandardMaterial({ color: device.color, metalness: 0.18, roughness: 0.22, emissive: device.color, emissiveIntensity: 0.15 }));
      cap.position.set(device.x, 0.72, device.z);
      world.add(cap);
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.132, 0.01, 6, 32), new THREE.MeshBasicMaterial({ color: device.color }));
      band.rotation.x = Math.PI / 2;
      band.position.set(device.x, 0.61, device.z);
      world.add(band);
      if (index === 0) {
        const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.2, 8), stoneMaterial);
        antenna.position.set(device.x, 0.9, device.z);
        world.add(antenna);
      }
    });

    // Sculptural accent forms and a small stack of data blocks.
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), coralMaterial);
    cube.position.set(-1.7, 0.92, -0.42);
    cube.rotation.set(0.2, 0.42, 0.36);
    world.add(cube);
    const cube2 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), limeMaterial);
    cube2.position.set(1.72, 1.04, -0.5);
    cube2.rotation.set(0.4, -0.2, 0.3);
    world.add(cube2);

    const dustCount = window.innerWidth < 700 ? 260 : 520;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let index = 0; index < dustCount; index += 1) {
      dustPositions[index * 3] = (Math.random() - 0.5) * 10;
      dustPositions[index * 3 + 1] = Math.random() * 5.4 - 0.2;
      dustPositions[index * 3 + 2] = (Math.random() - 0.5) * 5 - 1.2;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0xb0b8db, size: 0.018, transparent: true, opacity: 0.55, sizeAttenuation: true }));
    world.add(dust);

    const clock = new THREE.Clock();
    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    const onPointerLeave = () => { pointer.x = 0; pointer.y = 0; };
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = width < 560 ? 11.1 : width < 860 ? 10.0 : 9.4;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const render = () => {
      if (isDisposed) return;
      animationFrame = window.requestAnimationFrame(render);
      if (document.hidden) return;
      const elapsed = clock.getElapsedTime();
      currentPointer.x += (pointer.x - currentPointer.x) * 0.035;
      currentPointer.y += (pointer.y - currentPointer.y) * 0.035;
      if (!prefersReducedMotion) {
        world.rotation.y = Math.sin(elapsed * 0.17) * 0.07 + currentPointer.x * 0.09;
        world.rotation.x = Math.sin(elapsed * 0.14) * 0.025 - currentPointer.y * 0.035;
        core.rotation.y = elapsed * 0.14;
        core.rotation.x = Math.sin(elapsed * 0.35) * 0.08;
        innerShell.rotation.y = -elapsed * 0.1;
        orbitGroup.rotation.y = elapsed * 0.09;
        orbitGroup.rotation.x = Math.sin(elapsed * 0.19) * 0.045;
        panelLeft.position.y = 1.55 + Math.sin(elapsed * 0.85) * 0.055;
        panelRight.position.y = 1.88 + Math.sin(elapsed * 0.72 + 1.2) * 0.06;
        panelBack.position.y = 2.85 + Math.sin(elapsed * 0.7 + 2.1) * 0.045;
        cube.rotation.y += 0.003;
        cube2.rotation.x += 0.002;
        dust.rotation.y = elapsed * 0.006;
        paths.forEach((path, index) => {
          const t = (elapsed * 0.12 + index * 0.43) % 1;
          path.marker.position.copy(path.curve.getPoint(t));
        });
      }
      renderer.render(scene, camera);
    };
    render();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(animationFrame);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      resizeObserver?.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="hero-scene" aria-label="Interactive 3D illustration of connected software systems and environmental telemetry" role="img" />;
}
