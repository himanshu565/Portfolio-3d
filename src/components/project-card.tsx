"use client";

import { ArrowUpRight, Check, CheckCircle2, Clock, Code2, Database, FolderKanban } from "lucide-react";
import type { projects } from "@/data/site";

export type Project = (typeof projects)[number];

function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "inventory") {
    return (
      <div className="w-full bg-[var(--bg-subtle)] border border-[var(--border-main)] rounded-2xl p-4 sm:p-5 text-xs text-[var(--text-secondary)]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-subtle)] font-mono text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-medium text-[var(--text-primary)]">EnviroZone // Inventory.sys</span>
          </div>
          <span className="badge-inexa text-[10px] py-0.5 px-2">Audited</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-2.5 rounded-xl">
            <span className="block text-[10px] text-[var(--text-muted)] uppercase">Serialized Items</span>
            <strong className="text-sm sm:text-base font-bold text-[var(--text-primary)]">1,284</strong>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-2.5 rounded-xl">
            <span className="block text-[10px] text-[var(--text-muted)] uppercase">Warehouses</span>
            <strong className="text-sm sm:text-base font-bold text-[var(--text-primary)]">18 Sites</strong>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-2.5 rounded-xl">
            <span className="block text-[10px] text-[var(--text-muted)] uppercase">Audit Logs</span>
            <strong className="text-sm sm:text-base font-bold text-[var(--accent-primary)]">100% Traceable</strong>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden text-[11px]">
          <div className="grid grid-cols-3 px-3 py-2 bg-[var(--bg-subtle)] font-semibold text-[var(--text-muted)] border-b border-[var(--border-subtle)]">
            <span>Asset SKU</span>
            <span>Location</span>
            <span>Integrity</span>
          </div>
          <div className="grid grid-cols-3 px-3 py-2 border-b border-[var(--border-subtle)]/60">
            <span className="font-mono text-[var(--text-primary)]">EZ-SEN-902</span>
            <span>Sector A-12</span>
            <span className="text-[var(--accent-secondary)] font-medium">✓ Verified</span>
          </div>
          <div className="grid grid-cols-3 px-3 py-2">
            <span className="font-mono text-[var(--text-primary)]">EZ-VAL-441</span>
            <span>Main Depot</span>
            <span className="text-[var(--accent-secondary)] font-medium">✓ In Stock</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.visual === "management") {
    return (
      <div className="w-full bg-[var(--bg-subtle)] border border-[var(--border-main)] rounded-2xl p-4 sm:p-5 text-xs text-[var(--text-secondary)]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <FolderKanban size={14} className="text-[var(--accent-primary)]" />
            <span className="font-mono text-[11px]">Workspace // Sprint-04</span>
          </div>
          <span className="badge-inexa text-[10px] py-0.5 px-2">Active Sprint</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-2 rounded-xl">
            <span className="block text-[10px] text-[var(--text-muted)] uppercase">Tasks in Flight</span>
            <strong className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">24 Active</strong>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-2 rounded-xl">
            <span className="block text-[10px] text-[var(--text-muted)] uppercase">Team Velocity</span>
            <strong className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">94% On Track</strong>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-2 rounded-xl">
            <span className="block text-[10px] text-[var(--text-muted)] uppercase">Milestones</span>
            <strong className="text-xs sm:text-sm font-bold text-[var(--accent-secondary)]">8/10 Shipped</strong>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-3 rounded-xl">
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            {/* Column 1: Backlog */}
            <div className="bg-[var(--bg-subtle)]/70 p-2 rounded-lg border border-[var(--border-subtle)]">
              <div className="flex items-center justify-between font-bold text-[var(--text-muted)] mb-1.5 uppercase tracking-wider text-[9px]">
                <span>To Do</span>
                <span className="w-4 h-4 rounded-full bg-[var(--bg-card)] flex items-center justify-center text-[9px]">4</span>
              </div>
              <div className="p-1.5 bg-[var(--bg-card)] rounded-md border border-[var(--border-subtle)] mb-1">
                <span className="font-medium text-[var(--text-primary)] block truncate">RBAC Auth Guard</span>
                <span className="text-[8px] text-[var(--accent-primary)] font-semibold">P1 · High</span>
              </div>
            </div>

            {/* Column 2: In Progress */}
            <div className="bg-[var(--bg-subtle)]/70 p-2 rounded-lg border border-[var(--border-subtle)]">
              <div className="flex items-center justify-between font-bold text-[var(--text-muted)] mb-1.5 uppercase tracking-wider text-[9px]">
                <span>In Progress</span>
                <span className="w-4 h-4 rounded-full bg-[var(--accent-primary)] text-[#171717] flex items-center justify-center text-[9px] font-bold">2</span>
              </div>
              <div className="p-1.5 bg-[var(--bg-card)] rounded-md border border-[var(--border-subtle)] mb-1">
                <span className="font-medium text-[var(--text-primary)] block truncate">Kanban Drag & Drop</span>
                <span className="text-[8px] text-[var(--accent-secondary)] font-semibold">In Review</span>
              </div>
            </div>

            {/* Column 3: Completed */}
            <div className="bg-[var(--bg-subtle)]/70 p-2 rounded-lg border border-[var(--border-subtle)]">
              <div className="flex items-center justify-between font-bold text-[var(--text-muted)] mb-1.5 uppercase tracking-wider text-[9px]">
                <span>Done</span>
                <span className="w-4 h-4 rounded-full bg-[var(--bg-card)] flex items-center justify-center text-[9px]">18</span>
              </div>
              <div className="p-1.5 bg-[var(--bg-card)] rounded-md border border-[var(--border-subtle)] mb-1">
                <span className="font-medium text-[var(--text-primary)] block truncate">Optimistic Mutations</span>
                <span className="text-[8px] text-[var(--accent-secondary)] font-semibold">✓ Shipped</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] mt-2.5 pt-2 border-t border-[var(--border-subtle)] font-mono">
            <span className="flex items-center gap-1.5">
              <Clock size={11} className="text-[var(--accent-primary)]" />
              <span>Real-time state sync</span>
            </span>
            <span className="flex items-center gap-1 text-[var(--text-muted)]">
              <CheckCircle2 size={11} className="text-[var(--accent-primary)]" />
              <span>Audit trail logged</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[var(--bg-subtle)] border border-[var(--border-main)] rounded-2xl p-4 sm:p-5 text-xs text-[var(--text-secondary)] font-mono">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-subtle)] font-sans">
        <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
          <Code2 size={14} className="text-[var(--accent-primary)]" />
          <span>transaction-flow.ts</span>
        </div>
        <span className="badge-inexa text-[10px] py-0.5 px-2">Row Locked</span>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-[11px] leading-relaxed overflow-x-auto text-[var(--text-primary)]">
        <p><span className="text-[var(--accent-primary)] font-bold">async function</span> confirmHold(holdId) &#123;</p>
        <p className="pl-3"><span className="text-[var(--accent-primary)] font-bold">return</span> db.transaction(<span className="text-[var(--text-secondary)]">async</span> (tx) =&gt; &#123;</p>
        <p className="pl-6"><span className="text-[var(--text-muted)]">&#47;&#47; Row-level lock prevents overselling</span></p>
        <p className="pl-6"><span className="text-[var(--accent-primary)] font-bold">const</span> hold = <span className="text-[var(--text-secondary)]">await</span> tx.lock(holdId);</p>
        <p className="pl-6"><span className="text-[var(--accent-primary)] font-bold">if</span> (hold.status !== <span className="text-[var(--accent-secondary)]">&quot;pending&quot;</span>) &#123;</p>
        <p className="pl-9"><span className="text-[var(--accent-primary)] font-bold">throw new</span> ConflictError();</p>
        <p className="pl-6">&#125;</p>
        <p className="pl-6"><span className="text-[var(--text-secondary)]">await</span> tx.update(&#123; status: <span className="text-[var(--accent-secondary)]">&quot;confirmed&quot;</span> &#125;);</p>
        <p className="pl-3">&#125;);</p>
        <p>&#125;</p>
      </div>

      <div className="flex items-center justify-between mt-3 text-[11px] font-sans text-[var(--text-muted)]">
        <span className="flex items-center gap-1.5"><Database size={13} className="text-[var(--accent-primary)]" /> ACID Serializable</span>
        <span className="flex items-center gap-1.5"><Check size={13} className="text-[var(--accent-secondary)]" /> Idempotent webhook</span>
      </div>
    </div>
  );
}

export function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card-inexa flex flex-col justify-between h-full ${featured ? "lg:col-span-2" : ""}`}>
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono text-[var(--accent-primary)]">
              {project.number}
            </span>
            <span className="text-xs font-medium text-[var(--text-muted)]">·</span>
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
              {project.type}
            </span>
          </div>

          <span className="badge-neutral text-[11px]">
            {project.status}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
          {project.name}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Visual Preview */}
        <div className="mb-6">
          <ProjectVisual project={project} />
        </div>

        {/* Engineering Challenge / Architecture */}
        <div className="mb-6 p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
          <span className="block text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
            Key Architecture & Constraint
          </span>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed m-0">
            {project.problem}
          </p>
        </div>
      </div>

      {/* Footer: Tech Stack & CTA */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span key={tech} className="badge-neutral text-xs py-1 px-2.5">
              {tech}
            </span>
          ))}
        </div>

        <div>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="btn-inexa-outline text-xs py-2 px-3.5 inline-flex items-center gap-1.5 group"
            >
              <span>{project.linkLabel}</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <span className="text-xs text-[var(--text-muted)] italic">
              {project.linkLabel}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
