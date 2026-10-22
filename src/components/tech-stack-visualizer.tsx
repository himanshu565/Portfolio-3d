"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiC,
  SiCplusplus,
  SiKotlin,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFastapi,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiOpencv,
  SiNumpy,
  SiTailwindcss,
  SiPandas,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiVercel,
  SiJupyter,
  SiFigma,
  SiPostman,
  SiHuggingface,
  SiPrisma,
  SiThreedotjs,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscCode, VscTerminal, VscAzure } from "react-icons/vsc";
import type { IconType } from "react-icons";

export interface TechItem {
  id: string;
  name: string;
  category: "languages" | "frontend" | "backend" | "database" | "ai" | "devops" | "tools";
  categoryLabel: string;
  icon: IconType;
  color: string;
  description: string;
  row: number;
}

const techItems: TechItem[] = [
  // --- ROW 1 (12 items) ---
  {
    id: "python",
    name: "Python",
    category: "languages",
    categoryLabel: "Core Language",
    icon: SiPython,
    color: "#3776AB",
    description: "Backend services, data analysis, automation scripts, and machine learning pipelines.",
    row: 1,
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    categoryLabel: "Web Standard",
    icon: SiJavascript,
    color: "#F7DF1E",
    description: "Modern ES6+ asynchronous workflows, event loops, and interactive client engines.",
    row: 1,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "languages",
    categoryLabel: "Strict Types",
    icon: SiTypescript,
    color: "#3178C6",
    description: "End-to-end compile-time safety, strict interfaces, and scalable application architectures.",
    row: 1,
  },
  {
    id: "c",
    name: "C",
    category: "languages",
    categoryLabel: "Systems",
    icon: SiC,
    color: "#A8B9CC",
    description: "Low-level memory management, pointers, and fundamental computer science foundations.",
    row: 1,
  },
  {
    id: "cpp",
    name: "C++",
    category: "languages",
    categoryLabel: "High Performance",
    icon: SiCplusplus,
    color: "#00599C",
    description: "Object-oriented systems, algorithmic problem solving, and computational efficiency.",
    row: 1,
  },
  {
    id: "kotlin",
    name: "Kotlin",
    category: "languages",
    categoryLabel: "Modern Multiplatform",
    icon: SiKotlin,
    color: "#7F52FF",
    description: "Concise type-safe syntax, coroutines, and modern backend/mobile services.",
    row: 1,
  },
  {
    id: "html5",
    name: "HTML5",
    category: "frontend",
    categoryLabel: "Web Semantics",
    icon: SiHtml5,
    color: "#E34F26",
    description: "Accessible DOM structure, WCAG AA compliance, and SEO markup.",
    row: 1,
  },
  {
    id: "css3",
    name: "CSS3",
    category: "frontend",
    categoryLabel: "Styling & Motion",
    icon: SiCss,
    color: "#1572B6",
    description: "Fluid responsive layouts, modern CSS grid, flexbox, and GPU transitions.",
    row: 1,
  },
  {
    id: "bash",
    name: "Bash",
    category: "devops",
    categoryLabel: "Shell Automation",
    icon: VscTerminal,
    color: "#4EAA25",
    description: "Command-line automation, environment setup, and deployment scripting.",
    row: 1,
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    categoryLabel: "UI Framework",
    icon: SiReact,
    color: "#61DAFB",
    description: "Component architecture, hooks, concurrent rendering, and reactive state trees.",
    row: 1,
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    categoryLabel: "Full-Stack Framework",
    icon: SiNextdotjs,
    color: "#ffffff",
    description: "App Router, Server Components, Route Handlers, and static/edge rendering.",
    row: 1,
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    category: "frontend",
    categoryLabel: "UI Toolkit",
    icon: SiBootstrap,
    color: "#7952B3",
    description: "Rapid responsive grid prototyping and accessible design components.",
    row: 1,
  },

  // --- ROW 2 (10 items) ---
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    categoryLabel: "Runtime Engine",
    icon: SiNodedotjs,
    color: "#5FA04E",
    description: "Event-driven asynchronous backend architectures and high-throughput REST APIs.",
    row: 2,
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    categoryLabel: "API Server",
    icon: SiExpress,
    color: "#ffffff",
    description: "Lightweight middleware pipelines, authentication, and microservice endpoints.",
    row: 2,
  },
  {
    id: "django",
    name: "Django",
    category: "backend",
    categoryLabel: "Web Framework",
    icon: SiDjango,
    color: "#092E20",
    description: "Batteries-included backend development, ORM models, and robust admin tooling.",
    row: 2,
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "backend",
    categoryLabel: "High-Speed APIs",
    icon: SiFastapi,
    color: "#009688",
    description: "Python async APIs, Pydantic type validation, and automatic OpenAPI schemas.",
    row: 2,
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "ai",
    categoryLabel: "Deep Learning",
    icon: SiTensorflow,
    color: "#FF6F00",
    description: "Neural network architectures, tensor math, and machine learning inference.",
    row: 2,
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "ai",
    categoryLabel: "AI & Neural Networks",
    icon: SiPytorch,
    color: "#EE4C2C",
    description: "Dynamic computation graphs, deep learning research, and model fine-tuning.",
    row: 2,
  },
  {
    id: "scikitlearn",
    name: "Scikit-Learn",
    category: "ai",
    categoryLabel: "Machine Learning",
    icon: SiScikitlearn,
    color: "#F7931E",
    description: "Predictive data modeling, classification, regression, and clustering algorithms.",
    row: 2,
  },
  {
    id: "opencv",
    name: "OpenCV",
    category: "ai",
    categoryLabel: "Computer Vision",
    icon: SiOpencv,
    color: "#5C3EE8",
    description: "Image processing, feature extraction, and real-time visual recognition.",
    row: 2,
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "ai",
    categoryLabel: "Numerical Computing",
    icon: SiNumpy,
    color: "#013243",
    description: "N-dimensional vector arrays, linear algebra, and mathematical operations.",
    row: 2,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Utility Styling",
    icon: SiTailwindcss,
    color: "#06B6D4",
    description: "Utility-first design tokens, responsive breakpoints, and custom animations.",
    row: 2,
  },

  // --- ROW 3 (8 items) ---
  {
    id: "pandas",
    name: "Pandas",
    category: "ai",
    categoryLabel: "Data Engineering",
    icon: SiPandas,
    color: "#150458",
    description: "DataFrame manipulation, ETL pipeline processing, and data cleansing.",
    row: 3,
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    categoryLabel: "Relational DB",
    icon: SiMysql,
    color: "#4479A1",
    description: "ACID transactions, indexed querying, and relational data architecture.",
    row: 3,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    categoryLabel: "Primary Relational DB",
    icon: SiPostgresql,
    color: "#4169E1",
    description: "Row-level locking, complex joins, and transactional guarantees in production.",
    row: 3,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    categoryLabel: "Document Store",
    icon: SiMongodb,
    color: "#47A248",
    description: "Flexible JSON document schemas, aggregation pipelines, and high-velocity storage.",
    row: 3,
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "database",
    categoryLabel: "Realtime Cloud",
    icon: SiFirebase,
    color: "#FFCA28",
    description: "Real-time sync, cloud authentication, and serverless hosting.",
    row: 3,
  },
  {
    id: "redis",
    name: "Redis",
    category: "database",
    categoryLabel: "In-Memory Cache",
    icon: SiRedis,
    color: "#DC382D",
    description: "Key-value caching, sub-millisecond retrieval, and pub/sub message brokers.",
    row: 3,
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    categoryLabel: "Containerization",
    icon: SiDocker,
    color: "#2496ED",
    description: "Multi-stage builds, isolated environments, and deterministic container delivery.",
    row: 3,
  },
  {
    id: "azure",
    name: "Azure",
    category: "devops",
    categoryLabel: "Cloud Computing",
    icon: VscAzure,
    color: "#0078D4",
    description: "Cloud compute, blob storage, serverless functions, and infrastructure scaling.",
    row: 3,
  },

  // --- ROW 4 (6 items) ---
  {
    id: "git",
    name: "Git",
    category: "tools",
    categoryLabel: "Version Control",
    icon: SiGit,
    color: "#F05032",
    description: "Branching workflows, atomic commits, rebasing, and collaborative source control.",
    row: 4,
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools",
    categoryLabel: "Collaboration & CI",
    icon: SiGithub,
    color: "#ffffff",
    description: "GitHub Actions CI/CD workflows, pull requests, issue tracking, and code reviews.",
    row: 4,
  },
  {
    id: "linux",
    name: "Linux",
    category: "tools",
    categoryLabel: "Operating System",
    icon: SiLinux,
    color: "#FCC624",
    description: "Server administration, process monitoring, systemd services, and file permissions.",
    row: 4,
  },
  {
    id: "aws",
    name: "AWS",
    category: "devops",
    categoryLabel: "Cloud Infrastructure",
    icon: FaAws,
    color: "#FF9900",
    description: "S3 asset hosting, EC2 virtual instances, Lambda functions, and IAM policies.",
    row: 4,
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "tools",
    categoryLabel: "IDE & Tooling",
    icon: VscCode,
    color: "#007ACC",
    description: "Integrated development, language servers, debugging, and productivity workflows.",
    row: 4,
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "devops",
    categoryLabel: "Edge Deployment",
    icon: SiVercel,
    color: "#ffffff",
    description: "Zero-configuration deployments, edge networks, serverless functions, and analytics.",
    row: 4,
  },

  // --- ROW 5 (4 items) ---
  {
    id: "jupyter",
    name: "Jupyter",
    category: "tools",
    categoryLabel: "Notebooks & Research",
    icon: SiJupyter,
    color: "#F37626",
    description: "Interactive data visualization, algorithmic prototyping, and reproducible experiments.",
    row: 5,
  },
  {
    id: "figma",
    name: "Figma",
    category: "tools",
    categoryLabel: "UI/UX Design",
    icon: SiFigma,
    color: "#F24E1E",
    description: "High-fidelity wireframing, component design systems, and developer handoff specs.",
    row: 5,
  },
  {
    id: "postman",
    name: "Postman",
    category: "tools",
    categoryLabel: "API Testing",
    icon: SiPostman,
    color: "#FF6C37",
    description: "Automated API test suites, endpoint validation, and environment mocks.",
    row: 5,
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "frontend",
    categoryLabel: "3D & WebGL",
    icon: SiThreedotjs,
    color: "#8054ff",
    description: "Procedural geometry, PBR physical shaders, OrbitControls, and 60fps WebGL scenes.",
    row: 5,
  },

  // --- ROW 6 (2 items) ---
  {
    id: "huggingface",
    name: "Hugging Face",
    category: "ai",
    categoryLabel: "Open Models & NLP",
    icon: SiHuggingface,
    color: "#FFD21E",
    description: "Transformer pipelines, open-source model embeddings, and tokenizers.",
    row: 6,
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    category: "database",
    categoryLabel: "Type-Safe ORM",
    icon: SiPrisma,
    color: "#2D3748",
    description: "Schema-driven modeling, automated PostgreSQL migrations, and type-safe relational queries.",
    row: 6,
  },
];

