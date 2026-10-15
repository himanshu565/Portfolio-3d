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
  Mail,
  MapPin,
  MoveUpRight,
  RadioTower,
  Sparkles,
  Terminal,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current?.appendChild(renderer.domElement);

    // Texture loader for Earth
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/earth.jpg'); // Ensure this file exists in your public folder
    
    // Create a realistic globe with texture
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({ map: earthTexture });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add realistic lighting
    const ambientLight = new THREE.AmbientLight(0x333333); // Soft light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(ambientLight, directionalLight);

    // Add OrbitControls for interactive 3D experience
    import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { SpotLight } from 'three';
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.target.set(0, 0, 0);

    // Position camera for optimal view
    camera.position.z = 3;

    // Animation loop with performance monitoring
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls
      controls.update();
      
      // Render scene
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };

    // Add mouse interaction (optional)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const rect = sceneRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const mouseX = (e.clientX - rect.left) / rect.width;
      const mouseY = (e.clientY - rect.top) / rect.height;
      
      // Calculate rotation based on mouse movement
      const dx = (mouseX - previousMousePosition.x) * 0.01;
      const dy = (mouseY - previousMousePosition.y) * 0.01;
      
      // Rotate globe
      globe.rotation.y += dx;
      globe.rotation.x += dy;
      
      setPreviousMousePosition({ x: mouseX, y: mouseY });
    };

    const handleMouseDown = () => {
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    sceneRef.current?.addEventListener('mousemove', handleMouseMove);
    sceneRef.current?.addEventListener('mousedown', handleMouseDown);
    sceneRef.current?.addEventListener('mouseup', handleMouseUp);
    sceneRef.current?.addEventListener('mouseleave', handleMouseUp);
    
    return () => {
      sceneRef.current?.removeEventListener('mousemove', handleMouseMove);
      sceneRef.current?.removeEventListener('mousedown', handleMouseDown);
      sceneRef.current?.removeEventListener('mouseup', handleMouseUp);
      sceneRef.current?.removeEventListener('mouseleave', handleMouseUp);
    };
  }, []);

  return <div ref={sceneRef} className="hero-art-wrap" />;
}
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { FaGithub ,FaLinkedin } from 'react-icons/fa';
import { principles, projects, siteConfig, skillGroups } from "@/data/site";

