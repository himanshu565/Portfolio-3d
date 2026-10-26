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
  SiGnubash,
  SiReact,
  SiNextdotjs,
  SiBootstrap,
  SiNodedotjs,
  SiDjango,
  SiFlask,
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
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscCode, VscAzure } from "react-icons/vsc";
import { FileText, Sparkles } from "lucide-react";
import type { IconType } from "react-icons";
import { siteConfig } from "@/data/site";

// Custom Brand Icons for Photoshop & MS Office
function PhotoshopIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#001E36" stroke="#31A8FF" strokeWidth="1.5" />
      <text
        x="6"
        y="15.8"
        fill="#31A8FF"
        fontSize="8.5"
        fontWeight="bold"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.5px"
      >
        Ps
      </text>
    </svg>
  );
}

function MsOfficeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M21.17 3.25L13.83.67c-.36-.13-.76-.02-1.01.27L7.33 6.05H3.5a1.5 1.5 0 0 0-1.5 1.5v8.9a1.5 1.5 0 0 0 1.5 1.5h3.83l5.49 5.11c.25.29.65.4 1.01.27l7.34-2.58A1.5 1.5 0 0 0 22 19.33V4.67a1.5 1.5 0 0 0-.83-1.42zM12.5 19.18l-4.17-3.88V8.7l4.17-3.88v14.36zm8 0l-6.5 2.29V2.53l6.5 2.29v14.36z" />
    </svg>
  );
}

export type TechCategory = "languages" | "frontend" | "backend" | "database" | "ai" | "devops" | "tools";

export interface TechItem {
  id: string;
  name: string;
  category: TechCategory;
  categoryLabel: string;
  icon: IconType | React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  description: string;
  row: number;
}

export const techItems: TechItem[] = [
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
    id: "html",
    name: "HTML",
    category: "frontend",
    categoryLabel: "Web Semantics",
    icon: SiHtml5,
    color: "#E34F26",
    description: "Accessible DOM structure, semantic HTML5 tags, and WCAG AA compliance.",
    row: 1,
  },
  {
    id: "css",
    name: "CSS",
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
    category: "tools",
    categoryLabel: "Shell Automation",
    icon: SiGnubash,
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
    color: "#f3f6f4",
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
    id: "flask",
    name: "Flask",
    category: "backend",
    categoryLabel: "Microframework",
    icon: SiFlask,
    color: "#f3f6f4",
    description: "Lightweight Python microservices, modular blueprints, and REST endpoints.",
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
    name: "Scikit-learn",
    category: "ai",
    categoryLabel: "Machine Learning",
    icon: SiScikitlearn,
    color: "#F7931E",
    description: "Classical classification, regression, clustering algorithms, and model validation.",
    row: 2,
  },
  {
    id: "opencv",
    name: "OpenCV",
    category: "ai",
    categoryLabel: "Computer Vision",
    icon: SiOpencv,
    color: "#5C3EE8",
    description: "Real-time image filtering, edge detection, feature extraction, and matrix manipulation.",
    row: 2,
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "ai",
    categoryLabel: "Numerical Computing",
    icon: SiNumpy,
    color: "#4DABCF",
    description: "N-dimensional array computation, linear algebra, vectorization, and scientific operations.",
    row: 2,
  },
  {
    id: "tailwind",
    name: "Tailwind",
    category: "frontend",
    categoryLabel: "CSS Framework",
    icon: SiTailwindcss,
    color: "#06B6D4",
    description: "Utility-first design tokens, responsive breakpoints, and dark mode theming.",
    row: 2,
  },

  // --- ROW 3 (8 items) ---
  {
    id: "pandas",
    name: "Pandas",
    category: "ai",
    categoryLabel: "Data Manipulation",
    icon: SiPandas,
    color: "#150458",
    description: "DataFrame transformations, timeseries parsing, data cleaning, and CSV/SQL ingestion.",
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
    color: "#f3f6f4",
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
    color: "#f3f6f4",
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
    id: "photoshop",
    name: "Photoshop",
    category: "tools",
    categoryLabel: "Visual Editing",
    icon: PhotoshopIcon,
    color: "#31A8FF",
    description: "High-resolution graphic assets, raster editing, composition, and presentation mockups.",
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
    id: "msoffice",
    name: "MS Office",
    category: "tools",
    categoryLabel: "Productivity Suite",
    icon: MsOfficeIcon,
    color: "#D83B01",
    description: "Spreadsheet modeling, technical documentation, operational presentations, and reporting.",
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
  { id: "devops", label: "DevOps & Cloud" },
  { id: "tools", label: "Tools" },
] as const;

