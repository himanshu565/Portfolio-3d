import { ArrowUpRight, Check, CircleDot, Code2, Database, RadioTower } from "lucide-react";
import type { projects } from "@/data/site";

export type Project = (typeof projects)[number];

function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "inventory") {
    return (
      <div className="project-art art-inventory" aria-hidden="true">
        <div className="mini-window">
          <div className="mini-window-top"><span /><span /><span /><i>inventory / overview</i></div>
          <div className="inventory-layout">
            <div className="inventory-sidebar"><b /><b /><b /><b /></div>
            <div className="inventory-main">
              <div className="inventory-title"><span>Inventory</span><b>＋ Add item</b></div>
              <div className="inventory-stats"><span><small>Total items</small><strong>1,284</strong></span><span><small>Categories</small><strong>18</strong></span><span><small>Low stock</small><strong>06</strong></span></div>
              <div className="inventory-table"><span>Item / category</span><span>In stock</span><span>Status</span><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div>
        </div>
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
      </div>
    );
  }

  if (project.visual === "monitoring") {
    return (
      <div className="project-art art-monitoring" aria-hidden="true">
        <div className="telemetry-top"><span><RadioTower size={14} /> LIVE TELEMETRY</span><em><i /> SIMULATED UI</em></div>
        <div className="telemetry-reading"><div><small>SOx</small><strong>7.79 <small>mg/Nm³</small></strong></div><div><small>NOx</small><strong>25.53 <small>mg/Nm³</small></strong></div><div><small>PM</small><strong>9.77 <small>mg/Nm³</small></strong></div></div>
        <div className="telemetry-chart"><div className="chart-grid" /><svg viewBox="0 0 440 100" preserveAspectRatio="none"><path d="M0 73 C 24 68, 28 32, 54 45 S 88 82, 112 59 S 147 20, 170 38 S 208 74, 231 49 S 264 13, 288 36 S 330 78, 349 50 S 383 22, 403 38 S 427 55, 440 19" /><path className="chart-line-secondary" d="M0 54 C 32 45, 38 70, 65 62 S 91 40, 120 47 S 164 69, 190 57 S 222 32, 248 45 S 280 60, 309 56 S 352 42, 379 56 S 412 43, 440 48" /></svg><div className="chart-axis"><span>16:08:00</span><span>16:08:15</span><span>16:08:30</span><span>16:08:45</span></div></div>
        <div className="telemetry-bottom"><span><i /> Local server path</span><span><i /> CPCB path</span><span>Refresh target · 27s</span></div>
      </div>
    );
  }

  return (
    <div className="project-art art-backend" aria-hidden="true">
      <div className="code-top"><span><Code2 size={14} /> transaction-flow.ts</span><span className="code-dots">● ● ●</span></div>
      <div className="code-lines">
        <p><em>01</em><span><b>async function</b> confirmHold(<i>holdId</i>) {'{'}</span></p>
        <p><em>02</em><span className="indent"> <b>return</b> db.transaction(<i>async (tx)</i> =&gt; {'{'}</span></p>
        <p><em>03</em><span className="indent-2"> <b>const</b> hold = <i>await</i> tx.lock(holdId)</span></p>
        <p><em>04</em><span className="indent-2"> <b>if</b> (hold.status !== <strong>&quot;pending&quot;</strong>)</span></p>
        <p><em>05</em><span className="indent-3"><b>throw</b> <strong>ConflictError</strong>()</span></p>
        <p><em>06</em><span className="indent-2"> <i>await</i> tx.update({`{ status: `}<strong>&quot;confirmed&quot;</strong>{` }`})</span></p>
        <p><em>07</em><span className="indent"> {'}'})</span></p>
        <p><em>08</em><span>{'}'}</span></p>
      </div>
      <div className="backend-foot"><span><Database size={13} /> COMMIT / ROLLBACK</span><span><Check size={13} /> STATE VALIDATED</span></div>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card project-${project.accent}`}>
      <ProjectVisual project={project} />
      <div className="project-content">
        <div className="project-meta"><span>{project.type}</span><span className="project-status"><CircleDot size={11} /> {project.status}</span></div>
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-detail"><span className="detail-label">PROBLEM SPACE</span><p>{project.problem}</p></div>
        <div className="project-tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
        {project.href ? (
          <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
            {project.linkLabel} <ArrowUpRight size={16} />
          </a>
        ) : (
          <span className="project-link project-link-muted">{project.linkLabel}</span>
        )}
      </div>
    </article>
  );
}