const categoryFilters = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "ai", label: "AI & ML" },
  { id: "devops", label: "Cloud & DevOps" },
  { id: "tools", label: "Tools" },
] as const;

export function TechStackVisualizer() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredItem, setHoveredItem] = useState<TechItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<TechItem>(techItems[0]);
  const canvasRef = useRef<HTMLDivElement>(null);

  // 3D Wireframe Dome Background in Three.js
  useEffect(() => {
    const host = canvasRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    let animationFrame = 0;
    let isDisposed = false;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Wireframe Hemisphere Dome matching the screenshot
    const domeGeo = new THREE.SphereGeometry(3.6, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.7);
    const domeMat = new THREE.MeshBasicMaterial({
      color: 0x8054ff,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    domeMesh.rotation.x = Math.PI / 4;
    scene.add(domeMesh);

    // Outer subtle rings
    const ringGeo = new THREE.TorusGeometry(3.9, 0.015, 12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.22,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Floating particles
    const particleCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 10;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.03,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Mouse tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.4;
      mouse.targetY = y * 0.4;
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

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      domeMesh.rotation.y = elapsed * 0.06 + mouse.x * 0.5;
      domeMesh.rotation.x = Math.PI / 4 + Math.sin(elapsed * 0.3) * 0.08 + mouse.y * 0.3;

      ring.rotation.z = elapsed * 0.08;
      particles.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      domeGeo.dispose();
      domeMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
      if (host && renderer.domElement && host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  const rows = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].map((rowNum) =>
      techItems.filter((item) => item.row === rowNum),
    );
  }, []);

  const activeDisplay = hoveredItem || selectedItem;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-[var(--shadow-card)] py-12 px-4 sm:px-8 lg:px-12">
      {/* Background 3D Wireframe & Violet Ambient Aura */}
      <div
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,rgba(128,84,255,0.18)_0%,rgba(128,84,255,0.04)_50%,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Title matching the reference */}
        <div className="text-center mb-6">
          <span className="badge-inexa text-xs uppercase tracking-widest font-semibold mb-3">
            Technical Arsenal
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            TECH STACK
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-lg mx-auto">
            Interactive overview of my core programming languages, frameworks, databases, and engineering tools.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10 max-w-3xl">
          {categoryFilters.map((cat) => {
            const isCurrent = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isCurrent
                    ? "bg-[var(--accent-primary)] text-white shadow-md shadow-[rgba(128,84,255,0.35)] scale-105"
                    : "bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-light)] border border-[var(--border-subtle)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Inverted Pyramid Tapering Rows: 12 -> 10 -> 8 -> 6 -> 4 -> 2 */}
        <div className="w-full flex flex-col items-center gap-3 sm:gap-4 my-2">
          {rows.map((rowItems, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-full"
            >
              {rowItems.map((item) => {
                const Icon = item.icon;
                const matchesFilter =
                  activeCategory === "all" || item.category === activeCategory;
                const isHovered = hoveredItem?.id === item.id;
                const isSelected = selectedItem?.id === item.id;

                return (
                  <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => setSelectedItem(item)}
                  >
                    <button
                      type="button"
                      aria-label={`${item.name} (${item.categoryLabel})`}
                      className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] rounded-2xl flex flex-col items-center justify-center p-1.5 sm:p-2 transition-all duration-300 relative ${
                        matchesFilter
                          ? "opacity-100"
                          : "opacity-35 grayscale hover:grayscale-0 hover:opacity-90"
                      } ${
                        isHovered || isSelected
                          ? "scale-110 z-30 bg-[var(--bg-card)] border-2 shadow-lg shadow-[rgba(128,84,255,0.35)]"
                          : "bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-main)] hover:border-[var(--accent-primary)] shadow-sm"
                      }`}
                      style={{
                        borderColor:
                          isHovered || isSelected ? item.color || "var(--accent-primary)" : undefined,
                      }}
                    >
                      <Icon
                        className="text-xl sm:text-2xl lg:text-3xl transition-transform duration-300 group-hover:scale-110"
                        style={{
                          color:
                            matchesFilter || isHovered
                              ? item.color || "var(--accent-primary)"
                              : "var(--text-muted)",
                        }}
                      />
                      <span className="text-[9px] sm:text-[10px] font-medium text-[var(--text-primary)] mt-1 truncate max-w-full leading-none">
                        {item.name}
                      </span>
                    </button>

                    {/* Popover Tooltip on Hover */}
                    {isHovered && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 px-2.5 py-1 rounded-lg bg-[var(--text-primary)] text-[var(--bg-page)] text-[11px] font-bold whitespace-nowrap shadow-xl pointer-events-none animate-in fade-in duration-150 flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Detailed Inspector Card */}
        {activeDisplay && (
          <div className="w-full max-w-2xl mt-10 p-5 sm:p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-main)] shadow-sm transition-all duration-300">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm"
                  style={{ color: activeDisplay.color }}
                >
                  <activeDisplay.icon />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-tight">
                    {activeDisplay.name}
                  </h3>
                  <span className="text-xs text-[var(--text-muted)] font-medium">
                    {activeDisplay.categoryLabel}
                  </span>
                </div>
              </div>

              <span
                className="badge-inexa text-xs py-1 px-3 capitalize"
                style={{
                  color: activeDisplay.color,
                  borderColor: `${activeDisplay.color}40`,
                  backgroundColor: `${activeDisplay.color}15`,
                }}
              >
                {activeDisplay.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed m-0">
              {activeDisplay.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

