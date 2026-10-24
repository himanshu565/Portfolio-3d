"use client";

import { ArrowUpRight, Check, Code2, Database, RadioTower } from "lucide-react";
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

  if (project.visual === "monitoring") {
    return (
      <div className="w-full bg-[var(--bg-subtle)] border border-[var(--border-main)] rounded-2xl p-4 sm:p-5 text-xs text-[var(--text-secondary)]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <RadioTower size={14} className="text-[var(--accent-primary)]" />
            <span>Telemetry Pipeline Stream</span>
          </div>
          <span className="badge-inexa text-[10px] py-0.5 px-2">CPCB + Local Gateway</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-2 rounded-xl">
            <span className="block text-[10px] text-[var(--text-muted)]">SOx Reading</span>
            <strong className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">7.79 mg/Nm³</strong>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-2 rounded-xl">
            <span className="block text-[10px] text-[var(--text-muted)]">NOx Reading</span>
            <strong className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">25.5 mg/Nm³</strong>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-2 rounded-xl">
            <span className="block text-[10px] text-[var(--text-muted)]">PM2.5</span>
            <strong className="text-xs sm:text-sm font-bold text-[var(--accent-primary)]">9.77 mg/Nm³</strong>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-3 rounded-xl">
          <div className="h-16 w-full flex items-end gap-1">
            {[45, 62, 58, 75, 42, 68, 85, 72, 60, 90, 78, 64, 82, 95, 70, 88].map((val, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-t-sm transition-all hover:bg-[var(--text-primary)]"
                style={{
                  height: `${val}%`,
                  backgroundColor: idx % 3 === 0 ? "var(--text-primary)" : "var(--accent-border)",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-2 font-mono">
            <span>Transmission queue</span>
            <span>Zero drop guarantee</span>
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
