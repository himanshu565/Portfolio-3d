import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Database,
  Globe2,
  Layers,
  MapPin,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiteHeader } from "@/components/site-header";
import { HeroScene } from "@/components/hero-scene";
import { ProjectCard } from "@/components/project-card";
import { ContactCard } from "@/components/contact-card";
import { SectionHeading } from "@/components/section-heading";
import { SmoothScroll } from "@/components/smooth-scroll";
import { GsapAnimator } from "@/components/gsap-animator";
import { TechStackVisualizer } from "@/components/tech-stack-visualizer";
import { principles, projects, siteConfig, skillGroups } from "@/data/site";

const engineeringHighlights = [
  {
    icon: Code2,
    title: "Product Interfaces",
    detail: "Next.js, React 19, TypeScript, and accessible kinetic micro-interactions.",
  },
  {
    icon: Database,
    title: "Backend & Systems",
    detail: "High-concurrency Node.js APIs, ACID transaction isolation, and PostgreSQL.",
  },
  {
    icon: Globe2,
    title: "Interactive 3D",
    detail: "Procedural WebGL graphics, spatial architectures, and Three.js scenes.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Map the problem domain",
    desc: "Understand real user workflows, physical constraints, edge cases, and failure modes before writing code.",
  },
  {
    step: "02",
    title: "Design core foundations",
    desc: "Architect data models, ACID transaction boundaries, idempotency keys, and explicit API contracts.",
  },
  {
    step: "03",
    title: "Build and validate",
    desc: "Develop accessible, tactile user interfaces, robust error boundaries, and strict type-checked logic.",
  },
  {
    step: "04",
    title: "Ship and monitor",
    desc: "Deploy with continuous integration, verify telemetry, and iterate based on real feedback.",
  },
];

