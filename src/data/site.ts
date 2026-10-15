export const siteConfig = {
  name: "Himanshu Bisht",
  initials: "HB",
  role: "Full-Stack Developer",
  tagline: "I build software that makes complex workflows feel simple.",
  description:
    "Full-stack developer focused on React, Next.js, Node.js, reliable data workflows, and AI-enabled product engineering.",
  location: "India · Open to remote opportunities",
  github: "https://github.com/himanshu565",
  // Add your real contact details before publishing. Empty values stay hidden in the UI.
  email: "",
  linkedin: "",
  resumePath: "", // Example: "/Himanshu-Bisht-Resume.pdf" after adding the file to /public.
};

export const projects = [
  {
    number: "01",
    name: "EnviroZone Inventory",
    type: "Full-stack product",
    status: "Active build",
    description:
      "A full-stack inventory platform for stock, purchase orders, locations, audit logs, and serialized assets, built with a Next.js web app and a separate Express API.",
    problem:
      "Make inventory operations traceable and reliable, with structured data, auditable changes, and workflows that go beyond basic CRUD. An optional document-grounded knowledge assistant is designed to stay separate from stock-changing actions.",
    stack: ["Next.js", "Express + Prisma", "PostgreSQL"],
    href: "https://github.com/himanshu565/envirozone-inventory-system",
    linkLabel: "View repository",
    accent: "mint",
    visual: "inventory",
  },
  {
    number: "02",
    name: "EnviroTrack Monitoring Platform",
    type: "Domain-focused system",
    status: "In progress",
    description:
      "A monitoring and data-transmission platform concept for environmental analyzers, designed around live dashboards, reliable delivery, and separate CPCB and local-server paths.",
    problem:
      "Design a dependable path from device readings to dashboards and downstream systems, with validation and traceable transmission attempts.",
    stack: ["Next.js", "Node.js / APIs", "IoT telemetry"],
    href: "",
    linkLabel: "Project notes coming soon",
    accent: "blue",
    visual: "monitoring",
  },
  {
    number: "03",
    name: "KWILL Ticketing API",
    type: "Backend engineering",
    status: "Deployed API",
    description:
      "A transactional ticket-hold and payment workflow built with Next.js Route Handlers and PostgreSQL, including orders, holds, refunds, and payment-webhook processing.",
    problem:
      "Prevent overselling and duplicate payment side effects when requests race or payment webhooks retry, using row locking, transactions, and idempotency.",
    stack: ["Next.js API", "PostgreSQL", "Transactions + webhooks"],
    href: "https://github.com/himanshu565/KWILL-assignment",
    linkLabel: "View repository",
    accent: "orange",
    visual: "backend",
  },
];

export const skillGroups = [
  {
    number: "01",
    title: "Product interfaces",
    description: "Accessible, responsive experiences with clear UI states.",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    number: "02",
    title: "Backend & APIs",
    description: "Business logic, integrations, and reliable request handling.",
    skills: ["Node.js", "Express.js", "REST APIs", "Authentication", "Webhooks"],
  },
  {
    number: "03",
    title: "Data & delivery",
    description: "Choosing practical data models and shipping maintainable apps.",
    skills: ["PostgreSQL", "MongoDB", "Prisma", "Supabase", "Docker", "Git", "Vercel"],
  },
  {
    number: "04",
    title: "Exploring AI engineering",
    description: "Building toward useful AI features, not demos for demos' sake.",
    skills: ["RAG concepts", "LLM app patterns", "Ollama / local models"],
  },
];

export const principles = [
  {
    number: "01",
    title: "Correctness before cleverness",
    copy: "Model the state transitions, constraints, and failure cases before optimising the happy path.",
  },
  {
    number: "02",
    title: "Build for the person using it",
    copy: "Turn domain-heavy workflows into interfaces that are understandable and hard to misuse.",
  },
  {
    number: "03",
    title: "Ship, measure, improve",
    copy: "Prefer a small production-minded release over an impressive feature list that never leaves a branch.",
  },
];