const focusAreas = [
  { icon: Braces, label: "Product interfaces", detail: "React · Next.js" },
  { icon: RadioTower, label: "Connected systems", detail: "APIs · Telemetry" },
  { icon: Layers3, label: "Reliable data", detail: "SQL · Workflows" },
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <section className="hero section-shell" id="top">
          <div className="hero-grain" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-pulse" /> INDEPENDENT DEVELOPER <span className="eyebrow-divider">/</span> INDIA</div>
              <h1>I build the systems <span className="hero-serif">behind</span> the screen<span className="hero-period">.</span></h1>
              <p className="hero-lede">I&apos;m Himanshu — a full-stack developer drawn to the part where thoughtful interfaces meet reliable systems. I turn real-world workflows into software people can trust.</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="#work">Explore selected work <ArrowDownRight size={17} /></Link>
                <a className="button button-quiet" href={siteConfig.github} target="_blank" rel="noreferrer"><FaGithub size={17} /> GitHub <ArrowUpRight size={15} /></a>
              </div>
              <div className="hero-presence"><span className="presence-orbit"><span /></span><span>Currently building, learning, and shipping.</span><span className="presence-divider" /><MapPin size={13} /><span>India · Open to opportunities</span></div>
            </div>

            <div className="hero-art-wrap">
              <div className="scene-label scene-label-top"><span className="scene-label-index">FIG. 01</span><span>THE SYSTEMS OBSERVATORY</span></div>
              <div className="scene-halo scene-halo-one" aria-hidden="true" />
              <div className="scene-halo scene-halo-two" aria-hidden="true" />
              <HeroScene />
              <div className="scene-float-label float-label-left"><span className="float-label-icon lime"><Boxes size={15} /></span><span><b>Inventory</b><small>Structured operations</small></span></div>
              <div className="scene-float-label float-label-right"><span className="float-label-icon coral"><RadioTower size={15} /></span><span><b>Live telemetry</b><small>Signal → insight</small></span></div>
              <div className="scene-float-label float-label-bottom"><span className="float-label-icon violet"><Code2 size={15} /></span><span><b>Backend logic</b><small>Predictable by design</small></span><span className="label-arrow"><ArrowUpRight size={14} /></span></div>
              <div className="scene-axis scene-axis-left">DATA IN <span /> DECISIONS OUT</div>
              <div className="scene-coordinate">FLOW ID / 001<br />SYSTEMS MAP</div>
              <div className="scene-caption"><span className="caption-dot" /> INTERACTIVE 3D STUDY <span>·</span> MOVE YOUR CURSOR</div>
            </div>
          </div>
          <div className="container hero-bottom">
            <span className="hero-bottom-label">MY WORK SITS AT THE INTERSECTION OF</span>
            <div className="hero-tech-list"><span>Frontend craft</span><b>×</b><span>Backend logic</span><b>×</b><span>Real-world systems</span></div>
            <a href="#work" className="scroll-cue">SCROLL TO EXPLORE <span><ArrowDown size={14} /></span></a>
          </div>
        </section>

        <section className="ticker-section" aria-label="Technologies and areas of focus">
          <div className="ticker-track"><span>REACT & NEXT.JS</span><i>✳</i><span>NODE.JS & APIS</span><i>✳</i><span>POSTGRESQL</span><i>✳</i><span>PRODUCT THINKING</span><i>✳</i><span>AI-READY WORKFLOWS</span><i>✳</i><span>REACT & NEXT.JS</span><i>✳</i><span>NODE.JS & APIS</span><i>✳</i><span>POSTGRESQL</span><i>✳</i><span>PRODUCT THINKING</span><i>✳</i><span>AI-READY WORKFLOWS</span><i>✳</i></div>
        </section>

        <section className="work-section section-shell" id="work">
          <div className="container">
            <SectionHeading index="01" eyebrow="A FEW THINGS IN THE WORKSHOP" title="Built around real problems.">
              Less tutorial-clone energy. More practical systems, real constraints, thoughtful trade-offs, and learning that makes it into the product.
            </SectionHeading>
            <div className="project-intro-line"><span>SELECTED PROJECTS <b>({String(projects.length).padStart(2, "0")})</b></span><span>CASE STUDIES IN PROGRESS <ArrowDownRight size={14} /></span></div>
            <div className="project-grid">
              {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
            </div>
            <div className="work-bottom-note"><span className="note-mark">↳</span><p>I&apos;m documenting the thinking behind the code too: schema choices, failure paths, concurrency, auditability, and what I would improve next.</p><a href={siteConfig.github} target="_blank" rel="noreferrer">More code on GitHub <ArrowUpRight size={15} /></a></div>
          </div>
        </section>

        <section className="about-section section-shell" id="about">
          <div className="container">
            <div className="about-topline"><span>02 / A LITTLE CONTEXT</span><span>DEVELOPER · BUILDER · SYSTEMS THINKER</span></div>
            <div className="about-layout">
              <div className="about-story">
                <div className="about-mark" aria-hidden="true"><span>HB</span><i /><i /><i /></div>
                <h2>Curious about the whole machine, <em>not just the pixels.</em></h2>
                <p className="body-copy">My background spans product delivery, startup environments, and workflows from environmental monitoring. It taught me to look beyond the happy path: data needs to be trustworthy, permissions need to make sense, and the software needs to survive real usage.</p>
                <p className="body-copy">Now I&apos;m going deeper on full-stack engineering—building complete products, sharpening my system-design and database fundamentals, and exploring AI features that solve actual problems rather than simply looking impressive.</p>
                <div className="about-location"><MapPin size={15} /> India <span className="location-separator">·</span> Open to full-stack opportunities</div>
              </div>
              <div className="about-visual-panel">
                <div className="panel-stamp"><Sparkles size={14} /> HOW I THINK ABOUT SOFTWARE</div>
                <div className="focus-orbit focus-orbit-one" />
                <div className="focus-orbit focus-orbit-two" />
                <div className="focus-core"><Layers3 size={29} strokeWidth={1.4} /><span>THE PRODUCT</span></div>
                {focusAreas.map(({ icon: Icon, label, detail }, index) => (
                  <div className={`focus-node focus-node-${index + 1}`} key={label}>
                    <span><Icon size={16} /></span><b>{label}</b><small>{detail}</small>
                  </div>
                ))}
                <div className="panel-bottom-line"><span>01 — 03</span><span>EVERY LAYER HAS A JOB</span></div>
              </div>
            </div>
            <div className="principles-strip">
              {principles.map((item) => (
                <div className="principle-item" key={item.number}>
                  <span className="principle-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><ArrowUpRight size={16} className="principle-arrow" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="toolkit-section section-shell" id="toolkit">
          <div className="container">
            <SectionHeading index="03" eyebrow="TOOLS, NOT TROPHIES" title="A practical, growing toolkit.">
              My focus is on fundamentals and shipping—not collecting logos. This is the stack I use and the areas I&apos;m actively deepening.
            </SectionHeading>
            <div className="toolkit-grid">
              {skillGroups.map((group) => (
                <article className="toolkit-card" key={group.number}>
                  <div className="toolkit-card-top"><span>{group.number}</span><ArrowUpRight size={15} /></div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="skill-chip-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                </article>
              ))}
            </div>
            <div className="toolkit-honesty"><span className="honesty-icon"><Check size={14} /></span><p><strong>A note on the toolkit:</strong> it reflects my working stack and areas of active learning—not a claim that I have equal depth in every tool.</p></div>
          </div>
        </section>

        <section className="approach-section section-shell">
          <div className="container approach-inner">
            <div className="approach-copy">
              <div className="section-kicker"><span>04</span><span className="kicker-line" /><span>FROM PROBLEM TO PRODUCT</span></div>
              <h2>Understand the workflow.<br /><span>Make the system dependable.</span></h2>
              <p>My process starts with the person and the constraints—not a framework. Then I work from the data model and API all the way to interface states, tests, failure handling, and deployment.</p>
              <a href={siteConfig.github} target="_blank" rel="noreferrer" className="text-link">Explore the code <ArrowRight size={16} /></a>
            </div>
            <div className="approach-steps">
              <div className="approach-step"><span>01</span><div><strong>Map the problem</strong><small>Users · edge cases · constraints</small></div><Check size={15} /></div>
              <div className="approach-step"><span>02</span><div><strong>Design the foundation</strong><small>Data model · API · permissions</small></div><Check size={15} /></div>
              <div className="approach-step"><span>03</span><div><strong>Build and validate</strong><small>UI states · tests · error paths</small></div><Check size={15} /></div>
              <div className="approach-step"><span>04</span><div><strong>Ship and improve</strong><small>Deployment · feedback · iteration</small></div><Check size={15} /></div>
            </div>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="container contact-container">
            <div className="contact-grid-pattern" aria-hidden="true" />
            <div className="contact-content">
              <div className="section-kicker"><span>05</span><span className="kicker-line" /><span>THE NEXT BUILD</span></div>
              <h2>Have a real problem<br />worth <em>solving?</em></h2>
              <p>I&apos;m interested in full-stack roles, thoughtful engineering teams, and projects where software makes someone&apos;s work meaningfully better.</p>
              <div className="contact-actions">
                {siteConfig.email ? <a className="button button-primary" href={`mailto:${siteConfig.email}`}><Mail size={17} /> Get in touch <ArrowUpRight size={15} /></a> : null}
                <a className="button button-primary" href={siteConfig.github} target="_blank" rel="noreferrer"><FaGithub size={17} /> Connect on GitHub <ArrowUpRight size={15} /></a>FaGithub
                {siteConfig.linkedin ? <a className="button button-outline" href={siteConfig.linkedin} target="_blank" rel="noreferrer"><FaLinkedin size={17} /> LinkedIn <ArrowUpRight size={15} /></a> : null}
                {siteConfig.resumePath ? <a className="button button-outline" href={siteConfig.resumePath} target="_blank" rel="noreferrer">Resume <MoveUpRight size={15} /></a> : null}
            </div>
            </div>
            <div className="contact-side-card"><span className="contact-card-icon"><Terminal size={18} /></span><span className="contact-card-eyebrow">CURRENT MODE</span><strong>Build. Learn.<br />Ship better.</strong><p>One thoughtful iteration at a time.</p><div className="contact-card-orb" aria-hidden="true"><span /><i /></div><div className="contact-card-line" /><span className="contact-card-signature">HIMANSHU BISHT <b>© {new Date().getFullYear()}</b></span></div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner"><Link href="#top" className="footer-brand">HB<span>.</span></Link><span>Designed as a small universe. Built with React, Next.js & Three.js.</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </>
  );
}