export default function HomePage() {
  return (
    <SmoothScroll>
      <GsapAnimator />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        {/* =========================================================================
            1. HERO SECTION — Inexa-Inspired Minimal Art Direction
            ========================================================================= */}
        <section className="section-inexa pt-12 sm:pt-16 pb-20 sm:pb-28" id="top">
          <div className="container-inexa">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center hero-content-wrap">
              {/* Left Column: Editorial Headline & Actions */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="hero-badge badge-inexa mb-5">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                  <span>Full-Stack Developer · Distributed Systems</span>
                </div>

                <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
                  I build thoughtful software for{" "}
                  <span className="text-[var(--text-primary)] underline decoration-[var(--border-main)] decoration-2 underline-offset-8">
                    complex workflows.
                  </span>
                </h1>

                <p className="hero-description text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl">
                  I&apos;m Himanshu — an engineer focused on React, Next.js, reliable Node.js architectures, ACID transaction integrity, and spatial WebGL graphics. I turn domain-heavy systems into software that is reliable, responsive, and intuitive.
                </p>

                <div className="hero-actions flex flex-wrap items-center gap-3 mb-10">
                  <a href="#work" className="btn-inexa-primary">
                    Explore Selected Work <ArrowDown size={16} />
                  </a>
                  <a href="#contact" className="btn-inexa-outline">
                    Get in touch <ArrowRight size={15} />
                  </a>
                  {siteConfig.github && (
                    <a
                      href={siteConfig.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-inexa-ghost"
                      aria-label="GitHub Profile"
                    >
                      <FaGithub size={18} />
                      <span>GitHub</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  {siteConfig.linkedin && (
                    <a
                      href={siteConfig.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-inexa-ghost"
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedin size={18} />
                      <span>LinkedIn</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>

                {/* Presence & Location */}
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] pt-6 border-t border-[var(--border-subtle)] w-full">
                  <MapPin size={14} className="text-[var(--accent-primary)]" />
                  <span>{siteConfig.location}</span>
                  <span className="mx-2">·</span>
                  <span>React 19 · Node.js · Three.js</span>
                </div>
              </div>

              {/* Right Column: Interactive 3D Architectural Showcase */}
              <div className="lg:col-span-5 flex items-center justify-center hero-visual-wrap relative">
                <div className="w-full max-w-md aspect-square rounded-3xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-2 sm:p-3 shadow-[var(--shadow-subtle)] relative overflow-hidden flex items-center justify-center">
                  <HeroScene />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. SMOOTH KINETIC TICKER
            ========================================================================= */}
        <div className="marquee-container" aria-label="Core Engineering Domains">
          <div className="marquee-content">
            <span>React 19 & Next.js <i className="separator">✦</i></span>
            <span>Node.js & Express <i className="separator">✦</i></span>
            <span>PostgreSQL & Prisma <i className="separator">✦</i></span>
            <span>ACID Transaction Isolation <i className="separator">✦</i></span>
            <span>Three.js & WebGL <i className="separator">✦</i></span>
            <span>IoT Telemetry Pipelines <i className="separator">✦</i></span>
            <span>Practical AI Engineering <i className="separator">✦</i></span>
            <span>TypeScript & Strict Types <i className="separator">✦</i></span>
            <span>React 19 & Next.js <i className="separator">✦</i></span>
            <span>Node.js & Express <i className="separator">✦</i></span>
            <span>PostgreSQL & Prisma <i className="separator">✦</i></span>
            <span>ACID Transaction Isolation <i className="separator">✦</i></span>
            <span>Three.js & WebGL <i className="separator">✦</i></span>
            <span>IoT Telemetry Pipelines <i className="separator">✦</i></span>
            <span>Practical AI Engineering <i className="separator">✦</i></span>
            <span>TypeScript & Strict Types <i className="separator">✦</i></span>
          </div>
        </div>

        {/* =========================================================================
            3. FEATURED WORK / PROJECTS
            ========================================================================= */}
        <section className="section-inexa bg-inexa-secondary" id="work">
          <div className="container-inexa">
            <SectionHeading
              index="01"
              eyebrow="PORTFOLIO"
              title="Featured engineering projects."
            >
              Practical production systems built with real constraints, verifiable correctness, and thoughtful architecture.
            </SectionHeading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 projects-grid">
              {projects.map((project, idx) => (
                <ProjectCard
                  key={project.number}
                  project={project}
                  featured={idx === 0}
                />
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl shadow-[var(--shadow-subtle)] gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[var(--accent-primary)] font-bold text-lg">↳</span>
                <p className="text-sm text-[var(--text-secondary)] m-0">
                  Focusing on systemic trade-offs: concurrency limits, schema migrations, audit trails, and data reliability.
                </p>
              </div>
              {siteConfig.github && (
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-inexa-outline text-xs py-2 px-4 whitespace-nowrap self-start sm:self-auto"
                >
                  Explore repositories on GitHub <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. ABOUT & PHILOSOPHY
            ========================================================================= */}
        <section className="section-inexa" id="about">
          <div className="container-inexa">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Context Story */}
              <div className="lg:col-span-6">
                <SectionHeading
                  index="02"
                  eyebrow="ABOUT ME"
                  title="Curious about the entire system, not just the surface."
                />

                <div className="space-y-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    My background spans product delivery, startup environments, and workflows from environmental monitoring. It taught me to look beyond the happy path: data needs to be trustworthy, permissions need to make sense, and the software needs to survive real usage.
                  </p>
                  <p>
                    I focus deeply on full-stack web architectures and spatial 3D experiences. Whether building transactional APIs with strict row locking or interactive WebGL scenes, I emphasize clarity, performance, and long-term maintainability.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--border-subtle)]">
                  {engineeringHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="p-4 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-xl">
                        <Icon size={18} className="text-[var(--accent-primary)] mb-2" />
                        <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed m-0">
                          {item.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Engineering Principles */}
              <div className="lg:col-span-6 space-y-4 principles-grid">
                <div className="badge-inexa mb-2">
                  <span>Guiding Principles</span>
                </div>
                {principles.map((principle) => (
                  <div key={principle.number} className="principle-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[var(--accent-primary)]">
                        PRINCIPLE // {principle.number}
                      </span>
                      <ArrowUpRight size={15} className="text-[var(--text-muted)]" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">
                      {principle.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. CAPABILITIES & INTERACTIVE TECH STACK
            ========================================================================= */}
        <section className="section-inexa bg-inexa-secondary" id="capabilities">
          <div className="container-inexa">
            <SectionHeading
              index="03"
              eyebrow="TECH ARSENAL"
              title="Interactive Stack & Engineering Capabilities."
            >
              Explore my technical proficiencies across languages, frontend, distributed backends, databases, machine learning, and DevOps.
            </SectionHeading>

            {/* Interactive Inverted Pyramid Tech Stack matching the user's reference */}
            <div className="mb-14">
              <TechStackVisualizer />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 capabilities-grid">
              {skillGroups.map((group) => (
                <div key={group.number} className="capability-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[var(--accent-primary)]">
                        {group.number}
                      </span>
                      <Layers size={16} className="text-[var(--text-muted)]" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                      {group.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
                    {group.skills.map((skill) => (
                      <span key={skill} className="badge-neutral text-[11px] py-1 px-2.5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2.5 text-xs text-[var(--text-muted)]">
              <Check size={14} className="text-emerald-500" />
              <span>
                Reflects active production toolchains: Next.js, React 19, TypeScript, PostgreSQL, Prisma, Express, and Three.js.
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. ENGINEERING PROCESS
            ========================================================================= */}
        <section className="section-inexa bg-inexa-secondary" id="process">
          <div className="container-inexa">
            <SectionHeading
              index="04"
              eyebrow="METHODOLOGY"
              title="From problem domain to reliable product."
            >
              How I approach software engineering from initial constraints to production deployment.
            </SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 process-grid">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="process-step bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl p-6 shadow-[var(--shadow-subtle)] hover-up"
                >
                  <span className="text-xs font-mono font-bold text-[var(--accent-primary)] mb-3 block">
                    STEP // {step.step}
                  </span>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed m-0">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CONTACT SECTION
            ========================================================================= */}
        <section className="section-inexa" id="contact">
          <div className="container-inexa">
            <ContactCard />
          </div>
        </section>
      </main>

      {/* =========================================================================
          8. FOOTER — Inexa Style Clean Footer
          ========================================================================= */}
      <footer className="border-t border-[var(--border-main)] bg-[var(--bg-card)] py-12">
        <div className="container-inexa flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[var(--text-primary)] text-[var(--bg-page)] font-bold text-xs flex items-center justify-center">
              {siteConfig.initials}
            </span>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {siteConfig.name}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} · All rights reserved
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-[var(--text-secondary)] font-medium">
            <a href="#work" className="hover:text-[var(--text-primary)] transition-colors">Work</a>
            <a href="#about" className="hover:text-[var(--text-primary)] transition-colors">About</a>
            <a href="#capabilities" className="hover:text-[var(--text-primary)] transition-colors">Capabilities</a>
            <a href="#process" className="hover:text-[var(--text-primary)] transition-colors">Process</a>
            <a href="#contact" className="hover:text-[var(--text-primary)] transition-colors">Contact</a>
          </div>

          <a
            href="#top"
            className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </SmoothScroll>
  );
}