export function TechStackVisualizer() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredItem, setHoveredItem] = useState<TechItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<TechItem>(techItems[16]); // TensorFlow default
  const canvasRef = useRef<HTMLDivElement>(null);

  // 3D Wireframe Dome Background in Three.js (Emerald Green & Crimson Red Aesthetic)
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
        powerPreference: "high-performance",
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
    camera.position.set(0, 0, 7.8);

    // Wireframe Hemisphere Dome in Electric Lavender
    const domeGeo = new THREE.SphereGeometry(3.8, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.72);
    const domeMat = new THREE.MeshBasicMaterial({
      color: 0xa66bff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    domeMesh.rotation.x = Math.PI / 3.8;
    scene.add(domeMesh);

    // Outer subtle orbital ring in Lemon Yellow
    const ringGeo = new THREE.TorusGeometry(4.2, 0.015, 12, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfff21a,
      transparent: true,
      opacity: 0.28,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Inner subtle secondary ring in Electric Lavender
    const ringInnerGeo = new THREE.TorusGeometry(3.3, 0.012, 12, 64);
    const ringInnerMat = new THREE.MeshBasicMaterial({
      color: 0xa66bff,
      transparent: true,
      opacity: 0.18,
    });
    const ringInner = new THREE.Mesh(ringInnerGeo, ringInnerMat);
    ringInner.rotation.y = Math.PI / 4;
    scene.add(ringInner);

    // Floating particles (Electric Lavender & Lemon Yellow)
    const particleCount = 70;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 11;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      if (i % 2 === 0) {
        // Electric Lavender
        pColors[i * 3] = 0.65;
        pColors[i * 3 + 1] = 0.42;
        pColors[i * 3 + 2] = 1.0;
      } else {
        // Lemon Yellow
        pColors[i * 3] = 1.0;
        pColors[i * 3 + 1] = 0.95;
        pColors[i * 3 + 2] = 0.1;
      }
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Adaptive Theme for Tech Stack 3D Scene
    const applyStackTheme = (isDark: boolean) => {
      if (isDark) {
        domeMat.color.setHex(0xa66bff);
        domeMat.opacity = 0.2;
        ringMat.color.setHex(0xfff21a);
        ringMat.opacity = 0.28;
        ringInnerMat.color.setHex(0xa66bff);
        ringInnerMat.opacity = 0.18;
        pMat.opacity = 0.4;
      } else {
        domeMat.color.setHex(0x7c3aed);
        domeMat.opacity = 0.28;
        ringMat.color.setHex(0xd97706);
        ringMat.opacity = 0.36;
        ringInnerMat.color.setHex(0x7c3aed);
        ringInnerMat.opacity = 0.22;
        pMat.opacity = 0.6;
      }
      domeMat.needsUpdate = true;
      ringMat.needsUpdate = true;
      ringInnerMat.needsUpdate = true;
      pMat.needsUpdate = true;
    };

    const checkIsDark = () => document.documentElement.classList.contains("dark");
    applyStackTheme(checkIsDark());

    const stackThemeObserver = new MutationObserver(() => {
      applyStackTheme(checkIsDark());
    });
    stackThemeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Mouse tracking for reactive parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.35;
      mouse.targetY = y * 0.35;
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

      domeMesh.rotation.y = elapsed * 0.05 + mouse.x * 0.4;
      domeMesh.rotation.x = Math.PI / 3.8 + Math.sin(elapsed * 0.25) * 0.06 + mouse.y * 0.25;

      ring.rotation.z = elapsed * 0.07;
      ringInner.rotation.x = -elapsed * 0.05;
      particles.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrame);
      stackThemeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      domeGeo.dispose();
      domeMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringInnerGeo.dispose();
      ringInnerMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
      if (host && renderer.domElement && host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Partition into the 6 Inverted-Pyramid Rows: 12 -> 10 -> 8 -> 6 -> 4 -> 2
  const rows = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].map((rowNum) =>
      techItems.filter((item) => item.row === rowNum),
    );
  }, []);

  const activeDisplay = hoveredItem || selectedItem;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-[var(--shadow-card)] py-12 px-3 sm:px-8 lg:px-12">
      {/* Background 3D Wireframe & Dual Electric Lavender + Lemon Ambient Aura */}
      <div
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,rgba(166,107,255,0.1)_0%,rgba(255,242,26,0.05)_45%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Top Header */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center mb-6">
          <span className="badge-inexa text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles size={12} className="text-[var(--accent-primary)]" />
            <span>Technical Arsenal</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            TECH STACK
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-lg mx-auto">
            Interactive pyramid map of core engineering technologies, ML frameworks, databases, and DevOps toolchains.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 max-w-3xl">
          {categoryFilters.map((cat) => {
            const isCurrent = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  isCurrent
                    ? "bg-[var(--accent-primary)] text-[#171717] shadow-md shadow-yellow-500/25 scale-105"
                    : "bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-light)] border border-[var(--border-subtle)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Inverted Pyramid Tapering Rows: 12 -> 10 -> 8 -> 6 -> 4 -> 2 */}
        <div className="w-full flex flex-col items-center gap-2.5 sm:gap-3.5 my-2">
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
                      className={`w-11 h-11 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] rounded-2xl flex flex-col items-center justify-center p-1 sm:p-2 transition-all duration-250 relative ${
                        matchesFilter
                          ? "opacity-100"
                          : "opacity-30 grayscale hover:grayscale-0 hover:opacity-85"
                      } ${
                        isHovered || isSelected
                          ? "scale-110 z-30 bg-[var(--bg-card)] border-2 shadow-xl"
                          : "bg-[var(--bg-subtle)]/80 backdrop-blur-md border border-[var(--border-main)] hover:border-[var(--accent-primary)] shadow-sm"
                      }`}
                      style={{
                        borderColor:
                          isHovered || isSelected ? item.color || "var(--accent-primary)" : undefined,
                        boxShadow:
                          isHovered || isSelected
                            ? `0 0 18px ${item.color}40, 0 8px 24px rgba(0,0,0,0.4)`
                            : undefined,
                      }}
                    >
                      <Icon
                        className="text-lg sm:text-2xl lg:text-[26px] transition-transform duration-250 group-hover:scale-110"
                        style={{
                          color:
                            matchesFilter || isHovered
                              ? item.color || "var(--accent-primary)"
                              : "var(--text-muted)",
                        }}
                      />
                      <span className="text-[8px] sm:text-[9.5px] font-medium text-[var(--text-primary)] mt-1 truncate max-w-full leading-none">
                        {item.name}
                      </span>
                    </button>

                    {/* Popover Tooltip on Hover matching user screenshot */}
                    {isHovered && (
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-40 px-2.5 py-1 rounded-md bg-[#171717] text-[#ffffff] border border-[#2e2e2e] text-[11px] font-bold whitespace-nowrap shadow-xl pointer-events-none animate-in fade-in zoom-in-95 duration-150 flex items-center gap-1.5">
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
          <div className="w-full max-w-2xl mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-main)] shadow-sm transition-all duration-300">
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

      {/* Bottom Right "RESUME" Button matching user reference screenshot */}
      <a
        href={siteConfig.resumePath || "#contact"}
        target={siteConfig.resumePath ? "_blank" : undefined}
        rel="noreferrer"
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] bg-[var(--bg-subtle)]/90 backdrop-blur-md border border-[var(--border-main)] shadow-sm hover:shadow-[0_0_14px_rgba(255,242,26,0.3)]"
        aria-label="View Resume"
      >
        <span>RESUME</span>
        <FileText size={13} className="text-[var(--accent-primary)]" />
      </a>
    </div>
  );
}
