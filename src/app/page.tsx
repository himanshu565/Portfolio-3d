import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Boxes,
  Check,
  Code2,
  Layers3,
  MapPin,
  RadioTower,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { HeroScene } from "@/components/hero-scene";
import { ProjectCard } from "@/components/project-card";
import { Interactive3DLab } from "@/components/interactive-3d-lab";
import { SpecsStrip } from "@/components/specs-strip";
import { ContactCard } from "@/components/contact-card";
import { AmbientLight } from "@/components/ambient-light";
import { SectionHeading } from "@/components/section-heading";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ParticleBackground } from "@/components/particle-background";
import { GsapAnimator } from "@/components/gsap-animator";
import { FaGithub } from "react-icons/fa";
import { principles, projects, siteConfig, skillGroups } from "@/data/site";

const focusAreas = [
  { icon: Braces, label: "Product interfaces", detail: "React 19 · Next.js · Cyber Glass" },
  { icon: RadioTower, label: "Connected systems", detail: "APIs · WebSockets · Telemetry" },
  { icon: Layers3, label: "Reliable data", detail: "PostgreSQL · ACID · Workflows" },
];

export default function HomePage() {
  return (
    <SmoothScroll>
      <ParticleBackground />
      <AmbientLight />
      <GsapAnimator />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        {/* HERO SECTION WITH 3D OBSERVATORY & UNDULATING CYBER GRID */}
        <section className="hero section-shell" id="top">
          <div className="hero-grain" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="status-pulse" /> FULL-STACK & 3D WEBGL <span className="eyebrow-divider">/</span> SYS.ONLINE 60 FPS
              </div>
              <h1>
                I build the systems{" "}
                <span className="hero-gradient">
                  behind the{" "}
                  <span className="inline-block whitespace-nowrap">
                    screen<span className="hero-period">.</span>
                  </span>
                </span>
              </h1>
              <p className="hero-lede">
                I&apos;m Himanshu — an engineer drawn to the intersection of tactile cyber interfaces and robust, scalable backend architectures. I turn mission-critical workflows into software that is reliable, responsive, and intuitive.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="#work">
                  Explore selected work <ArrowDownRight size={17} />
                </Link>
                <Link className="button button-quiet" href="#lab">
                  Interactive 3D Lab <ArrowRight size={16} />
                </Link>
                <a className="button button-quiet" href={siteConfig.github} target="_blank" rel="noreferrer">
                  <FaGithub size={16} /> GitHub <ArrowUpRight size={14} />
                </a>
              </div>
              <div className="hero-presence">
                <span className="presence-orbit">
                  <span />
                </span>
                <span>BUILDING · LEARNING · SHIPPING</span>
                <span className="presence-divider" />
                <MapPin size={13} />
                <span>India · Open to opportunities</span>
              </div>
            </div>

            <div className="hero-art-wrap">
              <div className="scene-label scene-label-top">
                <span className="scene-label-index">FIG. 01</span>
                <span>THE SYSTEMS OBSERVATORY // 3D WEBGL</span>
              </div>
              <div className="scene-halo scene-halo-one" aria-hidden="true" />
              <div className="scene-halo scene-halo-two" aria-hidden="true" />
              <HeroScene />
              <div className="scene-float-label float-label-left">
                <span className="float-label-icon lime">
                  <Boxes size={15} />
                </span>
                <span>
                  <b>Inventory Matrix</b>
                  <small>Structured operations</small>
                </span>
              </div>
              <div className="scene-float-label float-label-right">
                <span className="float-label-icon coral">
                  <RadioTower size={15} />
                </span>
                <span>
                  <b>Live Telemetry</b>
                  <small>Signal → insight</small>
                </span>
              </div>
              <div className="scene-float-label float-label-bottom">
                <span className="float-label-icon violet">
                  <Code2 size={15} />
                </span>
                <span>
                  <b>Backend Logic</b>
                  <small>Predictable by design</small>
                </span>
                <span className="label-arrow">
                  <ArrowUpRight size={14} />
                </span>
              </div>
              <div className="scene-axis scene-axis-left">
                DATA IN <span /> DECISIONS OUT
              </div>
              <div className="scene-coordinate">
                FLOW ID // 001
                <br />
                CYBER GRID MATRIX
              </div>
            </div>
          </div>

          <div className="container hero-bottom">
            <span className="hero-bottom-label">MY WORK SITS AT THE INTERSECTION OF</span>
            <div className="hero-tech-list">
              <span>Frontend Craft</span>
              <b>×</b>
              <span>Backend Logic</span>
              <b>×</b>
              <span>Real-World 3D Systems</span>
            </div>
            <a href="#work" className="scroll-cue">
              SCROLL TO EXPLORE{" "}
              <span>
                <ArrowDown size={14} />
              </span>
            </a>
          </div>
        </section>

        {/* KINETIC MONOSPACE TICKER */}
        <section className="ticker-section" aria-label="Technologies and areas of focus">
          <div className="ticker-track">
            <span>REACT 19 & NEXT.JS</span>
            <i>✳</i>
            <span>THREE.JS & WEBGL</span>
            <i>✳</i>
            <span>NODE.JS & APIS</span>
            <i>✳</i>
            <span>POSTGRESQL & PRISMA</span>
            <i>✳</i>
            <span>TRANSACTION ISOLATION</span>
            <i>✳</i>
            <span>IOT TELEMETRY</span>
            <i>✳</i>
            <span>REACT 19 & NEXT.JS</span>
            <i>✳</i>
            <span>THREE.JS & WEBGL</span>
            <i>✳</i>
            <span>NODE.JS & APIS</span>
            <i>✳</i>
            <span>POSTGRESQL & PRISMA</span>
            <i>✳</i>
          </div>
        </section>

        {/* SYSTEM SPECIFICATIONS STRIP */}
        <SpecsStrip />

        {/* SELECTED WORK */}
        <section className="work-section section-shell" id="work">
          <div className="container">
            <SectionHeading index="01" eyebrow="PORTFOLIO WORKSHOP" title="Engineered around real problems.">
              Practical production systems with real constraints, thoughtful trade-offs, and verifiable reliability.
            </SectionHeading>
            <div className="project-intro-line">
              <span>
                SELECTED BUILDS <b>({String(projects.length).padStart(2, "0")})</b>
              </span>
              <span>
                INTERACTIVE 3D CARDS · MOVE CURSOR OVER CARDS <ArrowDownRight size={14} />
              </span>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.number} project={project} />
              ))}
            </div>
            <div className="work-bottom-note">
              <span className="note-mark">↳</span>
              <p>
                Documenting systemic choices: schema migrations, concurrency bottlenecks, error boundaries, audit trails, and performance improvements.
              </p>
              <a href={siteConfig.github} target="_blank" rel="noreferrer">
                Explore repository on GitHub <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* INTERACTIVE 3D SYSTEMS LAB */}
        <section className="lab-section section-shell" id="lab">
          <div className="container">
            <SectionHeading
              index="02"
              eyebrow="IMMERSIVE 3D SHOWCASE"
              title="Interactive 3D Architecture Lab."
            >
              Real-time WebGL models showcasing the mechanical and systemic concepts behind my builds. Orbit, zoom, and inspect each sub-system.
            </SectionHeading>
            <Interactive3DLab />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="about-section section-shell" id="about">
          <div className="container">
            <div className="about-topline">
              <span>03 / CONTEXT & PHILOSOPHY</span>
              <span>DEVELOPER · SYSTEMS THINKER · BUILDER</span>
            </div>
            <div className="about-layout">
              <div className="about-story">
                <h2>
                  Curious about the entire machine, <em>not just the surface.</em>
                </h2>
                <p className="body-copy">
                  My background spans product delivery, startup environments, and workflows from environmental monitoring. It taught me to look beyond the happy path: data needs to be trustworthy, permissions need to make sense, and the software needs to survive real usage.
                </p>
                <p className="body-copy">
                  Now I&apos;m going deeper on full-stack and spatial web engineering—building complete products, sharpening system-design and database fundamentals, and developing interactive 3D WebGL experiences that bring digital tools to life.
                </p>
                <div className="about-location">
                  <MapPin size={15} /> India <span className="location-separator">·</span> Open to full-stack & 3D opportunities
                </div>
              </div>
              <div className="about-visual-panel">
                <div className="panel-stamp">
                  <Sparkles size={14} /> HOW I THINK ABOUT SOFTWARE
                </div>
                <div className="focus-orbit focus-orbit-one" />
                <div className="focus-orbit focus-orbit-two" />
                <div className="focus-core">
                  <Layers3 size={28} strokeWidth={1.5} />
                  <span>THE CORE</span>
                </div>
                {focusAreas.map(({ icon: Icon, label, detail }, index) => (
                  <div className={`focus-node focus-node-${index + 1}`} key={label}>
                    <span>
                      <Icon size={16} />
                    </span>
                    <b>{label}</b>
                    <small>{detail}</small>
                  </div>
                ))}
                <div className="panel-bottom-line">
                  <span>LAYER 01 — 03</span>
                  <span>EVERY COMPONENT HAS PURPOSE</span>
                </div>
              </div>
            </div>
            <div className="principles-strip">
              {principles.map((item) => (
                <div className="principle-item" key={item.number}>
                  <span className="principle-number">{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                  <ArrowUpRight size={16} className="principle-arrow" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOLKIT */}
        <section className="toolkit-section section-shell" id="toolkit">
          <div className="container">
            <SectionHeading index="04" eyebrow="TECHNICAL ARSENAL" title="A practical, battle-tested stack.">
              Focusing on fundamental computer science principles, clean abstractions, and maintainable software.
            </SectionHeading>
            <div className="toolkit-grid">
              {skillGroups.map((group) => (
                <article className="toolkit-card" key={group.number}>
                  <div className="toolkit-card-top">
                    <span>{group.number}</span>
                    <ArrowUpRight size={15} />
                  </div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="skill-chip-list">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="toolkit-honesty">
              <span className="honesty-icon">
                <Check size={14} />
              </span>
              <p>
                <strong>Reflects active production stacks:</strong> Next.js, Three.js, PostgreSQL, Prisma, Node.js, and TypeScript.
              </p>
            </div>
          </div>
        </section>

        {/* APPROACH */}
        <section className="approach-section section-shell" id="approach">
          <div className="container approach-inner">
            <div className="approach-copy">
              <div className="section-kicker">
                <span>05</span>
                <span className="kicker-line" />
                <span>FROM PROBLEM TO PRODUCT</span>
              </div>
              <h2>
                Understand constraints.
                <br />
                <span>Engineer reliability.</span>
              </h2>
              <p>
                My process begins with real workflows and physical constraints—not hype. Then I architect from the data model and API contracts through to resilient UI states, tests, failure modes, and automated CI/CD.
              </p>
              <a href={siteConfig.github} target="_blank" rel="noreferrer" className="text-link">
                Inspect architecture on GitHub <ArrowRight size={16} />
              </a>
            </div>
            <div className="approach-steps">
              <div className="approach-step">
                <span>01</span>
                <div>
                  <strong>Map the problem domain</strong>
                  <small>Edge cases · data models · physical constraints</small>
                </div>
                <Check size={15} />
              </div>
              <div className="approach-step">
                <span>02</span>
                <div>
                  <strong>Design core foundations</strong>
                  <small>Database schema · idempotency · transaction isolation</small>
                </div>
                <Check size={15} />
              </div>
              <div className="approach-step">
                <span>03</span>
                <div>
                  <strong>Build and validate</strong>
                  <small>Glassmorphic UI · Three.js scenes · error bounds</small>
                </div>
                <Check size={15} />
              </div>
              <div className="approach-step">
                <span>04</span>
                <div>
                  <strong>Ship and monitor</strong>
                  <small>Vercel deployment · telemetry · iterative feedback</small>
                </div>
                <Check size={15} />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section section-shell" id="contact">
          <div className="container">
            <ContactCard />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <Link href="#top" className="footer-brand">
            HB<span>.</span>
          </Link>
          <span>ENGINEERED WITH REACT, NEXT.JS & THREE.JS · CYBER OBSIDIAN GLASS</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </SmoothScroll>
  );
}
